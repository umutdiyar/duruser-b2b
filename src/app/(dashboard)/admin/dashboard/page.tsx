import Link from "next/link";

import {
  AlertCircle,
  ArrowUpRight,
  Building2,
  ShoppingCart,
  Package,
  PackageCheck,
  Clock3,
  Truck,
} from "lucide-react";

import { DashboardHeader } from "@/components/layout/dashboard-header";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/shared/empty-state";
import { OrderStatusBadge } from "@/components/shared/order-status-badge";
import { OrdersChart } from "@/components/dashboard/orders-chart";
import { DashboardContainer } from "@/components/layout/dashboard-container";

import { prisma } from "@/lib/prisma";
import { formatCurrency, formatDate } from "@/lib/format";
import { branding } from "@/config/branding";

const quickActions = [
  {
    label: "Yeni Firma",
    description: "Müşteri firma ekle",
    href: "/admin/customers/new",
    icon: Building2,
  },
  {
    label: "Yeni Ürün",
    description: "Kataloğa ürün ekle",
    href: "/admin/products/new",
    icon: Package,
  },
  {
    label: "Siparişleri Gör",
    description: "Tüm siparişleri listele",
    href: "/admin/orders",
    icon: ShoppingCart,
  },
] as const;

const WEEKDAY_LABELS = ["Pzt", "Sal", "Çrş", "Prş", "Cum", "Cts", "Paz"];

function getCurrentWeekRange() {
  const now = new Date();
  const start = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const isoDay = start.getDay() === 0 ? 7 : start.getDay(); // 1 = Mon ... 7 = Sun
  start.setDate(start.getDate() - (isoDay - 1));

  const end = new Date(start);
  end.setDate(start.getDate() + 7);

  return { start, end };
}

export default async function AdminDashboardPage() {
  const { start: weekStart, end: weekEnd } = getCurrentWeekRange();

  const [
    recentOrders,
    attentionOrders,
    companies,
    products,
    totalOrders,
    pendingOrders,
    shippedOrders,
    deliveredOrders,
    weeklyOrders,
  ] = await Promise.all([
    prisma.order.findMany({
      select: {
        id: true,
        orderNumber: true,
        status: true,
        totalPrice: true,
        company: {
          select: {
            name: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 5,
    }),
    // Oldest pending orders first — these have been waiting longest for
    // admin action, so they surface at the top of the "needs attention" list.
    prisma.order.findMany({
      where: { status: "PENDING" },
      select: {
        id: true,
        orderNumber: true,
        createdAt: true,
        company: {
          select: {
            name: true,
          },
        },
      },
      orderBy: {
        createdAt: "asc",
      },
      take: 5,
    }),
    prisma.company.count(),
    prisma.product.count(),
    prisma.order.count(),
    prisma.order.count({ where: { status: "PENDING" } }),
    prisma.order.count({ where: { status: "SHIPPED" } }),
    prisma.order.count({ where: { status: "DELIVERED" } }),
    prisma.order.findMany({
      where: {
        createdAt: {
          gte: weekStart,
          lt: weekEnd,
        },
      },
      select: {
        createdAt: true,
      },
    }),
  ]);

  const weeklyChartData = WEEKDAY_LABELS.map((label, index) => {
    const dayStart = new Date(weekStart);
    dayStart.setDate(weekStart.getDate() + index);
    const dayEnd = new Date(dayStart);
    dayEnd.setDate(dayStart.getDate() + 1);

    const count = weeklyOrders.filter(
      (order) => order.createdAt >= dayStart && order.createdAt < dayEnd,
    ).length;

    return { day: label, orders: count };
  });

  const stats = [
    {
      title: "Toplam Sipariş",
      value: totalOrders,
      description: `${companies} Firma: ${products} ürün`,
      icon: ShoppingCart,
    },
    {
      title: "Yeni Sipariş",
      value: pendingOrders,
      description: "İşlem bekleyen sipariş",
      icon: Clock3,
    },
    {
      title: "Sevkiyatta",
      value: shippedOrders,
      description: "Teslimat sürecinde",
      icon: Truck,
    },
    {
      title: "Teslim Edilen",
      value: deliveredOrders,
      description: "Tamamlanan sipariş",
      icon: PackageCheck,
    },
  ];

  return (
    <>
      <DashboardHeader
        title="Yönetim Paneli"
        description="DuruSer operasyonunu tek merkezden yönetin."
        actions={
          <Button
            asChild
            className="h-11 rounded-2xl bg-orange-500 px-5 font-semibold hover:bg-orange-600"
          >
            <Link href="/admin/orders">
              Siparişleri Gör
              <ArrowUpRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        }
      />
      <DashboardContainer>
        <Card className="overflow-hidden border-0 bg-gradient-to-r from-orange-500 to-orange-600 via-orange-500 text-white shadow-2xl">
          <CardContent className="flex flex-col gap-8 p-6 lg:p-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="min-w-0">
              <Badge className="border-0 bg-white/15 text-white hover:bg-white/15">
                {branding.companyName} B2B
              </Badge>

              <h2 className="mt-4 text-3xl lg:text-5xl leading-tight font-bold tracking-tight sm:text-4xl">
                Operasyon Merkezi
              </h2>

              <p className="mt-4 max-w-2xl text-sm leading-6 text-orange-100 sm:text-base">
                Müşteri siparişlerini, ürün kataloglarını ve firma
                operasyonlarını tek panelden takip edin.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2 lg:min-w-[360px]">
              <div className="rounded-3xl border border-white/15 bg-white/10 p-5 backdrop-blur">
                <p className="text-sm text-orange-100">Toplam Firma</p>
                <p className="mt-2 text-3xl font-bold">{companies}</p>
              </div>

              <div className="rounded-3xl border border-white/15 bg-white/10 p-5 backdrop-blur">
                <p className="text-sm text-orange-100">Toplam Ürün</p>
                <p className="mt-2 text-3xl font-bold">{products}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* STATS */}

        <div className="grid gap-4 lg:gap-5 md:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat) => {
            const Icon = stat.icon;

            return (
              <Card
                key={stat.title}
                className="border-0 shadow-sm transition-shadow duration-200 hover:shadow-lg"
              >
                <CardContent className="p-5 sm:p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0 ">
                      <p className="text-sm text-muted-foreground truncate">
                        {stat.title}
                      </p>

                      <p className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
                        {stat.value}
                      </p>
                    </div>

                    <div className="rounded-2xl bg-orange-100 p-3 shrink-0 text-orange-600">
                      <Icon className="h-5 w-5" />
                    </div>
                  </div>

                  <p className="mt-4 text-xs text-muted-foreground">
                    {stat.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* QUICK ACTIONS */}

        <div className="grid gap-3 sm:grid-cols-3">
          {quickActions.map((action) => {
            const Icon = action.icon;

            return (
              <Link
                key={action.href}
                href={action.href}
                className="flex items-center gap-3 rounded-2xl border bg-white p-4 transition-colors duration-150 hover:border-orange-200 hover:bg-orange-50/40"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-orange-100 text-orange-600">
                  <Icon className="h-5 w-5" />
                </div>

                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-slate-900">
                    {action.label}
                  </p>
                  <p className="truncate text-xs text-muted-foreground">
                    {action.description}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>

        {/* CHART + ACTIVITY */}

        <div className="grid gap-6 xl:grid-cols-3 ">
          <Card className="border-0 min-w-0 shadow-sm xl:col-span-2">
            <CardHeader>
              <CardTitle>Bu Haftaki Sipariş Analizi</CardTitle>
            </CardHeader>

            <CardContent>
              <div className="min-w-0 h-[260px] sm:h-[320px]">
                <OrdersChart data={weeklyChartData} />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <AlertCircle className="h-4 w-4 text-warning" />
                Dikkat Gerektiren Siparişler
              </CardTitle>

              {pendingOrders > 0 ? (
                <Badge className="border-0 bg-warning/15 text-amber-700 hover:bg-warning/15">
                  {pendingOrders} bekliyor
                </Badge>
              ) : null}
            </CardHeader>

            <CardContent className="space-y-3">
              {attentionOrders.length === 0 ? (
                <EmptyState
                  icon={PackageCheck}
                  title="Bekleyen sipariş yok"
                  description="Tüm siparişler işleme alınmış durumda."
                />
              ) : (
                attentionOrders.map((order) => (
                  <Link
                    key={order.id}
                    href={`/admin/orders/${order.id}`}
                    className="flex items-center justify-between gap-3 rounded-2xl bg-warning/10 p-4 transition-colors duration-150 hover:bg-warning/15"
                  >
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-slate-900">
                        {order.company.name}
                      </p>
                      <p className="mt-0.5 truncate text-xs text-muted-foreground">
                        {order.orderNumber} · {formatDate(order.createdAt)}
                      </p>
                    </div>

                    <ArrowUpRight className="h-4 w-4 shrink-0 text-muted-foreground" />
                  </Link>
                ))
              )}
            </CardContent>
          </Card>
        </div>

        {/* RECENT ORDERS */}

        <Card className="border-0 shadow-sm">
          <CardHeader className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <CardTitle>Son Siparişler</CardTitle>

            <Button asChild variant="outline" className="rounded-2xl">
              <Link href="/admin/orders">
                Tümünü Gör
                <ArrowUpRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardHeader>

          <CardContent className="space-y-4">
            {recentOrders.length === 0 ? (
              <EmptyState
                icon={ShoppingCart}
                title="Henüz sipariş bulunmuyor"
                description="Müşterileriniz sipariş oluşturduğunda burada listelenecek."
              />
            ) : (
              recentOrders.map((order) => (
                <div
                  key={order.id}
                  className="flex min-w-0 flex-col gap-4 rounded-3xl border bg-white p-5 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="min-w-0">
                    <p className="truncate font-semibold">
                      {order.company.name}
                    </p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {order.orderNumber}
                    </p>
                  </div>

                  <div className="flex shrink-0 flex-wrap items-center gap-3">
                    <OrderStatusBadge status={order.status} />

                    <p className="font-bold">
                      {formatCurrency(order.totalPrice)}
                    </p>
                  </div>
                </div>
              ))
            )}
          </CardContent>
        </Card>
      </DashboardContainer>
    </>
  );
}

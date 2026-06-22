import Link from "next/link";

import {
  ArrowUpRight,
  ShoppingCart,
  PackageCheck,
  Clock3,
  Truck,
} from "lucide-react";

import { DashboardHeader } from "@/components/layout/dashboard-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { OrdersChart } from "@/components/dashboard/orders-chart";
import { DashboardContainer } from "@/components/layout/dashboard-container";

import { prisma } from "@/lib/prisma";
import { formatCurrency } from "@/lib/format";
import {
  getOrderStatusClassName,
  getOrderStatusLabel,
} from "@/lib/order-status";

export default async function AdminDashboardPage() {
  const [orders, companies, products] = await Promise.all([
    prisma.order.findMany({
      include: {
        company: true,
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 5,
    }),
    prisma.company.count(),
    prisma.product.count(),
  ]);

  const totalOrders = await prisma.order.count();

  const pendingOrders = await prisma.order.count({
    where: {
      status: "PENDING",
    },
  });

  const shippedOrders = await prisma.order.count({
    where: {
      status: "SHIPPED",
    },
  });

  const deliveredOrders = await prisma.order.count({
    where: {
      status: "DELIVERED",
    },
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
        {/* HERO */}

        <Card className="overflow-hidden border-0 bg-gradient-to-r from-orange-500 to-orange-600 via-orange-500 text-white shadow-2xl">
          <CardContent className="flex flex-col gap-8 p-6 lg:p-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="min-w-0">
              <Badge className="border-0 bg-white/15 text-white hover:bg-white/15">
                DuruSer B2B
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
                className="border-0 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
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

        {/* CHART + ACTIVITY */}

        <div className="grid gap-6 xl:grid-cols-3 ">
          <Card className="border-0 min-w-0 shadow-sm xl:col-span-2">
            <CardHeader>
              <CardTitle>Haftalık Sipariş Analizi</CardTitle>
            </CardHeader>

            <CardContent>
              <div className="min-w-0 h-[260px] sm:h-[320px]">
                <OrdersChart />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle>Son Aktiviteler</CardTitle>
            </CardHeader>

            <CardContent className="space-y-4">
              {[
                `${pendingOrders} yeni sipariş işlem bekliyor.`,
                `${shippedOrders} sipariş sevkiyat sürecinde.`,
                `${deliveredOrders} sipariş teslim edildi.`,
                `${products} ürün katalogda yer alıyor.`,
              ].map((activity) => (
                <div
                  key={activity}
                  className="flex gap-3 rounded-2xl bg-slate-50 p-4"
                >
                  <div className="mt-2 h-2 w-2 shrink-0 rounded-full bg-orange-500" />
                  <p className="text-sm leading-6 text-slate-600">{activity}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* RECENT ORDERS */}

        <Card className="border-0 shadow-sm">
          <CardHeader className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <CardTitle>Son Siparişler</CardTitle>

            <Button variant="outline" className="rounded-2xl">
              <Link href="/admin/orders">
                Tümünü Gör
                <ArrowUpRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardHeader>

          <CardContent className="space-y-4">
            {orders.length === 0 ? (
              <div className="rounded-3xl border bg-white p-8 text-center text-sm text-muted-foreground">
                Henüz sipariş bulunmuyor.
              </div>
            ) : (
              orders.map((order) => (
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
                    <Badge className={getOrderStatusClassName(order.status)}>
                      {getOrderStatusLabel(order.status)}
                    </Badge>

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

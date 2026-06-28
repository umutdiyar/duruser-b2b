import Link from "next/link";

import {
  ArrowRight,
  Clock3,
  PackageCheck,
  ShoppingCart,
  Truck,
} from "lucide-react";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { formatCurrency } from "@/lib/format";
import {
  getOrderStatusClassName,
  getOrderStatusLabel,
} from "@/lib/order-status";

import { DashboardHeader } from "@/components/layout/dashboard-header";
import { DashboardContainer } from "@/components/layout/dashboard-container";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default async function CustomerDashboardPage() {
  const session = await auth();
  const companyId = session?.user?.companyId;

  const now = new Date();
  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);

  const [activeOrders, monthlyOrders, lastOrder, assignedProducts] = companyId
    ? await Promise.all([
        prisma.order.findMany({
          where: {
            companyId,
            status: {
              in: ["PENDING", "CONFIRMED", "PREPARING", "SHIPPED"],
            },
          },
          orderBy: {
            createdAt: "desc",
          },
          take: 3,
        }),

        prisma.order.count({
          where: {
            companyId,
            createdAt: {
              gte: monthStart,
            },
          },
        }),

        prisma.order.findFirst({
          where: {
            companyId,
          },
          orderBy: {
            createdAt: "desc",
          },
        }),

        prisma.companyProduct.findMany({
          where: {
            companyId,
            product: {
              isActive: true,
            },
          },
          include: {
            product: true,
          },
          orderBy: {
            product: {
              name: "asc",
            },
          },
          take: 4,
        }),
      ])
    : [[], 0, null, []];

  return (
    <>
      <DashboardHeader
        title="Müşteri Paneli"
        description="Siparişlerinizi hızlıca yönetin."
        actions={
          <Button
            asChild
            className="h-11 rounded-2xl bg-orange-500 px-5 font-semibold hover:bg-orange-600"
          >
            <Link href="/customer/new-order">
              Yeni Sipariş
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        }
      />

      <DashboardContainer>
        <Card className="overflow-hidden border-0 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white shadow-2xl">
          <CardContent className="flex flex-col gap-8 p-6 lg:flex-row lg:items-center lg:justify-between lg:p-8">
            <div>
              <Badge className="border-0 bg-white/10 text-white hover:bg-white/10">
                Hızlı Sipariş
              </Badge>

              <h2 className="mt-4 text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
                Siparişlerinizi
                <br />
                saniyeler içinde oluşturun
              </h2>

              <p className="mt-4 max-w-xl text-sm leading-6 text-slate-300 sm:text-base">
                Firmanıza tanımlı ürünleri görüntüleyin, sipariş oluşturun ve
                sipariş sürecini canlı takip edin.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Button
                asChild
                className="h-12 rounded-2xl bg-orange-500 px-6 text-white hover:bg-orange-600"
              >
                <Link href="/customer/new-order">
                  Yeni Sipariş
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>

              <Button
                asChild
                variant="outline"
                className="h-12 rounded-2xl border-white/20 bg-white/10 px-6 text-white hover:bg-white/20"
              >
                <Link href="/customer/orders">Siparişlerim</Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-4 md:grid-cols-3">
          <Card className="border-0 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Aktif Sipariş</p>
                  <p className="mt-3 text-4xl font-bold">
                    {activeOrders.length}
                  </p>
                </div>

                <div className="rounded-2xl bg-orange-100 p-3 text-orange-500">
                  <Clock3 className="h-5 w-5" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">
                    Bu Ayki Sipariş
                  </p>
                  <p className="mt-3 text-4xl font-bold">{monthlyOrders}</p>
                </div>

                <div className="rounded-2xl bg-orange-100 p-3 text-orange-500">
                  <ShoppingCart className="h-5 w-5" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Son Sipariş</p>
                  <p className="mt-3 text-3xl font-bold">
                    {lastOrder ? formatCurrency(lastOrder.totalPrice) : "—"}
                  </p>
                </div>

                <div className="rounded-2xl bg-orange-100 p-3 text-orange-500">
                  <PackageCheck className="h-5 w-5" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 xl:grid-cols-2">
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle>Aktif Siparişler</CardTitle>
            </CardHeader>

            <CardContent className="space-y-4">
              {activeOrders.length === 0 ? (
                <div className="rounded-3xl border bg-white p-6 text-sm text-muted-foreground">
                  Aktif siparişiniz bulunmuyor.
                </div>
              ) : (
                activeOrders.map((order) => (
                  <Link
                    key={order.id}
                    href={`/customer/orders/${order.id}`}
                    className="block rounded-3xl border bg-white p-5 transition hover:shadow-md"
                  >
                    <div className="flex min-w-0 flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                      <div className="min-w-0">
                        <p className="truncate font-semibold">
                          {order.orderNumber}
                        </p>
                        <p className="mt-1 text-sm text-muted-foreground">
                          Sipariş süreci devam ediyor
                        </p>
                      </div>

                      <div className="flex shrink-0 flex-wrap items-center gap-3">
                        <Badge
                          className={getOrderStatusClassName(order.status)}
                        >
                          {getOrderStatusLabel(order.status)}
                        </Badge>

                        <p className="font-bold">
                          {formatCurrency(order.totalPrice)}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))
              )}
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Siparişe Açık Ürünler</CardTitle>

              <Button asChild variant="outline" className="rounded-2xl">
                <Link href="/customer/products">Tümünü Gör</Link>
              </Button>
            </CardHeader>

            <CardContent className="grid gap-4 sm:grid-cols-2">
              {assignedProducts.length === 0 ? (
                <div className="rounded-3xl border bg-white p-6 text-sm text-muted-foreground sm:col-span-2">
                  Firmanıza tanımlı aktif ürün bulunmuyor.
                </div>
              ) : (
                assignedProducts.map(({ product, customPrice }) => {
                  const price = customPrice ?? product.price;

                  return (
                    <div
                      key={product.id}
                      className="rounded-3xl border bg-gradient-to-br from-white to-slate-50 p-5 transition hover:-translate-y-1 hover:shadow-lg"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <p className="line-clamp-1 font-semibold">
                            {product.name}
                          </p>

                          <p className="mt-2 text-sm text-muted-foreground">
                            Güncel fiyat
                          </p>
                        </div>

                        <div className="rounded-2xl bg-orange-100 p-3 text-orange-500">
                          <Truck className="h-4 w-4" />
                        </div>
                      </div>

                      <div className="mt-6 flex items-center justify-between gap-3">
                        <p className="text-xl font-bold">
                          {formatCurrency(price)}
                        </p>

                        <Button
                          asChild
                          size="sm"
                          className="rounded-xl bg-orange-500 hover:bg-orange-600"
                        >
                          <Link href="/customer/new-order">Sipariş</Link>
                        </Button>
                      </div>
                    </div>
                  );
                })
              )}
            </CardContent>
          </Card>
        </div>
      </DashboardContainer>
    </>
  );
}

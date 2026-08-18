import Link from "next/link";
import { PackageCheck, Plus, ArrowUpRight } from "lucide-react";

import { auth } from "../../../../auth";
import { prisma } from "@/lib/prisma";

import { DashboardHeader } from "@/components/layout/dashboard-header";
import { DashboardContainer } from "@/components/layout/dashboard-container";
import { EmptyState } from "@/components/shared/empty-state";
import { OrderStatusBadge } from "@/components/shared/order-status-badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RouteToast } from "@/components/shared/route-toast";
import { formatCurrency, formatDate } from "@/lib/format";

export default async function CustomerOrdersPage({
  searchParams,
}: {
  searchParams?: Promise<{
    created?: string;
  }>;
}) {
  const params = searchParams ? await searchParams : {};
  const created = params?.created;

  const session = await auth();
  const companyId = session?.user?.companyId;

  const orders = companyId
    ? await prisma.order.findMany({
        where: {
          companyId,
        },
        select: {
          id: true,
          orderNumber: true,
          status: true,
          totalPrice: true,
          createdAt: true,
          items: {
            select: {
              id: true,
              quantity: true,
              product: {
                select: {
                  name: true,
                },
              },
            },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
      })
    : [];

  return (
    <>
      <DashboardHeader
        title="Siparişlerim"
        description="Sipariş geçmişinizi görüntüleyin."
      />

      <RouteToast />

      <DashboardContainer>
        {created ? (
          <Card className="animate-in fade-in slide-in-from-top-2 border-0 bg-green-50 shadow-sm duration-200">
            <CardContent className="flex flex-col gap-3 p-5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="font-bold text-green-800">
                  Sipariş başarıyla oluşturuldu.
                </p>
                <p className="text-sm text-green-700">Sipariş No: {created}</p>
              </div>

              <Button asChild className="bg-green-600 hover:bg-green-700">
                <Link href="/customer/orders">Tamam</Link>
              </Button>
            </CardContent>
          </Card>
        ) : null}

        <Card className="border-0 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between gap-4">
            <CardTitle>Sipariş Geçmişi</CardTitle>

            <Button
              asChild
              className="rounded-2xl bg-orange-500 hover:bg-orange-600"
            >
              <Link href="/customer/new-order">
                <Plus className="mr-2 h-4 w-4" />
                Yeni Sipariş
              </Link>
            </Button>
          </CardHeader>

          <CardContent className="space-y-4">
            {orders.length === 0 ? (
              <EmptyState
                icon={PackageCheck}
                title="Henüz sipariş yok"
                description="İlk siparişinizi oluşturarak süreci başlatabilirsiniz."
                action={
                  <Button
                    asChild
                    className="rounded-2xl bg-orange-500 hover:bg-orange-600"
                  >
                    <Link href="/customer/new-order">
                      <Plus className="mr-2 h-4 w-4" />
                      Yeni Sipariş Oluştur
                    </Link>
                  </Button>
                }
              />
            ) : (
              orders.map((order) => (
                <div key={order.id} className="rounded-3xl border bg-white p-5">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="font-bold">{order.orderNumber}</p>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {formatDate(order.createdAt)}
                      </p>
                    </div>

                    <div className="flex items-center gap-3">
                      <OrderStatusBadge status={order.status} />

                      <p className="font-bold">
                        {formatCurrency(order.totalPrice)}
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 space-y-2">
                    {order.items.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-3 text-sm"
                      >
                        <span>{item.product.name}</span>
                        <span className="font-semibold">
                          {item.quantity} adet
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-5 flex justify-end">
                    <Button asChild variant="outline" className="rounded-2xl">
                      <Link href={`/customer/orders/${order.id}`}>
                        Detayı Gör
                        <ArrowUpRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
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

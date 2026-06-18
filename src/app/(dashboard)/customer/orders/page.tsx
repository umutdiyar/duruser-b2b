import Link from "next/link";
import { PackageCheck, Plus } from "lucide-react";

import { auth } from "../../../../auth";
import { prisma } from "@/lib/prisma";

import { DashboardHeader } from "@/components/layout/dashboard-header";
import { DashboardContainer } from "@/components/layout/dashboard-container";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

function getStatusLabel(status: string) {
  const labels: Record<string, string> = {
    PENDING: "Yeni Sipariş",
    CONFIRMED: "Onaylandı",
    PREPARING: "Hazırlanıyor",
    SHIPPED: "Sevkiyatta",
    DELIVERED: "Teslim Edildi",
    CANCELLED: "İptal",
  };

  return labels[status] ?? status;
}

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
        include: {
          items: {
            include: {
              product: true,
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

      <DashboardContainer>
        {created ? (
          <Card className="border-0 bg-green-50 shadow-sm">
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
              <div className="rounded-3xl border bg-white p-8 text-center">
                <PackageCheck className="mx-auto h-10 w-10 text-orange-500" />
                <h3 className="mt-4 text-xl font-bold">Henüz sipariş yok</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  İlk siparişinizi oluşturarak süreci başlatabilirsiniz.
                </p>
              </div>
            ) : (
              orders.map((order) => (
                <div key={order.id} className="rounded-3xl border bg-white p-5">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="font-bold">{order.orderNumber}</p>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {order.createdAt.toLocaleDateString("tr-TR")}
                      </p>
                    </div>

                    <div className="flex items-center gap-3">
                      <Badge className="bg-orange-100 text-orange-700 hover:bg-orange-100">
                        {getStatusLabel(order.status)}
                      </Badge>

                      <p className="font-bold">
                        ₺{order.totalPrice.toLocaleString("tr-TR")}
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
                </div>
              ))
            )}
          </CardContent>
        </Card>
      </DashboardContainer>
    </>
  );
}

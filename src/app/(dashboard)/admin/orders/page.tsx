import { PackageCheck, ShoppingCart } from "lucide-react";

import { prisma } from "@/lib/prisma";

import { DashboardHeader } from "@/components/layout/dashboard-header";
import { DashboardContainer } from "@/components/layout/dashboard-container";
import { Badge } from "@/components/ui/badge";
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

export default async function AdminOrdersPage() {
  const orders = await prisma.order.findMany({
    include: {
      company: true,
      items: {
        include: {
          product: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <>
      <DashboardHeader
        title="Siparişler"
        description="Müşterilerden gelen siparişleri takip edin."
      />

      <DashboardContainer>
        <div className="grid gap-4 md:grid-cols-3">
          <Card className="border-0 shadow-sm">
            <CardContent className="p-6">
              <ShoppingCart className="h-6 w-6 text-orange-500" />
              <p className="mt-4 text-sm text-muted-foreground">
                Toplam Sipariş
              </p>
              <p className="mt-2 text-4xl font-bold">{orders.length}</p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardContent className="p-6">
              <PackageCheck className="h-6 w-6 text-orange-500" />
              <p className="mt-4 text-sm text-muted-foreground">Yeni Sipariş</p>
              <p className="mt-2 text-4xl font-bold">
                {orders.filter((order) => order.status === "PENDING").length}
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardContent className="p-6">
              <PackageCheck className="h-6 w-6 text-green-500" />
              <p className="mt-4 text-sm text-muted-foreground">
                Teslim Edilen
              </p>
              <p className="mt-2 text-4xl font-bold">
                {orders.filter((order) => order.status === "DELIVERED").length}
              </p>
            </CardContent>
          </Card>
        </div>

        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle>Gelen Siparişler</CardTitle>
          </CardHeader>

          <CardContent className="space-y-4">
            {orders.length === 0 ? (
              <div className="rounded-3xl border bg-white p-8 text-center text-sm text-muted-foreground">
                Henüz sipariş bulunmuyor.
              </div>
            ) : (
              orders.map((order) => (
                <div key={order.id} className="rounded-3xl border bg-white p-5">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="font-bold">{order.orderNumber}</p>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {order.company.name} ·{" "}
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

                  <div className="mt-4 grid gap-2 md:grid-cols-2">
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

                  {order.notes ? (
                    <div className="mt-4 rounded-2xl bg-orange-50 p-4 text-sm text-orange-800">
                      Not: {order.notes}
                    </div>
                  ) : null}
                </div>
              ))
            )}
          </CardContent>
        </Card>
      </DashboardContainer>
    </>
  );
}

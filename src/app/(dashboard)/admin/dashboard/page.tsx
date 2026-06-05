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
import { DashboardContainer } from "@/components/layout/dashoard-container";

const stats = [
  {
    title: "Toplam Sipariş",
    value: "124",
    growth: "+12%",
    icon: ShoppingCart,
  },

  {
    title: "Hazırlanan",
    value: "18",
    growth: "+4%",
    icon: Clock3,
  },

  {
    title: "Sevkiyatta",
    value: "9",
    growth: "+2%",
    icon: Truck,
  },

  {
    title: "Teslim Edilen",
    value: "97",
    growth: "+18%",
    icon: PackageCheck,
  },
];

const recentOrders = [
  {
    company: "ABC Market",
    orderNo: "DRS-1001",
    amount: "₺4.250",
    status: "Hazırlanıyor",
  },

  {
    company: "Mavi Plaza",
    orderNo: "DRS-1002",
    amount: "₺2.190",
    status: "Yeni Sipariş",
  },

  {
    company: "Yıldız Cafe",
    orderNo: "DRS-1003",
    amount: "₺6.820",
    status: "Teslim Edildi",
  },
];

export default function AdminDashboardPage() {
  return (
    <>
      <DashboardHeader
        title="Yönetim Paneli"
        description="Sipariş operasyonunu canlı olarak yönetin."
      />

      <DashboardContainer>
        {/* HERO */}

        <Card className="overflow-hidden border-0 bg-gradient-to-r from-orange-500 to-orange-600 via-orange-500 text-white shadow-2xl">
          <CardContent className="flex flex-col gap-8 p-6 lg:p-8 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <Badge className="border-0 bg-white/20 text-white hover:bg-white/20">
                DuruSer B2B
              </Badge>

              <h2 className="mt-4 text-4xl lg:text-5xl leading-tight font-bold tracking-tight">
                Operasyon Merkezi
              </h2>

              <p className="mt-3 max-w-xl text-orange-100">
                Siparişleri yönetin, sevkiyatları takip edin ve müşteri
                operasyonlarını tek panelden kontrol edin.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Button
                variant="secondary"
                className="border-0 bg-white text-primary hover:bg-white/90"
              >
                Siparişler
              </Button>

              <Button
                variant="outline"
                className="border-white/30 bg-white/10 text-white hover:bg-white/20"
              >
                Raporlar
              </Button>
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
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">
                        {stat.title}
                      </p>

                      <p className="mt-3 text-4xl font-bold tracking-tight">
                        {stat.value}
                      </p>
                    </div>

                    <div className="rounded-2xl bg-primary/10 p-3 text-primary">
                      <Icon className="h-5 w-5" />
                    </div>
                  </div>

                  <div className="mt-5 flex items-center gap-2">
                    <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
                      {stat.growth}
                    </Badge>

                    <p className="text-xs text-muted-foreground">
                      geçen haftaya göre
                    </p>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* CHART + ACTIVITY */}

        <div className="grid gap-4 xl:grid-cols-3 lg:gap-6">
          <Card className="border-0 shadow-sm xl:col-span-2">
            <CardHeader>
              <CardTitle>Haftalık Sipariş Analizi</CardTitle>
            </CardHeader>

            <CardContent>
              <OrdersChart />
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle>Son Aktiviteler</CardTitle>
            </CardHeader>

            <CardContent className="space-y-5">
              {[
                "ABC Market yeni sipariş oluşturdu.",
                "Yıldız Cafe siparişi teslim edildi.",
                "Mavi Plaza sevkiyata çıktı.",
                "Yeni müşteri hesabı oluşturuldu.",
              ].map((activity) => (
                <div key={activity} className="flex gap-3">
                  <div className="mt-2 h-2 w-2 rounded-full bg-primary" />

                  <p className="text-sm text-muted-foreground">{activity}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* RECENT ORDERS */}

        <Card className="border-0 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Son Siparişler</CardTitle>

            <Button variant="outline">
              Tümünü Gör
              <ArrowUpRight className="ml-2 h-4 w-4" />
            </Button>
          </CardHeader>

          <CardContent className="space-y-4">
            {recentOrders.map((order) => (
              <div
                key={order.orderNo}
                className="flex items-center justify-between rounded-2xl border bg-white p-5 transition hover:shadow-md"
              >
                <div>
                  <p className="text-sm font-semibold">{order.company}</p>

                  <p className="mt-1 text-xs text-muted-foreground">
                    {order.orderNo}
                  </p>
                </div>

                <div className="flex items-center gap-4">
                  <Badge
                    className={
                      order.status === "Hazırlanıyor"
                        ? "bg-orange-100 text-orange-700"
                        : order.status === "Yeni Sipariş"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-green-100 text-green-700"
                    }
                  >
                    {order.status}
                  </Badge>

                  <p className="text-sm font-bold">{order.amount}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </DashboardContainer>
    </>
  );
}

import { DashboardHeader } from "@/components/layout/dashboard-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, PackageCheck, Clock, Truck } from "lucide-react";

export default function AdminDashboardPage() {
  return (
    <div>
      <DashboardHeader
        title="Yönetim Paneli"
        description="DuruSer sipariş operasyonunu buradan takip edebilirsiniz."
      />

      <div className="mx-auto max-w-7xl space-y-8 p-6 lg:p-8">
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          <Card className="border-0 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Bugünkü Sipariş
              </CardTitle>
              <ShoppingCart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold tracking-tight">24</p>
              <p className="mt-2 text-xs text-muted-foreground">
                Düne göre +12%
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Hazırlanan</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold tracking-tight">8</p>
              <p className="mt-2 text-xs text-muted-foreground">
                Operasyon devam ediyor
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Sevkiyatta</CardTitle>
              <Truck className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold tracking-tight">6</p>
              <p className="mt-2 text-xs text-muted-foreground">
                Teslimat bekleniyor
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Tamamlanan</CardTitle>
              <PackageCheck className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold tracking-tight">10</p>
              <p className="mt-2 text-xs text-muted-foreground">
                Bugün teslim edildi
              </p>
            </CardContent>
          </Card>
        </div>

        <Card className="border-0 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
          <CardHeader>
            <CardTitle>Son Siparişler</CardTitle>
          </CardHeader>

          <CardContent>
            <div className="space-y-4">
              {[
                {
                  company: "ABC Market",
                  orderNo: "DRS-1001",
                  status: "Hazırlanıyor",
                  amount: "₺4.250",
                },
                {
                  company: "Yıldız Kafe",
                  orderNo: "DRS-1002",
                  status: "Yeni Sipariş",
                  amount: "₺2.780",
                },
                {
                  company: "Mavi Ofis",
                  orderNo: "DRS-1003",
                  status: "Sevkiyatta",
                  amount: "₺6.120",
                },
              ].map((order) => (
                <div
                  key={order.orderNo}
                  className="flex items-center justify-between rounded-2xl border bg-white p-5 transition hover:shadow-md"
                >
                  <div>
                    <p className="font-semibold text-sm">{order.company}</p>
                    <p className="text-sm text-muted-foreground mt-1">
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
                    <p className="font-bold text-sm">{order.amount}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

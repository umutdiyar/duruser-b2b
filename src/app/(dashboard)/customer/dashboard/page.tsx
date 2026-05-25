import Link from "next/link";
import { DashboardHeader } from "@/components/layout/dashboard-header";
import { DashboardShell } from "@/components/layout/dashboard-shell";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function CustomerDashboardPage() {
  return (
    <DashboardShell role="customer">
      <DashboardHeader
        title="Müşteri Paneli"
        description="Siparişlerinizi buradan oluşturabilir ve takip edebilirsiniz."
      />

      <div className="mx-auto max-w-7xl space-y-8 p-8">
        <Card className="overflow-hidden border-0 bg-gradient-to-r from-primary to-orange-500 text-white shadow-xl">
          {" "}
          <CardHeader>
            <CardTitle className="text-2xl font-bold tracking-tight">
              Yeni sipariş oluştur
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-6 p-8 lg:flex-row lg:items-center lg:justify-between">
            {" "}
            <p className="mt-2 max-w-2xl text-sm text-orange-100">
              Firmanıza tanımlı ürünlerden hızlıca sipariş oluşturabilirsiniz.
            </p>
            <Button
              asChild
              size="lg"
              variant="secondary"
              className="border-0 bg-white text-primary hover:bg-white/90"
            >
              <Link href="/customer/new-order">Sipariş Ver</Link>
            </Button>
          </CardContent>
        </Card>

        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Aktif Sipariş</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">2</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Bu Ayki Sipariş</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">14</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Son Sipariş Tutarı</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">₺3.450</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardShell>
  );
}

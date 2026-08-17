import { Mail, Shield, User as UserIcon } from "lucide-react";

import { auth } from "@/auth";
import { DashboardContainer } from "@/components/layout/dashboard-container";
import { DashboardHeader } from "@/components/layout/dashboard-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default async function AdminSettingsPage() {
  const session = await auth();

  const fields = [
    {
      icon: UserIcon,
      label: "Ad Soyad",
      value: session?.user?.name ?? "—",
    },
    {
      icon: Mail,
      label: "Email",
      value: session?.user?.email ?? "—",
    },
    {
      icon: Shield,
      label: "Rol",
      value: "DuruSer Yönetimi (ADMIN)",
    },
  ];

  return (
    <>
      <DashboardHeader
        title="Ayarlar"
        description="Hesap bilgilerinizi görüntüleyin."
      />

      <DashboardContainer>
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle>Hesap Bilgilerim</CardTitle>
          </CardHeader>

          <CardContent className="space-y-3">
            {fields.map((field) => {
              const Icon = field.icon;

              return (
                <div
                  key={field.label}
                  className="flex items-center gap-4 rounded-2xl border bg-white p-4"
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-orange-100 text-orange-600">
                    <Icon className="h-5 w-5" />
                  </div>

                  <div className="min-w-0">
                    <p className="text-xs text-muted-foreground">
                      {field.label}
                    </p>
                    <p className="truncate font-semibold text-slate-900">
                      {field.value}
                    </p>
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle>Sistem Ayarları</CardTitle>
          </CardHeader>

          <CardContent>
            <p className="rounded-2xl border border-dashed bg-slate-50 p-5 text-sm leading-6 text-muted-foreground">
              Bildirim tercihleri, marka ayarları ve ekip yönetimi gibi
              sistem ayarları önümüzdeki sürümlerde bu ekrana eklenecek.
            </p>
          </CardContent>
        </Card>
      </DashboardContainer>
    </>
  );
}

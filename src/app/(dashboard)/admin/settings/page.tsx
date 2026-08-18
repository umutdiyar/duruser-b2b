import { auth } from "@/auth";
import { DashboardContainer } from "@/components/layout/dashboard-container";
import { DashboardHeader } from "@/components/layout/dashboard-header";
import { SettingsRow } from "@/components/shared/settings-row";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { branding } from "@/config/branding";

export default async function AdminSettingsPage() {
  const session = await auth();

  return (
    <>
      <DashboardHeader
        title="Ayarlar"
        description="Hesap ve platform bilgilerinizi görüntüleyin."
      />

      <DashboardContainer className="max-w-3xl">
        <Card className="border-0 shadow-none">
          <CardHeader>
            <CardTitle role="heading" aria-level={2}>
              Hesap
            </CardTitle>
          </CardHeader>

          <CardContent>
            <SettingsRow label="Ad Soyad" value={session?.user?.name ?? "—"} />
            <SettingsRow label="Email" value={session?.user?.email ?? "—"} />
            <SettingsRow
              label="Rol"
              value={`${branding.companyName} Yönetimi (ADMIN)`}
            />
          </CardContent>
        </Card>

        <Card className="border-0 shadow-none">
          <CardHeader>
            <CardTitle role="heading" aria-level={2}>
              Platform
            </CardTitle>
          </CardHeader>

          <CardContent>
            <SettingsRow label="Platform Adı" value={branding.productName} />
            <SettingsRow label="Şirket" value={branding.companyFullName} />
            <SettingsRow label="Açıklama" value={branding.description} />
            <SettingsRow label="Website" value={branding.website} />
          </CardContent>
        </Card>

        <Card className="border-0 shadow-none">
          <CardHeader>
            <CardTitle role="heading" aria-level={2}>
              Marka / Görünüm
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-4">
            <SettingsRow label="Marka Adı" value={branding.companyName} />

            <div className="flex items-center justify-between border-b border-slate-100 py-3 last:border-b-0">
              <p className="text-sm text-muted-foreground">Renkler</p>
              <div className="flex items-center gap-2">
                <span
                  className="h-6 w-6 rounded-full border border-slate-200 bg-primary"
                  title="Primary"
                />
                <span
                  className="h-6 w-6 rounded-full border border-slate-200 bg-destructive"
                  title="Destructive"
                />
              </div>
            </div>

            <p className="text-xs leading-5 text-muted-foreground">
              Marka özelleştirme seçenekleri daha sonra yönetilebilir hale
              getirilebilir.
            </p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-none">
          <CardHeader>
            <CardTitle role="heading" aria-level={2}>
              Bildirimler
            </CardTitle>
          </CardHeader>

          <CardContent>
            <p className="text-sm leading-6 text-muted-foreground">
              Bildirim tercihleri, bildirim altyapısı etkinleştirildiğinde bu
              bölümden yönetilebilecek.
            </p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-none">
          <CardHeader>
            <CardTitle role="heading" aria-level={2}>
              Güvenlik
            </CardTitle>
          </CardHeader>

          <CardContent>
            <SettingsRow
              label="Rol Bazlı Erişim"
              value="Aktif"
              valueClassName="text-success"
            />
            <SettingsRow
              label="Sunucu Taraflı Yetkilendirme"
              value="Aktif"
              valueClassName="text-success"
            />
          </CardContent>
        </Card>
      </DashboardContainer>
    </>
  );
}

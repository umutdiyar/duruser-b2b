import { auth } from "@/auth";
import { DashboardContainer } from "@/components/layout/dashboard-container";
import { DashboardHeader } from "@/components/layout/dashboard-header";
import { SettingsRow } from "@/components/shared/settings-row";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { prisma } from "@/lib/prisma";

export default async function CustomerAccountPage() {
  const session = await auth();

  const company = session?.user?.companyId
    ? await prisma.company.findUnique({
        where: { id: session.user.companyId },
        select: { name: true },
      })
    : null;

  return (
    <>
      <DashboardHeader
        title="Hesabım"
        description="Hesap bilgilerinizi görüntüleyin."
      />

      <DashboardContainer className="max-w-3xl">
        <Card className="border-0 shadow-none">
          <CardHeader>
            <CardTitle role="heading" aria-level={2}>
              Hesap
            </CardTitle>
          </CardHeader>

          <CardContent>
            <SettingsRow label="Firma" value={company?.name ?? "—"} />
            <SettingsRow label="Ad Soyad" value={session?.user?.name ?? "—"} />
            <SettingsRow label="Email" value={session?.user?.email ?? "—"} />
            <SettingsRow label="Rol" value="Firma Kullanıcısı (CUSTOMER)" />
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
              Sipariş durum bildirimleri için tercihler, bildirim altyapısı
              etkinleştirildiğinde bu bölümden yönetilebilecek.
            </p>
          </CardContent>
        </Card>
      </DashboardContainer>
    </>
  );
}

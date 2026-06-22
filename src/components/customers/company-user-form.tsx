import type { User } from "@/generated/prisma/client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type CompanyUserFormProps = {
  companyId: string;
  user?: User;
  action: (formData: FormData) => void | Promise<void>;
  submitLabel: string;
};

export function CompanyUserForm({
  companyId,
  user,
  action,
  submitLabel,
}: CompanyUserFormProps) {
  return (
    <Card className="border-0 shadow-sm">
      <CardHeader>
        <CardTitle>Kullanıcı Bilgileri</CardTitle>
      </CardHeader>

      <CardContent>
        <form action={action} className="space-y-5">
          <input type="hidden" name="companyId" value={companyId} />

          {user ? <input type="hidden" name="userId" value={user.id} /> : null}

          <div className="grid gap-5 lg:grid-cols-2">
            <div className="space-y-2">
              <Label>Ad Soyad</Label>
              <Input
                name="name"
                defaultValue={user?.name ?? ""}
                placeholder="Örn: Ahmet Yılmaz"
                required
                className="h-12 rounded-2xl"
              />
            </div>

            <div className="space-y-2">
              <Label>Email</Label>
              <Input
                name="email"
                type="email"
                defaultValue={user?.email ?? ""}
                placeholder="ornek@firma.com"
                required
                className="h-12 rounded-2xl"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>{user ? "Yeni Şifre" : "Şifre"}</Label>

            <Input
              name="password"
              type="password"
              placeholder={
                user ? "Boş bırakırsan şifre değişmez" : "En az 6 karakter"
              }
              required={!user}
              className="h-12 rounded-2xl"
            />

            {user ? (
              <p className="text-xs text-muted-foreground">
                Şifreyi değiştirmek istemiyorsan bu alanı boş bırak.
              </p>
            ) : null}
          </div>

          <div className="rounded-2xl bg-orange-50 p-4 text-sm leading-6 text-orange-800">
            Bu kullanıcı müşteri paneline giriş yapabilir ve sadece bağlı olduğu
            firmaya tanımlı ürünleri görebilir.
          </div>

          <Button className="h-12 rounded-2xl bg-orange-500 px-6 font-semibold hover:bg-orange-600">
            {submitLabel}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

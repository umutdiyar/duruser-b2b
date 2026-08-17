import type { Company } from "@/generated/prisma/client";

import { SubmitButton } from "@/components/shared/submit-button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type CompanyFormProps = {
  company?: Company;
  action: (formData: FormData) => void | Promise<void>;
  submitLabel: string;
};

export function CompanyForm({
  company,
  action,
  submitLabel,
}: CompanyFormProps) {
  return (
    <Card className="border-0 shadow-sm">
      <CardHeader>
        <CardTitle>Firma Bilgileri</CardTitle>
      </CardHeader>

      <CardContent>
        <form action={action} className="space-y-5">
          {company ? (
            <input type="hidden" name="companyId" value={company.id} />
          ) : null}

          <div className="grid gap-5 lg:grid-cols-2">
            <div className="space-y-2">
              <Label>Firma Adı</Label>
              <Input
                name="name"
                defaultValue={company?.name}
                placeholder="Örn: Beltur"
                required
                className="h-12 rounded-2xl"
              />
            </div>

            <div className="space-y-2">
              <Label>Firma Kodu / Slug</Label>
              <Input
                name="slug"
                defaultValue={company?.slug}
                placeholder="ornek-firma"
                className="h-12 rounded-2xl"
              />
              <p className="text-xs text-muted-foreground">
                Boş bırakırsan firma adından otomatik oluşturulur.
              </p>
            </div>
          </div>

          <div className="rounded-2xl bg-orange-50 p-4 text-sm leading-6 text-orange-800">
            Firma oluşturulduktan sonra bu firmaya ürün yetkilendirmesi ve
            kullanıcı tanımlaması yapılabilir.
          </div>

          <SubmitButton
            pendingText="Kaydediliyor..."
            className="h-12 rounded-2xl bg-orange-500 px-6 font-semibold hover:bg-orange-600"
          >
            {submitLabel}
          </SubmitButton>
        </form>
      </CardContent>
    </Card>
  );
}

import type { Product } from "@/generated/prisma/client";

import { SubmitButton } from "@/components/shared/submit-button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

type ProductFormProps = {
  product?: Product;
  action: (formData: FormData) => void | Promise<void>;
  submitLabel: string;
};

export function ProductForm({
  product,
  action,
  submitLabel,
}: ProductFormProps) {
  return (
    <Card className="border-0 shadow-sm">
      <CardHeader>
        <CardTitle>Ürün Bilgileri</CardTitle>
      </CardHeader>

      <CardContent>
        <form action={action} className="space-y-5">
          {product ? (
            <input type="hidden" name="productId" value={product.id} />
          ) : null}

          <div className="grid gap-5 lg:grid-cols-2">
            <div className="space-y-2">
              <Label>Ürün Adı</Label>
              <Input
                name="name"
                defaultValue={product?.name}
                placeholder="Örn: Dana Sucuk"
                required
                className="h-12 rounded-2xl"
              />
            </div>

            <div className="space-y-2">
              <Label>Fiyat</Label>
              <Input
                name="price"
                type="number"
                min={0}
                step="0.01"
                defaultValue={product?.price}
                placeholder="Örn: 680"
                required
                className="h-12 rounded-2xl"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Görsel URL</Label>
            <Input
              name="imageUrl"
              defaultValue={product?.imageUrl ?? ""}
              placeholder="https://..."
              className="h-12 rounded-2xl"
            />
          </div>

          <div className="space-y-2">
            <Label>Açıklama</Label>
            <Textarea
              name="description"
              defaultValue={product?.description ?? ""}
              placeholder="Ürün açıklaması..."
              className="min-h-32 rounded-2xl"
            />
          </div>

          <label className="flex cursor-pointer items-center gap-3 rounded-2xl border bg-white p-4">
            <input
              type="checkbox"
              name="isActive"
              defaultChecked={product?.isActive ?? true}
              className="h-4 w-4 accent-orange-500"
            />

            <div>
              <p className="text-sm font-semibold">Ürün aktif</p>
              <p className="text-xs text-muted-foreground">
                Aktif ürünler müşteri tarafında siparişe açılabilir.
              </p>
            </div>
          </label>

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

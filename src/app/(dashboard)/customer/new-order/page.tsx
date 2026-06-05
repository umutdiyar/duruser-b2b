import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Package, Send } from "lucide-react";

import { auth } from "../../../../auth";
import { prisma } from "@/lib/prisma";
import { createOrderAction } from "@/actions/order-actions";

import { DashboardHeader } from "@/components/layout/dashboard-header";
import { DashboardContainer } from "@/components/layout/dashoard-container";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default async function NewOrderPage() {
  const session = await auth();

  const companyId = session?.user?.companyId;

  const products = companyId
    ? await prisma.companyProduct.findMany({
        where: {
          companyId,
          product: {
            isActive: true,
          },
        },
        include: {
          product: true,
        },
        orderBy: {
          product: {
            name: "asc",
          },
        },
      })
    : [];

  return (
    <>
      <DashboardHeader
        title="Yeni Sipariş"
        description="Firmanıza tanımlı ürünlerden sipariş oluşturun."
      />

      <DashboardContainer>
        <Button asChild variant="outline" className="rounded-2xl">
          <Link href="/customer/products">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Ürünlerime Dön
          </Link>
        </Button>

        <form action={createOrderAction}>
          <div className="grid gap-6 xl:grid-cols-3">
            <Card className="border-0 shadow-sm xl:col-span-2">
              <CardHeader>
                <CardTitle>Sipariş Ürünleri</CardTitle>
              </CardHeader>

              <CardContent className="space-y-4">
                {products.length === 0 ? (
                  <div className="rounded-2xl border bg-white p-6 text-sm text-muted-foreground">
                    Sipariş oluşturabileceğiniz ürün bulunmuyor.
                  </div>
                ) : (
                  products.map(({ product, customPrice }) => {
                    const price = customPrice ?? product.price;

                    return (
                      <div
                        key={product.id}
                        className="grid gap-4 rounded-3xl border bg-white p-4 sm:grid-cols-[80px_1fr_auto] sm:items-center"
                      >
                        <input
                          type="hidden"
                          name="productId"
                          value={product.id}
                        />

                        <div className="relative h-20 w-20 overflow-hidden rounded-2xl bg-slate-100">
                          {product.imageUrl ? (
                            <Image
                              src={product.imageUrl}
                              alt={product.name}
                              fill
                              className="object-cover"
                            />
                          ) : (
                            <div className="flex h-full items-center justify-center">
                              <Package className="h-8 w-8 text-slate-300" />
                            </div>
                          )}
                        </div>

                        <div className="min-w-0">
                          <div className="flex flex-wrap items-center gap-2">
                            <h3 className="font-bold">{product.name}</h3>
                            <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
                              Aktif
                            </Badge>
                          </div>

                          <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
                            {product.description || "Ürün açıklaması yok."}
                          </p>

                          <p className="mt-2 text-sm font-semibold">
                            ₺{price.toLocaleString("tr-TR")}
                          </p>
                        </div>

                        <div className="sm:w-32">
                          <p className="mb-2 text-xs text-muted-foreground">
                            Adet
                          </p>
                          <Input
                            name={`quantity-${product.id}`}
                            type="number"
                            min={0}
                            defaultValue={0}
                            className="h-11 rounded-2xl"
                          />
                        </div>
                      </div>
                    );
                  })
                )}
              </CardContent>
            </Card>

            <Card className="h-fit border-0 shadow-sm">
              <CardHeader>
                <CardTitle>Sipariş Notu</CardTitle>
              </CardHeader>

              <CardContent className="space-y-4">
                <Textarea
                  name="notes"
                  placeholder="Varsa sipariş notunuzu yazın..."
                  className="min-h-32 rounded-2xl"
                />

                <div className="rounded-2xl bg-orange-50 p-4 text-sm text-orange-800">
                  Adedi 0 olan ürünler siparişe eklenmez.
                </div>

                <Button
                  disabled={products.length === 0}
                  className="h-12 w-full rounded-2xl bg-orange-500 font-semibold hover:bg-orange-600"
                >
                  <Send className="mr-2 h-4 w-4" />
                  Siparişi Gönder
                </Button>
              </CardContent>
            </Card>
          </div>
        </form>
      </DashboardContainer>
    </>
  );
}

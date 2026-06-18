import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Package, ShoppingCart } from "lucide-react";

import { auth } from "../../../../auth";
import { prisma } from "@/lib/prisma";

import { DashboardHeader } from "@/components/layout/dashboard-header";
import { DashboardContainer } from "@/components/layout/dashboard-container";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default async function CustomerProductsPage() {
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
        title="Ürünlerim"
        description="Firmanıza tanımlı ürünleri görüntüleyin."
      />

      <DashboardContainer>
        <Card className="overflow-hidden border-0 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white shadow-xl">
          <CardContent className="flex flex-col gap-6 p-6 lg:flex-row lg:items-center lg:justify-between lg:p-8">
            <div>
              <Badge className="border-0 bg-white/10 text-white hover:bg-white/10">
                Firma Ürünleri
              </Badge>

              <h2 className="mt-4 text-4xl font-bold leading-tight lg:text-5xl">
                Size özel ürün kataloğu
              </h2>

              <p className="mt-4 max-w-xl text-slate-300">
                Bu ekranda sadece firmanıza tanımlanmış ürünler görünür.
              </p>
            </div>

            <Button
              asChild
              className="h-12 rounded-2xl bg-orange-500 px-6 hover:bg-orange-600"
            >
              <Link href="/customer/new-order">
                Sipariş Oluştur
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>

        {products.length === 0 ? (
          <Card className="border-0 shadow-sm">
            <CardContent className="flex flex-col items-center justify-center p-10 text-center">
              <Package className="h-12 w-12 text-orange-500" />
              <h3 className="mt-4 text-xl font-bold">
                Tanımlı ürün bulunmuyor
              </h3>
              <p className="mt-2 max-w-md text-sm text-muted-foreground">
                Bu firmaya henüz ürün yetkisi verilmemiş. Admin panelinden ürün
                yetkilendirmesi yapılmalı.
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
            {products.map(({ product, customPrice }) => {
              const price = customPrice ?? product.price;

              return (
                <Card
                  key={product.id}
                  className="overflow-hidden border-0 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
                >
                  <div className="relative h-48 bg-slate-100">
                    {product.imageUrl ? (
                      <Image
                        src={product.imageUrl}
                        alt={product.name}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center">
                        <Package className="h-12 w-12 text-slate-300" />
                      </div>
                    )}

                    <Badge className="absolute right-3 top-3 bg-green-500 text-white hover:bg-green-500">
                      Aktif
                    </Badge>
                  </div>

                  <CardContent className="p-5">
                    <h3 className="text-lg font-bold">{product.name}</h3>

                    <p className="mt-2 line-clamp-2 min-h-[40px] text-sm text-muted-foreground">
                      {product.description ||
                        "Ürün açıklaması yakında eklenecek."}
                    </p>

                    <div className="mt-6 flex items-center justify-between">
                      <div>
                        <p className="text-xs text-muted-foreground">
                          Birim Fiyat
                        </p>
                        <p className="text-2xl font-bold">
                          ₺{price.toLocaleString("tr-TR")}
                        </p>
                      </div>

                      <Button
                        asChild
                        size="sm"
                        className="rounded-xl bg-orange-500 hover:bg-orange-600"
                      >
                        <Link href="/customer/new-order">
                          <ShoppingCart className="mr-2 h-4 w-4" />
                          Sipariş
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </DashboardContainer>
    </>
  );
}

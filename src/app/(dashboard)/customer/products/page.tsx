import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Package, ShoppingCart } from "lucide-react";

import { auth } from "../../../../auth";
import { prisma } from "@/lib/prisma";

import { DashboardHeader } from "@/components/layout/dashboard-header";
import { DashboardContainer } from "@/components/layout/dashboard-container";
import { EmptyState } from "@/components/shared/empty-state";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { formatCurrency } from "@/lib/format";

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
        select: {
          customPrice: true,
          product: {
            select: {
              id: true,
              name: true,
              description: true,
              imageUrl: true,
              price: true,
            },
          },
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
          <EmptyState
            icon={Package}
            title="Tanımlı ürün bulunmuyor"
            description="Bu firmaya henüz ürün yetkisi verilmemiş. Admin panelinden ürün yetkilendirmesi yapılmalı."
          />
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
            {products.map(({ product, customPrice }, index) => {
              const price = customPrice ?? product.price;

              return (
                <Card
                  key={product.id}
                  className="group overflow-hidden border-0 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                >
                  <div className="relative h-48 bg-slate-100">
                    {product.imageUrl ? (
                      <Image
                        src={product.imageUrl}
                        alt={product.name}
                        fill
                        priority={index === 0}
                        sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 25vw"
                        className="object-cover transition duration-300 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center">
                        <Package className="h-12 w-12 text-slate-300" />
                      </div>
                    )}

                    <Badge className="absolute right-3 top-3 border-0 bg-green-500 text-white hover:bg-green-500">
                      Aktif
                    </Badge>
                  </div>

                  <CardContent className="p-5">
                    <h3 className="line-clamp-1 text-lg font-bold">
                      {product.name}
                    </h3>

                    <p className="mt-2 line-clamp-2 min-h-[40px] text-sm text-muted-foreground">
                      {product.description ||
                        "Ürün açıklaması yakında eklenecek."}
                    </p>

                    <div className="mt-6 flex items-center justify-between gap-3">
                      <div className="min-w-0">
                        <p className="text-xs text-muted-foreground">
                          Birim Fiyat
                        </p>
                        <p className="truncate text-2xl font-bold">
                          {formatCurrency(price)}
                        </p>
                      </div>

                      <Button
                        asChild
                        size="sm"
                        className="shrink-0 rounded-xl bg-orange-500 hover:bg-orange-600"
                      >
                        <Link href="/customer/new-order">
                          <ShoppingCart className="mr-2 h-4 w-4" />
                          Sipariş Ver
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

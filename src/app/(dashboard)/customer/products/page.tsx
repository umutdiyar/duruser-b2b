import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Package, ShoppingCart } from "lucide-react";

import { auth } from "../../../../auth";
import { prisma } from "@/lib/prisma";

import { DashboardHeader } from "@/components/layout/dashboard-header";
import { DashboardContainer } from "@/components/layout/dashboard-container";
import { ActiveBadge } from "@/components/shared/active-badge";
import { EmptyState } from "@/components/shared/empty-state";
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
        <Card className="border-0 bg-slate-900 text-white shadow-sm">
          <CardContent className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="min-w-0">
              <p className="font-semibold">Size özel ürün kataloğu</p>
              <p className="mt-1 text-sm text-slate-300">
                Bu ekranda sadece firmanıza tanımlanmış ürünler görünür.
              </p>
            </div>

            <Button
              asChild
              className="h-11 shrink-0 rounded-2xl bg-orange-500 px-5 hover:bg-orange-600"
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
                  className="group overflow-hidden border-0 shadow-sm transition-shadow duration-200 hover:shadow-lg"
                >
                  <div className="relative h-48 bg-slate-100">
                    {product.imageUrl ? (
                      <Image
                        src={product.imageUrl}
                        alt={product.name}
                        fill
                        priority={index === 0}
                        sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 25vw"
                        className="object-cover transition duration-200 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center">
                        <Package className="h-12 w-12 text-slate-300" />
                      </div>
                    )}

                    <ActiveBadge
                      active
                      className="absolute right-3 top-3 shadow-sm"
                    />
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

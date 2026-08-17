import Image from "next/image";
import Link from "next/link";

import { Package, Pencil, Plus, Search } from "lucide-react";

import { toggleProductStatusAction } from "@/actions/product-actions";
import { DashboardContainer } from "@/components/layout/dashboard-container";
import { DashboardHeader } from "@/components/layout/dashboard-header";
import { RouteToast } from "@/components/shared/route-toast";
import { ActiveBadge } from "@/components/shared/active-badge";
import { EmptyState } from "@/components/shared/empty-state";
import { SubmitButton } from "@/components/shared/submit-button";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { formatCurrency } from "@/lib/format";
import { prisma } from "@/lib/prisma";

export default async function ProductsPage() {
  const products = await prisma.product.findMany({
    select: {
      id: true,
      name: true,
      description: true,
      price: true,
      imageUrl: true,
      isActive: true,
    },
    orderBy: {
      name: "asc",
    },
  });

  const activeProducts = products.filter((product) => product.isActive).length;
  const passiveProducts = products.filter(
    (product) => !product.isActive,
  ).length;

  return (
    <>
      <DashboardHeader
        title="Ürün Yönetimi"
        description="Ürün kataloğunu yönetin."
        actions={
          <Button
            asChild
            className="h-11 rounded-2xl bg-orange-500 px-5 font-semibold hover:bg-orange-600"
          >
            <Link href="/admin/products/new">
              <Plus className="mr-2 h-4 w-4" />
              Yeni Ürün
            </Link>
          </Button>
        }
      />

      <RouteToast />

      <DashboardContainer>
        <Card className="overflow-hidden border-0 bg-gradient-to-r from-orange-500 via-orange-500 to-orange-600 text-white shadow-xl">
          <CardContent className="p-6 lg:p-8">
            <div className="max-w-3xl">
              <Badge className="border-0 bg-white/15 text-white hover:bg-white/15">
                Ürün Yönetimi
              </Badge>

              <h2 className="mt-4 text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
                Ürün Kataloğu
              </h2>

              <p className="mt-4 max-w-2xl text-sm leading-6 text-orange-100 sm:text-base">
                DuruSer müşterilerine sunulan ürünleri yönetin, aktif/pasif
                durumlarını takip edin ve ürün bilgilerini güncelleyin.
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-4 md:grid-cols-3">
          <Card className="border-0 shadow-sm">
            <CardContent className="p-5 sm:p-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Toplam Ürün</p>
                  <p className="mt-2 text-3xl font-bold sm:text-4xl">
                    {products.length}
                  </p>
                </div>

                <div className="rounded-2xl bg-orange-100 p-3 text-orange-600">
                  <Package className="h-5 w-5" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardContent className="p-5 sm:p-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Aktif Ürün</p>
                  <p className="mt-2 text-3xl font-bold sm:text-4xl">
                    {activeProducts}
                  </p>
                </div>

                <div className="rounded-2xl bg-green-100 p-3 text-green-600">
                  <Package className="h-5 w-5" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardContent className="p-5 sm:p-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Pasif Ürün</p>
                  <p className="mt-2 text-3xl font-bold sm:text-4xl">
                    {passiveProducts}
                  </p>
                </div>

                <div className="rounded-2xl bg-red-100 p-3 text-red-600">
                  <Package className="h-5 w-5" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="border-0 shadow-sm">
          <CardContent className="p-4">
            <div className="relative">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

              <Input
                placeholder="Ürün ara..."
                className="h-12 rounded-2xl pl-10"
              />
            </div>
          </CardContent>
        </Card>

        {products.length === 0 ? (
          <EmptyState
            icon={Package}
            title="Henüz ürün eklenmedi"
            description="İlk ürününüzü ekleyerek kataloğu oluşturmaya başlayın."
            action={
              <Button
                asChild
                className="rounded-2xl bg-orange-500 hover:bg-orange-600"
              >
                <Link href="/admin/products/new">
                  <Plus className="mr-2 h-4 w-4" />
                  Yeni Ürün Ekle
                </Link>
              </Button>
            }
          />
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
            {products.map((product, index) => (
              <Card
                key={product.id}
                className="group overflow-hidden border-0 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="relative h-48 overflow-hidden bg-slate-100">
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
                    <div className="flex h-full items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200">
                      <Package className="h-14 w-14 text-slate-300" />
                    </div>
                  )}

                  <div className="absolute left-3 top-3">
                    <Badge className="border-0 bg-white/90 text-slate-700 shadow-sm backdrop-blur hover:bg-white/90">
                      #{product.id.slice(-6)}
                    </Badge>
                  </div>

                  <div className="absolute right-3 top-3">
                    <ActiveBadge active={product.isActive} className="shadow-sm" />
                  </div>
                </div>

                <CardContent className="flex min-h-[260px] flex-col p-5">
                  <div className="min-w-0">
                    <h3 className="line-clamp-1 text-lg font-bold text-slate-900">
                      {product.name}
                    </h3>

                    <p className="mt-3 line-clamp-2 min-h-[40px] text-sm leading-5 text-muted-foreground">
                      {product.description || "Bu ürün için açıklama eklenmemiş."}
                    </p>
                  </div>

                  <div className="mt-5 rounded-2xl bg-slate-50 p-4">
                    <p className="text-xs font-medium text-muted-foreground">
                      Güncel Fiyat
                    </p>

                    <p className="mt-1 text-2xl font-bold text-slate-900">
                      {formatCurrency(product.price)}
                    </p>
                  </div>

                  <div className="mt-auto grid gap-2 pt-5 sm:grid-cols-2">
                    <form action={toggleProductStatusAction}>
                      <input type="hidden" name="productId" value={product.id} />
                      <input
                        type="hidden"
                        name="currentStatus"
                        value={String(product.isActive)}
                      />

                      <SubmitButton
                        pendingText="..."
                        variant={product.isActive ? "outline" : "default"}
                        className="h-11 w-full rounded-2xl"
                      >
                        {product.isActive ? "Pasife Al" : "Aktife Al"}
                      </SubmitButton>
                    </form>

                    <Button
                      asChild
                      variant="outline"
                      className="h-11 rounded-2xl"
                    >
                      <Link href={`/admin/products/${product.id}/edit`}>
                        <Pencil className="mr-2 h-4 w-4" />
                        Düzenle
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </DashboardContainer>
    </>
  );
}

import Image from "next/image";

import {
  Package,
  Plus,
  Search,
  Tag,
  CheckCircle2,
  XCircle,
  Pencil,
} from "lucide-react";

import { prisma } from "@/lib/prisma";

import { DashboardHeader } from "@/components/layout/dashboard-header";
import { DashboardContainer } from "@/components/layout/dashboard-container";

import { Card, CardContent } from "@/components/ui/card";

import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";

import { Badge } from "@/components/ui/badge";

export default async function ProductsPage() {
  const products = await prisma.product.findMany({
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
      />

      <DashboardContainer>
        {/* HERO */}

        <Card className="overflow-hidden border-0 bg-gradient-to-r from-orange-500 via-orange-500 to-orange-600 text-white shadow-xl ">
          <CardContent className="flex flex-col gap-6 p-6 lg:flex-row lg:items-center lg:justify-between lg:p-8">
            <div>
              <p className="text-sm text-orange-100">Ürün Yönetimi</p>

              <h2 className="mt-3 text-4xl font-bold lg:text-5xl">
                Ürün Kataloğu
              </h2>

              <p className="mt-4 max-w-xl text-orange-100">
                DuruSer müşterilerine sunulan ürünleri yönetin, aktif/pasif
                durumlarını takip edin ve yeni ürünler ekleyin.
              </p>
            </div>

            <Button className="h-12 bg-white px-6 text-orange-600 hover:bg-orange-50">
              <Plus className="mr-2 h-4 w-4" />
              Yeni Ürün
            </Button>
          </CardContent>
        </Card>

        {/* STATS */}

        <div className="grid gap-4 md:grid-cols-3">
          <Card className="border-0 shadow-sm">
            <CardContent className="p-6">
              <Package className="h-6 w-6 text-orange-500" />

              <p className="mt-4 text-sm text-muted-foreground">Toplam Ürün</p>

              <p className="mt-2 text-4xl font-bold">{products.length}</p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardContent className="p-6">
              <CheckCircle2 className="h-6 w-6 text-green-500" />

              <p className="mt-4 text-sm text-muted-foreground">Aktif Ürün</p>

              <p className="mt-2 text-4xl font-bold">{activeProducts}</p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardContent className="p-6">
              <XCircle className="h-6 w-6 text-red-500" />

              <p className="mt-4 text-sm text-muted-foreground">Pasif Ürün</p>

              <p className="mt-2 text-4xl font-bold">{passiveProducts}</p>
            </CardContent>
          </Card>
        </div>

        {/* SEARCH */}

        <Card className="border-0 shadow-sm">
          <CardContent className="p-4">
            <div className="relative">
              <Search className="absolute left-4 top-3.5 h-4 w-4 text-muted-foreground" />

              <Input placeholder="Ürün ara..." className="pl-10" />
            </div>
          </CardContent>
        </Card>

        {/* PRODUCTS */}

        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
          {products.map((product) => (
            <Card
              key={product.id}
              className="overflow-hidden border-0 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              {/* IMAGE */}

              <div className="relative h-44 bg-slate-100">
                {product.imageUrl ? (
                  <Image
                    src={product.imageUrl}
                    alt={product.name}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center">
                    <Package className="h-14 w-14 text-slate-300" />
                  </div>
                )}

                <div className="absolute right-3 top-3">
                  {product.isActive ? (
                    <Badge
                      className={
                        product.isActive
                          ? "bg-emerald-500 text-white"
                          : "bg-red-500 text-white"
                      }
                    >
                      {" "}
                      <CheckCircle2 className="mr-1 h-3 w-3" />
                      Aktif
                    </Badge>
                  ) : (
                    <Badge variant="destructive">
                      <XCircle className="mr-1 h-3 w-3" />
                      Pasif
                    </Badge>
                  )}
                </div>
              </div>

              {/* CONTENT */}

              <CardContent className="p-5">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-lg font-semibold">{product.name}</h3>

                    <p className="mt-1 text-xs text-muted-foreground">
                      #{product.id.slice(-6)}
                    </p>
                  </div>

                  <Tag className="h-5 w-5 text-orange-500" />
                </div>

                <p className="mt-4 line-clamp-2 min-h-[40px] text-sm text-muted-foreground">
                  {product.description || "Bu ürün için açıklama eklenmemiş."}
                </p>

                <div className="mt-6 flex items-center justify-between border-t pt-4">
                  {" "}
                  <div>
                    <p className="text-xs text-muted-foreground">
                      Güncel Fiyat
                    </p>

                    <p className="text-2xl font-bold">
                      ₺{product.price.toLocaleString("tr-TR")}
                    </p>
                  </div>
                  <Button variant="outline" className="rounded-xl">
                    <Pencil className="mr-2 h-4 w-4" />
                    Düzenle
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </DashboardContainer>
    </>
  );
}

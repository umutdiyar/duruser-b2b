import Link from "next/link";
import {
  ArrowLeft,
  Building2,
  CheckCircle2,
  Package,
  Save,
  ShoppingCart,
  User,
} from "lucide-react";

import { prisma } from "@/lib/prisma";
import { updateCompanyProducts } from "@/actions/company-product-actions";

import { DashboardHeader } from "@/components/layout/dashboard-header";
import { DashboardContainer } from "@/components/layout/dashoard-container";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";

export default async function CompanyDetailPage({
  params,
}: {
  params: Promise<{
    id: string;
  }>;
}) {
  const { id } = await params;

  const company = await prisma.company.findUnique({
    where: {
      id,
    },
    include: {
      users: true,
      orders: {
        orderBy: {
          createdAt: "desc",
        },
        take: 5,
      },
      companyProducts: {
        include: {
          product: true,
        },
      },
    },
  });

  const products = await prisma.product.findMany({
    orderBy: {
      name: "asc",
    },
  });

  if (!company) {
    return (
      <>
        <DashboardHeader
          title="Firma Bulunamadı"
          description="Aradığınız firma sistemde bulunmuyor."
        />

        <div className="mx-auto max-w-[1600px] p-4 sm:p-6 lg:p-8">
          <Button asChild variant="outline">
            <Link href="/admin/customers">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Müşterilere Dön
            </Link>
          </Button>
        </div>
      </>
    );
  }

  const assignedProductIds = new Set(
    company.companyProducts.map((item) => item.productId),
  );

  return (
    <>
      <DashboardHeader
        title={company.name}
        description="Firma bilgileri ve ürün yetkilendirmesi."
      />

      <DashboardContainer>
        {" "}
        <Button asChild variant="outline" className="rounded-2xl">
          <Link href="/admin/customers">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Firmalara Dön
          </Link>
        </Button>
        <Card className="overflow-hidden border-0 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white shadow-xl">
          <CardContent className="flex flex-col gap-6 p-6 lg:flex-row lg:items-center lg:justify-between lg:p-8">
            <div>
              <Badge className="border-0 bg-white/10 text-white hover:bg-white/10">
                Firma Detayı
              </Badge>

              <h2 className="mt-4 text-4xl font-bold leading-tight lg:text-5xl">
                {company.name}
              </h2>

              <p className="mt-3 max-w-xl text-slate-300">
                Bu firmaya ait kullanıcıları, siparişleri ve hangi ürünleri
                sipariş verebileceğini buradan yönetin.
              </p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur">
              <p className="text-sm text-slate-400">Firma Kodu</p>
              <p className="mt-2 text-xl font-bold">{company.slug}</p>
            </div>
          </CardContent>
        </Card>
        <div className="grid gap-4 md:grid-cols-3">
          <Card className="border-0 shadow-sm">
            <CardContent className="p-6">
              <Building2 className="h-6 w-6 text-orange-500" />
              <p className="mt-4 text-sm text-muted-foreground">Firma</p>
              <p className="mt-2 text-3xl font-bold">Aktif</p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardContent className="p-6">
              <User className="h-6 w-6 text-orange-500" />
              <p className="mt-4 text-sm text-muted-foreground">Kullanıcı</p>
              <p className="mt-2 text-3xl font-bold">{company.users.length}</p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardContent className="p-6">
              <Package className="h-6 w-6 text-orange-500" />
              <p className="mt-4 text-sm text-muted-foreground">Yetkili Ürün</p>
              <p className="mt-2 text-3xl font-bold">
                {company.companyProducts.length}
              </p>
            </CardContent>
          </Card>
        </div>
        <div className="grid gap-6 xl:grid-cols-3">
          <Card className="border-0 shadow-sm xl:col-span-2">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Ürün Yetkilendirme</CardTitle>

              <Badge className="bg-orange-100 text-orange-700 hover:bg-orange-100">
                {products.length} ürün
              </Badge>
            </CardHeader>

            <CardContent>
              <form action={updateCompanyProducts} className="space-y-5">
                <input type="hidden" name="companyId" value={company.id} />

                <div className="grid gap-4 md:grid-cols-2">
                  {products.map((product) => {
                    const isAssigned = assignedProductIds.has(product.id);

                    return (
                      <label
                        key={product.id}
                        className="flex cursor-pointer items-start gap-4 rounded-3xl border bg-white p-5 transition hover:-translate-y-1 hover:shadow-lg"
                      >
                        <Checkbox
                          name="productIds"
                          value={product.id}
                          defaultChecked={isAssigned}
                          className="mt-1"
                        />

                        <div className="flex-1">
                          <div className="flex items-start justify-between gap-3">
                            <div>
                              <p className="font-semibold">{product.name}</p>
                              <p className="mt-1 text-sm text-muted-foreground">
                                ₺{product.price.toLocaleString("tr-TR")}
                              </p>
                            </div>

                            {product.isActive ? (
                              <CheckCircle2 className="h-5 w-5 text-green-500" />
                            ) : (
                              <span className="h-5 w-5 rounded-full bg-red-500" />
                            )}
                          </div>

                          <p className="mt-3 line-clamp-2 text-sm text-muted-foreground">
                            {product.description ||
                              "Bu ürün için açıklama eklenmemiş."}
                          </p>
                        </div>
                      </label>
                    );
                  })}
                </div>

                <Button className="h-12 rounded-2xl bg-orange-500 px-6 font-semibold hover:bg-orange-600">
                  <Save className="mr-2 h-4 w-4" />
                  Ürün Yetkilerini Kaydet
                </Button>
              </form>
            </CardContent>
          </Card>

          <div className="space-y-6">
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle>Kullanıcılar</CardTitle>
              </CardHeader>

              <CardContent className="space-y-3">
                {company.users.length > 0 ? (
                  company.users.map((user) => (
                    <div
                      key={user.id}
                      className="rounded-2xl border bg-white p-4"
                    >
                      <p className="font-semibold">{user.name}</p>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {user.email}
                      </p>
                      <Badge variant="outline" className="mt-3">
                        {user.role}
                      </Badge>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-muted-foreground">
                    Bu firmaya bağlı kullanıcı yok.
                  </p>
                )}
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle>Son Siparişler</CardTitle>
              </CardHeader>

              <CardContent className="space-y-3">
                {company.orders.length > 0 ? (
                  company.orders.map((order) => (
                    <div
                      key={order.id}
                      className="flex items-center justify-between rounded-2xl border bg-white p-4"
                    >
                      <div>
                        <p className="font-semibold">{order.orderNumber}</p>
                        <p className="mt-1 text-sm text-muted-foreground">
                          ₺{order.totalPrice.toLocaleString("tr-TR")}
                        </p>
                      </div>

                      <Badge variant="secondary">{order.status}</Badge>
                    </div>
                  ))
                ) : (
                  <div className="rounded-2xl border bg-white p-5 text-sm text-muted-foreground">
                    <ShoppingCart className="mb-3 h-5 w-5 text-orange-500" />
                    Bu firmaya ait sipariş bulunmuyor.
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </DashboardContainer>
    </>
  );
}

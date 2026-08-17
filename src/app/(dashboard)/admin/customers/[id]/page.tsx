import Link from "next/link";
import {
  ArrowLeft,
  Building2,
  CheckCircle2,
  Package,
  Save,
  ShoppingCart,
  User,
  Pencil,
  Plus,
} from "lucide-react";

import { prisma } from "@/lib/prisma";
import { updateCompanyProducts } from "@/actions/company-product-actions";

import { DashboardHeader } from "@/components/layout/dashboard-header";
import { DashboardContainer } from "@/components/layout/dashboard-container";
import { ActiveBadge } from "@/components/shared/active-badge";
import { EmptyState } from "@/components/shared/empty-state";
import { OrderStatusBadge } from "@/components/shared/order-status-badge";
import { SubmitButton } from "@/components/shared/submit-button";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { RouteToast } from "@/components/shared/route-toast";
import { formatCurrency } from "@/lib/format";

export default async function CompanyDetailPage({
  params,
}: {
  params: Promise<{
    id: string;
  }>;
}) {
  const { id } = await params;

  const [company, products] = await Promise.all([
    prisma.company.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        name: true,
        slug: true,
        isActive: true,
        users: {
          select: {
            id: true,
            name: true,
            email: true,
            role: true,
          },
        },
        orders: {
          select: {
            id: true,
            orderNumber: true,
            status: true,
            totalPrice: true,
          },
          orderBy: {
            createdAt: "desc",
          },
          take: 5,
        },
        companyProducts: {
          select: {
            productId: true,
          },
        },
      },
    }),
    prisma.product.findMany({
      select: {
        id: true,
        name: true,
        description: true,
        price: true,
        isActive: true,
      },
      orderBy: {
        name: "asc",
      },
    }),
  ]);

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
        actions={
          <Button asChild variant="outline" className="h-11 rounded-2xl">
            <Link href={`/admin/customers/${company.id}/edit`}>
              <Pencil className="mr-2 h-4 w-4" />
              Firmayı Düzenle
            </Link>
          </Button>
        }
      />

      <RouteToast />

      <DashboardContainer>
        <Button asChild variant="outline" className="rounded-2xl">
          <Link href="/admin/customers">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Firmalara Dön
          </Link>
        </Button>

        <Card className="overflow-hidden border-0 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white shadow-xl">
          <CardContent className="flex flex-col gap-6 p-6 lg:flex-row lg:items-center lg:justify-between lg:p-8">
            <div>
              <div className="flex justify-between">
                <Badge className="border-0 bg-white/10 text-white hover:bg-white/10">
                  Firma Detayı
                </Badge>

                <ActiveBadge
                  active={company.isActive}
                  activeLabel="Aktif Firma"
                  inactiveLabel="Pasif Firma"
                />
              </div>

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
              <p className="mt-2 text-3xl font-bold">
                {company.isActive ? "Aktif" : "Pasif"}
              </p>
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
                        className="flex cursor-pointer items-start gap-4 rounded-3xl border bg-white p-5 transition-shadow duration-200 hover:shadow-lg"
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
                                {formatCurrency(product.price)}
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

                <SubmitButton
                  pendingText="Kaydediliyor..."
                  className="h-12 rounded-2xl bg-orange-500 px-6 font-semibold hover:bg-orange-600"
                >
                  <Save className="mr-2 h-4 w-4" />
                  Ürün Yetkilerini Kaydet
                </SubmitButton>
              </form>
            </CardContent>
          </Card>

          <div className="space-y-6">
            <Card className="border-0 shadow-sm">
              <CardHeader className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <CardTitle>Kullanıcılar</CardTitle>

                <Button
                  asChild
                  className="h-10 rounded-2xl bg-orange-500 hover:bg-orange-600"
                >
                  <Link href={`/admin/customers/${company.id}/users/new`}>
                    <Plus className="mr-2 h-4 w-4" />
                    Yeni Kullanıcı
                  </Link>
                </Button>
              </CardHeader>

              <CardContent className="space-y-3">
                {company.users.length > 0 ? (
                  company.users.map((user) => (
                    <div
                      key={user.id}
                      className="rounded-2xl border bg-white p-4"
                    >
                      <div className="flex min-w-0 flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                        <div className="min-w-0">
                          <p className="truncate font-semibold">{user.name}</p>

                          <p className="mt-1 truncate text-sm text-muted-foreground">
                            {user.email}
                          </p>

                          <Badge variant="outline" className="mt-3">
                            {user.role}
                          </Badge>
                        </div>

                        <Button
                          asChild
                          variant="outline"
                          className="h-10 rounded-2xl"
                        >
                          <Link
                            href={`/admin/customers/${company.id}/users/${user.id}/edit`}
                          >
                            <Pencil className="mr-2 h-4 w-4" />
                            Düzenle
                          </Link>
                        </Button>
                      </div>
                    </div>
                  ))
                ) : (
                  <EmptyState
                    icon={User}
                    title="Kullanıcı yok"
                    description="Bu firmaya bağlı kullanıcı bulunmuyor."
                  />
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
                      className="flex items-center justify-between gap-3 rounded-2xl border bg-white p-4"
                    >
                      <div className="min-w-0">
                        <p className="truncate font-semibold">
                          {order.orderNumber}
                        </p>
                        <p className="mt-1 text-sm text-muted-foreground">
                          {formatCurrency(order.totalPrice)}
                        </p>
                      </div>

                      <OrderStatusBadge status={order.status} />
                    </div>
                  ))
                ) : (
                  <EmptyState
                    icon={ShoppingCart}
                    title="Sipariş yok"
                    description="Bu firmaya ait sipariş bulunmuyor."
                  />
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </DashboardContainer>
    </>
  );
}

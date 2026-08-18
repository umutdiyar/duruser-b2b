import Link from "next/link";
import {
  ArrowLeft,
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
import { Breadcrumb } from "@/components/shared/breadcrumb";
import { EmptyState } from "@/components/shared/empty-state";
import { ProductAuthorizationSearch } from "@/components/customers/product-authorization-search";
import { OrderStatusBadge } from "@/components/shared/order-status-badge";
import { SubmitButton } from "@/components/shared/submit-button";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
            customPrice: true,
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

  const customPriceByProductId = new Map(
    company.companyProducts.map((item) => [item.productId, item.customPrice]),
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
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <Breadcrumb
            items={[
              { label: "Müşteriler", href: "/admin/customers" },
              { label: company.name },
            ]}
          />

          <Button asChild variant="outline" className="rounded-2xl">
            <Link href="/admin/customers">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Firmalara Dön
            </Link>
          </Button>
        </div>

        <Card className="overflow-hidden border-0 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white shadow-xl">
          <CardContent className="flex flex-col gap-6 p-6 lg:flex-row lg:items-start lg:justify-between lg:p-8">
            <div className="min-w-0">
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

            <div className="flex flex-row items-center gap-3 lg:shrink-0 lg:flex-col lg:items-end lg:gap-4">
              <ActiveBadge
                active={company.isActive}
                activeLabel="Aktif Firma"
                inactiveLabel="Pasif Firma"
              />

              <div className="rounded-3xl border border-white/10 bg-white/5 px-5 py-4 backdrop-blur lg:text-right">
                <p className="text-sm text-slate-400">Firma Kodu</p>
                <p className="mt-1 text-lg font-bold">{company.slug}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-4 sm:grid-cols-2">
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

                <ProductAuthorizationSearch>
                <div className="grid gap-3 md:grid-cols-2 2xl:grid-cols-3">
                  {products.map((product) => {
                    const isAssigned = assignedProductIds.has(product.id);
                    const currentCustomPrice = customPriceByProductId.get(
                      product.id,
                    );
                    const hasCustomPrice = currentCustomPrice != null;
                    const checkboxId = `product-${product.id}`;
                    const priceInputId = `custom-price-${product.id}`;

                    return (
                      <div
                        key={product.id}
                        data-product-name={product.name}
                        className="rounded-2xl border bg-white p-4 transition-shadow duration-200 hover:shadow-md"
                      >
                        <div className="flex items-start gap-3">
                          <Checkbox
                            id={checkboxId}
                            name="productIds"
                            value={product.id}
                            defaultChecked={isAssigned}
                            className="mt-1"
                          />

                          <div className="min-w-0 flex-1">
                            <div className="flex items-start justify-between gap-2">
                              <label
                                htmlFor={checkboxId}
                                className="line-clamp-1 cursor-pointer text-sm font-semibold"
                              >
                                {product.name}
                              </label>

                              {product.isActive ? (
                                <CheckCircle2 className="h-4 w-4 shrink-0 text-success" />
                              ) : (
                                <span className="h-4 w-4 shrink-0 rounded-full bg-destructive" />
                              )}
                            </div>

                            <p className="mt-0.5 text-xs text-muted-foreground">
                              Standart: {formatCurrency(product.price)}
                            </p>
                          </div>
                        </div>

                        <div className="mt-3 space-y-1.5 border-t pt-3">
                          <Label htmlFor={priceInputId} className="text-xs">
                            Firma fiyatı
                          </Label>
                          <Input
                            id={priceInputId}
                            name={`customPrice-${product.id}`}
                            type="number"
                            min={0}
                            step="0.01"
                            defaultValue={currentCustomPrice ?? ""}
                            placeholder="Boş = standart fiyat"
                            className="h-10 rounded-xl"
                          />

                          {hasCustomPrice ? (
                            <p className="text-xs font-semibold text-orange-600">
                              Geçerli fiyat: {formatCurrency(currentCustomPrice)}
                            </p>
                          ) : (
                            <p className="text-xs text-muted-foreground">
                              Standart fiyat kullanılıyor
                            </p>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
                </ProductAuthorizationSearch>

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

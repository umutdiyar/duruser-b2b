import Link from "next/link";
import { ArrowUpRight, PackageCheck, ShoppingCart } from "lucide-react";

import { DashboardContainer } from "@/components/layout/dashboard-container";
import { DashboardHeader } from "@/components/layout/dashboard-header";
import { DateFilter } from "@/components/shared/date-filter";
import { EmptyState } from "@/components/shared/empty-state";
import { FilterBar } from "@/components/shared/filter-bar";
import { FilterSelect } from "@/components/shared/filter-select";
import { OrderStatusBadge } from "@/components/shared/order-status-badge";
import { PaginationBar } from "@/components/shared/pagination-bar";
import { SearchField } from "@/components/shared/search-field";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { formatCurrency, formatDate } from "@/lib/format";
import {
  ORDERS_PAGE_SIZE,
  buildOrderWhere,
  buildOrdersHref,
  hasActiveOrderFilters,
  parseOrderFilters,
  type OrderSearchParams,
} from "@/lib/order-filters";
import { orderStatuses } from "@/lib/order-status";
import { prisma } from "@/lib/prisma";

export default async function AdminOrdersPage({
  searchParams,
}: {
  searchParams?: Promise<OrderSearchParams>;
}) {
  const rawParams = (searchParams ? await searchParams : {}) ?? {};
  const filters = parseOrderFilters(rawParams);
  const where = buildOrderWhere(filters);
  const activeFilters = hasActiveOrderFilters(filters);

  const [orders, filteredCount, totalOrders, pendingOrders, deliveredOrders] =
    await Promise.all([
      prisma.order.findMany({
        where,
        select: {
          id: true,
          orderNumber: true,
          status: true,
          totalPrice: true,
          notes: true,
          createdAt: true,
          company: {
            select: {
              name: true,
            },
          },
          items: {
            select: {
              id: true,
              quantity: true,
              product: {
                select: {
                  name: true,
                },
              },
            },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
        skip: (filters.page - 1) * ORDERS_PAGE_SIZE,
        take: ORDERS_PAGE_SIZE,
      }),
      prisma.order.count({ where }),
      prisma.order.count(),
      prisma.order.count({ where: { status: "PENDING" } }),
      prisma.order.count({ where: { status: "DELIVERED" } }),
    ]);

  const totalPages = Math.max(1, Math.ceil(filteredCount / ORDERS_PAGE_SIZE));

  return (
    <>
      <DashboardHeader
        title="Siparişler"
        description="Müşterilerden gelen siparişleri takip edin."
      />

      <DashboardContainer>
        <div className="grid gap-4 md:grid-cols-3">
          <Card className="border-0 shadow-sm">
            <CardContent className="p-6">
              <ShoppingCart className="h-6 w-6 text-orange-500" />
              <p className="mt-4 text-sm text-muted-foreground">
                Toplam Sipariş
              </p>
              <p className="mt-2 text-4xl font-bold">{totalOrders}</p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardContent className="p-6">
              <PackageCheck className="h-6 w-6 text-blue-500" />
              <p className="mt-4 text-sm text-muted-foreground">Yeni Sipariş</p>
              <p className="mt-2 text-4xl font-bold">{pendingOrders}</p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardContent className="p-6">
              <PackageCheck className="h-6 w-6 text-green-500" />
              <p className="mt-4 text-sm text-muted-foreground">
                Teslim Edilen
              </p>
              <p className="mt-2 text-4xl font-bold">{deliveredOrders}</p>
            </CardContent>
          </Card>
        </div>

        <FilterBar
          action="/admin/orders"
          hasActiveFilters={activeFilters}
          resetHref="/admin/orders"
          resultLabel={`${filteredCount} sipariş bulundu`}
        >
          <div className="space-y-1.5 lg:w-[220px]">
            <Label htmlFor="order-q">Sipariş No / Firma</Label>
            <SearchField
              id="order-q"
              name="q"
              defaultValue={rawParams.q ?? ""}
              placeholder="DRS-2026 veya firma adı"
            />
          </div>

          <div className="space-y-1.5 lg:w-[170px]">
            <Label htmlFor="order-status">Durum</Label>
            <FilterSelect
              id="order-status"
              name="status"
              defaultValue={rawParams.status ?? ""}
            >
              <option value="">Tüm durumlar</option>
              {orderStatuses.map((status) => (
                <option key={status.value} value={status.value}>
                  {status.label}
                </option>
              ))}
            </FilterSelect>
          </div>

          <DateFilter
            id="order-from"
            name="from"
            label="Başlangıç"
            defaultValue={rawParams.from ?? ""}
          />

          <DateFilter
            id="order-to"
            name="to"
            label="Bitiş"
            defaultValue={rawParams.to ?? ""}
          />
        </FilterBar>

        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle>Gelen Siparişler</CardTitle>
          </CardHeader>

          <CardContent className="space-y-3">
            {orders.length === 0 ? (
              <EmptyState
                icon={ShoppingCart}
                title={
                  activeFilters ? "Sipariş bulunamadı" : "Henüz sipariş bulunmuyor"
                }
                description={
                  activeFilters
                    ? "Bu filtrelere uygun sipariş bulunamadı."
                    : "Müşterileriniz sipariş oluşturduğunda burada listelenecek."
                }
                action={
                  activeFilters ? (
                    <Button asChild variant="outline" className="rounded-2xl">
                      <Link href="/admin/orders">Filtreleri Temizle</Link>
                    </Button>
                  ) : undefined
                }
              />
            ) : (
              <>
                {/* Desktop: dense, scannable single-row layout */}
                <div className="hidden overflow-x-auto lg:block">
                  <div className="min-w-[860px]">
                    <div className="flex items-center gap-4 px-4 pb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                      <span className="w-[220px] shrink-0">Sipariş</span>
                      <span className="w-[130px] shrink-0">Tarih</span>
                      <span className="w-[140px] shrink-0">Durum</span>
                      <span className="w-[90px] shrink-0">Ürün</span>
                      <span className="w-[110px] shrink-0 text-right">Toplam</span>
                      <span className="ml-auto w-[130px] shrink-0" />
                    </div>

                    <div className="space-y-2">
                      {orders.map((order) => (
                        <Link
                          key={order.id}
                          href={`/admin/orders/${order.id}`}
                          className="flex items-center gap-4 rounded-xl border bg-white px-4 py-3 transition-colors duration-150 hover:border-orange-200 hover:bg-orange-50/40"
                        >
                          <div className="w-[220px] min-w-0 shrink-0">
                            <p className="truncate font-semibold">
                              {order.orderNumber}
                            </p>
                            <p className="truncate text-xs text-muted-foreground">
                              {order.company.name}
                            </p>
                          </div>

                          <span className="w-[130px] shrink-0 text-sm text-muted-foreground">
                            {formatDate(order.createdAt)}
                          </span>

                          <span className="w-[140px] shrink-0">
                            <OrderStatusBadge status={order.status} />
                          </span>

                          <span className="w-[90px] shrink-0 text-sm text-muted-foreground">
                            {order.items.length} ürün
                          </span>

                          <span className="w-[110px] shrink-0 text-right font-bold">
                            {formatCurrency(order.totalPrice)}
                          </span>

                          <span className="ml-auto flex w-[130px] shrink-0 justify-end">
                            <span className="inline-flex items-center gap-1 text-sm font-medium text-orange-600">
                              Detayı Gör
                              <ArrowUpRight className="h-4 w-4" />
                            </span>
                          </span>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Mobile / tablet: full card with item breakdown */}
                <div className="space-y-4 lg:hidden">
                  {orders.map((order) => (
                    <div
                      key={order.id}
                      className="rounded-3xl border bg-white p-5 transition-shadow duration-200 hover:shadow-md"
                    >
                      <div className="flex min-w-0 flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                        <div className="min-w-0">
                          <p className="truncate font-bold">
                            {order.orderNumber}
                          </p>
                          <p className="mt-1 text-sm text-muted-foreground">
                            {order.company.name} · {formatDate(order.createdAt)}
                          </p>
                        </div>

                        <div className="flex shrink-0 flex-wrap items-center gap-3">
                          <OrderStatusBadge status={order.status} />

                          <p className="font-bold">
                            {formatCurrency(order.totalPrice)}
                          </p>
                        </div>
                      </div>

                      <div className="mt-4 grid gap-2 sm:grid-cols-2">
                        {order.items.map((item) => (
                          <div
                            key={item.id}
                            className="flex min-w-0 items-center justify-between gap-3 rounded-2xl bg-slate-50 px-4 py-3 text-sm"
                          >
                            <span className="truncate">
                              {item.product.name}
                            </span>
                            <span className="shrink-0 font-semibold">
                              {item.quantity} adet
                            </span>
                          </div>
                        ))}
                      </div>

                      {order.notes ? (
                        <div className="mt-4 rounded-2xl bg-orange-50 p-4 text-sm leading-6 text-orange-800">
                          Not: {order.notes}
                        </div>
                      ) : null}

                      <div className="mt-5 flex justify-end">
                        <Button asChild variant="outline" className="rounded-2xl">
                          <Link href={`/admin/orders/${order.id}`}>
                            Detayı Gör
                            <ArrowUpRight className="ml-2 h-4 w-4" />
                          </Link>
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>

                <PaginationBar
                  page={filters.page}
                  totalPages={totalPages}
                  totalCount={filteredCount}
                  pageSize={ORDERS_PAGE_SIZE}
                  itemLabel="sipariş"
                  buildHref={(page) =>
                    buildOrdersHref(rawParams, { page: String(page) })
                  }
                />
              </>
            )}
          </CardContent>
        </Card>
      </DashboardContainer>
    </>
  );
}

import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  Building2,
  CalendarDays,
  ClipboardList,
  Package,
  Save,
  Trash2,
} from "lucide-react";

import {
  updateOrderStatusAction,
  cancelOrderAction,
} from "@/actions/order-status-actions";
import { DashboardContainer } from "@/components/layout/dashboard-container";
import { DashboardHeader } from "@/components/layout/dashboard-header";
import { Breadcrumb } from "@/components/shared/breadcrumb";
import { ConfirmSubmitButton } from "@/components/shared/confirm-submit-button";
import { OrderStatusBadge } from "@/components/shared/order-status-badge";
import { SubmitButton } from "@/components/shared/submit-button";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { formatCurrency, formatDateTime } from "@/lib/format";
import { getOrderStatusDescription, orderStatuses } from "@/lib/order-status";
import { prisma } from "@/lib/prisma";
import { RouteToast } from "@/components/shared/route-toast";
import { OrderStatusTimeline } from "@/components/orders/order-status-timeline";

export default async function AdminOrderDetailPage({
  params,
}: {
  params: Promise<{
    id: string;
  }>;
}) {
  const { id } = await params;

  const order = await prisma.order.findUnique({
    where: {
      id,
    },
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
          unitPrice: true,
          totalPrice: true,
          product: {
            select: {
              name: true,
            },
          },
        },
      },
    },
  });

  if (!order) {
    notFound();
  }

  return (
    <>
      <DashboardHeader
        title={order.orderNumber}
        description="Sipariş detaylarını görüntüleyin ve operasyon durumunu güncelleyin."
        actions={
          <Button asChild variant="outline" className="h-11 rounded-2xl">
            <Link href="/admin/orders">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Siparişlere Dön
            </Link>
          </Button>
        }
      />

      <RouteToast />

      <DashboardContainer>
        <Breadcrumb
          items={[
            { label: "Siparişler", href: "/admin/orders" },
            { label: order.orderNumber },
          ]}
        />

        <Card className="overflow-hidden border-0 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white shadow-xl">
          <CardContent className="flex flex-col gap-6 p-6 lg:flex-row lg:items-center lg:justify-between lg:p-8">
            <div className="min-w-0">
              <Badge className="border-0 bg-white/10 text-white hover:bg-white/10">
                Sipariş Detayı
              </Badge>

              <h2 className="mt-4 text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
                {order.company.name}
              </h2>

              <p className="mt-3 max-w-xl text-sm leading-6 text-slate-300 sm:text-base">
                {order.orderNumber} numaralı siparişin ürünlerini, tutarını ve
                operasyon durumunu buradan yönetin.
              </p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur">
              <p className="text-sm text-slate-400">Mevcut Durum</p>
              <div className="mt-3">
                <OrderStatusBadge status={order.status} className="px-2 py-2" />
              </div>
              <p className="mt-3 max-w-xs text-xs leading-5 text-slate-400">
                {getOrderStatusDescription(order.status)}
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-4 md:grid-cols-3">
          <Card className="border-0 shadow-sm">
            <CardContent className="p-6">
              <Building2 className="h-6 w-6 text-orange-500" />
              <p className="mt-4 text-sm text-muted-foreground">Firma</p>
              <p className="mt-2 truncate text-2xl font-bold">
                {order.company.name}
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardContent className="p-6">
              <CalendarDays className="h-6 w-6 text-orange-500" />
              <p className="mt-4 text-sm text-muted-foreground">
                Sipariş Tarihi
              </p>
              <p className="mt-2 text-xl font-bold">
                {formatDateTime(order.createdAt)}
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardContent className="p-6">
              <ClipboardList className="h-6 w-6 text-orange-500" />
              <p className="mt-4 text-sm text-muted-foreground">Toplam Tutar</p>
              <p className="mt-2 text-3xl font-bold">
                {formatCurrency(order.totalPrice)}
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 xl:grid-cols-3">
          <Card className="border-0 shadow-sm xl:col-span-2">
            <CardHeader>
              <CardTitle>Sipariş Kalemleri</CardTitle>
            </CardHeader>

            <CardContent className="space-y-4">
              {order.items.map((item) => (
                <div
                  key={item.id}
                  className="flex min-w-0 flex-col gap-4 rounded-3xl border bg-white p-5 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="flex min-w-0 items-start gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-orange-100 text-orange-600">
                      <Package className="h-5 w-5" />
                    </div>

                    <div className="min-w-0">
                      <p className="truncate font-semibold">
                        {item.product.name}
                      </p>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {formatCurrency(item.unitPrice)} birim fiyat
                      </p>
                    </div>
                  </div>

                  <div className="flex shrink-0 items-center justify-between gap-6 sm:justify-end">
                    <div>
                      <p className="text-xs text-muted-foreground">Adet</p>
                      <p className="font-bold">{item.quantity}</p>
                    </div>

                    <div className="text-right">
                      <p className="text-xs text-muted-foreground">Toplam</p>
                      <p className="font-bold">
                        {formatCurrency(item.totalPrice)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <div className="space-y-6">
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle>Durum Güncelle</CardTitle>
              </CardHeader>

              <CardContent>
                <form action={updateOrderStatusAction} className="space-y-4">
                  <input type="hidden" name="orderId" value={order.id} />

                  <Select name="status" defaultValue={order.status}>
                    <SelectTrigger className="h-12 rounded-2xl">
                      <SelectValue placeholder="Durum seçin" />
                    </SelectTrigger>

                    <SelectContent
                      position="popper"
                      side="bottom"
                      align="start"
                      sideOffset={6}
                      className="rounded-2xl border border-slate-200 bg-white p-1 shadow-xl"
                    >
                      {orderStatuses.map((status) => (
                        <SelectItem
                          key={status.value}
                          value={status.value}
                          className="rounded-xl px-3 py-2 mb-0.5"
                        >
                          {status.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <SubmitButton
                    pendingText="Kaydediliyor..."
                    className="h-12 w-full rounded-2xl bg-orange-500 font-semibold hover:bg-orange-600"
                  >
                    <Save className="mr-2 h-4 w-4" />
                    Durumu Kaydet
                  </SubmitButton>
                </form>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle>Sipariş Süreci</CardTitle>
              </CardHeader>

              <CardContent>
                <OrderStatusTimeline status={order.status} />
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle>Sipariş İşlemleri</CardTitle>
              </CardHeader>

              <CardContent>
                {order.status === "CANCELLED" ? (
                  <div className="rounded-2xl bg-red-50 p-4 text-sm leading-6 text-red-700">
                    Bu sipariş iptal edilmiş.
                  </div>
                ) : (
                  <form
                    id={`cancel-order-${order.id}`}
                    action={cancelOrderAction}
                    className="space-y-4"
                  >
                    <input type="hidden" name="orderId" value={order.id} />

                    <div className="rounded-2xl bg-red-50 p-4 text-sm leading-6 text-red-700">
                      Admin olarak bu siparişi operasyon durumundan bağımsız
                      şekilde iptal edebilirsiniz.
                    </div>

                    <ConfirmSubmitButton
                      formId={`cancel-order-${order.id}`}
                      title="Siparişi iptal et"
                      description={`${order.orderNumber} numaralı siparişi iptal etmek istediğinize emin misiniz? Bu işlem geri alınamaz.`}
                      confirmLabel="Evet, İptal Et"
                      cancelLabel="Vazgeç"
                      pendingText="İptal ediliyor..."
                      variant="destructive"
                      className="h-12 w-full rounded-2xl font-semibold"
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
                      Siparişi İptal Et
                    </ConfirmSubmitButton>
                  </form>
                )}
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle>Sipariş Notu</CardTitle>
              </CardHeader>

              <CardContent>
                {order.notes ? (
                  <p className="rounded-2xl bg-orange-50 p-4 text-sm leading-6 text-orange-800">
                    {order.notes}
                  </p>
                ) : (
                  <p className="rounded-2xl border bg-white p-4 text-sm text-muted-foreground">
                    Sipariş notu bulunmuyor.
                  </p>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </DashboardContainer>
    </>
  );
}

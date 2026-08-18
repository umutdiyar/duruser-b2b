import type { OrderStatus } from "@/generated/prisma/client";

export const orderStatuses: {
  value: OrderStatus;
  label: string;
  description: string;
}[] = [
  {
    value: "PENDING",
    label: "Yeni Sipariş",
    description: "Sipariş yeni oluşturuldu.",
  },
  {
    value: "CONFIRMED",
    label: "Onaylandı",
    description: "Sipariş DuruSer tarafından onaylandı.",
  },
  {
    value: "PREPARING",
    label: "Hazırlanıyor",
    description: "Sipariş hazırlık aşamasında.",
  },
  {
    value: "SHIPPED",
    label: "Sevkiyatta",
    description: "Sipariş sevkiyata çıktı.",
  },
  {
    value: "DELIVERED",
    label: "Teslim Edildi",
    description: "Sipariş teslim edildi.",
  },
  {
    value: "CANCELLED",
    label: "İptal",
    description: "Sipariş iptal edildi.",
  },
];

export function getOrderStatusLabel(status: OrderStatus) {
  return orderStatuses.find((item) => item.value === status)?.label ?? status;
}

export function getOrderStatusDescription(status: OrderStatus) {
  return (
    orderStatuses.find((item) => item.value === status)?.description ??
    "Durum bilgisi bulunamadı."
  );
}

export function getOrderStatusClassName(status: OrderStatus) {
  const classNames: Record<OrderStatus, string> = {
    PENDING: "bg-blue-100 text-blue-700 hover:bg-blue-100",
    CONFIRMED: "bg-indigo-100 text-indigo-700 hover:bg-indigo-100",
    PREPARING: "bg-warning/15 text-amber-700 hover:bg-warning/15",
    SHIPPED: "bg-purple-100 text-purple-700 hover:bg-purple-100",
    DELIVERED: "bg-success/10 text-success hover:bg-success/10",
    CANCELLED: "bg-destructive/10 text-destructive hover:bg-destructive/10",
  };

  return classNames[status];
}

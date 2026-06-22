import type { OrderStatus } from "@/generated/prisma/client";

export function getOrderStatusLabel(status: OrderStatus) {
  const labels: Record<OrderStatus, string> = {
    PENDING: "Yeni Sipariş",
    CONFIRMED: "Onaylandı",
    PREPARING: "Hazırlanıyor",
    SHIPPED: "Sevkiyatta",
    DELIVERED: "Teslim Edildi",
    CANCELLED: "İptal",
  };

  return labels[status];
}

export function getOrderStatusClassName(status: OrderStatus) {
  const classNames: Record<OrderStatus, string> = {
    PENDING: "bg-blue-100 text-blue-700 hover:bg-blue-100",
    CONFIRMED: "bg-indigo-100 text-indigo-700 hover:bg-indigo-100",
    PREPARING: "bg-orange-100 text-orange-700 hover:bg-orange-100",
    SHIPPED: "bg-purple-100 text-purple-700 hover:bg-purple-100",
    DELIVERED: "bg-green-100 text-green-700 hover:bg-green-100",
    CANCELLED: "bg-red-100 text-red-700 hover:bg-red-100",
  };

  return classNames[status];
}

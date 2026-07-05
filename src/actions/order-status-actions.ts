"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import type { OrderStatus } from "@/generated/prisma/client";

export async function updateOrderStatusAction(formData: FormData) {
  const orderId = formData.get("orderId") as string;
  const status = formData.get("status") as OrderStatus;

  if (!orderId || !status) {
    throw new Error("Sipariş veya durum bilgisi eksik.");
  }

  await prisma.order.update({
    where: {
      id: orderId,
    },
    data: {
      status,
    },
  });

  revalidatePath("/admin/orders");
  revalidatePath(`/admin/orders/${orderId}`);
  revalidatePath("/customer/orders");

  redirect(`/admin/orders/${orderId}?toast=orderStatusUpdated`);
}

export async function cancelOrderAction(formData: FormData) {
  const orderId = formData.get("orderId") as string;
  const redirectTo = formData.get("redirectTo") as string;

  if (!orderId) {
    throw new Error("Sipariş bulunamadı.");
  }

  await prisma.order.update({
    where: {
      id: orderId,
    },
    data: {
      status: "CANCELLED",
    },
  });

  revalidatePath("/admin/orders");
  revalidatePath(`/admin/orders/${orderId}`);
  revalidatePath("/customer/orders");
  revalidatePath(`/customer/orders/${orderId}`);

  redirect(`${redirectTo}?toast=orderCancelled`);
}

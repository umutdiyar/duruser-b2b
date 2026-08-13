"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import type { OrderStatus } from "@/generated/prisma/client";
import { requireAdmin, requireAuthenticatedUser } from "@/lib/auth-guards";

const CUSTOMER_CANCELLABLE_STATUSES: OrderStatus[] = ["PENDING", "CONFIRMED"];

export async function updateOrderStatusAction(formData: FormData) {
  await requireAdmin();

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
  const session = await requireAuthenticatedUser();

  const orderId = formData.get("orderId") as string;

  if (!orderId) {
    throw new Error("Sipariş bulunamadı.");
  }

  const order = await prisma.order.findUnique({
    where: {
      id: orderId,
    },
  });

  if (!order) {
    throw new Error("Sipariş bulunamadı.");
  }

  const isAdmin = session.user.role === "ADMIN";
  const isOwningCustomer =
    session.user.role === "CUSTOMER" &&
    order.companyId === session.user.companyId;

  if (!isAdmin && !isOwningCustomer) {
    redirect("/unauthorized");
  }

  const redirectTo = isAdmin
    ? `/admin/orders/${orderId}`
    : `/customer/orders/${orderId}`;

  const isAlreadyCancelled = order.status === "CANCELLED";
  const isCustomerBlockedByStatus =
    !isAdmin && !CUSTOMER_CANCELLABLE_STATUSES.includes(order.status);

  if (isAlreadyCancelled || isCustomerBlockedByStatus) {
    redirect(`${redirectTo}?toast=orderCancelNotAllowed`);
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

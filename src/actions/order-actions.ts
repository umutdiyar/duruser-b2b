"use server";

import { randomUUID } from "node:crypto";

import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { requireCustomer } from "@/lib/auth-guards";

function formatOrderNumber(sequenceNumber: number) {
  const year = new Date().getFullYear();
  return `DRS-${year}-${String(sequenceNumber).padStart(6, "0")}`;
}

export async function createOrderAction(formData: FormData) {
  const { companyId } = await requireCustomer();

  const productIds = formData.getAll("productId") as string[];

  const items = productIds
    .map((productId) => {
      const quantity = Number(formData.get(`quantity-${productId}`) || 0);

      return {
        productId,
        quantity,
      };
    })
    .filter((item) => item.quantity > 0);

  if (items.length === 0) {
    redirect("/customer/new-order?error=empty");
  }

  const allowedProducts = await prisma.companyProduct.findMany({
    where: {
      companyId,
      productId: {
        in: items.map((item) => item.productId),
      },
      product: {
        isActive: true,
      },
    },
    include: {
      product: true,
    },
  });

  if (allowedProducts.length !== items.length) {
    throw new Error("Yetkisiz veya artık aktif olmayan ürün seçimi yapıldı.");
  }

  const orderItems = items.map((item) => {
    const companyProduct = allowedProducts.find(
      (allowed) => allowed.productId === item.productId,
    );

    if (!companyProduct) {
      throw new Error("Ürün bulunamadı.");
    }

    const unitPrice =
      companyProduct.customPrice ?? companyProduct.product.price;
    const totalPrice = unitPrice * item.quantity;

    return {
      productId: item.productId,
      quantity: item.quantity,
      unitPrice,
      totalPrice,
    };
  });

  const totalPrice = orderItems.reduce((sum, item) => sum + item.totalPrice, 0);
  const notes = (formData.get("notes") as string) || null;

  // orderNumber is derived from the DB-native sequenceNumber (Postgres
  // autoincrement), which is atomic even under concurrent inserts — no two
  // requests can ever receive the same value, unlike a count()+1 approach.
  // The row is created with a throwaway placeholder first because orderNumber
  // is a required unique column and the sequence value is only known after
  // insert; both statements commit together in one transaction, so no
  // intermediate state is ever visible to other queries.
  await prisma.$transaction(async (tx) => {
    const created = await tx.order.create({
      data: {
        orderNumber: `TEMP-${randomUUID()}`,
        companyId,
        totalPrice,
        notes,
        items: {
          create: orderItems,
        },
      },
    });

    await tx.order.update({
      where: { id: created.id },
      data: { orderNumber: formatOrderNumber(created.sequenceNumber) },
    });
  });

  redirect(`/customer/orders?toast=orderCreated`);
}

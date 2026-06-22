"use server";

import { redirect } from "next/navigation";
import { auth } from "../auth";
import { prisma } from "@/lib/prisma";

function generateOrderNumber() {
  const random = Math.floor(1000 + Math.random() * 9000);
  return `DRS-${random}`;
}

export async function createOrderAction(formData: FormData) {
  const session = await auth();

  if (!session?.user?.companyId) {
    throw new Error("Firma bilgisi bulunamadı.");
  }

  const companyId = session.user.companyId;

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
    },
    include: {
      product: true,
    },
  });

  if (allowedProducts.length !== items.length) {
    throw new Error("Yetkisiz ürün seçimi yapıldı.");
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

  const order = await prisma.order.create({
    data: {
      orderNumber: generateOrderNumber(),
      companyId,
      totalPrice,
      notes: (formData.get("notes") as string) || null,
      items: {
        create: orderItems,
      },
    },
  });

  redirect(`/customer/orders?toast=orderCreated`);
}

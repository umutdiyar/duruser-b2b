"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth-guards";

function parsePrice(value: FormDataEntryValue | null) {
  const price = Number(value);

  if (Number.isNaN(price) || price < 0) {
    throw new Error("Geçerli bir fiyat girin.");
  }

  return price;
}

export async function createProductAction(formData: FormData) {
  await requireAdmin();

  const name = formData.get("name") as string;
  const description = formData.get("description") as string;
  const price = parsePrice(formData.get("price"));
  const imageUrl = formData.get("imageUrl") as string;
  const isActive = formData.get("isActive") === "on";

  if (!name?.trim()) {
    throw new Error("Ürün adı zorunludur.");
  }

  const existingProduct = await prisma.product.findFirst({
    where: {
      name: {
        equals: name.trim(),
        mode: "insensitive",
      },
    },
  });

  if (existingProduct) {
    redirect("/admin/products/new?toast=productAlreadyExists");
  }

  await prisma.product.create({
    data: {
      name: name.trim(),
      description: description?.trim() || null,
      price,
      imageUrl: imageUrl?.trim() || null,
      isActive,
    },
  });

  revalidatePath("/admin/products");

  redirect("/admin/products?toast=productCreated");
}

export async function updateProductAction(formData: FormData) {
  await requireAdmin();

  const productId = formData.get("productId") as string;
  const name = formData.get("name") as string;
  const description = formData.get("description") as string;
  const price = parsePrice(formData.get("price"));
  const imageUrl = formData.get("imageUrl") as string;
  const isActive = formData.get("isActive") === "on";

  if (!productId) {
    throw new Error("Ürün bulunamadı.");
  }

  if (!name?.trim()) {
    throw new Error("Ürün adı zorunludur.");
  }

  const existingProduct = await prisma.product.findFirst({
    where: {
      name: {
        equals: name.trim(),
        mode: "insensitive",
      },
      NOT: {
        id: productId,
      },
    },
  });

  if (existingProduct) {
    redirect(`/admin/products/${productId}/edit?toast=productAlreadyExists`);
  }

  await prisma.product.update({
    where: {
      id: productId,
    },
    data: {
      name: name.trim(),
      description: description?.trim() || null,
      price,
      imageUrl: imageUrl?.trim() || null,
      isActive,
    },
  });

  revalidatePath("/admin/products");
  revalidatePath(`/admin/products/${productId}/edit`);

  redirect("/admin/products?toast=productUpdated");
}

export async function toggleProductStatusAction(formData: FormData) {
  await requireAdmin();

  const productId = formData.get("productId") as string;
  const currentStatus = formData.get("currentStatus") === "true";

  if (!productId) {
    throw new Error("Ürün bulunamadı.");
  }

  await prisma.product.update({
    where: {
      id: productId,
    },
    data: {
      isActive: !currentStatus,
    },
  });

  revalidatePath("/admin/products");
  revalidatePath("/customer/products");
  revalidatePath("/customer/new-order");

  const toastKey = currentStatus ? "productDeactivated" : "productActivated";

  redirect(`/admin/products?toast=${toastKey}`);
}

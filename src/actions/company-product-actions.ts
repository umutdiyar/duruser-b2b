"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/auth-guards";

function parseCustomPrice(formData: FormData, productId: string): number | null {
  const raw = formData.get(`customPrice-${productId}`);
  const trimmed = typeof raw === "string" ? raw.trim() : "";

  if (trimmed === "") {
    return null;
  }

  const parsed = Number(trimmed);

  if (!Number.isFinite(parsed) || parsed < 0) {
    throw new Error(
      "Girilen özel fiyatlardan biri geçersiz. Fiyat 0 veya daha büyük bir sayı olmalı.",
    );
  }

  return parsed;
}

export async function updateCompanyProducts(formData: FormData) {
  await requireAdmin();

  const companyId = formData.get("companyId") as string;

  if (!companyId) {
    throw new Error("Firma bulunamadı.");
  }

  const assignedProductIds = new Set(formData.getAll("productIds") as string[]);

  const allProducts = await prisma.product.findMany({
    select: {
      id: true,
    },
  });

  // Removing a product's authorization deletes its CompanyProduct row
  // entirely, including any custom price. Re-authorizing it later starts
  // clean with no custom price unless one is entered in the same save — this
  // keeps "authorized" and "has pricing data" from ever silently diverging.
  const operations = allProducts.map(({ id: productId }) => {
    const isAssigned = assignedProductIds.has(productId);

    if (!isAssigned) {
      return prisma.companyProduct.deleteMany({
        where: {
          companyId,
          productId,
        },
      });
    }

    const customPrice = parseCustomPrice(formData, productId);

    return prisma.companyProduct.upsert({
      where: {
        companyId_productId: {
          companyId,
          productId,
        },
      },
      create: {
        companyId,
        productId,
        customPrice,
      },
      update: {
        customPrice,
      },
    });
  });

  await prisma.$transaction(operations);

  revalidatePath(`/admin/customers/${companyId}`);

  redirect(`/admin/customers/${companyId}?toast=productsUpdated`);
}

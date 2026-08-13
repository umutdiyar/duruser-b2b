"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/auth-guards";

export async function updateCompanyProducts(formData: FormData) {
  await requireAdmin();

  const companyId = formData.get("companyId") as string;
  const productIds = formData.getAll("productIds") as string[];

  if (!companyId) {
    throw new Error("Firma bulunamadı.");
  }

  await prisma.companyProduct.deleteMany({
    where: {
      companyId,
    },
  });

  if (productIds.length > 0) {
    await prisma.companyProduct.createMany({
      data: productIds.map((productId) => ({
        companyId,
        productId,
      })),
      skipDuplicates: true,
    });
  }

  revalidatePath(`/admin/customers/${companyId}`);

  redirect(`/admin/customers/${companyId}?toast=productsUpdated`);
}

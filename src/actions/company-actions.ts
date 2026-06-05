"use server";

import { redirect } from "next/navigation";

import { prisma } from "@/lib/prisma";

export async function deleteCompanyAction(companyId: string) {
  await prisma.companyProduct.deleteMany({
    where: {
      companyId,
    },
  });

  await prisma.user.deleteMany({
    where: {
      companyId,
    },
  });

  await prisma.order.deleteMany({
    where: {
      companyId,
    },
  });

  await prisma.company.delete({
    where: {
      id: companyId,
    },
  });

  redirect("/admin/customers");
}

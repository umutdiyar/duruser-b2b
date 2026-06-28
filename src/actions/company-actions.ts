"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { prisma } from "@/lib/prisma";

function createSlug(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replaceAll("ı", "i")
    .replaceAll("ğ", "g")
    .replaceAll("ü", "u")
    .replaceAll("ş", "s")
    .replaceAll("ö", "o")
    .replaceAll("ç", "c")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export async function createCompanyAction(formData: FormData) {
  const name = formData.get("name") as string;
  const rawSlug = formData.get("slug") as string;

  if (!name?.trim()) {
    throw new Error("Firma adı zorunludur.");
  }

  const slug = rawSlug?.trim() ? createSlug(rawSlug) : createSlug(name);

  const existingCompany = await prisma.company.findUnique({
    where: {
      slug,
    },
  });

  if (existingCompany) {
    redirect("/admin/customers/new?toast=unexpectedError");
  }

  await prisma.company.create({
    data: {
      name: name.trim(),
      slug,
    },
  });

  revalidatePath("/admin/customers");

  redirect("/admin/customers?toast=companyCreated");
}

export async function updateCompanyAction(formData: FormData) {
  const companyId = formData.get("companyId") as string;
  const name = formData.get("name") as string;
  const rawSlug = formData.get("slug") as string;

  if (!companyId) {
    throw new Error("Firma bulunamadı.");
  }

  if (!name?.trim()) {
    throw new Error("Firma adı zorunludur.");
  }

  const slug = rawSlug?.trim() ? createSlug(rawSlug) : createSlug(name);

  const existingCompany = await prisma.company.findFirst({
    where: {
      slug,
      NOT: {
        id: companyId,
      },
    },
  });

  if (existingCompany) {
    redirect(`/admin/customers/${companyId}/edit?toast=unexpectedError`);
  }

  await prisma.company.update({
    where: {
      id: companyId,
    },
    data: {
      name: name.trim(),
      slug,
    },
  });

  revalidatePath("/admin/customers");
  revalidatePath(`/admin/customers/${companyId}`);
  revalidatePath(`/admin/customers/${companyId}/edit`);

  redirect("/admin/customers?toast=companyUpdated");
}

export async function toggleCompanyStatusAction(formData: FormData) {
  const companyId = formData.get("companyId") as string;
  const currentStatus = formData.get("currentStatus") === "true";

  if (!companyId) {
    throw new Error("Firma bulunamadı.");
  }

  await prisma.company.update({
    where: {
      id: companyId,
    },
    data: {
      isActive: !currentStatus,
    },
  });

  revalidatePath("/admin/customers");
  revalidatePath(`/admin/customers/${companyId}`);

  const toastKey = currentStatus ? "companyDeactivated" : "companyActivated";

  redirect(`/admin/customers?toast=${toastKey}`);
}

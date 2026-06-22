"use server";

import bcrypt from "bcryptjs";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { prisma } from "@/lib/prisma";

export async function createCompanyUserAction(formData: FormData) {
  const companyId = formData.get("companyId") as string;
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!companyId) {
    throw new Error("Firma bulunamadı.");
  }

  if (!name?.trim()) {
    throw new Error("Kullanıcı adı zorunludur.");
  }

  if (!email?.trim()) {
    throw new Error("Email zorunludur.");
  }

  if (!password || password.length < 6) {
    throw new Error("Şifre en az 6 karakter olmalıdır.");
  }

  const existingUser = await prisma.user.findUnique({
    where: {
      email: email.trim().toLowerCase(),
    },
  });

  if (existingUser) {
    redirect(`/admin/customers/${companyId}?toast=unexpectedError`);
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await prisma.user.create({
    data: {
      name: name.trim(),
      email: email.trim().toLowerCase(),
      password: hashedPassword,
      role: "CUSTOMER",
      companyId,
    },
  });

  revalidatePath(`/admin/customers/${companyId}`);

  redirect(`/admin/customers/${companyId}?toast=userCreated`);
}

export async function updateCompanyUserAction(formData: FormData) {
  const userId = formData.get("userId") as string;
  const companyId = formData.get("companyId") as string;
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!userId || !companyId) {
    throw new Error("Kullanıcı veya firma bulunamadı.");
  }

  if (!name?.trim()) {
    throw new Error("Kullanıcı adı zorunludur.");
  }

  if (!email?.trim()) {
    throw new Error("Email zorunludur.");
  }

  const existingUser = await prisma.user.findFirst({
    where: {
      email: email.trim().toLowerCase(),
      NOT: {
        id: userId,
      },
    },
  });

  if (existingUser) {
    redirect(
      `/admin/customers/${companyId}/users/${userId}/edit?toast=unexpectedError`,
    );
  }

  await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      name: name.trim(),
      email: email.trim().toLowerCase(),
      ...(password
        ? {
            password: await bcrypt.hash(password, 10),
          }
        : {}),
    },
  });

  revalidatePath(`/admin/customers/${companyId}`);
  revalidatePath(`/admin/customers/${companyId}/users/${userId}/edit`);

  redirect(`/admin/customers/${companyId}?toast=userUpdated`);
}

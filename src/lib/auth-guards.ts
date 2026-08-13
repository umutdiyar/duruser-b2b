import { redirect } from "next/navigation";

import { auth } from "@/auth";

export async function requireAuthenticatedUser() {
  const session = await auth();

  if (!session || !session.user || !session.user.role) {
    redirect("/login");
  }

  return session;
}

export async function requireAdmin() {
  const session = await requireAuthenticatedUser();

  if (session.user.role !== "ADMIN") {
    redirect("/unauthorized");
  }

  return session;
}

export async function requireCustomer() {
  const session = await requireAuthenticatedUser();

  if (session.user.role !== "CUSTOMER") {
    redirect("/unauthorized");
  }

  if (!session.user.companyId) {
    redirect("/unauthorized");
  }

  return { session, companyId: session.user.companyId };
}

export const dynamic = "force-dynamic";

import { redirect } from "next/navigation";

import { auth } from "../../../auth";

import { DashboardShell } from "@/components/layout/dashboard-shell";

export default async function CustomerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session || !session.user || !session.user.role) {
    redirect("/login");
  }

  if (session.user.role !== "CUSTOMER") {
    redirect("/unauthorized");
  }

  return <DashboardShell role="customer">{children}</DashboardShell>;
}

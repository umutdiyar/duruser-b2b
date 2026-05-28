export const dynamic = "force-dynamic";

import { redirect } from "next/navigation";

import { auth } from "../../../auth";

import { DashboardShell } from "@/components/layout/dashboard-shell";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session || !session.user || !session.user.role) {
    redirect("/login");
  }

  if (session.user.role !== "ADMIN") {
    redirect("/unauthorized");
  }

  return <DashboardShell role="admin">{children}</DashboardShell>;
}

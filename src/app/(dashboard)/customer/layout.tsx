import { auth } from "../../../auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
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

  const company = session?.user?.companyId
    ? await prisma.company.findUnique({
        where: {
          id: session.user.companyId,
        },
        select: {
          name: true,
        },
      })
    : null;

  return (
    <DashboardShell
      role="customer"
      user={{
        name: session?.user?.name,
        email: session?.user?.email,
        companyName: company?.name,
      }}
    >
      {children}
    </DashboardShell>
  );
}

import { DashboardSidebar } from "@/components/layout/dashboard-sidebar";

type DashboardShellProps = {
  children: React.ReactNode;
  role: "admin" | "customer";
};

export function DashboardShell({ children, role }: DashboardShellProps) {
  return (
    <div className="min-h-screen bg-[#f5f7fb]">
      <DashboardSidebar role={role} />

      <main className="min-h-screen flex-1 lg:ml-[290px]">{children}</main>
    </div>
  );
}

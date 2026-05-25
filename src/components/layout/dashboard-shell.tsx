import { DashboardSidebar } from "@/components/layout/dashboard-sidebar";

type DashboardShellProps = {
  children: React.ReactNode;
  role: "admin" | "customer";
};

export function DashboardShell({ children, role }: DashboardShellProps) {
  return (
    <div className="min-h-screen bg-[#f8fafc]">
      <div className="flex">
        <DashboardSidebar role={role} />

        <main className="min-h-screen flex-1 overflow-hidden">{children}</main>
      </div>
    </div>
  );
}

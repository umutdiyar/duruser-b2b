import { DashboardSidebar } from "@/components/layout/dashboard-sidebar";

type DashboardShellProps = {
  children: React.ReactNode;
  role: "admin" | "customer";
};

export function DashboardShell({ children, role }: DashboardShellProps) {
  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-[#f5f7fb]">
      <DashboardSidebar role={role} />

      <main className="min-h-screen w-full min-w-0 lg:ml-[290px] lg:w-[calc(100%-290px)]">
        {children}
      </main>
    </div>
  );
}

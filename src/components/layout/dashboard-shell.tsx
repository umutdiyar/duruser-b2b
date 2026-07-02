import { DashboardSidebar } from "@/components/layout/dashboard-sidebar";

type DashboardShellProps = {
  children: React.ReactNode;
  role: "admin" | "customer";
  user?: {
    name?: string | null;
    email?: string | null;
    companyName?: string | null;
  };
};

export function DashboardShell({ children, role, user }: DashboardShellProps) {
  return (
    <div className="isolate min-h-screen w-full overflow-x-hidden bg-[#f5f7fb]">
      <DashboardSidebar role={role} user={user} />

      <main className="min-h-screen w-full min-w-0 lg:ml-[290px] lg:w-[calc(100%-290px)]">
        {children}
      </main>
    </div>
  );
}

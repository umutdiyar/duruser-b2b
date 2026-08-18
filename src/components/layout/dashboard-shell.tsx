"use client";

import { useState } from "react";

import { DashboardSidebar } from "@/components/layout/dashboard-sidebar";
import { cn } from "@/lib/utils";

type DashboardShellProps = {
  children: React.ReactNode;
  role: "admin" | "customer";
  user?: {
    name?: string | null;
    email?: string | null;
    companyName?: string | null;
  };
};

// Collapse state is intentionally session-only (not persisted to
// localStorage): persisting it would need a blocking inline script (or
// accept a layout flash on first paint) to avoid a hydration mismatch, and
// visual stability was prioritized over remembering the preference across
// reloads.
export function DashboardShell({ children, role, user }: DashboardShellProps) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="isolate min-h-screen w-full overflow-x-hidden bg-background">
      <DashboardSidebar
        role={role}
        user={user}
        collapsed={collapsed}
        onToggleCollapsed={() => setCollapsed((prev) => !prev)}
      />

      <main
        className={cn(
          "min-h-screen w-full min-w-0 transition-[margin-left,width] duration-200 ease-out",
          collapsed
            ? "lg:ml-[76px] lg:w-[calc(100%-76px)]"
            : "lg:ml-[248px] lg:w-[calc(100%-248px)]",
        )}
      >
        {children}
      </main>
    </div>
  );
}

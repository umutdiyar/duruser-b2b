"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";

import { cn } from "@/lib/utils";
import { Logo } from "@/components/shared/logo";

import { adminNavigation, customerNavigation } from "@/constants/navigation";

import { Button } from "@/components/ui/button";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

type DashboardSidebarProps = {
  role: "admin" | "customer";
};

function SidebarContent({ role }: DashboardSidebarProps) {
  const pathname = usePathname();

  const navigation = role === "admin" ? adminNavigation : customerNavigation;

  return (
    <div className="flex h-full flex-col">
      <div className="border-b px-6 py-5">
        <Logo />
      </div>

      <nav className="flex-1 space-y-1 p-4">
        {navigation.map((item) => {
          const Icon = item.icon;

          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "group flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition-all duration-200",
                isActive
                  ? "bg-primary text-white shadow-lg shadow-primary/20"
                  : "text-muted-foreground hover:bg-secondary hover:text-foreground",
              )}
            >
              <Icon className="h-4 w-4" />

              {item.title}
            </Link>
          );
        })}
      </nav>

      <div className="border-t p-4">
        <div className="rounded-2xl bg-secondary p-4">
          <p className="text-sm font-medium">DuruSer B2B</p>

          <p className="mt-1 text-xs text-muted-foreground">
            Sipariş yönetim sistemi
          </p>
        </div>
      </div>
    </div>
  );
}

export function DashboardSidebar({ role }: DashboardSidebarProps) {
  return (
    <>
      {/* Desktop */}
      <aside className="hidden h-screen w-72 border-r bg-white lg:block">
        <SidebarContent role={role} />
      </aside>

      {/* Mobile */}
      <div className="lg:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button
              size="icon"
              variant="outline"
              className="fixed left-4 top-4 z-50"
            >
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>

          <SheetContent side="left" className="w-72 p-0">
            <SidebarContent role={role} />
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
}

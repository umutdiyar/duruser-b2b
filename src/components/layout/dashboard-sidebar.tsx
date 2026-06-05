"use client";

import Link from "next/link";

import { usePathname } from "next/navigation";

import {
  LayoutDashboard,
  Menu,
  Package,
  Settings,
  ShoppingCart,
  Users,
  X,
} from "lucide-react";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const adminLinks = [
  {
    label: "Dashboard",
    href: "/admin/dashboard",
    icon: LayoutDashboard,
  },

  {
    label: "Siparişler",
    href: "/admin/orders",
    icon: ShoppingCart,
  },

  {
    label: "Müşteriler",
    href: "/admin/customers",
    icon: Users,
  },

  {
    label: "Ürünler",
    href: "/admin/products",
    icon: Package,
  },

  {
    label: "Ayarlar",
    href: "/admin/settings",
    icon: Settings,
  },
];

const customerLinks = [
  {
    label: "Dashboard",
    href: "/customer/dashboard",
    icon: LayoutDashboard,
  },

  {
    label: "Ürünlerim",
    href: "/customer/products",
    icon: Package,
  },

  {
    label: "Yeni Sipariş",
    href: "/customer/new-order",
    icon: ShoppingCart,
  },

  {
    label: "Siparişlerim",
    href: "/customer/orders",
    icon: Package,
  },
];

type DashboardSidebarProps = {
  role: "admin" | "customer";
};

function SidebarContent({ role }: DashboardSidebarProps) {
  const pathname = usePathname();

  const links = role === "admin" ? adminLinks : customerLinks;

  return (
    <div className="flex h-full flex-col bg-white">
      {/* TOP */}

      <div className="border-b px-6 py-6">
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-500 to-orange-600 text-lg font-bold text-white shadow-lg shadow-orange-500/30">
            D
          </div>

          <div>
            <h2 className="text-lg font-bold tracking-tight text-slate-900">
              DuruSer
            </h2>

            <p className="text-sm text-slate-500">Sipariş Paneli</p>
          </div>
        </div>
      </div>

      {/* NAV */}

      <div className="flex-1 overflow-y-auto px-4 py-6">
        <nav className="space-y-2">
          {links.map((link) => {
            const Icon = link.icon;

            const isActive = pathname === link.href;

            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "group flex h-14 items-center gap-4 rounded-2xl px-5 text-sm font-medium transition-all duration-200",

                  isActive
                    ? "bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg shadow-orange-500/25"
                    : "text-slate-600 hover:bg-orange-50 hover:text-orange-600",
                )}
              >
                <Icon
                  className={cn(
                    "h-5 w-5 transition",

                    isActive
                      ? "text-white"
                      : "text-slate-400 group-hover:text-orange-500",
                  )}
                />

                {link.label}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* BOTTOM */}

      <div className="border-t p-5">
        <div className="rounded-3xl bg-gradient-to-br from-slate-50 to-slate-100 p-5">
          <p className="text-sm font-semibold text-slate-900">DuruSer B2B</p>

          <p className="mt-1 text-xs leading-relaxed text-slate-500">
            Modern sipariş yönetim sistemi
          </p>
        </div>
      </div>
    </div>
  );
}

export function DashboardSidebar({ role }: DashboardSidebarProps) {
  return (
    <>
      {/* DESKTOP */}

      <aside className="fixed left-0 top-0 z-40 hidden h-screen w-[290px] border-r border-white/20 bg-white/80 backdrop-blur-xl lg:flex">
        <SidebarContent role={role} />
      </aside>

      {/* MOBILE */}

      <div className="fixed left-4 top-3 z-50 lg:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button
              size="icon"
              className="fixed left-4 top-4 z-50 h-11 w-11 rounded-full shadow-lg lg:hidden"
            >
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>

          <SheetContent side="left" className="w-[300px] p-0">
            <SidebarContent role={role} />
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
}

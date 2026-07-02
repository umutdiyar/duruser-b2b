"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

import { Menu, X } from "lucide-react";

import { cn } from "@/lib/utils";
import { adminNavigation, customerNavigation } from "@/constants/navigation";

type DashboardSidebarProps = {
  role: "admin" | "customer";
  user?: {
    name?: string | null;
    email?: string | null;
    companyName?: string | null;
  };
};

function SidebarContent({
  role,
  user,
  onNavigate,
}: DashboardSidebarProps & {
  onNavigate?: () => void;
}) {
  const pathname = usePathname();

  const links = role === "admin" ? adminNavigation : customerNavigation;

  return (
    <div className="flex h-full min-h-0 flex-col bg-white">
      <div className="shrink-0 border-b px-5 py-5 sm:px-6 sm:py-6">
        <div className="flex min-w-0 items-center gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-500 to-orange-600 text-base font-bold text-white shadow-lg shadow-orange-500/30 sm:h-14 sm:w-14 sm:text-lg">
            D
          </div>

          <div className="min-w-0">
            <h2 className="truncate text-base font-bold tracking-tight text-slate-900 sm:text-lg">
              DuruSer
            </h2>

            <p className="truncate text-xs text-slate-500 sm:text-sm">
              Sipariş Paneli
            </p>
          </div>
        </div>
      </div>

      <div className="mt-5 rounded-3xl mx-4 border border-orange-100 bg-gradient-to-br from-orange-50 to-white p-4">
        <div className="flex items-start gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-orange-500 text-sm font-bold text-white shadow-lg shadow-orange-500/25">
            {role === "admin"
              ? "D"
              : (user?.companyName?.charAt(0)?.toUpperCase() ?? "F")}
          </div>

          <div className="min-w-0">
            <p className="truncate text-sm font-bold text-slate-900">
              {role === "admin"
                ? "DuruSer Yönetim"
                : (user?.companyName ?? "Firma Paneli")}
            </p>

            <p className="mt-1 truncate text-xs text-slate-500">
              {user?.name ?? "Kullanıcı"}
            </p>

            <p className="mt-1 truncate text-[11px] text-slate-400">
              {user?.email ?? "email bilgisi yok"}
            </p>
          </div>
        </div>
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto px-4 py-5">
        <nav className="space-y-2">
          {links.map((link) => {
            const Icon = link.icon;

            const isActive =
              pathname === link.href || pathname.startsWith(`${link.href}/`);

            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={onNavigate}
                className={cn(
                  "group flex h-12 min-w-0 items-center gap-3 rounded-2xl px-4 text-sm font-medium transition-all duration-200 sm:h-14 sm:gap-4 sm:px-5",
                  isActive
                    ? "bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg shadow-orange-500/25"
                    : "text-slate-600 hover:bg-orange-50 hover:text-orange-600",
                )}
              >
                <Icon
                  className={cn(
                    "h-5 w-5 shrink-0 transition",
                    isActive
                      ? "text-white"
                      : "text-slate-400 group-hover:text-orange-500",
                  )}
                />

                <span className="truncate">{link.title}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="shrink-0 border-t p-4 sm:p-5">
        <div className="rounded-3xl bg-gradient-to-br from-slate-50 to-slate-100 p-4 sm:p-5">
          <p className="text-sm font-semibold text-slate-900">DuruSer B2B</p>

          <p className="mt-1 text-xs leading-relaxed text-slate-500">
            Modern sipariş yönetim sistemi
          </p>
        </div>
      </div>
    </div>
  );
}

export function DashboardSidebar({ role, user }: DashboardSidebarProps) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      <aside className="fixed left-0 top-0 z-50 hidden h-screen w-[290px] border-r border-slate-200 bg-white/90 backdrop-blur-xl lg:block">
        <SidebarContent role={role} user={user} />
      </aside>

      <button
        type="button"
        aria-label="Menüyü aç"
        onClick={() => setIsOpen(true)}
        className="fixed left-4 top-4 z-[200] flex h-11 w-11 items-center justify-center rounded-full bg-orange-500 text-white shadow-xl shadow-orange-500/25 transition hover:bg-orange-600 active:scale-95 lg:hidden"
      >
        <Menu className="h-5 w-5" />
      </button>

      {isOpen ? (
        <div className="fixed inset-0 z-[300] lg:hidden">
          <button
            type="button"
            aria-label="Menüyü kapat"
            onClick={() => setIsOpen(false)}
            className="absolute inset-0 h-full w-full bg-slate-950/40 backdrop-blur-sm"
          />

          <aside className="absolute left-0 top-0 h-full w-[290px] max-w-[85vw] overflow-hidden bg-white shadow-2xl">
            <button
              type="button"
              aria-label="Menüyü kapat"
              onClick={() => setIsOpen(false)}
              className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-slate-600 transition hover:bg-slate-200 active:scale-95"
            >
              <X className="h-5 w-5" />
            </button>

            <SidebarContent
              role={role}
              user={user}
              onNavigate={() => setIsOpen(false)}
            />
          </aside>
        </div>
      ) : null}
    </>
  );
}

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";

import { LogOut, Menu, PanelLeftClose, PanelLeftOpen, X } from "lucide-react";

import { cn } from "@/lib/utils";
import { adminNavigation, customerNavigation, type NavItem } from "@/constants/navigation";
import { branding } from "@/config/branding";
import { logoutAction } from "@/actions/auth-actions";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

type SidebarUser = {
  name?: string | null;
  email?: string | null;
  companyName?: string | null;
};

type DashboardSidebarProps = {
  role: "admin" | "customer";
  user?: SidebarUser;
  collapsed: boolean;
  onToggleCollapsed: () => void;
};

function NavLink({
  href,
  title,
  Icon,
  collapsed,
  onNavigate,
}: {
  href: string;
  title: string;
  Icon: NavItem["icon"];
  collapsed: boolean;
  onNavigate?: () => void;
}) {
  const pathname = usePathname();
  const isActive = pathname === href || pathname.startsWith(`${href}/`);

  const link = (
    <Link
      href={href}
      onClick={onNavigate}
      aria-current={isActive ? "page" : undefined}
      aria-label={collapsed ? title : undefined}
      className={cn(
        "group relative flex h-11 min-w-0 items-center gap-3 rounded-xl px-3 text-sm font-medium transition-colors duration-150",
        collapsed && "justify-center px-0",
        isActive
          ? "bg-orange-50 text-orange-600"
          : "text-slate-600 hover:bg-slate-100 hover:text-slate-900",
      )}
    >
      {isActive ? (
        <span className="absolute left-0 top-1/2 h-5 w-[3px] -translate-y-1/2 rounded-full bg-orange-500" />
      ) : null}

      <Icon
        className={cn(
          "h-[18px] w-[18px] shrink-0 transition-colors",
          isActive ? "text-orange-600" : "text-slate-400 group-hover:text-slate-600",
        )}
      />

      <span
        className={cn(
          "truncate transition-[opacity,width] duration-150",
          collapsed && "w-0 overflow-hidden opacity-0",
        )}
      >
        {title}
      </span>
    </Link>
  );

  if (!collapsed) return link;

  return (
    <Tooltip>
      <TooltipTrigger asChild>{link}</TooltipTrigger>
      <TooltipContent side="right">{title}</TooltipContent>
    </Tooltip>
  );
}

function SidebarBrand({
  collapsed,
  onToggleCollapsed,
}: {
  collapsed: boolean;
  onToggleCollapsed?: () => void;
}) {
  return (
    <div
      className={cn(
        "flex shrink-0 items-center gap-3 border-b px-4 py-4",
        collapsed && "flex-col gap-2 px-2 py-3",
      )}
    >
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 text-sm font-bold text-white shadow-sm shadow-orange-500/30">
        {branding.shortName}
      </div>

      {collapsed ? null : (
        <div className="min-w-0 flex-1">
          <h2 className="truncate text-sm font-bold tracking-tight text-slate-900">
            {branding.companyName}
          </h2>
          <p className="truncate text-xs text-slate-500">{branding.tagline}</p>
        </div>
      )}

      {onToggleCollapsed ? (
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              type="button"
              onClick={onToggleCollapsed}
              aria-label={collapsed ? "Menüyü genişlet" : "Menüyü daralt"}
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500/40"
            >
              {collapsed ? (
                <PanelLeftOpen className="h-[18px] w-[18px]" />
              ) : (
                <PanelLeftClose className="h-[18px] w-[18px]" />
              )}
            </button>
          </TooltipTrigger>
          <TooltipContent side="right">
            {collapsed ? "Menüyü genişlet" : "Menüyü daralt"}
          </TooltipContent>
        </Tooltip>
      ) : null}
    </div>
  );
}

function SidebarFooter({
  role,
  user,
  collapsed,
}: {
  role: "admin" | "customer";
  user?: SidebarUser;
  collapsed: boolean;
}) {
  const displayName =
    role === "admin" ? `${branding.companyName} Yönetim` : (user?.companyName ?? "Firma Paneli");
  const secondaryLine = user?.name ?? "Kullanıcı";
  const initial =
    role === "admin"
      ? branding.shortName
      : (user?.companyName?.charAt(0)?.toUpperCase() ?? "F");

  const avatar = (
    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-orange-500 text-sm font-bold text-white shadow-sm shadow-orange-500/25">
      {initial}
    </div>
  );

  const logoutButton = (
    <Tooltip>
      <TooltipTrigger asChild>
        <button
          type="button"
          aria-label="Çıkış Yap"
          onClick={() => logoutAction()}
          className={cn(
            "flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-destructive/10 hover:text-destructive focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-destructive/40",
          )}
        >
          <LogOut className="h-[18px] w-[18px]" />
        </button>
      </TooltipTrigger>
      <TooltipContent side={collapsed ? "right" : "top"}>Çıkış Yap</TooltipContent>
    </Tooltip>
  );

  if (collapsed) {
    return (
      <div className="mt-auto flex shrink-0 flex-col items-center gap-2 border-t p-2">
        <Tooltip>
          <TooltipTrigger asChild>
            <div
              tabIndex={0}
              aria-label={`${displayName}, ${secondaryLine}${user?.email ? `, ${user.email}` : ""}`}
              className="flex h-10 w-10 cursor-default items-center justify-center rounded-xl bg-orange-500 text-sm font-bold text-white shadow-sm shadow-orange-500/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500/40"
            >
              {initial}
            </div>
          </TooltipTrigger>
          <TooltipContent side="right" className="text-left">
            <p className="font-semibold">{displayName}</p>
            <p className="text-slate-300">{secondaryLine}</p>
            {user?.email ? <p className="text-slate-300">{user.email}</p> : null}
          </TooltipContent>
        </Tooltip>

        {logoutButton}
      </div>
    );
  }

  return (
    <div className="mt-auto flex shrink-0 items-center gap-3 border-t p-3">
      {avatar}

      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-semibold text-slate-900">{displayName}</p>
        <p className="truncate text-xs text-slate-500">{secondaryLine}</p>
        {user?.email ? (
          <p className="truncate text-xs text-slate-400">{user.email}</p>
        ) : null}
      </div>

      {logoutButton}
    </div>
  );
}

function SidebarContent({
  role,
  user,
  collapsed,
  onNavigate,
  onToggleCollapsed,
}: {
  role: "admin" | "customer";
  user?: SidebarUser;
  collapsed: boolean;
  onNavigate?: () => void;
  onToggleCollapsed?: () => void;
}) {
  const items = role === "admin" ? adminNavigation : customerNavigation;

  return (
    <div className="flex h-full min-h-0 flex-col bg-white">
      <SidebarBrand collapsed={collapsed} onToggleCollapsed={onToggleCollapsed} />

      <nav
        aria-label="Ana navigasyon"
        className="min-h-0 flex-1 overflow-y-auto overflow-x-hidden px-3 py-3"
      >
        <div className="space-y-1">
          {items.map((item) => (
            <NavLink
              key={item.href}
              href={item.href}
              title={item.title}
              Icon={item.icon}
              collapsed={collapsed}
              onNavigate={onNavigate}
            />
          ))}
        </div>
      </nav>

      <SidebarFooter role={role} user={user} collapsed={collapsed} />
    </div>
  );
}

export function DashboardSidebar({
  role,
  user,
  collapsed,
  onToggleCollapsed,
}: DashboardSidebarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const openButtonRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    closeButtonRef.current?.focus();

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
        openButtonRef.current?.focus();
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  return (
    <>
      <aside
        className={cn(
          "fixed left-0 top-0 z-50 hidden h-screen border-r border-slate-200 bg-white/90 backdrop-blur-xl transition-[width] duration-200 ease-out lg:flex lg:flex-col",
          collapsed ? "lg:w-[76px]" : "lg:w-[248px]",
        )}
      >
        <SidebarContent
          role={role}
          user={user}
          collapsed={collapsed}
          onToggleCollapsed={onToggleCollapsed}
        />
      </aside>

      <button
        ref={openButtonRef}
        type="button"
        aria-label="Menüyü aç"
        aria-expanded={isOpen}
        onClick={() => setIsOpen(true)}
        className="fixed left-4 top-4 z-[200] flex h-11 w-11 items-center justify-center rounded-full bg-orange-500 text-white shadow-xl shadow-orange-500/25 transition hover:bg-orange-600 active:scale-95 lg:hidden"
      >
        <Menu className="h-5 w-5" />
      </button>

      {isOpen ? (
        <div
          className="fixed inset-0 z-[300] lg:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Gezinme menüsü"
        >
          <button
            type="button"
            aria-label="Menüyü kapat"
            onClick={() => setIsOpen(false)}
            className="animate-in fade-in absolute inset-0 h-full w-full bg-slate-950/40 backdrop-blur-sm duration-200"
          />

          <aside className="animate-in slide-in-from-left absolute left-0 top-0 h-full w-[min(300px,calc(100vw-24px))] overflow-hidden bg-white shadow-2xl duration-300">
            <button
              ref={closeButtonRef}
              type="button"
              aria-label="Menüyü kapat"
              onClick={() => setIsOpen(false)}
              className="absolute right-4 top-4 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-slate-100 text-slate-600 transition hover:bg-slate-200 active:scale-95"
            >
              <X className="h-5 w-5" />
            </button>

            <SidebarContent
              role={role}
              user={user}
              collapsed={false}
              onNavigate={() => setIsOpen(false)}
            />
          </aside>
        </div>
      ) : null}
    </>
  );
}

import { Bell, Search, LogOut } from "lucide-react";

import { Button } from "@/components/ui/button";

import { logoutAction } from "@/actions/auth-actions";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";

type DashboardHeaderProps = {
  title: string;
  description?: string;
};

export function DashboardHeader({ title, description }: DashboardHeaderProps) {
  return (
    <header className="sticky top-0 z-30 border-b border-white/20 bg-white/80 backdrop-blur-xl">
      <div className="flex min-h-16 items-center justify-between gap-4 pl-16 pr-4 py-3 sm:px-6 lg:min-h-20 lg:px-10 lg:pl-10 md:pl-16">
        {" "}
        {/* LEFT */}
        <div className="min-w-0 flex-1 lg:flex-none">
          <h1 className="truncate text-xl lg:text-3xl font-bold tracking-tight text-slate-900 ">
            {title}
          </h1>

          {description ? (
            <p className="mt-1 hidden text-sm text-slate-500 lg:block">
              {description}
            </p>
          ) : null}
        </div>
        {/* RIGHT */}
        <div className="flex items-center gap-2 lg:gap-3">
          {/* SEARCH */}

          <Button
            size="icon"
            variant="outline"
            className="hidden rounded-2xl border-slate-200 bg-white md:flex"
          >
            <Search className="h-4 w-4" />
          </Button>

          {/* NOTIFICATION */}

          <Button
            size="icon"
            variant="outline"
            className="rounded-2xl border-slate-200 bg-white"
          >
            <Bell className="h-4 w-4" />
          </Button>

          {/* LOGOUT */}

          <form action={logoutAction}>
            <Button
              variant="outline"
              className="rounded-2xl border-slate-200 bg-white"
            >
              <LogOut className="h-4 w-4 lg:mr-2" />

              <span className="hidden lg:inline">Çıkış Yap</span>
            </Button>
          </form>
        </div>
      </div>
    </header>
  );
}

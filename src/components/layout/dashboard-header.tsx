import { Bell, LogOut, Search } from "lucide-react";

import { logoutAction } from "@/actions/auth-actions";
import { Button } from "@/components/ui/button";

type DashboardHeaderProps = {
  title: string;
  description?: string;
};

export function DashboardHeader({ title, description }: DashboardHeaderProps) {
  return (
    <header className="sticky top-0 z-40 border-b border-white/20 bg-white/85 backdrop-blur-xl">
      <div className="flex min-h-[72px] items-center justify-between gap-3 py-3 pl-20 pr-4 sm:pl-24 sm:px-6 lg:min-h-20 lg:px-10">
        {" "}
        <div className="min-w-0 flex-1">
          <h1 className="truncate text-lg font-bold tracking-tight sm:text-xl lg:text-3xl ">
            {" "}
            {title}
          </h1>

          {description ? (
            <p className="mt-1 hidden text-sm text-slate-500 lg:block">
              {description}
            </p>
          ) : null}
        </div>
        <div className="flex shrink-0 items-center gap-2 lg:gap-3">
          <Button
            size="icon"
            variant="outline"
            className="hidden rounded-2xl border-slate-200 bg-white md:flex"
          >
            <Search className="h-4 w-4" />
          </Button>

          <Button
            size="icon"
            variant="outline"
            className="rounded-2xl border-slate-200 bg-white"
          >
            <Bell className="h-4 w-4" />
          </Button>

          <form action={logoutAction}>
            <Button
              variant="outline"
              className="rounded-2xl border-slate-200 bg-white px-3 lg:px-4"
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

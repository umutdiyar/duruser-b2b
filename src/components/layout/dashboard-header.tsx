import { Bell, LogOut, Search } from "lucide-react";

import { logoutAction } from "@/actions/auth-actions";
import { Button } from "@/components/ui/button";
import { SubmitButton } from "@/components/shared/submit-button";

type DashboardHeaderProps = {
  title: string;
  description?: string;
  actions?: React.ReactNode;
};

export function DashboardHeader({
  title,
  description,
  actions,
}: DashboardHeaderProps) {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/90 backdrop-blur-xl">
      <div className="flex min-h-[72px] items-center justify-between gap-3 py-3 pl-20 pr-4 sm:px-6 lg:min-h-20 lg:px-10 ">
        <div className="min-w-0 flex-1">
          <h1 className="truncate text-lg font-bold tracking-tight text-slate-900 sm:text-2xl lg:text-3xl">
            {title}
          </h1>

          {description ? (
            <p className="mt-1 hidden truncate text-sm text-slate-500 md:block">
              {description}
            </p>
          ) : null}
        </div>

        <div className="flex shrink-0 items-center gap-2 lg:gap-3">
          {actions ? <div className="hidden md:flex">{actions}</div> : null}

          <Button
            type="button"
            size="icon"
            variant="outline"
            aria-label="Ara"
            className="hidden h-11 w-11 rounded-2xl border-slate-200 bg-white md:inline-flex"
          >
            <Search className="h-4 w-4" />
          </Button>

          <Button
            type="button"
            size="icon"
            variant="outline"
            aria-label="Bildirimler"
            className="h-11 w-11 rounded-2xl border-slate-200 bg-white"
          >
            <Bell className="h-4 w-4" />
          </Button>

          <form action={logoutAction}>
            <SubmitButton
              pendingText="Çıkış yapılıyor..."
              variant="outline"
              aria-label="Çıkış yap"
              className="h-11 rounded-2xl border-slate-200 bg-white px-3 lg:px-4"
            >
              <LogOut className="h-4 w-4 lg:mr-2" />
              <span className="hidden lg:inline">Çıkış Yap</span>
            </SubmitButton>
          </form>
        </div>
      </div>

      {actions ? (
        <div className="border-t border-slate-100 px-4 py-3 sm:hidden">
          {actions}
        </div>
      ) : null}
    </header>
  );
}

import { NotificationBell } from "@/components/layout/notification-bell";

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
      <div className="flex min-h-16 items-center justify-between gap-3 py-2.5 pl-20 pr-4 sm:px-6 lg:min-h-[72px] lg:pl-10 lg:pr-6">
        <div className="min-w-0 flex-1">
          <h1 className="truncate text-lg font-bold tracking-tight text-slate-900 sm:text-xl lg:text-2xl">
            {title}
          </h1>

          {description ? (
            <p className="mt-0.5 hidden truncate text-sm text-slate-500 md:block">
              {description}
            </p>
          ) : null}
        </div>

        <div className="flex shrink-0 items-center gap-2 lg:gap-3">
          {actions ? <div className="hidden md:flex">{actions}</div> : null}

          <NotificationBell />
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

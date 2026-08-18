import type { LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";

type EmptyStateProps = {
  icon?: LucideIcon;
  title: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
};

export function EmptyState({
  icon: Icon,
  title,
  description,
  action,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "animate-in fade-in flex flex-col items-center rounded-3xl border border-dashed bg-white p-8 text-center duration-200 sm:p-10",
        className,
      )}
    >
      {Icon ? (
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-50 text-orange-500">
          <Icon className="h-6 w-6" />
        </div>
      ) : null}

      <h3 className="mt-4 text-base font-bold text-slate-900 sm:text-lg">
        {title}
      </h3>

      {description ? (
        <p className="mt-2 max-w-sm text-sm leading-6 text-muted-foreground">
          {description}
        </p>
      ) : null}

      {action ? <div className="mt-6">{action}</div> : null}
    </div>
  );
}

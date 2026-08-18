import { ChevronDown } from "lucide-react";

import { cn } from "@/lib/utils";

type FilterSelectProps = React.ComponentProps<"select">;

export function FilterSelect({ className, children, ...props }: FilterSelectProps) {
  return (
    <div className="group relative">
      <select
        className={cn(
          "h-11 w-full appearance-none rounded-xl border border-input bg-white px-3 pr-9 text-sm outline-none transition-colors hover:border-slate-300 focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50",
          className,
        )}
        {...props}
      >
        {children}
      </select>

      <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground transition-transform duration-150 group-focus-within:rotate-180" />
    </div>
  );
}

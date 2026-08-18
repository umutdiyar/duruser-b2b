import { cn } from "@/lib/utils";

type FilterSelectProps = React.ComponentProps<"select">;

export function FilterSelect({ className, children, ...props }: FilterSelectProps) {
  return (
    <select
      className={cn(
        "h-11 w-full rounded-xl border border-input bg-transparent px-3 text-sm outline-none transition-colors focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50",
        className,
      )}
      {...props}
    >
      {children}
    </select>
  );
}

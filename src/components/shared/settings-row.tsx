import { cn } from "@/lib/utils";

type SettingsRowProps = {
  label: string;
  value: string;
  valueClassName?: string;
};

export function SettingsRow({ label, value, valueClassName }: SettingsRowProps) {
  return (
    <div className="flex flex-col gap-1 border-b border-slate-100 py-3 last:border-b-0 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
      <p className="text-sm text-muted-foreground">{label}</p>
      <p
        className={cn(
          "truncate text-sm font-semibold text-slate-900 sm:text-right",
          valueClassName,
        )}
      >
        {value}
      </p>
    </div>
  );
}

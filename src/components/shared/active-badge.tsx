import { CheckCircle2, XCircle } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type ActiveBadgeProps = {
  active: boolean;
  activeLabel?: string;
  inactiveLabel?: string;
  className?: string;
};

export function ActiveBadge({
  active,
  activeLabel = "Aktif",
  inactiveLabel = "Pasif",
  className,
}: ActiveBadgeProps) {
  return (
    <Badge
      className={cn(
        "border-0",
        active
          ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-100"
          : "bg-red-100 text-red-700 hover:bg-red-100",
        className,
      )}
    >
      {active ? (
        <CheckCircle2 className="mr-1 h-3 w-3" />
      ) : (
        <XCircle className="mr-1 h-3 w-3" />
      )}
      {active ? activeLabel : inactiveLabel}
    </Badge>
  );
}

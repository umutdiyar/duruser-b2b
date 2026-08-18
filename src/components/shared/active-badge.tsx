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
          ? "bg-success/10 text-success hover:bg-success/10"
          : "bg-destructive/10 text-destructive hover:bg-destructive/10",
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

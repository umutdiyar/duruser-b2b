import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import {
  getOrderStatusClassName,
  getOrderStatusLabel,
} from "@/lib/order-status";
import type { OrderStatus } from "@/generated/prisma/client";

type OrderStatusBadgeProps = {
  status: OrderStatus;
  className?: string;
};

export function OrderStatusBadge({ status, className }: OrderStatusBadgeProps) {
  return (
    <Badge className={cn(getOrderStatusClassName(status), className)}>
      {getOrderStatusLabel(status)}
    </Badge>
  );
}

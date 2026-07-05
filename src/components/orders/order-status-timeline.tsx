import { CheckCircle2, Circle, Clock3 } from "lucide-react";

import type { OrderStatus } from "@/generated/prisma/client";
import { cn } from "@/lib/utils";
import {
  getOrderStatusDescription,
  getOrderStatusLabel,
  orderStatuses,
} from "@/lib/order-status";

type OrderStatusTimelineProps = {
  status: OrderStatus;
};

export function OrderStatusTimeline({ status }: OrderStatusTimelineProps) {
  const currentIndex = orderStatuses.findIndex((item) => item.value === status);
  const isCancelled = status === "CANCELLED";

  const visibleStatuses = isCancelled
    ? orderStatuses.filter((item) =>
        ["PENDING", "CONFIRMED", "CANCELLED"].includes(item.value),
      )
    : orderStatuses.filter((item) => item.value !== "CANCELLED");

  return (
    <div className="space-y-4">
      {visibleStatuses.map((item, index) => {
        const originalIndex = orderStatuses.findIndex(
          (statusItem) => statusItem.value === item.value,
        );

        const isCompleted = !isCancelled && originalIndex < currentIndex;
        const isCurrent = item.value === status;

        return (
          <div key={item.value} className="flex gap-4">
            <div className="flex flex-col items-center">
              <div
                className={cn(
                  "flex h-9 w-9 items-center justify-center rounded-full border bg-white",
                  isCompleted && "border-green-500 bg-green-500 text-white",
                  isCurrent &&
                    !isCancelled &&
                    "border-orange-500 bg-orange-500 text-white",
                  isCurrent &&
                    isCancelled &&
                    "border-red-500 bg-red-500 text-white",
                )}
              >
                {isCompleted ? (
                  <CheckCircle2 className="h-5 w-5" />
                ) : isCurrent ? (
                  <Clock3 className="h-5 w-5" />
                ) : (
                  <Circle className="h-4 w-4 text-slate-300" />
                )}
              </div>

              {index !== visibleStatuses.length - 1 ? (
                <div
                  className={cn(
                    "h-10 w-px bg-slate-200",
                    isCompleted && "bg-green-500",
                  )}
                />
              ) : null}
            </div>

            <div className="min-w-0 pb-4">
              <p
                className={cn(
                  "font-semibold text-slate-900",
                  isCurrent && !isCancelled && "text-orange-600",
                  isCurrent && isCancelled && "text-red-600",
                )}
              >
                {getOrderStatusLabel(item.value)}
              </p>

              <p className="mt-1 text-sm leading-5 text-muted-foreground">
                {getOrderStatusDescription(item.value)}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

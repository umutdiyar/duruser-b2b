import Link from "next/link";
import { SlidersHorizontal, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type FilterBarProps = {
  action: string;
  hasActiveFilters: boolean;
  resetHref: string;
  resultLabel?: string;
  children: React.ReactNode;
};

export function FilterBar({
  action,
  hasActiveFilters,
  resetHref,
  resultLabel,
  children,
}: FilterBarProps) {
  return (
    <Card className="border-0 shadow-sm">
      <CardContent className="p-4 sm:p-5">
        <form method="get" action={action} className="flex flex-col gap-4">
          <div className="flex items-center gap-2 text-xs font-semibold text-muted-foreground">
            <span className="relative inline-flex">
              <SlidersHorizontal className="h-3.5 w-3.5" />
              {hasActiveFilters ? (
                <span className="absolute -top-1 -right-1 h-1.5 w-1.5 rounded-full bg-orange-500" />
              ) : null}
            </span>
            Filtreler
          </div>

          <div className="grid gap-3 rounded-2xl bg-slate-50/70 p-3 sm:grid-cols-2 lg:flex lg:flex-1 lg:flex-wrap lg:items-end lg:gap-3">
            {children}
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p
              className={cn(
                "text-sm",
                hasActiveFilters
                  ? "font-medium text-slate-700"
                  : "text-muted-foreground",
              )}
            >
              {hasActiveFilters
                ? resultLabel
                : "Filtrelemek için ara veya seçim yap"}
            </p>

            <div className="flex gap-2">
              {hasActiveFilters ? (
                <Button
                  asChild
                  variant="ghost"
                  className="h-11 rounded-2xl text-muted-foreground hover:text-foreground"
                >
                  <Link href={resetHref}>
                    <X className="mr-2 h-4 w-4" />
                    Temizle
                  </Link>
                </Button>
              ) : null}

              <Button
                type="submit"
                className="h-11 flex-1 rounded-2xl bg-orange-500 font-semibold hover:bg-orange-600 sm:flex-none sm:px-6"
              >
                Filtrele
              </Button>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

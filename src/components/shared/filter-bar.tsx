import Link from "next/link";
import { Search, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

type FilterBarProps = {
  action: string;
  hasActiveFilters: boolean;
  resetHref: string;
  children: React.ReactNode;
};

export function FilterBar({
  action,
  hasActiveFilters,
  resetHref,
  children,
}: FilterBarProps) {
  return (
    <Card className="border-0 shadow-sm">
      <CardContent className="p-4 sm:p-5">
        <form method="get" action={action} className="flex flex-col gap-4">
          <div className="grid gap-3 sm:grid-cols-2 lg:flex lg:flex-1 lg:flex-wrap lg:items-end lg:gap-3">
            {children}
          </div>

          <div className="flex gap-2">
            <Button
              type="submit"
              className="h-11 flex-1 rounded-2xl bg-orange-500 font-semibold hover:bg-orange-600 sm:flex-none sm:px-6"
            >
              <Search className="mr-2 h-4 w-4" />
              Filtrele
            </Button>

            {hasActiveFilters ? (
              <Button
                asChild
                variant="outline"
                className="h-11 rounded-2xl sm:px-6"
              >
                <Link href={resetHref}>
                  <X className="mr-2 h-4 w-4" />
                  Filtreleri Temizle
                </Link>
              </Button>
            ) : null}
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

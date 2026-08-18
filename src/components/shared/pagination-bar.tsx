import Link from "next/link";

import { Button } from "@/components/ui/button";

type PaginationBarProps = {
  page: number;
  totalPages: number;
  totalCount: number;
  pageSize: number;
  itemLabel: string;
  buildHref: (page: number) => string;
};

export function PaginationBar({
  page,
  totalPages,
  totalCount,
  pageSize,
  itemLabel,
  buildHref,
}: PaginationBarProps) {
  const startItem = totalCount === 0 ? 0 : (page - 1) * pageSize + 1;
  const endItem = Math.min(page * pageSize, totalCount);

  return (
    <div className="flex flex-col items-center justify-between gap-3 border-t pt-4 sm:flex-row">
      <p className="text-sm text-muted-foreground">
        {totalCount === 0
          ? "Sonuç yok"
          : `${startItem}–${endItem} / ${totalCount} ${itemLabel}`}
      </p>

      <div className="flex items-center gap-2">
        {page > 1 ? (
          <Button asChild variant="outline" className="h-11 rounded-xl px-3 sm:px-4">
            <Link href={buildHref(page - 1)}>Önceki</Link>
          </Button>
        ) : (
          <Button
            variant="outline"
            disabled
            className="h-11 rounded-xl px-3 sm:px-4"
          >
            Önceki
          </Button>
        )}

        <span className="min-w-[3.5rem] text-center text-sm font-medium whitespace-nowrap">
          {page} / {Math.max(totalPages, 1)}
        </span>

        {page < totalPages ? (
          <Button asChild variant="outline" className="h-11 rounded-xl px-3 sm:px-4">
            <Link href={buildHref(page + 1)}>Sonraki</Link>
          </Button>
        ) : (
          <Button
            variant="outline"
            disabled
            className="h-11 rounded-xl px-3 sm:px-4"
          >
            Sonraki
          </Button>
        )}
      </div>
    </div>
  );
}

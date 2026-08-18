import Link from "next/link";
import { ChevronRight } from "lucide-react";

type BreadcrumbItem = {
  label: string;
  href?: string;
};

export function Breadcrumb({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav aria-label="Breadcrumb" className="flex min-w-0 items-center gap-1.5 text-sm">
      {items.map((item, index) => {
        const isLast = index === items.length - 1;

        return (
          <span key={index} className="flex min-w-0 items-center gap-1.5">
            {index > 0 ? (
              <ChevronRight className="h-3.5 w-3.5 shrink-0 text-slate-300" />
            ) : null}

            {item.href && !isLast ? (
              <Link
                href={item.href}
                className="truncate text-slate-500 transition-colors hover:text-orange-600"
              >
                {item.label}
              </Link>
            ) : (
              <span
                className={
                  isLast
                    ? "truncate font-medium text-slate-900"
                    : "truncate text-slate-500"
                }
                aria-current={isLast ? "page" : undefined}
              >
                {item.label}
              </span>
            )}
          </span>
        );
      })}
    </nav>
  );
}

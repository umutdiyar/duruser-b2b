import type { OrderStatus, Prisma } from "@/generated/prisma/client";
import { orderStatuses } from "@/lib/order-status";

export const ORDERS_PAGE_SIZE = 20;

const VALID_STATUSES = new Set<string>(orderStatuses.map((s) => s.value));

export type OrderSearchParams = {
  q?: string;
  status?: string;
  from?: string;
  to?: string;
  page?: string;
};

export type OrderFilters = {
  q: string;
  status: OrderStatus | undefined;
  from: Date | undefined;
  to: Date | undefined;
  page: number;
};

function parseDateStart(value?: string) {
  if (!value) return undefined;
  const date = new Date(`${value}T00:00:00`);
  return Number.isNaN(date.getTime()) ? undefined : date;
}

function parseDateEnd(value?: string) {
  if (!value) return undefined;
  // End-of-day so the "to" date's own orders are never excluded.
  const date = new Date(`${value}T23:59:59.999`);
  return Number.isNaN(date.getTime()) ? undefined : date;
}

export function parseOrderFilters(params: OrderSearchParams): OrderFilters {
  const q = params.q?.trim() ?? "";

  const status =
    params.status && VALID_STATUSES.has(params.status)
      ? (params.status as OrderStatus)
      : undefined;

  const from = parseDateStart(params.from);
  const to = parseDateEnd(params.to);

  const parsedPage = Number(params.page);
  const page = Number.isInteger(parsedPage) && parsedPage > 0 ? parsedPage : 1;

  return { q, status, from, to, page };
}

export function buildOrderWhere(filters: OrderFilters): Prisma.OrderWhereInput {
  return {
    ...(filters.q
      ? {
          OR: [
            { orderNumber: { contains: filters.q, mode: "insensitive" } },
            {
              company: {
                name: { contains: filters.q, mode: "insensitive" },
              },
            },
          ],
        }
      : {}),
    ...(filters.status ? { status: filters.status } : {}),
    ...(filters.from || filters.to
      ? {
          createdAt: {
            ...(filters.from ? { gte: filters.from } : {}),
            ...(filters.to ? { lte: filters.to } : {}),
          },
        }
      : {}),
  };
}

export function hasActiveOrderFilters(filters: OrderFilters) {
  return Boolean(filters.q || filters.status || filters.from || filters.to);
}

export function buildOrdersHref(
  current: OrderSearchParams,
  overrides: Partial<OrderSearchParams>,
) {
  const merged = { ...current, ...overrides };
  const usp = new URLSearchParams();

  for (const [key, value] of Object.entries(merged)) {
    if (value) usp.set(key, value);
  }

  const qs = usp.toString();
  return qs ? `/admin/orders?${qs}` : "/admin/orders";
}

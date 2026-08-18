"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bell } from "lucide-react";

import { Button } from "@/components/ui/button";

export function NotificationBell() {
  const pathname = usePathname();
  const href = pathname.startsWith("/admin")
    ? "/admin/notifications"
    : "/customer/notifications";

  return (
    <Button
      asChild
      type="button"
      size="icon"
      variant="outline"
      aria-label="Bildirimler"
      className="h-11 w-11 rounded-2xl border-slate-200 bg-white"
    >
      <Link href={href}>
        <Bell className="h-4 w-4" />
      </Link>
    </Button>
  );
}

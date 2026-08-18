import Link from "next/link";
import { FileQuestion } from "lucide-react";

import { auth } from "@/auth";
import { branding } from "@/config/branding";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default async function GlobalNotFound() {
  const session = await auth();

  const homeHref =
    session?.user?.role === "ADMIN"
      ? "/admin/dashboard"
      : session?.user?.role === "CUSTOMER"
        ? "/customer/dashboard"
        : "/login";

  return (
    <main className="flex min-h-screen items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md border-0 bg-white shadow-2xl shadow-slate-200/70">
        <CardContent className="flex flex-col items-center p-6 text-center sm:p-8">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-orange-100 text-orange-600">
            <FileQuestion className="h-8 w-8" />
          </div>

          <h1 className="mt-6 text-2xl font-bold tracking-tight text-slate-900">
            Sayfa bulunamadı
          </h1>

          <p className="mt-3 text-sm leading-6 text-muted-foreground">
            Aradığınız sayfa mevcut değil veya taşınmış olabilir.
          </p>

          <Button
            asChild
            className="mt-8 h-12 w-full rounded-2xl bg-orange-500 font-semibold hover:bg-orange-600"
          >
            <Link href={homeHref}>Ana Sayfaya Dön</Link>
          </Button>

          <p className="mt-6 text-xs text-slate-400">{branding.companyName} B2B</p>
        </CardContent>
      </Card>
    </main>
  );
}

import Link from "next/link";
import { ShieldAlert } from "lucide-react";

import { auth } from "@/auth";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default async function UnauthorizedPage() {
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
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-destructive/10 text-destructive">
            <ShieldAlert className="h-8 w-8" />
          </div>

          <h1 className="mt-6 text-2xl font-bold tracking-tight text-slate-900">
            Bu sayfaya erişim yetkiniz yok.
          </h1>

          <p className="mt-3 text-sm leading-6 text-muted-foreground">
            Erişmeye çalıştığınız sayfa veya işlem, hesabınızın yetki alanı
            dışında. Doğru hesapla giriş yaptığınızdan emin olun ya da kendi
            panelinize dönün.
          </p>

          <div className="mt-8 w-full grid grid-cols-2 gap-3 sm:flex-row">
            <Button
              asChild
              variant="outline"
              className="h-12 w-full rounded-2xl"
            >
              <Link href={homeHref}>Panelime Dön</Link>
            </Button>

            <Button
              asChild
              className="h-12 w-full rounded-2xl bg-orange-500 hover:bg-orange-600"
            >
              <Link href="/login">Giriş Sayfası</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}

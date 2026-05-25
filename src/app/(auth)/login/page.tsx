import Link from "next/link";

import { Logo } from "@/components/shared/logo";

import { Card, CardContent } from "@/components/ui/card";

import { Button } from "@/components/ui/button";

export default function LoginPage() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-orange-50 via-background to-red-50 p-6">
      {/* Blur circles */}
      <div className="absolute left-[-100px] top-[-100px] h-72 w-72 rounded-full bg-orange-200/30 blur-3xl" />

      <div className="absolute bottom-[-100px] right-[-100px] h-72 w-72 rounded-full bg-red-200/30 blur-3xl" />

      <Card className="relative w-full max-w-md border-0 bg-white/80 shadow-2xl shadow-orange-100/50 backdrop-blur-xl">
        <CardContent className="space-y-8 p-8">
          <div className="flex justify-center">
            <Logo />
          </div>

          <div className="space-y-2 text-center">
            <h1 className="text-3xl font-bold tracking-tight">Panele Giriş</h1>

            <p className="text-sm text-muted-foreground">
              DuruSer sipariş yönetim sistemi
            </p>
          </div>

          <div className="space-y-3">
            <Button asChild className="h-11 w-full text-sm font-semibold">
              <Link href="/admin/dashboard">DuruSer Yönetimi Olarak Gir</Link>
            </Button>

            <Button
              asChild
              variant="outline"
              className="h-11 w-full text-sm font-semibold"
            >
              <Link href="/customer/dashboard">Müşteri Firma Olarak Gir</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}

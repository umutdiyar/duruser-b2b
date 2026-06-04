import Link from "next/link";
import { ArrowLeft, Mail } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function ForgotPasswordPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f5f7fb] p-4">
      <Card className="w-full max-w-md border-0 bg-white shadow-2xl shadow-slate-200/70">
        <CardContent className="p-6 sm:p-8">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-100 text-orange-600">
            <Mail className="h-6 w-6" />
          </div>

          <h1 className="mt-6 text-3xl font-bold tracking-tight">
            Şifremi Unuttum
          </h1>

          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            Şifre sıfırlama bağlantısı almak için email adresinizi girin. Bu
            ekranın mail gönderme işlevini daha sonra bağlayacağız.
          </p>

          <form className="mt-8 space-y-5">
            <div className="space-y-2">
              <Label>Email</Label>
              <Input
                type="email"
                placeholder="ornek@firma.com"
                className="h-12 rounded-2xl"
              />
            </div>

            <Button
              type="button"
              className="h-12 w-full rounded-2xl bg-orange-500 font-semibold hover:bg-orange-600"
            >
              Sıfırlama Bağlantısı Gönder
            </Button>
          </form>

          <Button asChild variant="ghost" className="mt-4 w-full rounded-2xl">
            <Link href="/login">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Giriş ekranına dön
            </Link>
          </Button>
        </CardContent>
      </Card>
    </main>
  );
}

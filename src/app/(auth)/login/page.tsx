import Link from "next/link";

import {
  ArrowRight,
  Building2,
  CheckCircle2,
  LockKeyhole,
  PackageCheck,
  Truck,
} from "lucide-react";

import { loginAction } from "@/actions/auth-actions";

import { PasswordInput } from "@/components/auth/password-input";

import { Card, CardContent } from "@/components/ui/card";

import { Input } from "@/components/ui/input";

import { Label } from "@/components/ui/label";
import { RouteToast } from "@/components/shared/route-toast";
import { SubmitButton } from "@/components/shared/submit-button";
import { branding } from "@/config/branding";

export default function LoginPage() {
  return (
    <main className="min-h-screen  h-full bg-[#f5f7fb]">
      <RouteToast />
      <div className="grid min-h-screen lg:grid-cols-2">
        <section className="relative hidden overflow-hidden bg-slate-950 p-10 text-white lg:flex lg:flex-col lg:justify-between">
          <div className="absolute left-[-120px] top-[-120px] h-80 w-80 rounded-full bg-orange-500/30 blur-3xl" />
          <div className="absolute bottom-[-120px] right-[-120px] h-80 w-80 rounded-full bg-red-500/20 blur-3xl" />

          <div className="relative">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-500 text-lg font-bold shadow-xl shadow-orange-500/30">
                {branding.shortName}
              </div>

              <div>
                <h1 className="text-xl font-bold">{branding.companyName} B2B</h1>
                <p className="text-sm text-slate-400">{branding.description}</p>
              </div>
            </div>

            <div className="mt-20 max-w-xl">
              <p className="rounded-full bg-white/10 px-4 py-2 text-sm text-orange-100 w-fit">
                Kurumsal sipariş operasyonu
              </p>

              <h2 className="mt-6 text-5xl font-bold leading-tight">
                Müşteri bazlı siparişleri tek panelden yönetin.
              </h2>

              <p className="mt-6 text-lg leading-8 text-slate-300">
                DuruSer müşterileri için ürün yetkilendirme, hızlı sipariş,
                sipariş takibi ve operasyon yönetimini modern bir panelde
                birleştirin.
              </p>
            </div>
          </div>

          <div className="relative grid gap-4 xl:grid-cols-2">
            {[
              {
                icon: PackageCheck,
                title: "Ürün Yetkilendirme",
                desc: "Her firma sadece kendisine tanımlı ürünleri görür.",
              },
              {
                icon: Truck,
                title: "Sevkiyat Takibi",
                desc: "Sipariş durumları operasyon ekibi tarafından yönetilir.",
              },
              {
                icon: Building2,
                title: "Firma Yönetimi",
                desc: "Müşteri firmalar ve kullanıcılar tek yerden yönetilir.",
              },
              {
                icon: LockKeyhole,
                title: "Rol Bazlı Erişim",
                desc: "Admin ve müşteri ekranları güvenli şekilde ayrılır.",
              },
            ].map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className="rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur"
                >
                  <Icon className="h-6 w-6 text-orange-400" />
                  <h3 className="mt-4 font-semibold">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-400">
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        <section className="flex min-h-screen items-center justify-center px-4 py-8 sm:px-6 lg:p-10">
          <Card className="w-full max-w-md border-0 bg-white shadow-2xl shadow-slate-200/70">
            <CardContent className="p-6 sm:p-8">
              <div className="mb-8 lg:hidden">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-500 font-bold text-white">
                    {branding.shortName}
                  </div>

                  <div>
                    <h1 className="font-bold">{branding.companyName} B2B</h1>
                    <p className="text-sm text-muted-foreground">
                      {branding.tagline}
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <p className="flex items-center gap-2 text-sm font-medium text-orange-600">
                  <CheckCircle2 className="h-4 w-4" />
                  Güvenli giriş
                </p>

                <h2 className="mt-3 text-3xl font-bold tracking-tight">
                  Hoş geldiniz
                </h2>

                <p className="mt-2 text-sm text-muted-foreground">
                  Hesabınıza giriş yaparak sipariş paneline devam edin.
                </p>
              </div>

              <form action={loginAction} className="mt-8 space-y-5">
                <div className="space-y-2">
                  <Label>Email</Label>
                  <Input
                    name="email"
                    type="email"
                    placeholder="admin@duruser.com"
                    className="h-12 rounded-2xl"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Şifre</Label>
                  <PasswordInput name="password" />
                </div>

                <div className="flex items-center justify-between gap-4">
                  <label className="flex items-center gap-2 text-sm text-muted-foreground">
                    <input
                      type="checkbox"
                      name="remember"
                      className="h-4 w-4 rounded border-slate-300 accent-orange-500"
                    />
                    Beni hatırla
                  </label>

                  <Link
                    href="/forgot-password"
                    className="text-sm font-medium text-orange-600 hover:text-orange-700"
                  >
                    Şifremi unuttum
                  </Link>
                </div>

                <SubmitButton
                  pendingText="Giriş yapılıyor..."
                  className="h-12 w-full rounded-2xl bg-orange-500 font-semibold shadow-lg shadow-orange-500/20 transition-all hover:bg-orange-600 hover:shadow-xl hover:shadow-orange-500/30"
                >
                  Giriş Yap
                  <ArrowRight className="ml-2 h-4 w-4" />
                </SubmitButton>
              </form>

              {/* <div className="mt-6 rounded-3xl border bg-slate-50 p-5">
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Demo Hesapları
                </p>

                <div className="mt-3 space-y-2 text-sm">
                  <p>
                    <span className="font-semibold">Admin:</span>{" "}
                    admin@duruser.com / 123456
                  </p>

                  <p>
                    <span className="font-semibold">Müşteri:</span>{" "}
                    customer@duruser.com / 123456
                  </p>
                </div>
              </div> */}
            </CardContent>
          </Card>
        </section>
      </div>
    </main>
  );
}

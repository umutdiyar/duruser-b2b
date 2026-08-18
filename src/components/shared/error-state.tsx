"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

type ErrorStateProps = {
  error: Error & { digest?: string };
  reset: () => void;
  // "/redirect" resolves to the signed-in user's own dashboard (or /login if
  // signed out) — this component is a client boundary and can't call the
  // server-side auth() helper directly to know the role itself.
  dashboardHref?: string;
};

export function ErrorState({
  error,
  reset,
  dashboardHref = "/redirect",
}: ErrorStateProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-[60vh] items-center justify-center p-4">
      <Card className="w-full max-w-md border-0 shadow-xl shadow-slate-200/70">
        <CardContent className="flex flex-col items-center p-6 text-center sm:p-8">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-destructive/10 text-destructive">
            <AlertTriangle className="h-8 w-8" />
          </div>

          <h1 className="mt-6 text-xl font-bold tracking-tight text-slate-900">
            Bir sorun oluştu
          </h1>

          <p className="mt-3 text-sm leading-6 text-muted-foreground">
            Bu ekran yüklenirken beklenmeyen bir hata oluştu. Tekrar
            deneyebilir veya panel ana sayfasına dönebilirsiniz.
          </p>

          <div className="mt-8 flex w-full flex-col gap-3 sm:flex-row">
            <Button
              asChild
              variant="outline"
              className="h-12 w-full rounded-2xl"
            >
              <Link href={dashboardHref}>Dashboard&apos;a Dön</Link>
            </Button>

            <Button
              onClick={reset}
              className="h-12 w-full rounded-2xl bg-orange-500 font-semibold hover:bg-orange-600"
            >
              Tekrar Dene
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

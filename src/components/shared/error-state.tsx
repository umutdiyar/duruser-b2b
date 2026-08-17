"use client";

import { useEffect } from "react";
import { AlertTriangle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

type ErrorStateProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export function ErrorState({ error, reset }: ErrorStateProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-[60vh] items-center justify-center p-4">
      <Card className="w-full max-w-md border-0 shadow-xl shadow-slate-200/70">
        <CardContent className="flex flex-col items-center p-6 text-center sm:p-8">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-red-100 text-red-600">
            <AlertTriangle className="h-8 w-8" />
          </div>

          <h1 className="mt-6 text-xl font-bold tracking-tight text-slate-900">
            Bir şeyler ters gitti
          </h1>

          <p className="mt-3 text-sm leading-6 text-muted-foreground">
            İşlem sırasında beklenmeyen bir hata oluştu. Sorun devam ederse
            DuruSer yönetimiyle iletişime geçin.
          </p>

          <Button
            onClick={reset}
            className="mt-8 h-12 w-full rounded-2xl bg-orange-500 font-semibold hover:bg-orange-600"
          >
            Tekrar Dene
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

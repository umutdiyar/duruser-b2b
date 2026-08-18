import Link from "next/link";
import { SearchX } from "lucide-react";

import { DashboardContainer } from "@/components/layout/dashboard-container";
import { EmptyState } from "@/components/shared/empty-state";
import { Button } from "@/components/ui/button";

export default function CustomerNotFound() {
  return (
    <DashboardContainer>
      <EmptyState
        icon={SearchX}
        title="Kayıt bulunamadı"
        description="Aradığınız kayıt silinmiş, taşınmış veya erişilebilir olmayabilir."
        action={
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button asChild variant="outline" className="rounded-2xl">
              <Link href="/customer/orders">Listeye Dön</Link>
            </Button>
            <Button
              asChild
              className="rounded-2xl bg-orange-500 hover:bg-orange-600"
            >
              <Link href="/customer/dashboard">Dashboard</Link>
            </Button>
          </div>
        }
      />
    </DashboardContainer>
  );
}

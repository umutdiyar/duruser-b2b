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
        title="Aradığınız sayfa bulunamadı"
        description="Bu kayıt silinmiş veya hiç var olmamış olabilir."
        action={
          <Button asChild className="rounded-2xl bg-orange-500 hover:bg-orange-600">
            <Link href="/customer/dashboard">Panele Dön</Link>
          </Button>
        }
      />
    </DashboardContainer>
  );
}

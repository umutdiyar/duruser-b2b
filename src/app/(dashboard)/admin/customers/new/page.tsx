import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { createCompanyAction } from "@/actions/company-actions";
import { CompanyForm } from "@/components/customers/company-form";
import { DashboardContainer } from "@/components/layout/dashboard-container";
import { DashboardHeader } from "@/components/layout/dashboard-header";
import { RouteToast } from "@/components/shared/route-toast";
import { Button } from "@/components/ui/button";

export default function NewCompanyPage() {
  return (
    <>
      <DashboardHeader
        title="Yeni Firma"
        description="Sisteme yeni müşteri firma ekleyin."
        actions={
          <Button asChild variant="outline" className="h-11 rounded-2xl">
            <Link href="/admin/customers">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Firmalara Dön
            </Link>
          </Button>
        }
      />

      <RouteToast />

      <DashboardContainer>
        <CompanyForm
          action={createCompanyAction}
          submitLabel="Firmayı Oluştur"
        />
      </DashboardContainer>
    </>
  );
}

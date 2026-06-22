import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";

import { updateCompanyAction } from "@/actions/company-actions";
import { CompanyForm } from "@/components/customers/company-form";
import { DashboardContainer } from "@/components/layout/dashboard-container";
import { DashboardHeader } from "@/components/layout/dashboard-header";
import { RouteToast } from "@/components/shared/route-toast";
import { Button } from "@/components/ui/button";
import { prisma } from "@/lib/prisma";

export default async function EditCompanyPage({
  params,
}: {
  params: Promise<{
    id: string;
  }>;
}) {
  const { id } = await params;

  const company = await prisma.company.findUnique({
    where: {
      id,
    },
  });

  if (!company) {
    notFound();
  }

  return (
    <>
      <DashboardHeader
        title="Firma Düzenle"
        description={company.name}
        actions={
          <Button asChild variant="outline" className="h-11 rounded-2xl">
            <Link href={`/admin/customers/${company.id}`}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Firma Detayına Dön
            </Link>
          </Button>
        }
      />

      <RouteToast />

      <DashboardContainer>
        <CompanyForm
          company={company}
          action={updateCompanyAction}
          submitLabel="Değişiklikleri Kaydet"
        />
      </DashboardContainer>
    </>
  );
}

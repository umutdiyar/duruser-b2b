import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";

import { createCompanyUserAction } from "@/actions/company-user-actions";
import { CompanyUserForm } from "@/components/customers/company-user-form";
import { DashboardContainer } from "@/components/layout/dashboard-container";
import { DashboardHeader } from "@/components/layout/dashboard-header";
import { RouteToast } from "@/components/shared/route-toast";
import { Button } from "@/components/ui/button";
import { prisma } from "@/lib/prisma";

export default async function NewCompanyUserPage({
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
        title="Yeni Firma Kullanıcısı"
        description={`${company.name} için müşteri kullanıcısı oluşturun.`}
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
        <CompanyUserForm
          companyId={company.id}
          action={createCompanyUserAction}
          submitLabel="Kullanıcı Oluştur"
        />
      </DashboardContainer>
    </>
  );
}

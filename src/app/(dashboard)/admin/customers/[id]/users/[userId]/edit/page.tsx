import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";

import { updateCompanyUserAction } from "@/actions/company-user-actions";
import { CompanyUserForm } from "@/components/customers/company-user-form";
import { DashboardContainer } from "@/components/layout/dashboard-container";
import { DashboardHeader } from "@/components/layout/dashboard-header";
import { RouteToast } from "@/components/shared/route-toast";
import { Button } from "@/components/ui/button";
import { prisma } from "@/lib/prisma";

export default async function EditCompanyUserPage({
  params,
}: {
  params: Promise<{
    id: string;
    userId: string;
  }>;
}) {
  const { id, userId } = await params;

  const company = await prisma.company.findUnique({
    where: {
      id,
    },
  });

  const user = await prisma.user.findFirst({
    where: {
      id: userId,
      companyId: id,
    },
  });

  if (!company || !user) {
    notFound();
  }

  return (
    <>
      <DashboardHeader
        title="Kullanıcı Düzenle"
        description={`${company.name} kullanıcısını düzenleyin.`}
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
          user={user}
          action={updateCompanyUserAction}
          submitLabel="Değişiklikleri Kaydet"
        />
      </DashboardContainer>
    </>
  );
}

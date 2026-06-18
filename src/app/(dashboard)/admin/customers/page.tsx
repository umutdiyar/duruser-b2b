import Link from "next/link";

import { Building2, Plus, Users } from "lucide-react";

import { prisma } from "@/lib/prisma";

import { DashboardHeader } from "@/components/layout/dashboard-header";
import { DashboardContainer } from "@/components/layout/dashboard-container";

import { Card, CardContent } from "@/components/ui/card";

// import { deleteCompanyAction } from "@/actions/company-actions";

import { Button } from "@/components/ui/button";

export default async function CustomersPage() {
  const companies = await prisma.company.findMany({
    include: {
      users: true,
      orders: true,
    },
    orderBy: {
      name: "asc",
    },
  });

  return (
    <>
      <DashboardHeader
        title="Firma Yönetimi"
        description="Müşterileri yönetin."
      />

      <DashboardContainer>
        {/* HERO */}

        <Card className="overflow-hidden border-0 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white shadow-xl">
          <CardContent className="flex flex-col gap-6 p-8 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-sm text-slate-400">Firma Yönetimi</p>

              <h2 className="mt-3 text-4xl font-bold">Müşteriler</h2>

              <p className="mt-3 max-w-xl text-slate-300">
                Firma hesaplarını yönetin ve ürün yetkilendirmelerini
                düzenleyin.
              </p>
            </div>

            <Button className="bg-orange-500 hover:bg-orange-600">
              <Plus className="mr-2 h-4 w-4" />
              Yeni Firma
            </Button>
          </CardContent>
        </Card>

        {/* STATS */}

        <div className="grid gap-4 md:grid-cols-2">
          <Card className="border-0 shadow-sm">
            <CardContent className="p-6">
              <Building2 className="h-6 w-6 text-orange-500" />

              <p className="mt-4 text-sm text-muted-foreground">Toplam Firma</p>

              <p className="mt-2 text-4xl font-bold">{companies.length}</p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardContent className="p-6">
              <Users className="h-6 w-6 text-orange-500" />

              <p className="mt-4 text-sm text-muted-foreground">
                Toplam Kullanıcı
              </p>

              <p className="mt-2 text-4xl font-bold">
                {companies.reduce(
                  (acc, company) => acc + company.users.length,
                  0,
                )}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* COMPANIES */}

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {companies.map((company) => (
            <Card
              key={company.id}
              className="border-0 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-xl"
            >
              <CardContent className="p-6">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-100">
                  <Building2 className="h-6 w-6 text-orange-500" />
                </div>

                <h3 className="mt-5 text-lg font-semibold">{company.name}</h3>

                <p className="mt-2 text-sm text-muted-foreground">
                  {company.slug}
                </p>

                <div className="mt-6 flex items-center justify-between text-sm">
                  <span>{company.users.length} kullanıcı</span>

                  <span>{company.orders.length} sipariş</span>
                </div>

                <Button asChild className="mt-6 w-full">
                  <Link href={`/admin/customers/${company.id}`}>
                    Firmayı Yönet
                  </Link>
                </Button>

                {/* <form
                  action={async () => {
                    "use server";

                    await deleteCompanyAction(company.id);
                  }}
                >
                  <Button variant="destructive" type="submit">
                    Sil
                  </Button>
                </form> */}
              </CardContent>
            </Card>
          ))}
        </div>
      </DashboardContainer>
    </>
  );
}

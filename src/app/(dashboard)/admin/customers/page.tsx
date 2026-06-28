import Link from "next/link";

import {
  ArrowUpRight,
  Building2,
  Pencil,
  Plus,
  Users,
  CheckCircle2,
  XCircle,
} from "lucide-react";

import { prisma } from "@/lib/prisma";
import { DashboardHeader } from "@/components/layout/dashboard-header";
import { DashboardContainer } from "@/components/layout/dashboard-container";
import { RouteToast } from "@/components/shared/route-toast";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toggleCompanyStatusAction } from "@/actions/company-actions";

export default async function CustomersPage() {
  const companies = await prisma.company.findMany({
    include: {
      users: true,
      orders: true,
      companyProducts: true,
    },
    orderBy: {
      name: "asc",
    },
  });

  const totalUsers = companies.reduce(
    (acc, company) => acc + company.users.length,
    0,
  );

  const totalOrders = companies.reduce(
    (acc, company) => acc + company.orders.length,
    0,
  );

  return (
    <>
      <DashboardHeader
        title="Müşteri Yönetimi"
        description="Müşteri firmaları ve ürün yetkilerini yönetin."
        actions={
          <Button
            asChild
            className="h-11 rounded-2xl bg-orange-500 px-5 font-semibold hover:bg-orange-600"
          >
            <Link href="/admin/customers/new">
              <Plus className="mr-2 h-4 w-4" />
              Yeni Firma
            </Link>
          </Button>
        }
      />

      <RouteToast />

      <DashboardContainer>
        <Card className="overflow-hidden border-0 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white shadow-xl">
          <CardContent className="p-6 lg:p-8">
            <div className="max-w-3xl">
              <p className="text-sm text-slate-400">Firma Yönetimi</p>

              <h2 className="mt-3 text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
                Müşteri Firmalar
              </h2>

              <p className="mt-4 max-w-2xl text-sm leading-6 text-slate-300 sm:text-base">
                Müşteri firmaları yönetin, kullanıcılarını takip edin ve firma
                bazlı ürün yetkilendirmelerini düzenleyin.
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-4 md:grid-cols-3">
          <Card className="border-0 shadow-sm">
            <CardContent className="p-5 sm:p-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Toplam Firma</p>
                  <p className="mt-2 text-3xl font-bold sm:text-4xl">
                    {companies.length}
                  </p>
                </div>

                <div className="rounded-2xl bg-orange-100 p-3 text-orange-600">
                  <Building2 className="h-5 w-5" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardContent className="p-5 sm:p-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">
                    Toplam Kullanıcı
                  </p>
                  <p className="mt-2 text-3xl font-bold sm:text-4xl">
                    {totalUsers}
                  </p>
                </div>

                <div className="rounded-2xl bg-blue-100 p-3 text-blue-600">
                  <Users className="h-5 w-5" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardContent className="p-5 sm:p-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">
                    Toplam Sipariş
                  </p>
                  <p className="mt-2 text-3xl font-bold sm:text-4xl">
                    {totalOrders}
                  </p>
                </div>

                <div className="rounded-2xl bg-green-100 p-3 text-green-600">
                  <ArrowUpRight className="h-5 w-5" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {companies.map((company) => (
            <Card
              key={company.id}
              className="border-0 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              <CardContent className="flex h-full flex-col p-5">
                <div className="flex items-start gap-4">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-orange-100 text-orange-600">
                    <Building2 className="h-6 w-6" />
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex min-w-0 flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                      <div className="min-w-0">
                        <h3 className="line-clamp-1 text-lg font-bold text-slate-900">
                          {company.name}
                        </h3>

                        <p className="mt-1 truncate text-sm text-muted-foreground">
                          {company.slug}
                        </p>
                      </div>

                      <div className="shrink-0">
                        {company.isActive ? (
                          <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100">
                            <CheckCircle2 className="mr-1 h-3 w-3" />
                            Aktif
                          </Badge>
                        ) : (
                          <Badge className="bg-red-100 text-red-700 hover:bg-red-100">
                            <XCircle className="mr-1 h-3 w-3" />
                            Pasif
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-3 gap-3 rounded-2xl bg-slate-50 p-4 text-center">
                  <div>
                    <p className="text-lg font-bold">{company.users.length}</p>
                    <p className="mt-1 text-[11px] text-muted-foreground">
                      Kullanıcı
                    </p>
                  </div>

                  <div>
                    <p className="text-lg font-bold">{company.orders.length}</p>
                    <p className="mt-1 text-[11px] text-muted-foreground">
                      Sipariş
                    </p>
                  </div>

                  <div>
                    <p className="text-lg font-bold">
                      {company.companyProducts.length}
                    </p>
                    <p className="mt-1 text-[11px] text-muted-foreground">
                      Ürün
                    </p>
                  </div>
                </div>

                <div className="mt-auto grid gap-2 pt-6 sm:grid-cols-3">
                  <Button asChild className="h-11 rounded-2xl">
                    <Link href={`/admin/customers/${company.id}`}>Yönet</Link>
                  </Button>

                  <Button
                    asChild
                    variant="outline"
                    className="h-11 rounded-2xl"
                  >
                    <Link href={`/admin/customers/${company.id}/edit`}>
                      <Pencil className="mr-2 h-4 w-4" />
                      Düzenle
                    </Link>
                  </Button>

                  <form action={toggleCompanyStatusAction}>
                    <input type="hidden" name="companyId" value={company.id} />
                    <input
                      type="hidden"
                      name="currentStatus"
                      value={String(company.isActive)}
                    />

                    <Button
                      type="submit"
                      variant={company.isActive ? "outline" : "default"}
                      className="h-11 w-full rounded-2xl"
                    >
                      {company.isActive ? "Pasife Al" : "Aktife Al"}
                    </Button>
                  </form>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </DashboardContainer>
    </>
  );
}

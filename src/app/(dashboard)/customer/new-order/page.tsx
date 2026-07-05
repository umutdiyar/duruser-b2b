import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { auth } from "../../../../auth";
import { prisma } from "@/lib/prisma";

import { DashboardHeader } from "@/components/layout/dashboard-header";
import { DashboardContainer } from "@/components/layout/dashboard-container";
import { Button } from "@/components/ui/button";

import { CustomerOrderForm } from "@/components/orders/customer-order-form";

export default async function NewOrderPage() {
  const session = await auth();

  const companyId = session?.user?.companyId;

  const products = companyId
    ? await prisma.companyProduct.findMany({
        where: {
          companyId,
          product: {
            isActive: true,
          },
        },
        include: {
          product: {
            select: {
              id: true,
              name: true,
              description: true,
              imageUrl: true,
              price: true,
            },
          },
        },
        orderBy: {
          product: {
            name: "asc",
          },
        },
      })
    : [];

  return (
    <>
      <DashboardHeader
        title="Yeni Sipariş"
        description="Firmanıza tanımlı ürünlerden hızlıca sipariş oluşturun."
        actions={
          <Button asChild variant="outline" className="h-11 rounded-2xl">
            <Link href="/customer/products">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Ürünlerime Dön
            </Link>
          </Button>
        }
      />

      <DashboardContainer>
        <CustomerOrderForm products={products} />
      </DashboardContainer>
    </>
  );
}

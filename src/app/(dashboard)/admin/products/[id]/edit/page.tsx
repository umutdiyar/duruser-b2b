import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";

import { updateProductAction } from "@/actions/product-actions";
import { RouteToast } from "@/components/shared/route-toast";
import { DashboardContainer } from "@/components/layout/dashboard-container";
import { DashboardHeader } from "@/components/layout/dashboard-header";
import { ProductForm } from "@/components/products/product-form";
import { Button } from "@/components/ui/button";
import { prisma } from "@/lib/prisma";

export default async function EditProductPage({
  params,
}: {
  params: Promise<{
    id: string;
  }>;
}) {
  const { id } = await params;

  const product = await prisma.product.findUnique({
    where: {
      id,
    },
  });

  if (!product) {
    notFound();
  }

  return (
    <>
      <DashboardHeader
        title="Ürün Düzenle"
        description={product.name}
        actions={
          <Button asChild variant="outline" className="h-11 rounded-2xl">
            <Link href="/admin/products">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Ürünlere Dön
            </Link>
          </Button>
        }
      />

      <RouteToast />

      <DashboardContainer>
        <ProductForm
          product={product}
          action={updateProductAction}
          submitLabel="Değişiklikleri Kaydet"
        />
      </DashboardContainer>
    </>
  );
}

import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { createProductAction } from "@/actions/product-actions";
import { DashboardContainer } from "@/components/layout/dashboard-container";
import { DashboardHeader } from "@/components/layout/dashboard-header";
import { ProductForm } from "@/components/products/product-form";
import { Button } from "@/components/ui/button";

export default function NewProductPage() {
  return (
    <>
      <DashboardHeader
        title="Yeni Ürün"
        description="DuruSer ürün kataloğuna yeni ürün ekleyin."
        actions={
          <Button asChild variant="outline" className="h-11 rounded-2xl">
            <Link href="/admin/products">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Ürünlere Dön
            </Link>
          </Button>
        }
      />

      <DashboardContainer>
        <ProductForm action={createProductAction} submitLabel="Ürünü Oluştur" />
      </DashboardContainer>
    </>
  );
}

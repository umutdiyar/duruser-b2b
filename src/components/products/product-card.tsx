import { Package } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";

import { Button } from "@/components/ui/button";

type Props = {
  name: string;
  price: number;
};

export function ProductCard({ name, price }: Props) {
  return (
    <Card className="overflow-hidden border-0 bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl">
      <div className="flex h-44 items-center justify-center bg-gradient-to-br from-orange-50 to-orange-100">
        <Package className="h-12 w-12 text-orange-500" />
      </div>

      <CardContent className="p-5">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-semibold">{name}</h3>

            <p className="mt-1 text-sm text-muted-foreground">Paketli ürün</p>
          </div>

          <Badge>Aktif</Badge>
        </div>

        <div className="mt-5 flex items-center justify-between">
          <p className="text-2xl font-bold">₺{price}</p>

          <Button size="sm" variant="outline">
            Düzenle
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

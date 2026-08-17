"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import {
  Minus,
  Package,
  Plus,
  Search,
  Send,
  ShoppingCart,
  Trash2,
} from "lucide-react";

import { createOrderAction } from "@/actions/order-actions";
import { formatCurrency } from "@/lib/format";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { EmptyState } from "@/components/shared/empty-state";
import { SubmitButton } from "@/components/shared/submit-button";

type OrderProduct = {
  id: string;
  name: string;
  description: string | null;
  imageUrl: string | null;
  price: number;
};

type CustomerOrderFormProps = {
  products: {
    product: OrderProduct;
    customPrice: number | null;
  }[];
};

export function CustomerOrderForm({ products }: CustomerOrderFormProps) {
  const [search, setSearch] = useState("");
  const [quantities, setQuantities] = useState<Record<string, number>>({});

  const filteredProducts = useMemo(() => {
    const keyword = search.trim().toLowerCase();

    if (!keyword) return products;

    return products.filter(({ product }) =>
      product.name.toLowerCase().includes(keyword),
    );
  }, [products, search]);

  const selectedItems = useMemo(() => {
    return products
      .map(({ product, customPrice }) => {
        const quantity = quantities[product.id] ?? 0;
        const price = customPrice ?? product.price;

        return {
          product,
          quantity,
          price,
          total: quantity * price,
        };
      })
      .filter((item) => item.quantity > 0);
  }, [products, quantities]);

  const totalPrice = selectedItems.reduce((sum, item) => sum + item.total, 0);

  function updateQuantity(productId: string, value: number) {
    setQuantities((prev) => ({
      ...prev,
      [productId]: Math.max(0, value),
    }));
  }

  return (
    <form action={createOrderAction}>
      <div className="grid gap-6 xl:grid-cols-3">
        <div className="space-y-6 xl:col-span-2">
          <Card className="border-0 shadow-sm">
            <CardContent className="p-4">
              <div className="relative">
                <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                <Input
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Ürün ara..."
                  className="h-12 rounded-2xl pl-10"
                />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle>Sipariş Ürünleri</CardTitle>
            </CardHeader>

            <CardContent className="space-y-4">
              {filteredProducts.length === 0 ? (
                <EmptyState
                  icon={Search}
                  title="Ürün bulunamadı"
                  description="Aramanıza uygun ürün bulunamadı. Farklı bir anahtar kelime deneyin."
                />
              ) : (
                filteredProducts.map(({ product, customPrice }, index) => {
                  const price = customPrice ?? product.price;
                  const quantity = quantities[product.id] ?? 0;

                  return (
                    <div
                      key={product.id}
                      className="rounded-3xl border bg-white p-4 transition hover:shadow-md"
                    >
                      <input
                        type="hidden"
                        name="productId"
                        value={product.id}
                      />

                      <div className="grid gap-4 sm:grid-cols-[88px_1fr]">
                        <div className="relative h-24 w-24 overflow-hidden rounded-2xl bg-slate-100 sm:h-22 sm:w-22">
                          {product.imageUrl ? (
                            <Image
                              src={product.imageUrl}
                              alt={product.name}
                              fill
                              priority={index === 0}
                              sizes="96px"
                              className="object-cover"
                            />
                          ) : (
                            <div className="flex h-full items-center justify-center">
                              <Package className="h-8 w-8 text-slate-300" />
                            </div>
                          )}
                        </div>

                        <div className="min-w-0">
                          <div className="flex min-w-0 flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                            <div className="min-w-0">
                              <h3 className="line-clamp-1 font-bold text-slate-900">
                                {product.name}
                              </h3>

                              <p className="mt-2 line-clamp-2 text-sm leading-5 text-muted-foreground">
                                {product.description || "Ürün açıklaması yok."}
                              </p>
                            </div>

                            <div className="shrink-0 sm:text-right">
                              <p className="text-xs text-muted-foreground">
                                Birim Fiyat
                              </p>
                              <p className="text-xl font-bold">
                                {formatCurrency(price)}
                              </p>
                            </div>
                          </div>

                          <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                            <div className="flex w-full items-center justify-between rounded-2xl bg-slate-50 p-2 sm:w-[188px]">
                              <button
                                type="button"
                                aria-label={`${product.name} adedini azalt`}
                                onClick={() =>
                                  updateQuantity(product.id, quantity - 1)
                                }
                                className="flex h-11 w-11 items-center justify-center rounded-xl bg-white shadow-sm transition-transform active:scale-95"
                              >
                                <Minus className="h-4 w-4" />
                              </button>

                              <Input
                                name={`quantity-${product.id}`}
                                type="number"
                                min={0}
                                aria-label={`${product.name} adedi`}
                                value={quantity}
                                onChange={(event) =>
                                  updateQuantity(
                                    product.id,
                                    Number(event.target.value),
                                  )
                                }
                                className="mx-2 h-11 w-16 border-0 bg-transparent text-center font-bold shadow-none focus-visible:ring-0"
                              />

                              <button
                                type="button"
                                aria-label={`${product.name} adedini arttır`}
                                onClick={() =>
                                  updateQuantity(product.id, quantity + 1)
                                }
                                className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-500 text-white shadow-sm transition-transform active:scale-95"
                              >
                                <Plus className="h-4 w-4" />
                              </button>
                            </div>

                            <div className="rounded-2xl bg-orange-50 px-4 py-3 text-sm text-orange-800">
                              Ara toplam:{" "}
                              <span className="font-bold">
                                {formatCurrency(quantity * price)}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="border-0 shadow-sm xl:sticky xl:top-24">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 justify-between">
                <span className="flex items-center gap-2">
                  <ShoppingCart className="h-5 w-5 text-orange-500" />
                  Sipariş Özeti
                </span>
                {selectedItems.length > 0 ? (
                  <Button
                    type="button"
                    size="icon"
                    variant="outline"
                    aria-label="Tümünü Temizle"
                    onClick={() => setQuantities({})}
                    className="h-12 w-44 rounded-xl text-red-600 font-semibold transition bg-white active:scale-95"
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    <span className="hidden lg:inline">Tümünü Temizle</span>
                  </Button>
                ) : null}
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-5">
              {selectedItems.length === 0 ? (
                <EmptyState
                  icon={ShoppingCart}
                  title="Sepetiniz boş"
                  description="Sipariş vermek için yukarıdan ürün seçin."
                  className="border-solid p-5"
                />
              ) : (
                <div className="space-y-3">
                  {selectedItems.map((item) => (
                    <div
                      key={item.product.id}
                      className="flex items-center justify-between gap-3 rounded-2xl bg-slate-50 px-4 py-3 text-sm"
                    >
                      <div className="min-w-0">
                        <p className="truncate font-semibold">
                          {item.product.name}
                        </p>
                        <p className="mt-1 text-xs text-muted-foreground">
                          {item.quantity} adet
                        </p>
                      </div>

                      <p className="shrink-0 font-bold">
                        {formatCurrency(item.total)}
                      </p>
                    </div>
                  ))}
                </div>
              )}

              <div className="rounded-3xl bg-slate-950 p-5 text-white">
                <p className="text-sm text-slate-400">Genel Toplam</p>
                <p className="mt-2 text-3xl font-bold">
                  {formatCurrency(totalPrice)}
                </p>
              </div>

              <div className="space-y-2">
                <p className="text-sm font-medium">Sipariş Notu</p>
                <Textarea
                  name="notes"
                  placeholder="Varsa sipariş notunuzu yazın..."
                  className="min-h-28 rounded-2xl"
                />
              </div>

              <SubmitButton
                pendingText="Sipariş gönderiliyor..."
                disabled={selectedItems.length === 0}
                className="h-12 w-full rounded-2xl bg-orange-500 font-semibold hover:bg-orange-600"
              >
                <Send className="mr-2 h-4 w-4" />
                Siparişi Gönder
              </SubmitButton>

              {selectedItems.length > 0 ? (
                <Badge className="w-full justify-center rounded-2xl bg-green-100 py-4 text-green-700 hover:bg-green-100">
                  {selectedItems.length} farklı ürün seçildi
                </Badge>
              ) : null}
            </CardContent>
          </Card>
        </div>
      </div>
    </form>
  );
}

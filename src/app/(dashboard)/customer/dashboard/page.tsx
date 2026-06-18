import {
  ArrowRight,
  Clock3,
  PackageCheck,
  ShoppingCart,
  Truck,
} from "lucide-react";

import { DashboardHeader } from "@/components/layout/dashboard-header";
import { DashboardContainer } from "@/components/layout/dashboard-container";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";

import { Button } from "@/components/ui/button";

const activeOrders = [
  {
    id: "DRS-2001",
    status: "Hazırlanıyor",
    amount: "₺3.420",
  },

  {
    id: "DRS-2002",
    status: "Sevkiyatta",
    amount: "₺1.980",
  },
];

const favoriteProducts = [
  {
    name: "al'bi Kavurmalı Karışık Tost",
    price: "₺420",
  },

  {
    name: "al'bi RoastBeef Sandviç",
    price: "₺680",
  },

  {
    name: "al'bi Pesto Soslu Mozerella Sandviç",
    price: "₺540",
  },

  {
    name: "al'bi Atom Sandviç",
    price: "₺890",
  },
];

export default function CustomerDashboardPage() {
  return (
    <>
      <DashboardHeader
        title="Müşteri Paneli"
        description="Siparişlerinizi hızlıca yönetin."
      />

      <DashboardContainer>
        {" "}
        {/* HERO */}
        <Card className="overflow-hidden border-0 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white shadow-2xl">
          <CardContent className="flex flex-col gap-8 p-6 lg:flex-row lg:items-center lg:justify-between lg:p-8">
            <div>
              <Badge className="border-0 bg-white/10 text-white hover:bg-white/10">
                Hızlı Sipariş
              </Badge>

              <h2 className="mt-4 text-4xl font-bold leading-tight lg:text-5xl">
                Siparişlerinizi
                <br />
                saniyeler içinde oluşturun
              </h2>

              <p className="mt-4 max-w-xl text-slate-300">
                Sık sipariş verdiğiniz ürünleri hızlıca tekrar sipariş edin ve
                tüm süreçleri canlı takip edin.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Button className="h-12 rounded-2xl bg-orange-500 px-6 text-white hover:bg-orange-600">
                Yeni Sipariş
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>

              <Button
                variant="outline"
                className="h-12 rounded-2xl border-white/20 bg-white/10 px-6 text-white hover:bg-white/20"
              >
                Siparişlerim
              </Button>
            </div>
          </CardContent>
        </Card>
        {/* STATS */}
        <div className="grid gap-4 md:grid-cols-3">
          <Card className="border-0 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Aktif Sipariş</p>

                  <p className="mt-3 text-4xl font-bold">2</p>
                </div>

                <div className="rounded-2xl bg-orange-100 p-3 text-orange-500">
                  <Clock3 className="h-5 w-5" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">
                    Bu Ayki Sipariş
                  </p>

                  <p className="mt-3 text-4xl font-bold">14</p>
                </div>

                <div className="rounded-2xl bg-orange-100 p-3 text-orange-500">
                  <ShoppingCart className="h-5 w-5" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Son Sipariş</p>

                  <p className="mt-3 text-4xl font-bold">₺3.450</p>
                </div>

                <div className="rounded-2xl bg-orange-100 p-3 text-orange-500">
                  <PackageCheck className="h-5 w-5" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        {/* ACTIVE ORDERS + FAVORITES */}
        <div className="grid gap-6 xl:grid-cols-2">
          {/* ACTIVE ORDERS */}

          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle>Aktif Siparişler</CardTitle>
            </CardHeader>

            <CardContent className="space-y-4">
              {activeOrders.map((order) => (
                <div
                  key={order.id}
                  className="flex items-center justify-between rounded-2xl border bg-white p-5"
                >
                  <div>
                    <p className="font-semibold">{order.id}</p>

                    <p className="mt-1 text-sm text-muted-foreground">
                      Sipariş süreci devam ediyor
                    </p>
                  </div>

                  <div className="flex items-center gap-4">
                    <Badge className="bg-orange-100 text-orange-700 hover:bg-orange-100">
                      {order.status}
                    </Badge>

                    <p className="font-bold">{order.amount}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* FAVORITES */}

          <Card className="border-0 shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Sık Sipariş Verilenler</CardTitle>

              <Button variant="outline">Tümünü Gör</Button>
            </CardHeader>

            <CardContent className="grid gap-4 sm:grid-cols-2">
              {favoriteProducts.map((product) => (
                <div
                  key={product.name}
                  className="rounded-3xl border bg-gradient-to-br from-white to-slate-50 p-5 transition hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-semibold">{product.name}</p>

                      <p className="mt-2 text-sm text-muted-foreground">
                        Güncel fiyat
                      </p>
                    </div>

                    <div className="rounded-2xl bg-orange-100 p-3 text-orange-500">
                      <Truck className="h-4 w-4" />
                    </div>
                  </div>

                  <div className="mt-6 flex items-center justify-between">
                    <p className="text-xl font-bold">{product.price}</p>

                    <Button
                      size="sm"
                      className="rounded-xl bg-orange-500 hover:bg-orange-600"
                    >
                      Sipariş Ver
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </DashboardContainer>
    </>
  );
}

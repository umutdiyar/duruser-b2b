"use client";

import { useEffect, useRef } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";

const toastMessages: Record<
  string,
  {
    type: "success" | "error" | "info";
    message: string;
    description?: string;
  }
> = {
  orderCreated: {
    type: "success",
    message: "Sipariş oluşturuldu.",
    description: "Siparişiniz DuruSer yönetim paneline iletildi.",
  },

  orderStatusUpdated: {
    type: "success",
    message: "Sipariş durumu güncellendi.",
    description: "Güncel durum müşteri paneline yansıtıldı.",
  },

  productsUpdated: {
    type: "success",
    message: "Ürün yetkileri güncellendi.",
    description: "Firmanın sipariş verebileceği ürünler yenilendi.",
  },

  loginError: {
    type: "error",
    message: "Giriş başarısız.",
    description: "Email adresi veya şifre hatalı.",
  },

  unexpectedError: {
    type: "error",
    message: "Beklenmeyen hata.",
    description: "İşlem sırasında bir hata oluştu.",
  },

  logoutSuccess: {
    type: "success",
    message: "Çıkış yapıldı.",
    description: "Oturum güvenli şekilde sonlandırıldı.",
  },
};

export function RouteToast() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const shownToastRef = useRef<string | null>(null);

  useEffect(() => {
    const toastKey = searchParams.get("toast");

    if (!toastKey) return;

    if (shownToastRef.current === toastKey) return;

    shownToastRef.current = toastKey;

    const toastData = toastMessages[toastKey];

    if (!toastData) return;

    if (toastData.type === "success") {
      toast.success(toastData.message, {
        description: toastData.description,
      });
    }

    if (toastData.type === "error") {
      toast.error(toastData.message, {
        description: toastData.description,
      });
    }

    if (toastData.type === "info") {
      toast.info(toastData.message, {
        description: toastData.description,
      });
    }

    const timeout = setTimeout(() => {
      router.replace(pathname, {
        scroll: false,
      });
    }, 100);

    return () => clearTimeout(timeout);
  }, [searchParams, pathname, router]);

  return null;
}

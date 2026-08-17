"use client";

import { Suspense, useEffect, useRef } from "react";
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

  companyInactive: {
    type: "error",
    message: "Firma hesabı pasif.",
    description:
      "Firmanızın sisteme erişimi geçici olarak durdurulmuş. Erişim için DuruSer yönetimiyle iletişime geçin.",
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

  productCreated: {
    type: "success",
    message: "Ürün oluşturuldu.",
    description: "Yeni ürün kataloğa eklendi.",
  },

  productUpdated: {
    type: "success",
    message: "Ürün güncellendi.",
    description: "Ürün bilgileri başarıyla kaydedildi.",
  },

  productStatusUpdated: {
    type: "success",
    message: "Ürün durumu güncellendi.",
    description: "Ürün aktif/pasif durumu değiştirildi.",
  },

  productActivated: {
    type: "success",
    message: "Ürün aktife alındı.",
    description: "Ürün müşteri tarafında siparişe açıldı.",
  },

  productDeactivated: {
    type: "success",
    message: "Ürün pasife alındı.",
    description: "Ürün müşteri tarafında artık görünmeyecek.",
  },

  companyCreated: {
    type: "success",
    message: "Firma oluşturuldu.",
    description: "Yeni müşteri firma sisteme eklendi.",
  },

  companyUpdated: {
    type: "success",
    message: "Firma güncellendi.",
    description: "Firma bilgileri başarıyla kaydedildi.",
  },

  userCreated: {
    type: "success",
    message: "Kullanıcı oluşturuldu.",
    description: "Firma kullanıcısı sisteme eklendi.",
  },

  userUpdated: {
    type: "success",
    message: "Kullanıcı güncellendi.",
    description: "Kullanıcı bilgileri başarıyla kaydedildi.",
  },

  companyActivated: {
    type: "success",
    message: "Firma aktife alındı.",
    description: "Firma tekrar müşteri panelini kullanabilir.",
  },

  companyDeactivated: {
    type: "success",
    message: "Firma pasife alındı.",
    description: "Firma müşteri paneli erişimi kapatıldı.",
  },

  productAlreadyExists: {
    type: "error",
    message: "Ürün zaten mevcut.",
    description: "Aynı isimde başka bir ürün var.",
  },

  companyAlreadyExists: {
    type: "error",
    message: "Firma zaten mevcut.",
    description: "Aynı isim veya kod ile kayıtlı başka bir firma var.",
  },

  orderCancelNotAllowed: {
    type: "error",
    message: "Sipariş iptal edilemedi.",
    description:
      "Bu sipariş artık iptal edilebilecek durumda değil veya zaten iptal edilmiş.",
  },
};

export function RouteToast() {
  return (
    <Suspense fallback={null}>
      <RouteToastInner />
    </Suspense>
  );
}

function RouteToastInner() {
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

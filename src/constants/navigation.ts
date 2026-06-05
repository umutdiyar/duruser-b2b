import {
  LayoutDashboard,
  ShoppingCart,
  Users,
  Package,
  PlusCircle,
  History,
  Settings,
} from "lucide-react";

export const adminNavigation = [
  {
    title: "Dashboard",
    href: "/admin/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Siparişler",
    href: "/admin/orders",
    icon: ShoppingCart,
  },
  {
    title: "Müşteriler",
    href: "/admin/customers",
    icon: Users,
  },
  {
    title: "Ürünler",
    href: "/admin/products",
    icon: Package,
  },
  {
    title: "Ayarlar",
    href: "/admin/settings",
    icon: Settings,
  },
];

export const customerNavigation = [
  {
    title: "Dashboard",
    href: "/customer/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Ürünler",
    href: "/customer/products",
    icon: Package,
  },
  {
    title: "Yeni Sipariş",
    href: "/customer/new-order",
    icon: PlusCircle,
  },
  {
    title: "Siparişlerim",
    href: "/customer/orders",
    icon: History,
  },
];

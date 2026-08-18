import {
  Bell,
  LayoutDashboard,
  Package,
  PlusCircle,
  Settings,
  ShoppingCart,
  User,
  Users,
} from "lucide-react";

export type NavItem = {
  title: string;
  href: string;
  icon: typeof LayoutDashboard;
};

export const adminNavigation: NavItem[] = [
  { title: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
  { title: "Siparişler", href: "/admin/orders", icon: ShoppingCart },
  { title: "Müşteriler", href: "/admin/customers", icon: Users },
  { title: "Ürünler", href: "/admin/products", icon: Package },
  { title: "Bildirimler", href: "/admin/notifications", icon: Bell },
  { title: "Ayarlar", href: "/admin/settings", icon: Settings },
];

export const customerNavigation: NavItem[] = [
  { title: "Dashboard", href: "/customer/dashboard", icon: LayoutDashboard },
  { title: "Yeni Sipariş", href: "/customer/new-order", icon: PlusCircle },
  { title: "Siparişlerim", href: "/customer/orders", icon: ShoppingCart },
  { title: "Ürünler", href: "/customer/products", icon: Package },
  { title: "Bildirimler", href: "/customer/notifications", icon: Bell },
  { title: "Hesabım", href: "/customer/account", icon: User },
];

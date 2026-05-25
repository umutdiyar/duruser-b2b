import { redirect } from "next/navigation";
import { auth } from "@/auth/auth";

export default async function RedirectPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  if (session.user.role === "ADMIN") {
    redirect("/admin/dashboard");
  }

  if (session.user.role === "CUSTOMER") {
    redirect("/customer/dashboard");
  }

  redirect("/login");
}

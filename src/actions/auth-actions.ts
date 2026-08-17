"use server";

import { AuthError } from "next-auth";
import { redirect } from "next/navigation";
import { isRedirectError } from "next/dist/client/components/redirect-error";

import { CompanyInactiveError, signIn, signOut } from "@/auth";

export async function loginAction(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: "/redirect",
    });
  } catch (error) {
    if (isRedirectError(error)) {
      throw error;
    }

    if (error instanceof CompanyInactiveError) {
      redirect("/login?toast=companyInactive");
    }

    if (error instanceof AuthError) {
      redirect("/login?toast=loginError");
    }

    redirect("/login?toast=unexpectedError");
  }
}

export async function logoutAction() {
  await signOut({
    redirectTo: "/login?toast=logoutSuccess",
  });
}

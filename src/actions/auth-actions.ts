"use server";

import { signIn, signOut } from "../auth";
import { AuthError } from "next-auth";

export async function loginAction(formData: FormData) {
  try {
    await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirectTo: "/redirect",
    });
  } catch (error) {
    if (error instanceof AuthError) {
      throw new Error("Email veya şifre hatalı.");
    }

    throw error;
  }
}

export async function logoutAction() {
  await signOut({
    redirectTo: "/login",
  });
}

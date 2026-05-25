import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: "ADMIN" | "CUSTOMER";
      companyId?: string | null;
    } & DefaultSession["user"];
  }

  interface User {
    role: "ADMIN" | "CUSTOMER";
    companyId?: string | null;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role: "ADMIN" | "CUSTOMER";
    companyId?: string | null;
  }
}

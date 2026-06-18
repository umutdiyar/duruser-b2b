"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

import { Input } from "@/components/ui/input";

type PasswordInputProps = {
  name: string;
};

export function PasswordInput({ name }: PasswordInputProps) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative">
      <Input
        name={name}
        type={showPassword ? "text" : "password"}
        placeholder="Şifreniz"
        required
        autoComplete="current-password"
        className="h-12 rounded-2xl pr-14"
      />

      <button
        type="button"
        aria-label={showPassword ? "Şifreyi gizle" : "Şifreyi göster"}
        onMouseDown={(event) => event.preventDefault()}
        onClick={() => setShowPassword((prev) => !prev)}
        className="absolute right-2 top-1/2 z-30 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-xl text-slate-500 transition hover:bg-slate-100 hover:text-slate-900 active:scale-95"
      >
        {showPassword ? (
          <EyeOff className="h-4 w-4" />
        ) : (
          <Eye className="h-4 w-4" />
        )}
      </button>
    </div>
  );
}

"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

import { Button } from "@/components/ui/button";
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
        className="h-12 rounded-2xl pr-12"
      />

      <Button
        type="button"
        size="icon"
        variant="ghost"
        onClick={() => setShowPassword((prev) => !prev)}
        className="absolute right-2 top-2 h-8 w-8 rounded-xl"
      >
        {showPassword ? (
          <EyeOff className="h-4 w-4" />
        ) : (
          <Eye className="h-4 w-4" />
        )}
      </Button>
    </div>
  );
}

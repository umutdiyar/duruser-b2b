"use client";

import { useFormStatus } from "react-dom";
import { Loader2 } from "lucide-react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

type ConfirmSubmitButtonProps = {
  formId: string;
  title: string;
  description: string;
  confirmLabel?: string;
  cancelLabel?: string;
  pendingText?: string;
  variant?: React.ComponentProps<typeof Button>["variant"];
  confirmVariant?: "default" | "destructive";
  className?: string;
  children: React.ReactNode;
};

function ConfirmActionButton({
  formId,
  pendingText,
  confirmLabel,
  confirmVariant,
}: {
  formId: string;
  pendingText: string;
  confirmLabel: string;
  confirmVariant: "default" | "destructive";
}) {
  // Reflects the pending state of `formId` even though Radix renders this
  // button into a portal — useFormStatus reads React context, which follows
  // the component tree (where this is a descendant of the <form>), not the
  // DOM tree (where the portal moves it elsewhere).
  const { pending } = useFormStatus();

  return (
    <AlertDialogAction
      type="submit"
      form={formId}
      disabled={pending}
      variant={confirmVariant}
    >
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          {pendingText}
        </>
      ) : (
        confirmLabel
      )}
    </AlertDialogAction>
  );
}

export function ConfirmSubmitButton({
  formId,
  title,
  description,
  confirmLabel = "Onayla",
  cancelLabel = "Vazgeç",
  pendingText = "İşleniyor...",
  variant = "outline",
  confirmVariant = "destructive",
  className,
  children,
}: ConfirmSubmitButtonProps) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button type="button" variant={variant} className={className}>
          {children}
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>{cancelLabel}</AlertDialogCancel>

          <ConfirmActionButton
            formId={formId}
            pendingText={pendingText}
            confirmLabel={confirmLabel}
            confirmVariant={confirmVariant}
          />
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

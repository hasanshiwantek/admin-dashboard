"use client";

import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

export type FormFooterProps = {
  submitText?: string;
  loadingText?: string;
  cancelText?: string;
  onCancel?: () => void;
  loading?: boolean;
  disabled?: boolean;
  extraActions?: ReactNode;
  className?: string;
};

export function FormFooter({
  submitText = "Save",
  loadingText = "Saving...",
  cancelText = "Cancel",
  onCancel,
  loading,
  disabled,
  extraActions,
  className,
}: FormFooterProps) {
  return (
    <div
      className={cn(
        "fixed bottom-0 right-0 z-10 w-full border-t p-6 bg-white flex justify-end items-center gap-4",
        className,
      )}
    >
      {onCancel && (
        <Button
          type="button"
          variant="outline"
          size="xl"
          className="text-xl! 2xl:text-2xl! p-4 cursor-pointer"
          onClick={onCancel}
          disabled={loading}
        >
          {cancelText}
        </Button>
      )}
      {extraActions}
      <Button
        variant="primary"
        type="submit"
        size="xl"
        className="text-xl! 2xl:text-2xl!"
        disabled={loading || disabled}
      >
        {loading ? loadingText : submitText}
      </Button>
    </div>
  );
}

export default FormFooter;

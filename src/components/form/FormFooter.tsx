"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

export type FormFooterProps = {
  submitText?: string;
  loadingText?: string;
  cancelText?: string;
  onCancel?: () => void;
  /**
   * Handles the primary button instead of submitting the enclosing form,
   * e.g. for a sub-form rendered inside another form.
   */
  onSubmit?: () => void;
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
  onSubmit,
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
        <button
          type="button"
          className="text-xl! p-4 text-blue-500! cursor-pointer"
          onClick={onCancel}
          disabled={loading}
        >
          {cancelText}
        </button>
      )}
      {extraActions}
      <Button
        type={onSubmit ? "button" : "submit"}
        onClick={onSubmit}
        size="xl"
        className="btn-primary text-xl! 2xl:text-2xl!"
        disabled={loading || disabled}
      >
        {loading ? loadingText : submitText}
      </Button>
    </div>
  );
}

export default FormFooter;

"use client";

import Form from "@/components/form/Form";
import { Button } from "@/components/ui/Button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useRef } from "react";
import { FieldValues } from "react-hook-form";
import { ProductEditSheetProps } from "./type";

// Side sheet for quick product edits, with "Save" and "Save and exit"
const ProductEditSheet = <T extends FieldValues>({
  title,
  trigger,
  open,
  onOpenChange,
  form,
  onSubmit,
  children,
}: ProductEditSheetProps<T>) => {
  const exitAfterSave = useRef(false);
  const saving = form.formState.isSubmitting;

  const handleSubmit = async (values: T) => {
    const saved = await onSubmit(values);
    if (saved && exitAfterSave.current) onOpenChange(false);
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetTrigger asChild>{trigger}</SheetTrigger>
      <SheetContent side="right" className="flex flex-col">
        <SheetHeader className="border-b p-6">
          <SheetTitle>{title}</SheetTitle>
        </SheetHeader>
        <Form
          form={form}
          onSubmit={handleSubmit}
          className="min-h-0 flex-1 pb-0"
          bodyClassName="flex-1 overflow-x-auto rounded-none border-0 p-10"
          footer={
            <div className="flex gap-3 border-t bg-white p-6">
              <Button
                type="submit"
                variant="outline"
                size="xl"
                className="w-1/2"
                disabled={saving}
                onClick={() => (exitAfterSave.current = false)}
              >
                {saving ? "Saving..." : "Save"}
              </Button>
              <Button
                type="submit"
                variant="primary"
                size="xl"
                className="w-1/2"
                disabled={saving}
                onClick={() => (exitAfterSave.current = true)}
              >
                {saving ? "Saving..." : "Save and exit"}
              </Button>
            </div>
          }
        >
          {children}
        </Form>
      </SheetContent>
    </Sheet>
  );
};

export default ProductEditSheet;

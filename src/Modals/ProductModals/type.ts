import { ReactNode } from "react";
import { FieldValues, UseFormReturn } from "react-hook-form";

// The product row a quick-edit sheet works on
export interface QuickEditProduct {
  id: number;
  name: string;
  sku: string;
}

export interface ProductEditSheetProps<T extends FieldValues> {
  title: string;
  trigger: ReactNode;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  form: UseFormReturn<T, any, any>;
  /** Return false to keep the sheet open, e.g. when the save failed */
  onSubmit: (values: T) => Promise<boolean>;
  children: ReactNode;
}

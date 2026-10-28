import type { ProductListItem } from "@/app/(protected)/manage/products/type";
import type { EditProductStockSchema } from "@/validations/formValidations";
import { ReactNode } from "react";
import * as yup from "yup";

export type EditProductStockFormValues = yup.InferType<
  typeof EditProductStockSchema
>;

export interface EditProductStockSheetProps {
  product: ProductListItem;
  trigger: ReactNode;
  onSaved?: () => void;
}

export interface EditProductStockPayload {
  currentStock: number | null;
  lowStock: number | null;
  allowPurchase: boolean;
}

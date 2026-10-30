import type {
  ProductCurrency,
  ProductListItem,
} from "@/app/(protected)/manage/products/type";
import type { EditProductPricesSchema } from "@/validations/formValidations";
import { ReactNode } from "react";
import * as yup from "yup";

export type EditProductPricesFormValues = yup.InferType<
  typeof EditProductPricesSchema
>;

export interface EditProductPricesSheetProps {
  product: ProductListItem;
  currency: ProductCurrency;
  trigger: ReactNode;
  onSaved?: () => void;
}

export interface EditProductPricesPayload {
  price: number;
  salePrice: number | null;
  costPrice: number | null;
  msrp: number | null;
}

import type { ProductListItem } from "@/app/(protected)/manage/products/type";
import { isFlagOn } from "@/app/(protected)/manage/products/utils";
import { EditProductStockFormNames } from "./constant";
import type {
  EditProductStockFormValues,
  EditProductStockPayload,
} from "./type";

const toText = (value: unknown) =>
  value === null || value === undefined ? "" : String(value);

export const transformGetProductStock = (
  product: ProductListItem,
): EditProductStockFormValues => ({
  [EditProductStockFormNames.CurrentStock]: toText(product.currentStock),
  [EditProductStockFormNames.LowStock]: toText(product.lowStock),
  [EditProductStockFormNames.AllowPurchase]: isFlagOn(product.allowPurchase),
});

export const transformPostProductStock = (
  values: EditProductStockFormValues,
): EditProductStockPayload => ({
  currentStock: values.currentStock === "" ? null : Number(values.currentStock),
  lowStock: values.lowStock === "" ? null : Number(values.lowStock),
  allowPurchase: values.allowPurchase,
});

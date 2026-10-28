import type { EditProductStockFormValues } from "./type";

export enum EditProductStockFormNames {
  CurrentStock = "currentStock",
  LowStock = "lowStock",
  AllowPurchase = "allowPurchase",
}

export const editProductStockDefaults: EditProductStockFormValues = {
  [EditProductStockFormNames.CurrentStock]: "",
  [EditProductStockFormNames.LowStock]: "",
  [EditProductStockFormNames.AllowPurchase]: false,
};

import type { EditProductPricesFormValues } from "./type";

export enum EditProductPricesFormNames {
  Price = "price",
  SalePrice = "salePrice",
  CostPrice = "costPrice",
  Msrp = "msrp",
}

export const editProductPricesDefaults: EditProductPricesFormValues = {
  [EditProductPricesFormNames.Price]: "",
  [EditProductPricesFormNames.SalePrice]: "",
  [EditProductPricesFormNames.CostPrice]: "",
  [EditProductPricesFormNames.Msrp]: "",
};

export const PRICE_COLUMNS = [
  { value: EditProductPricesFormNames.Price, label: "Price" },
  { value: EditProductPricesFormNames.SalePrice, label: "Sale price" },
  { value: EditProductPricesFormNames.CostPrice, label: "Cost" },
  { value: EditProductPricesFormNames.Msrp, label: "MSRP" },
];

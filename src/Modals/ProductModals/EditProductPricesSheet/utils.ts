import type {
  ProductCurrency,
  ProductListItem,
} from "@/app/(protected)/manage/products/type";
import { roundToCurrency } from "@/app/(protected)/manage/products/utils";
import { EditProductPricesFormNames } from "./constant";
import type {
  EditProductPricesFormValues,
  EditProductPricesPayload,
} from "./type";

const toText = (value: unknown) =>
  value === null || value === undefined ? "" : String(value);

export const transformGetProductPrices = (
  product: ProductListItem,
): EditProductPricesFormValues => ({
  [EditProductPricesFormNames.Price]: toText(product.price),
  [EditProductPricesFormNames.SalePrice]: toText(product.salePrice),
  [EditProductPricesFormNames.CostPrice]: toText(product.costPrice),
  [EditProductPricesFormNames.Msrp]: toText(product.msrp),
});

export const transformPostProductPrices = (
  values: EditProductPricesFormValues,
  currency: ProductCurrency,
): EditProductPricesPayload => {
  const toAmount = (value: string) =>
    value === "" ? null : roundToCurrency(Number(value), currency);

  return {
    price: toAmount(values.price) ?? 0,
    salePrice: toAmount(values.salePrice),
    costPrice: toAmount(values.costPrice),
    msrp: toAmount(values.msrp),
  };
};

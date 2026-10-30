import type {
  ProductCurrency,
  ProductListItem,
} from "@/app/(protected)/manage/products/type";
import PriceField from "@/components/form/PriceField";
import { ColumnDef } from "@/components/ui/Table/types";
import { PRICE_COLUMNS } from "./constant";

export const getPriceColumns = (
  currency: ProductCurrency,
): ColumnDef<ProductListItem>[] => [
  { key: "name", header: "Product name" },
  { key: "sku", header: "SKU" },
  ...PRICE_COLUMNS.map(
    ({ value, label }): ColumnDef<ProductListItem> => ({
      key: value,
      header: label,
      render: () => (
        <PriceField
          name={value}
          layout="vertical"
          containerClassName="mb-0"
          currency={currency}
        />
      ),
    }),
  ),
];

import type { PriceInputProps } from "@/app/(protected)/manage/products/_components/type";
import type { ProductListItem } from "@/app/(protected)/manage/products/type";
import InputField from "@/components/form/InputField";
import { ColumnDef } from "@/components/ui/Table/types";
import { PRICE_COLUMNS } from "./constant";

export const getPriceColumns = (
  priceInputProps: PriceInputProps,
): ColumnDef<ProductListItem>[] => [
  { key: "name", header: "Product name" },
  { key: "sku", header: "SKU" },
  ...PRICE_COLUMNS.map(
    ({ value, label }): ColumnDef<ProductListItem> => ({
      key: value,
      header: label,
      render: () => (
        <InputField
          name={value}
          layout="vertical"
          containerClassName="mb-0"
          {...priceInputProps}
        />
      ),
    }),
  ),
];

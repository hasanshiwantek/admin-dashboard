import { wholeNumberInputProps } from "@/app/(protected)/manage/products/utils";
import type { ProductListItem } from "@/app/(protected)/manage/products/type";
import CheckboxField from "@/components/form/fields/CheckboxField";
import InputField from "@/components/form/InputField";
import { ColumnDef } from "@/components/ui/Table/types";
import { EditProductStockFormNames } from "./constant";

export const stockColumns: ColumnDef<ProductListItem>[] = [
  { key: "name", header: "Product name" },
  { key: "sku", header: "SKU" },
  {
    key: EditProductStockFormNames.CurrentStock,
    header: "Current stock",
    render: () => (
      <InputField
        name={EditProductStockFormNames.CurrentStock}
        layout="vertical"
        containerClassName="mb-0"
        {...wholeNumberInputProps}
      />
    ),
  },
  {
    key: EditProductStockFormNames.LowStock,
    header: "Low stock",
    render: () => (
      <InputField
        name={EditProductStockFormNames.LowStock}
        layout="vertical"
        containerClassName="mb-0"
        {...wholeNumberInputProps}
      />
    ),
  },
  {
    key: EditProductStockFormNames.AllowPurchase,
    header: "Availability",
    render: () => (
      <InputField
        name={EditProductStockFormNames.AllowPurchase}
        layout="vertical"
        Component={CheckboxField}
        text="Can be purchased"
        containerClassName="mb-0"
      />
    ),
  },
];

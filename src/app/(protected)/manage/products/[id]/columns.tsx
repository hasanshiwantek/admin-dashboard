import { SelectField } from "@/components/form/fields/SelectField";
import InputField from "@/components/form/InputField";
import { Button } from "@/components/ui/Button";
import { ColumnDef } from "@/components/ui/Table/types";
import { Trash2 } from "lucide-react";
import type {
  BulkPricingTierRow,
  CustomFieldRow,
  HsCodeRow,
  PriceInputProps,
} from "../_components/type";
import {
  BulkPricingTierFormNames,
  CountryOptions,
  CustomFieldFormNames,
  HsCodeFormNames,
  ProductFormNames,
} from "./constant";
import type { ProductCurrency } from "../type";
import {
  getTierUnitPrice,
} from "./utils";
import { formatPrice, wholeNumberInputProps } from "../utils";

const CELL_TEXT = "text-[1.5rem]! font-normal! text-text-heading!";
const FIELD = "mb-0";

const rowField = (list: ProductFormNames, index: number, field: string) =>
  `${list}.${index}.${field}`;

const removeColumn = <T,>(onRemove: (index: number) => void): ColumnDef<T> => ({
  key: "remove",
  width: "60px",
  render: (_, index) => (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      aria-label="Remove"
      onClick={() => onRemove(index)}
      className="text-gray-500 hover:text-danger-red"
    >
      <Trash2 className="size-6!" />
    </Button>
  ),
});

export const getBulkPricingColumns = ({
  currency,
  priceInputProps,
  discountLabel,
  discountType,
  basePrice,
  onRemove,
}: {
  currency: ProductCurrency;
  priceInputProps: PriceInputProps;
  discountLabel: string;
  discountType: string;
  basePrice: number;
  onRemove: (index: number) => void;
}): ColumnDef<BulkPricingTierRow>[] => [
  {
    key: "minQty",
    header: "Min quantity",
    render: (_, index) => (
      <InputField
        name={rowField(
          ProductFormNames.BulkPricingTiers,
          index,
          BulkPricingTierFormNames.MinQty,
        )}
        layout="vertical"
        containerClassName={FIELD}
        className="max-w-none"
        {...wholeNumberInputProps}
      />
    ),
  },
  {
    key: "price",
    header: discountLabel,
    render: (_, index) => (
      <InputField
        name={rowField(
          ProductFormNames.BulkPricingTiers,
          index,
          BulkPricingTierFormNames.Price,
        )}
        layout="vertical"
        containerClassName={FIELD}
        {...priceInputProps}
      />
    ),
  },
  {
    key: "unitPrice",
    header: "Unit price",
    render: (row) => (
      <span className={CELL_TEXT}>
        {formatPrice(
          getTierUnitPrice(row, { basePrice, discountType, currency }),
          currency,
        )}
      </span>
    ),
  },
  removeColumn(onRemove),
];

export const getCustomFieldColumns = ({
  onRemove,
}: {
  onRemove: (index: number) => void;
}): ColumnDef<CustomFieldRow>[] => [
  {
    key: "name",
    header: "Custom field name",
    render: (_, index) => (
      <InputField
        name={rowField(
          ProductFormNames.CustomFields,
          index,
          CustomFieldFormNames.Name,
        )}
        layout="vertical"
        placeholder="e.g. Wine Vintage"
        containerClassName={FIELD}
        className="max-w-none"
      />
    ),
  },
  {
    key: "value",
    header: "Custom field value",
    render: (_, index) => (
      <InputField
        name={rowField(
          ProductFormNames.CustomFields,
          index,
          CustomFieldFormNames.Value,
        )}
        layout="vertical"
        placeholder="e.g. 1998"
        containerClassName={FIELD}
        className="max-w-none"
      />
    ),
  },
  removeColumn(onRemove),
];

export const getHsCodeColumns = ({
  onRemove,
}: {
  onRemove: (index: number) => void;
}): ColumnDef<HsCodeRow>[] => [
  {
    key: "country",
    header: "Country",
    render: (_, index) => (
      <InputField
        name={rowField(ProductFormNames.HsCodes, index, HsCodeFormNames.Country)}
        layout="vertical"
        Component={SelectField}
        options={CountryOptions}
        placeholder="Select country"
        containerClassName={FIELD}
        className="max-w-none"
      />
    ),
  },
  {
    key: "code",
    header: "HS code",
    render: (_, index) => (
      <InputField
        name={rowField(ProductFormNames.HsCodes, index, HsCodeFormNames.Code)}
        layout="vertical"
        placeholder="HS code"
        containerClassName={FIELD}
        className="max-w-none"
      />
    ),
  },
  removeColumn(onRemove),
];

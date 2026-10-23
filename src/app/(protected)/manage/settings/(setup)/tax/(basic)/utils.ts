import type {
  TaxClass,
  TaxClassesFormValues,
  TaxClassPayload,
  TaxZone,
} from "./type";

export const formatPriceDisplay = ({ pricesIncludeTax }: TaxZone) =>
  pricesIncludeTax ? "Tax inclusive" : "Tax exclusive";

export const transformGetTaxClasses = (
  classes: TaxClass[],
): TaxClassesFormValues => ({
  classes: classes.map((taxClass) => ({
    classId: String(taxClass.id),
    label: taxClass.name,
    isDefault: taxClass.isDefault,
  })),
});

// New rows have no id yet
export const transformPostTaxClasses = (
  values: TaxClassesFormValues,
): TaxClassPayload[] =>
  values.classes.map((row) => ({
    id: row.classId ? Number(row.classId) : null,
    name: row.label,
  }));

import type { TaxClass, TaxZone } from "../type";
import {
  TaxPriceDisplay,
  TaxZoneAppliesTo,
  TaxZoneBasedOn,
  taxZoneSettingsDefaults,
} from "./constant";
import type {
  TaxRate,
  TaxRateFormValues,
  TaxRatePayload,
  TaxRateRow,
  TaxZonePayload,
  TaxZoneSettingsFormValues,
} from "./type";

// `duplicate` prefills the add form from another zone
export const transformGetTaxZone = (
  zone: TaxZone,
  { duplicate = false } = {},
): TaxZoneSettingsFormValues => ({
  name: duplicate ? `Copy of ${zone.name}` : zone.name,
  basedOn: zone.basedOn ?? TaxZoneBasedOn.Countries,
  countries: zone.countries ?? [],
  subdivisionCountry:
    zone.subdivisionCountry ?? taxZoneSettingsDefaults.subdivisionCountry,
  subdivisions: zone.subdivisions ?? [],
  postalCodeCountry:
    zone.postalCodeCountry ?? taxZoneSettingsDefaults.postalCodeCountry,
  postalCodes: (zone.postalCodes ?? []).join("\n"),
  appliesTo: zone.appliesTo ?? TaxZoneAppliesTo.All,
  customerGroups: zone.customerGroups ?? [],
  isEnabled: zone.isEnabled,
  priceDisplay: zone.pricesIncludeTax
    ? TaxPriceDisplay.Inclusive
    : TaxPriceDisplay.Exclusive,
  showBothOnListing: zone.showBothOnListing ?? false,
  showBothOnDetail: zone.showBothOnDetail ?? false,
});

// One postal code per line or comma-separated
const toPostalCodes = (text: string) =>
  text
    .split(/[\n,]/)
    .map((code) => code.trim())
    .filter(Boolean);

export const transformPostTaxZone = (
  values: TaxZoneSettingsFormValues,
): TaxZonePayload => ({
  name: values.name,
  basedOn: values.basedOn,
  countries: values.countries,
  subdivisionCountry: values.subdivisionCountry,
  subdivisions: values.subdivisions,
  postalCodeCountry: values.postalCodeCountry,
  postalCodes: toPostalCodes(values.postalCodes),
  appliesTo: values.appliesTo,
  customerGroups:
    values.appliesTo === TaxZoneAppliesTo.Groups ? values.customerGroups : [],
  isEnabled: values.isEnabled,
  pricesIncludeTax: values.priceDisplay === TaxPriceDisplay.Inclusive,
  showBothOnListing: values.showBothOnListing,
  showBothOnDetail: values.showBothOnDetail,
});

const formatRate = (rate: number | null) => (rate == null ? "-" : `${rate}%`);

export const toTaxRateRows = (
  rates: TaxRate[],
  classes: TaxClass[],
): TaxRateRow[] =>
  rates.map((rate) => ({
    ...rate,
    classLines: classes.map((taxClass) => ({
      key: String(taxClass.id),
      className: `${taxClass.name}:`,
      rate: formatRate(
        rate.classRates.find((entry) => entry.classId === taxClass.id)
          ?.rate ?? null,
      ),
    })),
  }));

// One rate input per tax class, prefilled from `rate` when editing
export const transformGetTaxRate = (
  rate: TaxRate | null,
  classes: TaxClass[],
): TaxRateFormValues => ({
  name: rate?.name ?? "",
  classRates: classes.map((taxClass) => {
    const saved = rate?.classRates.find(
      (entry) => entry.classId === taxClass.id,
    );
    return {
      classId: String(taxClass.id),
      className: taxClass.name,
      rate: saved?.rate == null ? "" : String(saved.rate),
    };
  }),
  priority: String(rate?.priority ?? 0),
  isEnabled: rate?.isEnabled ?? true,
});

export const transformPostTaxRate = (
  values: TaxRateFormValues,
  zoneId: number,
): TaxRatePayload => ({
  zoneId,
  name: values.name,
  classRates: values.classRates.map((entry) => ({
    classId: Number(entry.classId),
    rate: entry.rate === "" ? null : Number(entry.rate),
  })),
  priority: Number(values.priority),
  isEnabled: values.isEnabled,
});

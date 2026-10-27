import type { ActionItem } from "@/components/ActionButton/type";
import type { SelectOption } from "@/components/ui/Select";
import { ActionEnums } from "@/const/appConstants";
import { ADD_TAX_ZONE_ROUTE, editTaxZoneRoute } from "../constant";
import type {
  TaxRate,
  TaxRateFormValues,
  TaxZoneSettingsFormValues,
} from "./type";

// ─── Routes ──────────────────────────────────────────────────
// /tax/tax-zones/<zoneId>         zone settings ("add" creates one)
// /tax/tax-zones/<zoneId>/rates   the zone's tax rates
// /tax/tax-zones/<zoneId>/rates/<rateId>   a rate ("add" creates one)
export const NEW_TAX_ZONE_ID = "add";
export const DUPLICATE_TAX_ZONE_PARAM = "duplicate";
export const duplicateTaxZoneRoute = (id: number | string) =>
  `${ADD_TAX_ZONE_ROUTE}?${DUPLICATE_TAX_ZONE_PARAM}=${id}`;

export const taxZoneRatesRoute = (zoneId: number | string) =>
  `${editTaxZoneRoute(zoneId)}/rates`;
export const NEW_TAX_RATE_ID = "add";
export const addTaxRateRoute = (zoneId: number | string) =>
  `${taxZoneRatesRoute(zoneId)}/${NEW_TAX_RATE_ID}`;
export const editTaxRateRoute = (
  zoneId: number | string,
  rateId: number | string,
) => `${taxZoneRatesRoute(zoneId)}/${rateId}`;

export enum TaxZoneTab {
  Settings = "settings",
  Rates = "rates",
}

export const taxZoneTabs = [
  { key: TaxZoneTab.Settings, label: "Zone settings" },
  { key: TaxZoneTab.Rates, label: "Tax rates" },
];

// ─── Zone settings form ──────────────────────────────────────
export enum TaxZoneBasedOn {
  Countries = "countries",
  Subdivisions = "subdivisions",
  PostalCodes = "postalCodes",
}

export const taxZoneBasedOnOptions: SelectOption[] = [
  { value: TaxZoneBasedOn.Countries, label: "Countries" },
  { value: TaxZoneBasedOn.Subdivisions, label: "Subdivisions" },
  { value: TaxZoneBasedOn.PostalCodes, label: "Postal codes" },
];

export enum TaxZoneAppliesTo {
  All = "all",
  Groups = "groups",
}

export const taxZoneAppliesToOptions: SelectOption[] = [
  { value: TaxZoneAppliesTo.All, label: "All customers in my store" },
  { value: TaxZoneAppliesTo.Groups, label: "Only customers in select groups" },
];

export enum TaxPriceDisplay {
  Inclusive = "inclusive",
  Exclusive = "exclusive",
}

export const taxPriceDisplayOptions: SelectOption[] = [
  { value: TaxPriceDisplay.Inclusive, label: "Display prices inclusive of tax" },
  { value: TaxPriceDisplay.Exclusive, label: "Display prices exclusive of tax" },
];

// Placeholder until a customer groups API is available
export const customerGroupOptions: SelectOption[] = [
  { value: "1", label: "Retail" },
  { value: "2", label: "Wholesale" },
];

export enum TaxZoneSettingsFormNames {
  Name = "name",
  BasedOn = "basedOn",
  Countries = "countries",
  SubdivisionCountry = "subdivisionCountry",
  Subdivisions = "subdivisions",
  PostalCodeCountry = "postalCodeCountry",
  PostalCodes = "postalCodes",
  AppliesTo = "appliesTo",
  CustomerGroups = "customerGroups",
  IsEnabled = "isEnabled",
  PriceDisplay = "priceDisplay",
  ShowBothOnListing = "showBothOnListing",
  ShowBothOnDetail = "showBothOnDetail",
}

export const taxZoneSettingsDefaults: TaxZoneSettingsFormValues = {
  [TaxZoneSettingsFormNames.Name]: "",
  [TaxZoneSettingsFormNames.BasedOn]: TaxZoneBasedOn.Countries,
  [TaxZoneSettingsFormNames.Countries]: [],
  [TaxZoneSettingsFormNames.SubdivisionCountry]: "US",
  [TaxZoneSettingsFormNames.Subdivisions]: [],
  [TaxZoneSettingsFormNames.PostalCodeCountry]: "US",
  [TaxZoneSettingsFormNames.PostalCodes]: "",
  [TaxZoneSettingsFormNames.AppliesTo]: TaxZoneAppliesTo.All,
  [TaxZoneSettingsFormNames.CustomerGroups]: [],
  [TaxZoneSettingsFormNames.IsEnabled]: true,
  [TaxZoneSettingsFormNames.PriceDisplay]: TaxPriceDisplay.Exclusive,
  [TaxZoneSettingsFormNames.ShowBothOnListing]: false,
  [TaxZoneSettingsFormNames.ShowBothOnDetail]: false,
};

// ─── Tax rates ───────────────────────────────────────────────
export const taxRateActions: ActionItem[] = [
  { type: ActionEnums.EDIT, label: "Edit" },
  { type: ActionEnums.DELETE, label: "Delete" },
];

export enum TaxRateFormNames {
  Name = "name",
  ClassRates = "classRates",
  Priority = "priority",
  IsEnabled = "isEnabled",
}

export enum TaxRateClassFormNames {
  ClassId = "classId",
  ClassName = "className",
  Rate = "rate",
}

export const taxRateDefaults: TaxRateFormValues = {
  [TaxRateFormNames.Name]: "",
  [TaxRateFormNames.ClassRates]: [],
  [TaxRateFormNames.Priority]: "0",
  [TaxRateFormNames.IsEnabled]: true,
};

// Placeholder until the tax API is available
export const defaultTaxRates: TaxRate[] = [
  {
    id: 1,
    zoneId: 2,
    name: "Audio-Video Devices",
    classRates: [
      { classId: 1, rate: 1 },
      { classId: 2, rate: 1 },
      { classId: 3, rate: 2 },
      { classId: 4, rate: 2 },
    ],
    priority: 3,
    isEnabled: true,
  },
];

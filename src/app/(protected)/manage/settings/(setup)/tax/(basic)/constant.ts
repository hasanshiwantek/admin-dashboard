import { TAX_ROUTE } from "../constant";
import type { TaxClass, TaxClassFormRow, TaxClassesFormValues, TaxZone } from "./type";

export const BASIC_TAX_SETUP_URL =
  "https://support.bigcommerce.com/s/article/Manual-Tax-Setup";

// Values are the URL slugs under TAX_ROUTE; (basic) is a route group, so each
// tab folder sits directly under /tax
export enum BasicTaxTab {
  General = "tax-general",
  Classes = "tax-classes",
  Zones = "tax-zones",
}

export const basicTaxTabRoute = (tab: BasicTaxTab) => `${TAX_ROUTE}/${tab}`;

export const basicTaxTabs = [
  { key: BasicTaxTab.General, label: "General" },
  { key: BasicTaxTab.Classes, label: "Tax classes" },
  { key: BasicTaxTab.Zones, label: "Tax rates and zones" },
];

export const ADD_TAX_ZONE_ROUTE = `${basicTaxTabRoute(BasicTaxTab.Zones)}/add`;
export const editTaxZoneRoute = (id: number | string) =>
  `${basicTaxTabRoute(BasicTaxTab.Zones)}/${id}`;

export enum TaxClassesFormNames {
  Classes = "classes",
}

export enum TaxClassRowFormNames {
  ClassId = "classId",
  Label = "label",
  IsDefault = "isDefault",
}

export const newTaxClassRow: TaxClassFormRow = {
  [TaxClassRowFormNames.ClassId]: "",
  [TaxClassRowFormNames.Label]: "",
  [TaxClassRowFormNames.IsDefault]: false,
};

export const taxClassesDefaults: TaxClassesFormValues = {
  [TaxClassesFormNames.Classes]: [],
};

// Placeholders until the tax API is available
export const defaultTaxClasses: TaxClass[] = [
  { id: 1, name: "Default Tax Class", isDefault: true },
  { id: 2, name: "Non-taxable", isDefault: false },
  { id: 3, name: "Shipping", isDefault: false },
  { id: 4, name: "Gift Wrapping", isDefault: false },
];

export const defaultTaxZones: TaxZone[] = [
  {
    id: 1,
    name: "Default Zone",
    isDefault: true,
    zoneType: "Global",
    pricesIncludeTax: false,
    isEnabled: true,
  },
  {
    id: 2,
    name: "Default Zone",
    isDefault: false,
    zoneType: "Global",
    pricesIncludeTax: false,
    isEnabled: true,
  },
  {
    id: 3,
    name: "Default Zone",
    isDefault: false,
    zoneType: "Global",
    pricesIncludeTax: false,
    isEnabled: true,
  },
];

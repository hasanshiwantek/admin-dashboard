import type {
  FedExFormValues,
  FedExSelectFieldConfig,
  FedExUnitFieldConfig,
} from "./type";

/** Form field names; use these for `name`, watch/setValue and schema keys. */
export enum FedExField {
  // Settings
  DisplayName = "displayName",
  DropOffType = "dropOffType",
  PackagingType = "packagingType",
  PackingMethod = "packingMethod",
  RateType = "rateType",
  IncludePackageValue = "includePackageValue",
  DestinationType = "destinationType",
  DeliveryServices = "deliveryServices",
  // Connection
  Key = "key",
  Password = "password",
  AccountNumber = "accountNumber",
  ApiBaseUrl = "apiBaseUrl",
  // Quote
  DestCountry = "destCountry",
  DestState = "destState",
  DestZip = "destZip",
  PkgWeight = "pkgWeight",
  PkgValue = "pkgValue",
  PkgLength = "pkgLength",
  PkgWidth = "pkgWidth",
  PkgHeight = "pkgHeight",
}

export enum FedExTab {
  Settings = "settings",
  Connection = "connection",
  Quote = "quote",
}

export const fedexDefaultValues: FedExFormValues = {
  [FedExField.DisplayName]: "",
  [FedExField.DropOffType]: "",
  [FedExField.PackagingType]: "",
  [FedExField.PackingMethod]: "",
  [FedExField.RateType]: "",
  [FedExField.IncludePackageValue]: false,
  [FedExField.DestinationType]: "",
  [FedExField.DeliveryServices]: [],
  [FedExField.Key]: "",
  [FedExField.Password]: "",
  [FedExField.AccountNumber]: "",
  [FedExField.ApiBaseUrl]: "",
  [FedExField.DestCountry]: "",
  [FedExField.DestState]: "",
  [FedExField.DestZip]: "",
  [FedExField.PkgWeight]: "",
  [FedExField.PkgValue]: "",
  [FedExField.PkgLength]: "",
  [FedExField.PkgWidth]: "",
  [FedExField.PkgHeight]: "",
};

// The "Quote" tab (panel + save branch) is built but off until the API
// supports it; flip this to show it
export const FEDEX_QUOTE_TAB_ENABLED = false;

export const fedexTabs = [
  { key: FedExTab.Settings, label: "Settings" },
  { key: FedExTab.Connection, label: "Connection" },
  ...(FEDEX_QUOTE_TAB_ENABLED ? [{ key: FedExTab.Quote, label: "Quote" }] : []),
];

// Fields on a non-default tab; on a failed submit the modal jumps to the
// tab holding the first error, since hidden fields can't show it
export const FEDEX_FIELD_TAB: Partial<Record<FedExField, FedExTab>> = {
  [FedExField.Key]: FedExTab.Connection,
  [FedExField.Password]: FedExTab.Connection,
  [FedExField.AccountNumber]: FedExTab.Connection,
  [FedExField.ApiBaseUrl]: FedExTab.Connection,
};

// Selects shown above the "Include package value" checkbox
export const fedexSettingsSelects: FedExSelectFieldConfig[] = [
  {
    name: FedExField.DropOffType,
    label: "Drop-off Type",
    options: [
      { value: "REGULAR_PICKUP", label: "Regular Pickup" },
      { value: "REQUEST_COURIER", label: "Request Courier" },
      { value: "DROP_BOX", label: "Drop Box" },
      { value: "BUSINESS_SERVICE_CENTER", label: "Business Service Center" },
      { value: "STATION", label: "Station" },
    ],
  },
  {
    name: FedExField.PackagingType,
    label: "Packaging Type",
    options: [
      { value: "FEDEX_ENVELOPE", label: "FedEx Envelope" },
      { value: "FEDEX_PAK", label: "FedEx Pak" },
      { value: "FEDEX_BOX", label: "FedEx Box" },
      { value: "FEDEX_TUBE", label: "FedEx Tube" },
      { value: "FEDEX_10KG_BOX", label: "FedEx 10kg Box" },
      { value: "FEDEX_25KG_BOX", label: "FedEx 25kg Box" },
      { value: "YOUR_PACKAGING", label: "Your Packaging" },
    ],
  },
  {
    name: FedExField.PackingMethod,
    label: "Packing Method",
    options: [
      { value: "ALL_IN_ONE", label: "All items in a single package" },
      { value: "EACH_ITEM", label: "Each item in its own package" },
    ],
  },
  {
    name: FedExField.RateType,
    label: "Rate Type",
    options: [
      { value: "LIST", label: "List Rate" },
      { value: "ACCOUNT", label: "Account Rate" },
    ],
  },
];

// Shown below the checkbox
export const fedexDestinationTypeSelect: FedExSelectFieldConfig = {
  name: FedExField.DestinationType,
  label: "Destination Type",
  options: [
    { value: "RESIDENTIAL", label: "Residential" },
    { value: "COMMERCIAL", label: "Commercial" },
  ],
};

export const fedexQuoteUnitFields: FedExUnitFieldConfig[] = [
  { name: FedExField.PkgValue, label: "Package value", startIcon: "$" },
  { name: FedExField.PkgLength, label: "Package length", endIcon: "Inches" },
  { name: FedExField.PkgWidth, label: "Package width", endIcon: "Inches" },
  { name: FedExField.PkgHeight, label: "Package height", endIcon: "Inches" },
];

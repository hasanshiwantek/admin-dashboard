import { FieldErrors } from "react-hook-form";
import { FEDEX_FIELD_TAB, FedExField, FedExTab } from "./constant";
import { FedExDeliveryService, FedExFormValues } from "./type";

// Saved FedEx config (API) → settings + connection form fields
export const transformGetFedExConfig = (
  config: any,
): Partial<FedExFormValues> => ({
  [FedExField.DisplayName]: config.display_name || "",
  [FedExField.DropOffType]: config.dropoff_type || "",
  [FedExField.PackagingType]: config.packaging_type || "",
  [FedExField.PackingMethod]: config.packing_method || "",
  [FedExField.RateType]: config.rate_type || "",
  [FedExField.IncludePackageValue]: config.include_package_value ?? true,
  [FedExField.DestinationType]: config.destination_type || "",
  [FedExField.DeliveryServices]: config.enabled_services || [],
  [FedExField.Key]: config.client_id || "",
  [FedExField.Password]: config.client_secret || "",
  [FedExField.AccountNumber]: config.account_number || "",
  [FedExField.ApiBaseUrl]: config.api_base_url || "",
});

// Saved quote config (API) → quote form fields
export const transformGetFedExQuote = (
  quote: any,
): Partial<FedExFormValues> => ({
  [FedExField.DestCountry]: quote.destination_country || "",
  [FedExField.DestState]: quote.destination_state || "",
  [FedExField.DestZip]: quote.destination_zip || "",
  [FedExField.PkgWeight]: String(quote.package_weight ?? ""),
  [FedExField.PkgValue]: String(quote.package_value ?? ""),
  [FedExField.PkgLength]: String(quote.package_length ?? ""),
  [FedExField.PkgWidth]: String(quote.package_width ?? ""),
  [FedExField.PkgHeight]: String(quote.package_height ?? ""),
});

export const transformPostFedExConfig = (data: FedExFormValues) => ({
  display_name: data.displayName,
  dropoff_type: data.dropOffType,
  packaging_type: data.packagingType,
  packing_method: data.packingMethod,
  rate_type: data.rateType,
  include_package_value: data.includePackageValue,
  destination_type: data.destinationType,
  enabled_services: data.deliveryServices,
  client_id: data.key,
  client_secret: data.password || "",
  account_number: data.accountNumber,
  api_base_url: data.apiBaseUrl,
});

export const transformPostFedExQuote = (data: FedExFormValues) => ({
  destination_country: data.destCountry,
  destination_state: data.destState,
  destination_zip: data.destZip,
  package_weight: Number(data.pkgWeight),
  package_value: Number(data.pkgValue),
  package_length: Number(data.pkgLength),
  package_width: Number(data.pkgWidth),
  package_height: Number(data.pkgHeight),
});

// AppTabs reports a plain string; anything unknown falls back to settings
export const toFedExTab = (key: string): FedExTab =>
  (Object.values(FedExTab) as string[]).includes(key)
    ? (key as FedExTab)
    : FedExTab.Settings;

// The tab holding the first invalid field (fields default to settings)
export const getTabForErrors = (
  errors: FieldErrors<FedExFormValues>,
): FedExTab => {
  const firstField = Object.keys(errors)[0] as FedExField | undefined;
  return (firstField && FEDEX_FIELD_TAB[firstField]) || FedExTab.Settings;
};

// `{ CODE: "Label" }` map from the API → list for rendering checkboxes
// (the slice types it as any[], but the API returns an object map)
export const toDeliveryServiceList = (
  services: unknown,
): FedExDeliveryService[] =>
  Object.entries((services || {}) as Record<string, unknown>).map(
    ([key, label]) => ({ key, label: String(label) }),
  );

// Adds the key when missing, removes it when present
export const toggleInList = (list: string[] = [], key: string) =>
  list.includes(key) ? list.filter((k) => k !== key) : [...list, key];

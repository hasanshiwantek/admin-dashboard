import type { ActionItem } from "@/components/ActionButton/type";
import { ActionEnums } from "@/const/appConstants";
import { toNumber } from "@/lib/utils";
import { defaultOpeningHours } from "./constant";
import type { Location, LocationFormValues, LocationPayload } from "./type";

export const getFlagUrl = (countryCode: string) =>
  `https://flagcdn.com/w40/${countryCode.toLowerCase()}.png`;

// "Covina, CA, US"
export const formatLocationRegion = ({ city, state, countryCode }: Location) =>
  [city, state, countryCode].filter(Boolean).join(", ");

// Edit page "…" menu
export const getLocationActions = (isEnabled: boolean): ActionItem[] => [
  { type: ActionEnums.DUPLICATE, label: "Duplicate" },
  isEnabled
    ? { type: ActionEnums.DISABLE, label: "Disable" }
    : { type: ActionEnums.ENABLE, label: "Enable" },
  { type: ActionEnums.DELETE, label: "Delete" },
];

// "YYYY-MM-DD", the value a date input expects
export const toDateInputValue = (date: Date) =>
  [
    date.getFullYear(),
    String(date.getMonth() + 1).padStart(2, "0"),
    String(date.getDate()).padStart(2, "0"),
  ].join("-");

// `duplicate` prefills the add form from another location
export const transformGetLocation = (
  location: Location,
  { duplicate = false } = {},
): LocationFormValues => ({
  name: duplicate ? `Copy of ${location.name}` : location.name,
  code: duplicate ? "" : (location.code ?? ""),
  address1: location.addressLine1,
  address2: location.addressLine2 ?? "",
  city: location.city,
  country: location.countryCode,
  postalCode: location.postalCode,
  state: location.state,
  latitude: location.latitude == null ? "" : String(location.latitude),
  longitude: location.longitude == null ? "" : String(location.longitude),
  phone: location.phone ?? "",
  email: location.email ?? "",
  showDetails: location.showDetails ?? true,
  description: location.description ?? "",
  openingHours: location.openingHours?.length
    ? location.openingHours
    : defaultOpeningHours,
  specialHours: location.specialHours ?? [],
});

export const transformPostLocation = (
  values: LocationFormValues,
  isEnabled: boolean,
): LocationPayload => ({
  name: values.name,
  code: values.code,
  addressLine1: values.address1,
  addressLine2: values.address2,
  city: values.city,
  countryCode: values.country,
  postalCode: values.postalCode,
  state: values.state,
  latitude: toNumber(values.latitude),
  longitude: toNumber(values.longitude),
  phone: values.phone,
  email: values.email,
  isEnabled,
  showDetails: values.showDetails,
  description: values.description,
  openingHours: values.openingHours,
  specialHours: values.specialHours,
});

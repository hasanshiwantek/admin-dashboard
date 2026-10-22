import { countriesListIconsRaw, statesList } from "@/const/location";
import type { SelectOption } from "@/components/ui/select";
import { toTitleCase } from "@/lib/utils";
import countries from "i18n-iso-countries";
import type {
  Location,
  LocationFormValues,
  LocationSectionConfig,
  OpeningHour,
  SpecialHour,
} from "./type";

export const LOCATIONS_ROUTE = "/manage/settings/locations";
export const NEW_LOCATION_ID = "add";
export const ADD_LOCATION_ROUTE = `${LOCATIONS_ROUTE}/${NEW_LOCATION_ID}`;
export const editLocationRoute = (id: number | string) =>
  `${LOCATIONS_ROUTE}/${id}`;

// The add form prefilled from another location: /locations/add?duplicate=<id>
export const DUPLICATE_LOCATION_PARAM = "duplicate";
export const duplicateLocationRoute = (id: number | string) =>
  `${ADD_LOCATION_ROUTE}?${DUPLICATE_LOCATION_PARAM}=${id}`;

export const LOCATIONS_LEARN_MORE_URL =
  "https://support.bigcommerce.com/s/article/Multi-Location-Inventory";

export const DEFAULT_COUNTRY = "US";

export const countryOptions: SelectOption[] = countriesListIconsRaw
  .map(({ value, label }) => ({
    value: countries.alpha3ToAlpha2(value) ?? "",
    label: toTitleCase(label),
  }))
  .filter(
    ({ value }, index, list) =>
      value && list.findIndex((country) => country.value === value) === index,
  );

export const usStateOptions: SelectOption[] = statesList;

export enum LocationFormNames {
  Name = "name",
  Code = "code",
  Address1 = "address1",
  Address2 = "address2",
  City = "city",
  Country = "country",
  PostalCode = "postalCode",
  State = "state",
  Latitude = "latitude",
  Longitude = "longitude",
  Phone = "phone",
  Email = "email",
  ShowDetails = "showDetails",
  Description = "description",
  OpeningHours = "openingHours",
  SpecialHours = "specialHours",
}

export enum OpeningHourFormNames {
  Day = "day",
  Open = "open",
  Opening = "opening",
  Closing = "closing",
}

export enum SpecialHourFormNames {
  Name = "name",
  Date = "date",
  Open = "open",
  AllDay = "allDay",
  Opening = "opening",
  Closing = "closing",
  Annual = "annual",
}

// Values are the ids of the page sections the side nav scrolls to
export enum LocationSection {
  General = "general",
  Address = "address",
  Contact = "contact-details",
  Details = "location-details",
}

export const locationSections: LocationSectionConfig[] = [
  {
    id: LocationSection.General,
    label: "General",
    fields: [LocationFormNames.Name, LocationFormNames.Code],
  },
  {
    id: LocationSection.Address,
    label: "Address",
    fields: [
      LocationFormNames.Address1,
      LocationFormNames.Address2,
      LocationFormNames.City,
      LocationFormNames.Country,
      LocationFormNames.PostalCode,
      LocationFormNames.State,
      LocationFormNames.Latitude,
      LocationFormNames.Longitude,
    ],
  },
  {
    id: LocationSection.Contact,
    label: "Contact details",
    fields: [LocationFormNames.Phone, LocationFormNames.Email],
  },
  {
    id: LocationSection.Details,
    label: "Location details",
    fields: [
      LocationFormNames.ShowDetails,
      LocationFormNames.Description,
      LocationFormNames.OpeningHours,
      LocationFormNames.SpecialHours,
    ],
  },
];

const toTwoDigitOptions = (count: number): SelectOption[] =>
  Array.from({ length: count }, (_, i) => {
    const value = String(i).padStart(2, "0");
    return { value, label: value };
  });

export const HOUR_OPTIONS = toTwoDigitOptions(24);
export const MINUTE_OPTIONS = toTwoDigitOptions(60);

export const CLOSED_TIME = "00:00";
const DEFAULT_OPENING_TIME = "09:00";
const DEFAULT_CLOSING_TIME = "17:00";

export const WEEK_DAYS = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const WEEKEND = ["Sunday", "Saturday"];

export const defaultOpeningHours: OpeningHour[] = WEEK_DAYS.map((day) => {
  const open = !WEEKEND.includes(day);
  return {
    day,
    open,
    opening: open ? DEFAULT_OPENING_TIME : CLOSED_TIME,
    closing: open ? DEFAULT_CLOSING_TIME : CLOSED_TIME,
  };
});

export const newSpecialHour = (date: string): SpecialHour => ({
  name: "",
  date,
  open: false,
  allDay: false,
  opening: CLOSED_TIME,
  closing: CLOSED_TIME,
  annual: false,
});

export const locationDefaults: LocationFormValues = {
  [LocationFormNames.Name]: "",
  [LocationFormNames.Code]: "",
  [LocationFormNames.Address1]: "",
  [LocationFormNames.Address2]: "",
  [LocationFormNames.City]: "",
  [LocationFormNames.Country]: DEFAULT_COUNTRY,
  [LocationFormNames.PostalCode]: "",
  [LocationFormNames.State]: "",
  [LocationFormNames.Latitude]: "",
  [LocationFormNames.Longitude]: "",
  [LocationFormNames.Phone]: "",
  [LocationFormNames.Email]: "",
  [LocationFormNames.ShowDetails]: true,
  [LocationFormNames.Description]: "",
  [LocationFormNames.OpeningHours]: defaultOpeningHours,
  [LocationFormNames.SpecialHours]: [],
};

// Placeholder until the locations API is available
export const defaultLocations: Location[] = [
  {
    id: 1,
    name: "Default location",
    code: "BC-LOCATION-1",
    addressLine1: "440 N Barranca Ave",
    city: "Covina",
    countryCode: "US",
    postalCode: "91723",
    state: "CA",
    isShippingOrigin: true,
    isEnabled: true,
    showDetails: true,
    openingHours: defaultOpeningHours,
    specialHours: [],
  },
];

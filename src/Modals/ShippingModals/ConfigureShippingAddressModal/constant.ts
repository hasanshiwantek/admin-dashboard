import { countriesList, statesList } from "@/const/location";
import type { ShippingAddressFormValues } from "./type";

/** Form field names; use these for `name`, watch/setValue and schema keys. */
export enum ShippingAddressField {
  AddressLine1 = "address_line_1",
  AddressLine2 = "address_line_2",
  City = "city",
  PostalCode = "postal_code",
  Country = "country",
  State = "state",
  PhoneNumber = "phone_number",
}

export const shippingAddressDefaults: ShippingAddressFormValues = {
  [ShippingAddressField.AddressLine1]: "",
  [ShippingAddressField.AddressLine2]: "",
  [ShippingAddressField.City]: "",
  [ShippingAddressField.PostalCode]: "",
  [ShippingAddressField.Country]: "",
  [ShippingAddressField.State]: "",
  [ShippingAddressField.PhoneNumber]: "",
};

// The API stores the country/state name, so the label is also the value
export const countryOptions = countriesList.map(({ label }) => ({
  value: label,
  label,
}));
export const stateOptions = statesList.map(({ label }) => ({
  value: label,
  label,
}));

export const FIELD_CLASS = "max-w-full !h-15 text-base !font-normal";
export const LABEL_CLASS = "!text-[15px] font-normal !text-muted-plum-gray";

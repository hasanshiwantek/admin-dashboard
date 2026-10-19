import { ShippingAddressField } from "./constant";
import { ShippingAddressFormValues } from "./type";

// Stored origin address (API) → form values; missing fields become ""
export const transformGetShippingAddress = (
  address: any,
): ShippingAddressFormValues => ({
  [ShippingAddressField.AddressLine1]: address?.address_line_1 || "",
  [ShippingAddressField.AddressLine2]: address?.address_line_2 || "",
  [ShippingAddressField.City]: address?.city || "",
  [ShippingAddressField.PostalCode]: address?.postal_code || "",
  [ShippingAddressField.Country]: address?.country || "",
  [ShippingAddressField.State]: address?.state || "",
  [ShippingAddressField.PhoneNumber]: address?.phone_number || "",
});

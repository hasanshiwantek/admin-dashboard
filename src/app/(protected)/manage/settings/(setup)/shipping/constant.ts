import { ShippingAddress } from "./type";

export const SHIPPING_ROUTE = "/manage/settings/shipping";

// The default US zone shows a flag and can be switched on/off
export const US_ZONE_ID = 1;
export const US_FLAG_URL = "https://flagcdn.com/w80/us.png";

export const SKELETON_ROW_COUNT = 3;

// Order the origin address lines are displayed in
export const originAddressFields: (keyof ShippingAddress)[] = [
  "address_line_1",
  "postal_code",
  "city",
  "state",
  "country",
];

export enum ShippingMethodType {
  FreeShipping = "free_shipping",
  FlatRateWeight = "flat_rate_weight",
  FlatRate = "flat_rate",
  CustomLabel = "custom_label",
  FedexRealtime = "fedex_realtime",
}

const ICON_BASE =
  "https://microapps.bigcommerce.com/ng-shipping-manager/b9b0967f26d6cded3671d9c547517af87002d860/img/icons";

export const FEDEX_ICON =
  "https://1000logos.net/wp-content/uploads/2021/04/Fedex-logo.png";

export const DEFAULT_SHIPPING_METHOD_ICON = `${ICON_BASE}/free-shipping.png`;

export const shippingMethodIcons: Record<string, string> = {
  [ShippingMethodType.FreeShipping]: `${ICON_BASE}/free-shipping.png`,
  [ShippingMethodType.FlatRateWeight]: `${ICON_BASE}/by-range.png`,
  [ShippingMethodType.FlatRate]: `${ICON_BASE}/flat-rate.png`,
  [ShippingMethodType.CustomLabel]: `${ICON_BASE}/pick-up-in-store.png`,
  [ShippingMethodType.FedexRealtime]: FEDEX_ICON,
};

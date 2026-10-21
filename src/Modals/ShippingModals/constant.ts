// How a shipping method's rate is calculated (API value)
export enum ChargeShippingType {
  Weight = "by_weight",
  OrderTotal = "by_order_total",
}

// Single "Settings" tab shown by the shipping method modals; each modal adds
// its form as the tab's `content`
export const SETTINGS_TAB = { key: "settings", label: "Settings" };

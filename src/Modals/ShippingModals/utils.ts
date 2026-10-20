import { ChargeShippingType } from "./constant";
import {
  MethodApiRange,
  ShippingMethodApiData,
  ShippingMethodUpdatePayload,
} from "./type";

// Thunk rejections come back as a plain string or an Error-like object
export const getErrorMessage = (err: unknown, fallback: string): string => {
  if (typeof err === "string") return err;
  if (err && typeof err === "object" && "message" in err) {
    return String((err as { message?: string }).message || fallback);
  }
  return fallback;
};

export const toNumberOrNull = (value: string | number | null | undefined) =>
  value == null || String(value).trim() === "" ? null : Number(value);

export const toApiRanges = (ranges: MethodApiRange[] = []): MethodApiRange[] =>
  ranges.map((r) => ({
    from: Number(r.from),
    up_to: Number(r.up_to),
    cost: Number(r.cost),
  }));

// Full update payload from the fetched method, so fields a modal doesn't edit
// are sent back unchanged instead of being wiped. `overrides` are the edits.
export const buildMethodPayload = (
  method: ShippingMethodApiData | null,
  overrides: Partial<ShippingMethodUpdatePayload>,
): ShippingMethodUpdatePayload => ({
  display_name: method?.display_name ?? "",
  is_active: method?.is_active ?? true,
  charge_shipping_by: method?.charge_shipping_by ?? ChargeShippingType.Weight,
  default_shipping_cost: toNumberOrNull(method?.default_shipping_cost),
  rate_display_type: method?.rate_display_type ?? "fixed",
  custom_description: method?.custom_description ?? "",
  ranges: toApiRanges(method?.ranges ?? []),
  ...overrides,
});

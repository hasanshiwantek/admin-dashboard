import { MethodApiRange, ShippingMethodApiData, ShippingMethodUpdatePayload } from "../type";
import { ChargeShippingType } from "../constant";
import { toNumberOrNull } from "../utils";
import { EMPTY_RANGE, RateSymbol, ShipByWeightField } from "./constant";
import { RangeRow, ShipByWeightFormValues } from "./type";

export const rateSymbolFromApi = (rateDisplayType?: string | null) =>
  rateDisplayType === "percentage" ? RateSymbol.Percentage : RateSymbol.Fixed;

export const rateSymbolToApi = (symbol: string) =>
  symbol === RateSymbol.Percentage ? "percentage" : "fixed";

// API ranges → editable rows; always at least one (empty) row
export const rangesToRows = (ranges?: MethodApiRange[] | null): RangeRow[] =>
  ranges?.length
    ? ranges.map((r) => ({
        from: r.from != null ? String(r.from) : "",
        upTo: r.up_to != null ? String(r.up_to) : "",
        cost: r.cost != null ? String(r.cost) : "",
      }))
    : [{ ...EMPTY_RANGE }];

// Editable rows → API ranges, dropping fully empty rows
export const rowsToApiRanges = (rows: RangeRow[]): MethodApiRange[] =>
  rows
    .filter((r) => r.from !== "" || r.upTo !== "" || r.cost !== "")
    .map((r) => ({
      from: Number(r.from),
      up_to: Number(r.upTo),
      cost: Number(r.cost),
    }));

// Fetched method (API) → form values
export const transformGetShipByWeight = (
  method: ShippingMethodApiData,
): ShipByWeightFormValues => ({
  [ShipByWeightField.DisplayName]: method.display_name ?? "",
  [ShipByWeightField.ChargeShipping]: method.charge_shipping_by ?? ChargeShippingType.Weight,
  [ShipByWeightField.DefaultShippingCost]:
    method.default_shipping_cost != null
      ? String(method.default_shipping_cost)
      : "",
  [ShipByWeightField.RateSymbol]: rateSymbolFromApi(method.rate_display_type),
  [ShipByWeightField.Ranges]: rangesToRows(method.ranges),
});

// Form values → the fields this modal edits (rest comes from the fetched method)
export const transformPostShipByWeight = (
  values: ShipByWeightFormValues,
): Partial<ShippingMethodUpdatePayload> => ({
  display_name: values.displayName,
  charge_shipping_by: values.chargeShipping,
  default_shipping_cost: toNumberOrNull(values.defaultShippingCost),
  rate_display_type: rateSymbolToApi(values.rateSymbol),
  ranges: rowsToApiRanges(values.ranges),
});

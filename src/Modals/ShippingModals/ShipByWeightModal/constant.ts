import { ChargeShippingType } from "../constant";
import type { RangeRow, ShipByWeightFormValues } from "./type";

/** Form field names; use these for `name`, watch/setValue and schema keys. */
export enum ShipByWeightField {
  DisplayName = "displayName",
  ChargeShipping = "chargeShipping",
  DefaultShippingCost = "defaultShippingCost",
  RateSymbol = "rateSymbol",
  Ranges = "ranges",
}

// "$" = fixed amount, "%" = percentage
export enum RateSymbol {
  Fixed = "$",
  Percentage = "%",
}

export const EMPTY_RANGE: RangeRow = { from: "", upTo: "", cost: "" };

export const shipByWeightDefaults: ShipByWeightFormValues = {
  [ShipByWeightField.DisplayName]: "",
  [ShipByWeightField.ChargeShipping]: ChargeShippingType.Weight,
  [ShipByWeightField.DefaultShippingCost]: "",
  [ShipByWeightField.RateSymbol]: RateSymbol.Fixed,
  [ShipByWeightField.Ranges]: [{ ...EMPTY_RANGE }],
};

// "By order total" and "%" are not supported by the API yet
export const chargeShippingOptions = [
  { value: ChargeShippingType.Weight, label: "By weight" },
];
export const rateSymbolOptions = [{ value: RateSymbol.Fixed, label: "$" }];

export const RANGE_FIELD_LABELS: Record<keyof RangeRow, string> = {
  from: "From",
  upTo: "Up to (but not inc.)",
  cost: "Cost",
};

export const LABEL_CLASS = "!text-[15px] font-medium text-muted-plum-gray";

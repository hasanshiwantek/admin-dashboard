import type { shipByWeightSchema } from "@/validations/formValidations";
import * as yup from "yup";
import { ShippingMethodModalProps } from "../type";

export type ShipByWeightFormValues = yup.InferType<typeof shipByWeightSchema>;

// One editable range row (inputs hold strings)
export type RangeRow = ShipByWeightFormValues["ranges"][number];

export type ShipByWeightModalProps = ShippingMethodModalProps;

// ─── Components ──────────────────────────────────────────────

export interface RangeRowFieldsProps {
  index: number;
  // Last row shows "add", the others show "remove"
  isLast: boolean;
  rateSymbol: string;
  onAdd: () => void;
  onRemove: () => void;
}

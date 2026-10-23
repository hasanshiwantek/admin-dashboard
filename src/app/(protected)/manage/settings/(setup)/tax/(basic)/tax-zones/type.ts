import type {
  TaxRateSchema,
  TaxZoneSettingsSchema,
} from "@/validations/formValidations";
import * as yup from "yup";
import type { TaxZone } from "../type";

export type TaxZoneSettingsFormValues = yup.InferType<
  typeof TaxZoneSettingsSchema
>;

export type TaxZonePayload = Omit<TaxZone, "id" | "isDefault" | "zoneType">;

export interface TaxClassRate {
  classId: number;
  /** Percent */
  rate: number | null;
}

export interface TaxRate {
  id: number;
  zoneId: number;
  name: string;
  classRates: TaxClassRate[];
  priority: number;
  isEnabled: boolean;
}

/** A rate row as the list shows it: each class's name next to its rate */
export type TaxRateRow = TaxRate & {
  classLines: { key: string; className: string; rate: string }[];
};

export type TaxRateFormValues = yup.InferType<typeof TaxRateSchema>;
export type TaxRateClassFormRow = TaxRateFormValues["classRates"][number];

export type TaxRatePayload = Omit<TaxRate, "id">;

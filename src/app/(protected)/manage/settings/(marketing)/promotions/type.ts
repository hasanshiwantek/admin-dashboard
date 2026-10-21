import type { PromotionSettingsSchema } from "@/validations/formValidations";
import * as yup from "yup";

export type PromotionSettingsFormValues = yup.InferType<
  typeof PromotionSettingsSchema
>;

export interface PromotionSettings {
  calculationMethod?: string | null;
  maxCouponsPerOrder?: number | string | null;
  allowZeroPriceTrigger?: boolean | null;
  allowOnCustomPriceOverrides?: boolean | null;
}

export interface PromotionSettingsPayload {
  calculationMethod: string;
  maxCouponsPerOrder: number;
  allowZeroPriceTrigger: boolean;
  allowOnCustomPriceOverrides: boolean;
}

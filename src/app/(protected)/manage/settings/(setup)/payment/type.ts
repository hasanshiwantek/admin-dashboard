import type {
  OfflinePaymentSchema,
  PaymentConfigSchema,
  PaymentCurrencySchema,
} from "@/validations/formValidations";
import * as yup from "yup";
import type { PaymentTab } from "./constant";

export type PaymentCurrencyFormValues = yup.InferType<
  typeof PaymentCurrencySchema
>;

export type PaymentConfigFormValues = yup.InferType<typeof PaymentConfigSchema>;

export type OfflinePaymentFormValues = yup.InferType<
  typeof OfflinePaymentSchema
>;

// Everything that differs between the offline methods' setup forms
export interface OfflinePaymentMethodConfig {
  tab: PaymentTab;
  name: string;
  displayNameLabel: string;
  displayNameHint: string;
  countriesLabel: string;
  countriesHint: string;
  instructionsLabel: string;
  instructionsHint: string;
  defaults: OfflinePaymentFormValues;
}

import type { ReturnSettingsSchema } from "@/validations/formValidations";
import * as yup from "yup";

export type ReturnSettingsFormValues = yup.InferType<
  typeof ReturnSettingsSchema
>;

export interface ReturnSettings {
  enableReturns?: boolean | null;
}

export interface ReturnSettingsPayload {
  enableReturns: boolean;
}

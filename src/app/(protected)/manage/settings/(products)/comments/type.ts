import type { CommentSettingsSchema } from "@/validations/formValidations";
import * as yup from "yup";

export type CommentSettingsFormValues = yup.InferType<
  typeof CommentSettingsSchema
>;

export interface CommentSettings {
  commentSystem?: string | null;
  enabledFor?: string[] | null;
  onlyPastCustomers?: boolean | null;
}

export interface CommentSettingsPayload {
  commentSystem: string;
  enabledFor: string[];
  onlyPastCustomers: boolean;
}

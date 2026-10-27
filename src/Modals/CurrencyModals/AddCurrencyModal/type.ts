import type { AddCurrencySchema } from "@/validations/formValidations";
import { ReactNode } from "react";
import * as yup from "yup";

export type AddCurrencyFormValues = yup.InferType<typeof AddCurrencySchema>;

export interface AddCurrencyModalProps {
  trigger: ReactNode;
  /** Codes already added to the store, left out of the list */
  existingCodes: string[];
}

import type { AddMediaFromUrlSchema } from "@/validations/formValidations";
import { ReactNode } from "react";
import * as yup from "yup";

export type AddMediaFromUrlFormValues = yup.InferType<
  typeof AddMediaFromUrlSchema
>;

export interface AddMediaFromUrlModalProps {
  trigger: ReactNode;
  /** Called with the URL to add to the product's media */
  onAdd: (url: string) => void;
}

import * as yup from "yup";
import { BlogSchema } from "@/validations/formValidations";
export type BlogFormValues = yup.InferType<typeof BlogSchema>;
export type FieldLabelProps = {
  text: string;
  optional?: boolean;
  description?: string;
};

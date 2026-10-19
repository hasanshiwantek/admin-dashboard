import * as yup from "yup";
import { blogSchema } from "@/validations/formValidations";
export type BlogFormValues = yup.InferType<typeof blogSchema>;
export type FieldLabelProps = {
  text: string;
  optional?: boolean;
  description?: string;
};

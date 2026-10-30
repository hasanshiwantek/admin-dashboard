import * as yup from "yup";
import { WebPageSchema } from "@/validations/formValidations";

export type WebPageFormValues = yup.InferType<typeof WebPageSchema>;

export type WebPageFormProps = {
  pageId?: string;
};

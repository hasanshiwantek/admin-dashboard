import type { CategoryFormSchema } from "@/validations/formValidations";
import * as yup from "yup";

export type CategoryFormValues = yup.InferType<typeof CategoryFormSchema>;

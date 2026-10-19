import * as yup from "yup";
import { categorySchema } from "@/validations/formValidations";

export type CategoryFormValues = yup.InferType<typeof categorySchema>;
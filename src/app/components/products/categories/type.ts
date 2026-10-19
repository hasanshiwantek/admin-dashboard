import * as yup from "yup";
import { CategorySchema } from "@/validations/formValidations";

export type CategoryFormValues = yup.InferType<typeof CategorySchema>;
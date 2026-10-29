import type { ProductSearchSchema } from "@/validations/formValidations";
import * as yup from "yup";

export type ProductSearchFormValues = yup.InferType<typeof ProductSearchSchema>;

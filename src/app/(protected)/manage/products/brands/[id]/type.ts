import type { BrandSchema } from "@/validations/formValidations";
import * as yup from "yup";

export type BrandFormValues = yup.InferType<typeof BrandSchema>;

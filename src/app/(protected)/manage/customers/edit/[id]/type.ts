import type { InferType } from "yup";
import { CustomerSchema } from "@/validations/formValidations";

export type CustomerFormValues = InferType<typeof CustomerSchema>;

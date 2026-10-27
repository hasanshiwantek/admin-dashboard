import type { InferType } from "yup";
import { AddressSchema } from "@/validations/formValidations";

export type AddressFormValues = InferType<typeof AddressSchema>;
export type AddressMode = "add" | "edit";

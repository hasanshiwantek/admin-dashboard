import { createCustomerSchema } from "@/validations/formValidations";
import { InferType } from "yup";

export type CustomerFormValues = InferType<
  ReturnType<typeof createCustomerSchema>
>;

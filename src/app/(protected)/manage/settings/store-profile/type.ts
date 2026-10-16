import { storeProfileSchema } from "@/validations/formValidations"; 
import * as yup from "yup";

export type StoreProfileFormValues = yup.InferType<
  typeof storeProfileSchema
>;
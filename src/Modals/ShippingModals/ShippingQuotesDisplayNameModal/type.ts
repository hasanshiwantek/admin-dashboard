import type { DisplayNameSchema } from "@/validations/formValidations";
import * as yup from "yup";
import { ShippingMethodModalProps } from "../type";

export type DisplayNameFormValues = yup.InferType<typeof DisplayNameSchema>;

export type ShippingQuotesDisplayNameProps = ShippingMethodModalProps;

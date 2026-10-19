import type { displayNameSchema } from "@/validations/formValidations";
import * as yup from "yup";
import { ShippingMethodModalProps } from "../type";

export type DisplayNameFormValues = yup.InferType<typeof displayNameSchema>;

export type ShippingQuotesDisplayNameProps = ShippingMethodModalProps;

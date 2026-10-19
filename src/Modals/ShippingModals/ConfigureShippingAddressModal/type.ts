import type { ShippingAddressSchema } from "@/validations/formValidations";
import * as yup from "yup";
import { ShippingModalProps } from "../type";

export type ShippingAddressFormValues = yup.InferType<
  typeof ShippingAddressSchema
>;

export type ConfigureShippingAddressProps = ShippingModalProps;

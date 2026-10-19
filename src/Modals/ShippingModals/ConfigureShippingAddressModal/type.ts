import type { shippingAddressSchema } from "@/validations/formValidations";
import * as yup from "yup";
import { ShippingModalProps } from "../type";

export type ShippingAddressFormValues = yup.InferType<
  typeof shippingAddressSchema
>;

export type ConfigureShippingAddressProps = ShippingModalProps;

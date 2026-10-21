import type { GiftWrappingSchema } from "@/validations/formValidations";
import * as yup from "yup";

export type GiftWrappingFormValues = yup.InferType<typeof GiftWrappingSchema>;

export interface GiftWrapping {
  id: number;
  name: string;
  price: number | string;
  previewImage?: string | null;
  allowGiftMessages?: boolean | null;
  isVisible?: boolean | null;
}

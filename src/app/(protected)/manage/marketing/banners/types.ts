import type { bannerSchema } from "@/validations/formValidations";
import * as yup from "yup";

export type BannerFormValues = yup.InferType<typeof bannerSchema>;

export type BannerFormProps = {
  bannerId?: string;
};

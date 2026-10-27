import { BannerSchema } from "@/validations/formValidations";
import * as yup from "yup";

export type BannerFormValues = yup.InferType<typeof BannerSchema>;

import type { bannerSchema } from "@/validations/formValidations";
import * as yup from "yup";
import type { BannerLocation, BannerPlacement } from "./constant";

export type BannerFormValues = yup.InferType<typeof bannerSchema>;

export type BannerFormProps = {
  bannerId?: string;
};

export type BannerLocationSource = {
  locationType?: BannerLocation;
  placement?: BannerPlacement;
  location?: { id: number; name: string; slug: string } | null;
};

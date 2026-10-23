import type { UrlSettingSection } from "@/app/(protected)/manage/settings/(general)/type";
import type { UpdateUrlsSchema } from "@/validations/formValidations";
import { ReactNode } from "react";
import * as yup from "yup";

export type UpdateUrlsFormValues = yup.InferType<typeof UpdateUrlsSchema>;

export interface UpdateUrlsModalProps {
  trigger: ReactNode;
  section: UrlSettingSection;
}

export interface UpdateUrlsCopy {
  title: string;
  items: string;
  itemLabel: string;
}

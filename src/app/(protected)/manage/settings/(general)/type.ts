import type { generalSettingsSchema } from "@/validations/formValidations";
import type { LucideIcon } from "lucide-react";
import * as yup from "yup";
import type { ShareField, UrlStructureField } from "./constant";

export type GeneralSettingsFormValues = yup.InferType<
  typeof generalSettingsSchema
>;

// The url-settings API saves each section separately
export type UrlSettingSection = "product" | "category" | "webpage";

export interface UrlStructureSectionConfig {
  title: string;
  formatField: UrlStructureField;
  customUrlField: UrlStructureField;
  apiSection: UrlSettingSection;
  customPlaceholder: string;
  shortExample: string;
  longExample: string;
}

export interface ShareNetworkConfig {
  field: ShareField;
  label: string;
  icon: LucideIcon;
  /** Tailwind classes when switched on */
  activeClassName: string;
  /** Shows just the coloured icon instead of a filled tile */
  iconOnly?: boolean;
}

// Payload for one url-settings section
export interface UrlSettingPayload {
  format_type: string;
  custom_format?: string;
}

// A checkbox setting rendered from config: label on the left, text by the box
export interface CheckboxSettingConfig<F extends string = string> {
  field: F;
  label: string;
  text: string;
}

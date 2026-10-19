import { UrlStructureField } from "./constant";

export type ShareId =
  | "facebook"
  | "twitter"
  | "linkedin"
  | "pinterest"
  | "facebook-like"
  | "email"
  | "print";

export type SectionProps = {
  title: string;
  formatField: UrlStructureField;
  customUrlField: UrlStructureField;
  shortExample: string;
  longExample: string;
};

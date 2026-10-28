import { SelectOption } from "@/components/ui/Select";
import type { BrandFormValues } from "./type";

// Values are the payload keys add-brand / update-brand expect
export enum BrandFormNames {
  Name = "name",
  PageTitle = "pageTitle",
  MetaKeywords = "metaKeywords",
  MetaDescription = "metaDescription",
  SearchKeywords = "searchKeywords",
  Logo = "logo",
  BrandUrl = "brandURL",
  TemplateLayout = "templateLayout",
}

export enum BrandTemplateLayout {
  Default = "default",
}

export const BrandTemplateLayoutOptions: SelectOption[] = [
  { value: BrandTemplateLayout.Default, label: "default" },
];

export const BRAND_LOGO_TYPES = [
  "image/png",
  "image/jpeg",
  "image/gif",
  "image/webp",
];
export const BRAND_LOGO_MAX_SIZE_MB = 8;

export const brandDefaults: BrandFormValues = {
  [BrandFormNames.Name]: "",
  [BrandFormNames.PageTitle]: "",
  [BrandFormNames.MetaKeywords]: "",
  [BrandFormNames.MetaDescription]: "",
  [BrandFormNames.SearchKeywords]: "",
  [BrandFormNames.Logo]: null,
  [BrandFormNames.BrandUrl]: "",
  [BrandFormNames.TemplateLayout]: BrandTemplateLayout.Default,
};

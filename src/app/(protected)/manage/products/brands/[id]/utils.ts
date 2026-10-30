import { createFormData } from "@/lib/utils";
import type { Brand } from "../type";
import { brandDefaults, BrandFormNames } from "./constant";
import type { BrandFormValues } from "./type";

// Saved logos can come back as a path relative to the image host
const toLogoUrl = (logo?: string | null) =>
  !logo
    ? null
    : logo.startsWith("http")
      ? logo
      : `${process.env.NEXT_PUBLIC_IMAGE_BASE_URL ?? ""}${logo}`;

export const transformGetBrand = (brand: Brand): BrandFormValues => ({
  [BrandFormNames.Name]: brand.name ?? "",
  [BrandFormNames.PageTitle]: brand.page_title ?? "",
  [BrandFormNames.MetaKeywords]: brand.meta_keywords ?? "",
  [BrandFormNames.MetaDescription]: brand.meta_description ?? "",
  [BrandFormNames.SearchKeywords]: brand.search_keywords ?? "",
  [BrandFormNames.Logo]: toLogoUrl(brand.logo),
  [BrandFormNames.BrandUrl]: brand.brandURL ?? "",
  [BrandFormNames.TemplateLayout]:
    brand.templateLayout || brandDefaults[BrandFormNames.TemplateLayout],
});

// A new brand only sends its names (one per line); an edit sends every field
export const transformPostBrand = (values: BrandFormValues, isEdit: boolean) => {
  if (!isEdit) return createFormData({ [BrandFormNames.Name]: values.name });

  const logo = values[BrandFormNames.Logo];
  return createFormData(
    { ...values, [BrandFormNames.Logo]: logo instanceof File ? [logo] : null },
    [BrandFormNames.Logo],
  );
};

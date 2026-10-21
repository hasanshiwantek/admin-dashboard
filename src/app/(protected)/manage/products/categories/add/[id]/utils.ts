import { FormVals } from "./type";

import { generateSlug } from "@/lib/productUtils";
import { UrlSettingEnums } from "@/const/appConstants";
import { REGEX } from "@/const/regex"; // adjust path

export function buildCategoryPayload(vals: FormVals): Record<string, any> {
  return {
    name: vals.name,
    slug: vals.slug.replace(/^\/|\/$/g, ""),
    description: vals.description || "",
    isVisible: vals.is_visible ? 1 : 0,
    parentId: vals.parent?.id ?? "",
    channel: vals.channel,
    templateLayout: vals.template_layout,
    sortOrder: Number(vals.sort_order) || 0,
    defaultProductSort: vals.default_product_sort,
    seoHomeTitle: vals.seo_home_title || "",
    seoMetakeywords: vals.seo_meta_keywords || "",
    seoMetaDescription: vals.seo_meta_description || "",
    seoSearchKeywords: vals.seo_search_keywords || "",
  };
}
  
export const generateCategorySlug = (
  name: string,
  urlSettingData: any,
  rootParentName?: any,
): string => {
  if (!name) return "";

  const slug = generateSlug(name);
  const formatType = urlSettingData?.format_type;
  const customFormat = urlSettingData?.custom_format;

  if (formatType === UrlSettingEnums.SEO_OPTIMIZED_SHORT) {
    return `/${slug}`;
  }

  if (formatType === UrlSettingEnums.SEO_OPTIMIZED_LONG) {
    return `/categories/${slug}`;
  }

  if (formatType === UrlSettingEnums.CUSTOM && customFormat) {
    const replacements = {
      "%parent%": rootParentName ? generateSlug(rootParentName) : "",
      "%categoryname%": slug,
    };

    const finalUrl = Object.entries(replacements)
      .reduce(
        (url, [key, value]) => url.replace(new RegExp(key, "gi"), value),
        customFormat,
      )
      .replace(REGEX.PRODUCT_URL_PLACEHOLDER, "")
      .replace(REGEX.PRODUCT_URL_MULTIPLE_SLASHES, "/")
      .replace(REGEX.PRODUCT_URL_TRAILING_SLASH, "");

    return finalUrl || "";
  }

  return `/${slug}`;
};

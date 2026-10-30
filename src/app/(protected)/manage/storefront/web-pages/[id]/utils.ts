// utils/webPage.ts (or inside the component)
import { generateSlug } from "@/lib/productUtils";
import { UrlSettingEnums } from "@/const/appConstants";
import { REGEX } from "@/const/regex";

export const generatePageUrl = (
  pageName: string,
  urlSettingData: any,
): string => {
  if (!pageName) return "";

  const slug = generateSlug(pageName);
  const formatType = urlSettingData?.format_type;
  const customFormat = urlSettingData?.custom_format;

  if (formatType === UrlSettingEnums.SEO_OPTIMIZED_SHORT) {
    return `/${slug}`;
  }

  if (formatType === UrlSettingEnums.SEO_OPTIMIZED_LONG) {
    return `/pages/${slug}`;
  }

  if (formatType === UrlSettingEnums.CUSTOM && customFormat) {
    const replacements = { "%pagename%": slug };
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

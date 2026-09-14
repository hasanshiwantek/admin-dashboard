import { UrlSettingEnums } from "@/const/appConstants";
import { REGEX } from "@/const/regex";
import { fetchAllProducts } from "@/redux/slices/productSlice";
import { AppDispatch } from "@/redux/store";
import { generateUniqueCode } from "./utils";
export const refetchProducts = async (
  dispatch: AppDispatch,
  page = 1,
  pageSize = 20,
) => {
  try {
    await dispatch(fetchAllProducts({ page, pageSize })).unwrap();
  } catch (err) {
    console.error("❌ Error re-fetching products:", err);
  }
};

export const generateFormattedProductUrl = ({
  formatType,
  customFormat,
  name,
  sku,
  brand,
}: {
  formatType:
    | UrlSettingEnums.SEO_OPTIMIZED_SHORT
    | UrlSettingEnums.SEO_OPTIMIZED_LONG
    | UrlSettingEnums.CUSTOM;
  customFormat?: string;
  name?: string;
  sku?: string;
  brand?: string;
}) => {
  switch (formatType) {
    case UrlSettingEnums.SEO_OPTIMIZED_SHORT:
      if (!name) return "";

      return `/${generateSlug(name)}/`;

    case UrlSettingEnums.SEO_OPTIMIZED_LONG:
      if (!name) return "";

      return `/product/${generateSlug(name)}/`;

    case UrlSettingEnums.CUSTOM:
      if (!customFormat || (!brand && !name && !sku)) {
        return "";
      }

      const finalUrl = generateCustomProductUrl(customFormat, {
        title: name,
        sku,
        brand,
      });

      return finalUrl ? `/${finalUrl}/` : "";

    default:
      return "";
  }
};

export const generateSlug = (value: string) => {
  return value
    .toLowerCase()
    .replace(REGEX.PRODUCT_SLUG_INVALID_CHARS, "-")
    .replace(REGEX.PRODUCT_SLUG_CONSECUTIVE_HYPHENS, "-")
    .replace(REGEX.PRODUCT_SLUG_EDGE_HYPHENS, "");
};

export function generateDuplicateProductUrl(title: string): string {
  const slug = generateSlug(title);
  const code = generateUniqueCode(4);

  return `${slug}-${code}`;
}

export const generateCustomProductUrl = (
  customFormat: string,
  {
    title,
    sku,
    brand,
  }: {
    title?: string;
    sku?: string;
    brand?: string;
  },
): string => {
  const replacements = {
    "%title%": title ? generateSlug(title) : "",
    "%sku%": sku ? generateSlug(sku) : "",
    "%brand%": brand ? generateSlug(brand) : "",
  };

  return Object.entries(replacements)
    .reduce(
      (url, [key, value]) => url.replace(new RegExp(key, "gi"), value),
      customFormat,
    )
    .replace(REGEX.PRODUCT_URL_PLACEHOLDER, "")
    .replace(REGEX.PRODUCT_URL_MULTIPLE_SLASHES, "/")
    .replace(REGEX.PRODUCT_URL_TRAILING_SLASH, "");
};

export const buildCopyNameSku = ({
  name,
  sku,
  productUrl,
  hasDuplicate,
}: {
  name: string;
  sku: string;
  productUrl?: string;
  hasDuplicate?: boolean;
}) => {
  const copyName = `Copy of ${name}`;
  const slug = generateSlug(copyName);
  const duplicateProductUrl = generateDuplicateProductUrl(copyName);
  const copyProductUrl = productUrl
    ? productUrl
    : hasDuplicate
      ? `/${duplicateProductUrl}/`
      : `/${slug}/`;

  return {
    name: copyName,
    sku: `${sku}-1`,
    productUrl: copyProductUrl,
  };
};

export const normalizeProductUrl = (value: string) => {
  const trimmed = value.trim();
  const clean = trimmed.replace(REGEX.PRODUCT_URL_NORMALIZE, "");
  return `/${clean}/`;
};

export const sanitizeNumberInput = (value: string, allowDecimal = true): string => {
  const cleaned = value.replace(/[^0-9.-]/g, "");

  if (!cleaned) {
    return "";
  }

  const isNegative = cleaned.startsWith("-");

  // Remove all minus signs.
  let sanitized = cleaned.replace(/-/g, "");

  if (allowDecimal) {
    // Keep only the first decimal point.
    const [integerPart, ...decimalParts] = sanitized.split(".");

    sanitized = decimalParts.length
      ? `${integerPart}.${decimalParts.join("")}`
      : integerPart;
  } else {
    sanitized = sanitized.replace(/\./g, "");
  }

  return isNegative ? `-${sanitized}` : sanitized;
};

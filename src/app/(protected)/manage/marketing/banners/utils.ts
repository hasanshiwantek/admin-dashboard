import { REGEX } from "@/const/regex";
import { BannerLocationSource } from "./_components/type";
import { BANNER_LOCATION_LABELS, BannerLocation } from "./constant";

export const needsLocationId = (type: BannerLocation) =>
  type === BannerLocation.Category || type === BannerLocation.Brand;

export const hasContent = (html?: string) =>
  !!html &&
  (REGEX.HTML_MEDIA_TAG.test(html) ||
    html.replace(REGEX.HTML_TAGS_AND_NBSP, "").trim().length > 0);

/** Joins the store's base URL and a path, whether or not either has a slash. */
export const storefrontUrl = (baseUrl: string, path = "") =>
  `${baseUrl.replace(REGEX.TRAILING_SLASHES, "")}/${path.replace(REGEX.LEADING_SLASHES, "")}`;

const bannerLocationPath = ({
  locationType,
  location,
}: BannerLocationSource): string | null => {
  switch (locationType) {
    case BannerLocation.Homepage:
      return "";
    case BannerLocation.Search:
      return "advanced-search";
    case BannerLocation.Category:
      return location?.slug ? `category/${location.slug}` : null;
    case BannerLocation.Brand:
      return location?.slug ? `brand/${location.slug}` : null;
    default:
      return null;
  }
};

export const getBannerLocationLink = (
  banner: BannerLocationSource,
  baseUrl?: string,
) => {
  const { locationType, location } = banner;
  const label =
    locationType && needsLocationId(locationType)
      ? location?.name
      : locationType && BANNER_LOCATION_LABELS[locationType];
  const path = bannerLocationPath(banner);
  const href =
    baseUrl && path !== null ? storefrontUrl(baseUrl, path) : undefined;

  return { label: label || undefined, href };
};

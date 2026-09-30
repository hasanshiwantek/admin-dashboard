import { DateTimeFormat } from "@/const/appConstants";
import { formatDateTime, removeEmptyValues } from "@/lib/utils";
import dayjs from "dayjs";
import {
  BANNER_LOCATION_LABELS,
  BannerDateType,
  BannerField,
  BannerLocation,
  BannerPlacement,
} from "./constant";
import { BannerFormValues, BannerLocationSource } from "./types";

export const needsLocationId = (type: BannerLocation) =>
  type === BannerLocation.Category || type === BannerLocation.Brand;

export const hasContent = (html?: string) =>
  !!html &&
  (/<(img|video|iframe)\b/i.test(html) ||
    html.replace(/<[^>]*>|&nbsp;/g, "").trim().length > 0);

export const defaultBannerDateRange = () => {
  const startDate = dayjs().add(1, "hour").startOf("hour");
  return {
    startDate: startDate.toDate(),
    endDate: startDate.add(1, "month").toDate(),
  };
};

/** Joins the store's base URL and a path, whether or not either has a slash. */
export const storefrontUrl = (baseUrl: string, path = "") =>
  `${baseUrl.replace(/\/+$/, "")}/${path.replace(/^\/+/, "")}`;

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

export const transformPostBannerPayload = (values: BannerFormValues) => {
  const isRange = values.dateType === BannerDateType.Range;
  const payload = {
    title: values.title,
    pageContent: values.pageContent,
    locationType: values.locationType,
    locationId: needsLocationId(values.locationType)
      ? Number(values.locationId)
      : null,
    dateType: values.dateType,
    startDate:
      isRange && values.startDate
        ? formatDateTime(values.startDate, DateTimeFormat.ISO_DATE_TIME)
        : null,
    endDate:
      isRange && values.endDate
        ? formatDateTime(values.endDate, DateTimeFormat.ISO_DATE_TIME)
        : null,
    visible: values.visible,
    placement: values.placement,
  };
  return removeEmptyValues(payload);
};

export const transformGetBannerPayload = (banner: any): BannerFormValues => ({
  [BannerField.Title]: banner?.title ?? "",
  [BannerField.Content]: banner?.pageContent ?? "",
  [BannerField.LocationType]: banner?.locationType ?? "",
  [BannerField.LocationId]:
    banner?.locationId != null ? String(banner.locationId) : null,
  [BannerField.DateType]:
    banner?.dateType ??
    (banner?.startDate ? BannerDateType.Range : BannerDateType.Always),
  [BannerField.StartDate]: banner?.startDate
    ? new Date(banner.startDate)
    : null,
  [BannerField.EndDate]: banner?.endDate ? new Date(banner.endDate) : null,
  [BannerField.Visible]:
    banner?.visible == null ? true : Boolean(banner.visible),
  [BannerField.Placement]: banner?.placement ?? ("" as BannerPlacement),
});

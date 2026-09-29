import { DateTimeFormat } from "@/const/appConstants";
import { formatDateTime, removeEmptyValues } from "@/lib/utils";
import dayjs from "dayjs";
import {
  BannerDateType,
  BannerField,
  BannerLocation,
  BannerPlacement,
} from "./constant";
import { BannerFormValues } from "./types";

export const needsLocationId = (type?: string) =>
  type === BannerLocation.Category || type === BannerLocation.Brand;

// Content may be only an image/video, so check for media before text.
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

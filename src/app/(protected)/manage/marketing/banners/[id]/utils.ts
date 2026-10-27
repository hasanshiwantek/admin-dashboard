import { DateTimeFormat } from "@/const/appConstants";
import { formatDateTime, removeEmptyValues } from "@/lib/utils";
import dayjs from "dayjs";
import { BannerPlacement } from "../constant";
import { needsLocationId } from "../utils";
import { BannerDateType, BannerFormNames } from "./constant";
import { BannerFormValues } from "./type";

export const toBrandOptions = (map: Record<string, string>) =>
  Object.entries(map)
    .map(([value, label]) => ({ value, label }))
    .sort((a, b) => a.label.localeCompare(b.label));

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
  [BannerFormNames.Title]: banner?.title ?? "",
  [BannerFormNames.Content]: banner?.pageContent ?? "",
  [BannerFormNames.LocationType]: banner?.locationType ?? "",
  [BannerFormNames.LocationId]:
    banner?.location != null ? String(banner?.location?.id) : null,
  [BannerFormNames.DateType]:
    banner?.dateType ??
    (banner?.startDate ? BannerDateType.Range : BannerDateType.Always),
  [BannerFormNames.StartDate]: banner?.startDate
    ? new Date(banner.startDate)
    : null,
  [BannerFormNames.EndDate]: banner?.endDate ? new Date(banner.endDate) : null,
  [BannerFormNames.Visible]:
    banner?.visible == null ? true : Boolean(banner.visible),
  [BannerFormNames.Placement]: banner?.placement ?? ("" as BannerPlacement),
});

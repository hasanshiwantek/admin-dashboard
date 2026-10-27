import { BannerLocation, BannerPlacement } from "../constant";
import type { BannerFormValues } from "./type";

export enum BannerFormNames {
  Title = "title",
  Content = "pageContent",
  LocationType = "locationType",
  LocationId = "locationId",
  DateType = "dateType",
  StartDate = "startDate",
  EndDate = "endDate",
  Visible = "visible",
  Placement = "placement",
}

export enum BannerDateType {
  Always = "always",
  Range = "range",
}

export const BannerDateTypeOptions = [
  {
    value: BannerDateType.Always,
    label: "Always show this banner until I remove it",
  },
  {
    value: BannerDateType.Range,
    label: "Only display this banner between specific dates",
  },
];

export const bannerDefaultValues: BannerFormValues = {
  [BannerFormNames.Title]: "",
  [BannerFormNames.Content]: "",
  [BannerFormNames.LocationType]: "" as BannerLocation,
  [BannerFormNames.LocationId]: null,
  [BannerFormNames.DateType]: BannerDateType.Always,
  [BannerFormNames.StartDate]: null,
  [BannerFormNames.EndDate]: null,
  [BannerFormNames.Visible]: true,
  [BannerFormNames.Placement]: "" as BannerPlacement,
};

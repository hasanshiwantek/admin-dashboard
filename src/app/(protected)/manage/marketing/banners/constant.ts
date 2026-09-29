import type { BannerFormValues } from "./types";

/** Form field names; use these for `name`, watch/setValue and schema keys. */
export enum BannerField {
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

export enum BannerLocation {
  Homepage = "homepage",
  Category = "category",
  Brand = "brand",
  Search = "search",
}

export enum BannerDateType {
  Always = "always",
  Range = "range",
}

export enum BannerPlacement {
  Top = "top",
  Bottom = "bottom",
}

export const BANNER_LOCATIONS = [
  { value: BannerLocation.Homepage, label: "Homepage" },
  { value: BannerLocation.Category, label: "For a specific category" },
  { value: BannerLocation.Brand, label: "For a specific brand" },
  { value: BannerLocation.Search, label: "Search results page" },
];

export const BANNER_DATE_TYPES = [
  {
    value: BannerDateType.Always,
    label: "Always show this banner until I remove it",
  },
  {
    value: BannerDateType.Range,
    label: "Only display this banner between specific dates",
  },
];

export const BANNER_PLACEMENTS = [
  { value: BannerPlacement.Top, label: "Top of page" },
  { value: BannerPlacement.Bottom, label: "Bottom of page" },
];

export const bannerDefaultValues: BannerFormValues = {
  [BannerField.Title]: "",
  [BannerField.Content]: "",
  [BannerField.LocationType]: "" as BannerLocation,
  [BannerField.LocationId]: null,
  [BannerField.DateType]: BannerDateType.Always,
  [BannerField.StartDate]: null,
  [BannerField.EndDate]: null,
  [BannerField.Visible]: true,
  [BannerField.Placement]: "" as BannerPlacement,
};

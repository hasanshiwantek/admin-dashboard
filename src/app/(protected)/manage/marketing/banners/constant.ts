import { convertOptionsToObject } from "@/lib/utils";

export const BANNERS_ROUTE = "/manage/marketing/banners";
export const NEW_BANNER_ID = "add";
export const ADD_BANNER_ROUTE = `${BANNERS_ROUTE}/${NEW_BANNER_ID}`;
export const editBannerRoute = (id: number | string) =>
  `${BANNERS_ROUTE}/${id}`;

export enum BannerLocation {
  Homepage = "homepage",
  Category = "category",
  Brand = "brand",
  Search = "search",
}

export enum BannerPlacement {
  Top = "top",
  Bottom = "bottom",
}

export const BannerLocationOptions = [
  { value: BannerLocation.Homepage, label: "Homepage" },
  { value: BannerLocation.Category, label: "For a specific category" },
  { value: BannerLocation.Brand, label: "For a specific brand" },
  { value: BannerLocation.Search, label: "Search results page" },
];

export const BannerPlacementOptions = [
  { value: BannerPlacement.Top, label: "Top of page" },
  { value: BannerPlacement.Bottom, label: "Bottom of page" },
];

export const BANNER_LOCATION_LABELS = convertOptionsToObject(
  BannerLocationOptions,
);
export const BANNER_PLACEMENT_LABELS = convertOptionsToObject(
  BannerPlacementOptions,
);

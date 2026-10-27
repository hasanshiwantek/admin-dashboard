import type { SelectOption } from "@/components/ui/Select";
import type { BannerDateType } from "../[id]/constant";
import type { BannerLocation, BannerPlacement } from "../constant";

export type BannerLocationSource = {
  locationType?: BannerLocation;
  placement?: BannerPlacement;
  location?: { id: number; name: string; slug: string } | null;
};

export type BannerFormFieldsProps = {
  locationType: BannerLocation;
  dateType: BannerDateType;
  brandOptions: SelectOption[];
  onLocationTypeChange: () => void;
  onDateTypeChange: () => void;
};

export type BannerLocationCellProps = {
  banner: BannerLocationSource;
  baseUrl?: string;
};
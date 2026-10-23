import { ColumnDef } from "@/components/ui/Table/types";
import { Ref } from "react";
import { OpeningHour, SpecialHour } from "../type";

export interface TimeFieldProps {
  value?: string | null;
  onChange?: (value: string) => void;
  onBlur?: () => void;
  id?: string;
  name?: string;
  disabled?: boolean;
  className?: string;
  "aria-invalid"?: boolean;
  ref?: Ref<HTMLInputElement>;
}

export interface LocationAddressSectionProps {
  isUnitedStates: boolean;
  onCountryChange: () => void;
}

export type SpecialHourRow = SpecialHour & { id: string };

export interface LocationDetailsSectionProps {
  openingHours: OpeningHour[];
  openingHourColumns: ColumnDef<OpeningHour>[];
  specialHours: SpecialHourRow[];
  specialHourColumns: ColumnDef<SpecialHourRow>[];
  onAddSpecialHour: () => void;
}

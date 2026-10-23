import { SelectOption } from "@/components/ui/select";
import { ReactNode } from "react";
import type useTaxZoneShellContainer from "../zoneShellContainer";

export type TaxZoneShellProps = Pick<
  ReturnType<typeof useTaxZoneShellContainer>,
  "isNew" | "title" | "tabs" | "activeTab" | "handleTabChange"
> & {
  children: ReactNode;
};

export interface TaxZoneSettingsFieldsProps {
  basedOn: string;
  appliesTo: string;
  subdivisionOptions: SelectOption[];
}

export interface TaxRateFieldsProps {
  classRates: { key: string; className: string }[];
}

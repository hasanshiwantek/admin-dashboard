import { TaxSettingSummary, TaxStat } from "../type";

export interface TaxRulesSectionProps {
  basicTaxEnabled: boolean;
  stats: TaxStat[];
}

export interface StoreTaxSettingsSectionProps {
  settings: TaxSettingSummary[];
}

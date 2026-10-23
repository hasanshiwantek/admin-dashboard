export interface TaxOverview {
  basicTaxEnabled: boolean;
  taxClassCount: number;
  taxZoneCount: number;
  taxRateCount: number;
  /** Percent applied when the automatic tax service is unreachable */
  fallbackTaxRate: number;
  pricesIncludeTax: boolean;
}

export interface TaxStat {
  key: string;
  count: number;
  label: string;
}

export interface TaxSettingSummary {
  key: string;
  title: string;
  description: string;
}

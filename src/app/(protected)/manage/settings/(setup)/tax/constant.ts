import type { TaxOverview } from "./type";

export const TAX_ROUTE = "/manage/settings/tax";
export const BASIC_TAX_ROUTE = `${TAX_ROUTE}/tax-general`;
export const STORE_TAX_SETTINGS_ROUTE = `${TAX_ROUTE}/settings`;

// Placeholder until the tax API is available
export const defaultTaxOverview: TaxOverview = {
  basicTaxEnabled: true,
  taxClassCount: 4,
  taxZoneCount: 1,
  taxRateCount: 0,
  fallbackTaxRate: 10,
  pricesIncludeTax: false,
};

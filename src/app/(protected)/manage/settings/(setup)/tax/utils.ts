import type { TaxOverview, TaxSettingSummary, TaxStat } from "./type";

export const getBasicTaxStats = (overview: TaxOverview): TaxStat[] => [
  { key: "classes", count: overview.taxClassCount, label: "Tax classes" },
  { key: "zones", count: overview.taxZoneCount, label: "Tax zones" },
  { key: "rates", count: overview.taxRateCount, label: "Tax rates" },
];

export const getStoreTaxSettings = (
  overview: TaxOverview,
): TaxSettingSummary[] => [
  {
    key: "fallback",
    title: "Fallback tax",
    description: `A flat rate of ${overview.fallbackTaxRate}% tax applies when your automatic tax service is unreachable.`,
  },
  {
    key: "inclusive",
    title: "Tax inclusive pricing",
    description: overview.pricesIncludeTax
      ? "Entered prices include tax."
      : "Entered prices do not include tax.",
  },
];

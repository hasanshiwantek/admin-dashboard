import type { SelectOption } from "@/components/ui/select";
import type { PromotionSettingsFormValues } from "./type";

export const PROMOTION_PRIORITIZATION_URL =
  "https://support.bigcommerce.com/s/article/Promotions#prioritization";

export enum PromotionSettingsFormNames {
  CalculationMethod = "calculationMethod",
  MaxCouponsPerOrder = "maxCouponsPerOrder",
  AllowZeroPriceTrigger = "allowZeroPriceTrigger",
  AllowOnCustomPriceOverrides = "allowOnCustomPriceOverrides",
}

export enum PromotionCalculation {
  Independent = "independent",
  Cumulative = "cumulative",
}

export const maxCouponsOptions: SelectOption[] = ["1", "2", "3", "4", "5"].map(
  (count) => ({ value: count, label: count }),
);

export const promotionSettingsDefaults: PromotionSettingsFormValues = {
  [PromotionSettingsFormNames.CalculationMethod]:
    PromotionCalculation.Independent,
  [PromotionSettingsFormNames.MaxCouponsPerOrder]: "1",
  [PromotionSettingsFormNames.AllowZeroPriceTrigger]: false,
  [PromotionSettingsFormNames.AllowOnCustomPriceOverrides]: false,
};

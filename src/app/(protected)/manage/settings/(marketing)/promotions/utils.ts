import {
  PromotionSettingsFormNames,
  promotionSettingsDefaults,
} from "./constant";
import {
  PromotionSettings,
  PromotionSettingsFormValues,
  PromotionSettingsPayload,
} from "./type";

export const transformGetPromotionSettings = (
  settings: PromotionSettings | null,
): PromotionSettingsFormValues => ({
  [PromotionSettingsFormNames.CalculationMethod]:
    settings?.calculationMethod ??
    promotionSettingsDefaults[PromotionSettingsFormNames.CalculationMethod],
  [PromotionSettingsFormNames.MaxCouponsPerOrder]: String(
    settings?.maxCouponsPerOrder ??
      promotionSettingsDefaults[PromotionSettingsFormNames.MaxCouponsPerOrder],
  ),
  [PromotionSettingsFormNames.AllowZeroPriceTrigger]:
    settings?.allowZeroPriceTrigger ??
    promotionSettingsDefaults[PromotionSettingsFormNames.AllowZeroPriceTrigger],
  [PromotionSettingsFormNames.AllowOnCustomPriceOverrides]:
    settings?.allowOnCustomPriceOverrides ??
    promotionSettingsDefaults[
      PromotionSettingsFormNames.AllowOnCustomPriceOverrides
    ],
});

export const transformPostPromotionSettings = (
  values: PromotionSettingsFormValues,
): PromotionSettingsPayload => ({
  calculationMethod: values[PromotionSettingsFormNames.CalculationMethod],
  maxCouponsPerOrder: Number(
    values[PromotionSettingsFormNames.MaxCouponsPerOrder],
  ),
  allowZeroPriceTrigger: values[PromotionSettingsFormNames.AllowZeroPriceTrigger],
  allowOnCustomPriceOverrides:
    values[PromotionSettingsFormNames.AllowOnCustomPriceOverrides],
});

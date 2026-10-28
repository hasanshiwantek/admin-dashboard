import CheckboxField from "@/components/form/fields/CheckboxField";
import InputField from "@/components/form/InputField";
import SettingsCard from "@/components/SettingsCard/SettingsCard";
import { PromotionSettingsFormNames } from "../constant";

const AdvancedSection = () => (
  <SettingsCard title="Advanced">
    <InputField
      name={PromotionSettingsFormNames.AllowZeroPriceTrigger}
      layout="vertical"
      Component={CheckboxField}
      text="Allow $0 price products to trigger promotions"
    />
    <InputField
      name={PromotionSettingsFormNames.AllowOnCustomPriceOverrides}
      layout="vertical"
      Component={CheckboxField}
      text="Allow promotions to apply on products with custom price overrides"
    />
  </SettingsCard>
);

export default AdvancedSection;

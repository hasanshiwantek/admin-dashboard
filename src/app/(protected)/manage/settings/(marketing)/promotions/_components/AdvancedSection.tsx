import CheckboxField from "@/components/form/fields/CheckboxField";
import InputField from "@/components/form/InputField";
import SectionCard from "@/components/SectionCard/SectionCard";
import { PromotionSettingsFormNames } from "../constant";

const AdvancedSection = () => (
  <SectionCard title="Advanced">
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
  </SectionCard>
);

export default AdvancedSection;

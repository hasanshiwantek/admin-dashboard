import CheckboxField from "@/components/form/fields/CheckboxField";
import InputField from "@/components/form/InputField";
import HelpTooltip from "@/components/HelpTooltip/HelpTooltip";
import SettingsCard from "@/components/SettingsCard/SettingsCard";
import { ProductFormNames, ProductSection } from "../[id]/constant";

const ProductRelatedSection = () => (
  <SettingsCard
    id={ProductSection.RelatedProducts}
    title="Related products"
    className="scroll-mt-24"
  >
    <InputField
      name={ProductFormNames.RelatedProducts}
      Component={CheckboxField}
      text="Automatically show related products on my storefront"
      layout="vertical"
      labelEndComponent={
        <HelpTooltip content="When enabled, related products are found for you. Untick this to pick specific products." />
      }
    />
  </SettingsCard>
);

export default ProductRelatedSection;

import InputField from "@/components/form/InputField";
import SettingsCard from "@/components/SettingsCard/SettingsCard";
import DescriptionEditorQuill from "@/components/ui/DescriptionEditorQuill";
import { ProductFormNames, ProductSection } from "../[id]/constant";

const ProductDescriptionSection = () => (
  <SettingsCard
    id={ProductSection.Description}
    title="Description"
    className="scroll-mt-24"
  >
    <InputField
      name={ProductFormNames.Description}
      layout="vertical"
      Component={DescriptionEditorQuill}
      placeholder="Write your description here..."
    />
    <InputField
      name={ProductFormNames.Faq}
      label="FAQ"
      layout="vertical"
      Component={DescriptionEditorQuill}
      placeholder="Write your FAQ here..."
    />
  </SettingsCard>
);

export default ProductDescriptionSection;

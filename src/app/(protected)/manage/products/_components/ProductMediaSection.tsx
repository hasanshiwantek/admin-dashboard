import InputField from "@/components/form/InputField";
import SettingsCard from "@/components/SettingsCard/SettingsCard";
import { MEDIA_ACCEPT, ProductFormNames, ProductSection } from "../[id]/constant";
import ProductMediaField from "./ProductMediaField";

const ProductMediaSection = () => (
  <SettingsCard
    id={ProductSection.Images}
    title="Images & videos"
    description="Add images and videos of your product to engage customers."
    className="scroll-mt-24"
  >
    <InputField
      name={ProductFormNames.Images}
      layout="vertical"
      Component={ProductMediaField}
      accept={MEDIA_ACCEPT}
    />
  </SettingsCard>
);

export default ProductMediaSection;

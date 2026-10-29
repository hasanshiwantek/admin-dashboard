import InputField from "@/components/form/InputField";
import SectionCard from "@/components/SectionCard/SectionCard";
import { MEDIA_ACCEPT, ProductFormNames, ProductSection } from "../[id]/constant";
import ProductMediaField from "./ProductMediaField";

const ProductMediaSection = () => (
  <SectionCard
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
  </SectionCard>
);

export default ProductMediaSection;

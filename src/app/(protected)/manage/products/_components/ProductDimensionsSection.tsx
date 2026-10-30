import InputField from "@/components/form/InputField";
import HelpTooltip from "@/components/HelpTooltip/HelpTooltip";
import SectionCard from "@/components/SectionCard/SectionCard";
import { ProductFormNames, ProductSection } from "../[id]/constant";
import { measurementInputProps } from "../[id]/utils";

const DIMENSION_HELP =
  "Some shipping companies need the product's physical dimensions to calculate shipping charges.";

const ProductDimensionsSection = () => (
  <SectionCard
    id={ProductSection.Dimensions}
    title="Dimensions & weight"
    description="Measurements of the product's shipping container. They help calculate shipping rates and don't show on your storefront."
    className="scroll-mt-24"
  >
    <div className="grid grid-cols-1 gap-x-8 gap-y-5 xl:grid-cols-2">
      <InputField
        name={ProductFormNames.Weight}
        label="Weight"
        required
        layout="vertical"
        endIcon="lbs"
        labelEndComponent={
          <HelpTooltip content="Used to calculate shipping costs when this product is ordered." />
        }
        {...measurementInputProps}
      />
      <InputField
        name={ProductFormNames.Width}
        label="Width"
        layout="vertical"
        endIcon="Inches"
        labelEndComponent={<HelpTooltip content={DIMENSION_HELP} />}
        {...measurementInputProps}
      />
      <InputField
        name={ProductFormNames.Height}
        label="Height"
        layout="vertical"
        endIcon="Inches"
        labelEndComponent={<HelpTooltip content={DIMENSION_HELP} />}
        {...measurementInputProps}
      />
      <InputField
        name={ProductFormNames.Depth}
        label="Depth"
        layout="vertical"
        endIcon="Inches"
        labelEndComponent={<HelpTooltip content={DIMENSION_HELP} />}
        {...measurementInputProps}
      />
    </div>
  </SectionCard>
);

export default ProductDimensionsSection;

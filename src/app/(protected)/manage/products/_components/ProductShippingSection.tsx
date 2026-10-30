import CheckboxField from "@/components/form/fields/CheckboxField";
import InputField from "@/components/form/InputField";
import PriceField from "@/components/form/PriceField";
import HelpTooltip from "@/components/HelpTooltip/HelpTooltip";
import SectionCard from "@/components/SectionCard/SectionCard";
import { cn } from "@/lib/utils";
import { ProductFormNames, ProductSection } from "../[id]/constant";
import { ProductShippingSectionProps } from "./type";

const ProductShippingSection = ({
  freeShipping,
}: ProductShippingSectionProps) => (
  <SectionCard
    id={ProductSection.Shipping}
    title="Shipping details"
    className="scroll-mt-24"
  >
    <div className="grid grid-cols-1 items-end gap-x-8 gap-y-5 xl:grid-cols-2">
      <PriceField
        name={ProductFormNames.FixedShippingCost}
        label="Fixed shipping price"
        layout="vertical"
        disabled={freeShipping}
        className={cn(freeShipping && "line-through")}
        labelEndComponent={
          <HelpTooltip content="What the shopper pays to ship one unit of this product. Leave blank to use the shipping calculator at checkout. Ignored when free shipping is ticked." />
        }
      />
      <InputField
        name={ProductFormNames.FreeShipping}
        Component={CheckboxField}
        text="Free shipping"
        layout="vertical"
        containerClassName="pb-3"
      />
    </div>
  </SectionCard>
);

export default ProductShippingSection;

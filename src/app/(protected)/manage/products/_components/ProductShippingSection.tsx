import CheckboxField from "@/components/form/fields/CheckboxField";
import InputField from "@/components/form/InputField";
import HelpTooltip from "@/components/HelpTooltip/HelpTooltip";
import SettingsCard from "@/components/SettingsCard/SettingsCard";
import { cn } from "@/lib/utils";
import { ProductFormNames, ProductSection } from "../[id]/constant";
import { ProductShippingSectionProps } from "./type";

const ProductShippingSection = ({
  priceInputProps,
  freeShipping,
}: ProductShippingSectionProps) => (
  <SettingsCard
    id={ProductSection.Shipping}
    title="Shipping details"
    className="scroll-mt-24"
  >
    <div className="grid grid-cols-1 items-end gap-x-8 gap-y-5 xl:grid-cols-2">
      <InputField
        name={ProductFormNames.FixedShippingCost}
        label="Fixed shipping price"
        layout="vertical"
        disabled={freeShipping}
        className={cn(freeShipping && "line-through")}
        labelEndComponent={
          <HelpTooltip content="What the shopper pays to ship one unit of this product. Leave blank to use the shipping calculator at checkout. Ignored when free shipping is ticked." />
        }
        {...priceInputProps}
      />
      <InputField
        name={ProductFormNames.FreeShipping}
        Component={CheckboxField}
        text="Free shipping"
        layout="vertical"
        containerClassName="pb-3"
      />
    </div>
  </SettingsCard>
);

export default ProductShippingSection;

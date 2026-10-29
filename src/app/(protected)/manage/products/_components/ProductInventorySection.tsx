import CheckboxField from "@/components/form/fields/CheckboxField";
import RadioGroupField from "@/components/form/fields/RadioGroupField";
import InputField from "@/components/form/InputField";
import SectionCard from "@/components/SectionCard/SectionCard";
import {
  InventoryLevelOptions,
  ProductFormNames,
  ProductSection,
} from "../[id]/constant";
import { wholeNumberInputProps } from "../utils";
import { ProductInventorySectionProps } from "./type";

const ProductInventorySection = ({
  trackInventory,
}: ProductInventorySectionProps) => (
  <SectionCard
    id={ProductSection.Inventory}
    title="Inventory"
    className="scroll-mt-24"
  >
    <InputField
      name={ProductFormNames.TrackInventory}
      Component={CheckboxField}
      text="Track inventory"
      layout="vertical"
    />
    {trackInventory && (
      <>
        <InputField
          name={ProductFormNames.InventoryLevel}
          Component={RadioGroupField}
          options={InventoryLevelOptions}
          layout="vertical"
        />
        <div className="grid grid-cols-1 gap-x-8 gap-y-5 xl:grid-cols-2">
          <InputField
            name={ProductFormNames.CurrentStock}
            label="Current stock"
            layout="vertical"
            className="max-w-none"
            {...wholeNumberInputProps}
          />
          <InputField
            name={ProductFormNames.LowStock}
            label="Low stock"
            layout="vertical"
            className="max-w-none"
            {...wholeNumberInputProps}
          />
        </div>
      </>
    )}
  </SectionCard>
);

export default ProductInventorySection;

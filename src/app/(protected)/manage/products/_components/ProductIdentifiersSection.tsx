import InputField from "@/components/form/InputField";
import SettingsCard from "@/components/SettingsCard/SettingsCard";
import { ProductFormNames, ProductSection } from "../[id]/constant";
import { ProductIdentifiersSectionProps } from "./type";

const ProductIdentifiersSection = ({
  onIdentityChange,
}: ProductIdentifiersSectionProps) => (
  <SettingsCard
    id={ProductSection.Identifiers}
    title="Product identifiers"
    className="scroll-mt-24"
  >
    <div className="grid grid-cols-1 gap-x-8 gap-y-5 xl:grid-cols-2">
      <InputField
        name={ProductFormNames.Sku}
        label="SKU"
        required
        layout="vertical"
        placeholder="THX-1138"
        className="max-w-none"
        getValueOnChange={onIdentityChange}
        runAfterOnChange
      />
      <InputField
        name={ProductFormNames.Mpn}
        label="Manufacturer Part Number (MPN)"
        layout="vertical"
        className="max-w-none"
      />
      <InputField
        name={ProductFormNames.Upc}
        label="Product UPC/EAN"
        layout="vertical"
        className="max-w-none"
      />
      <InputField
        name={ProductFormNames.Gtin}
        label="Global Trade Item Number (GTIN)"
        layout="vertical"
        className="max-w-none"
      />
      <InputField
        name={ProductFormNames.Bpn}
        label="Bin Picking Number (BPN)"
        layout="vertical"
        className="max-w-none"
      />
    </div>
  </SettingsCard>
);

export default ProductIdentifiersSection;

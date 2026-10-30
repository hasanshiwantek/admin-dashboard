import CheckboxField from "@/components/form/fields/CheckboxField";
import RadioGroupField from "@/components/form/fields/RadioGroupField";
import { SelectField } from "@/components/form/fields/SelectField";
import InputField from "@/components/form/InputField";
import SectionCard from "@/components/SectionCard/SectionCard";
import {
  OpenGraphImageOptions,
  OpenGraphObjectTypeOptions,
  ProductFormNames,
  ProductSection,
} from "../[id]/constant";

const ProductOpenGraphSection = () => (
  <SectionCard
    id={ProductSection.OpenGraph}
    title="Open graph sharing"
    className="scroll-mt-24"
  >
    <InputField
      name={ProductFormNames.ObjectType}
      label="Object type"
      layout="vertical"
      Component={SelectField}
      options={OpenGraphObjectTypeOptions}
      placeholder="Select type"
      controlClassName="max-w-[41.6rem]"
      className="max-w-none"
    />
    <InputField
      name={ProductFormNames.UseProductName}
      label="Title"
      Component={CheckboxField}
      text="Use product name"
      layout="vertical"
    />
    <InputField
      name={ProductFormNames.GraphDescription}
      label="Description"
      Component={CheckboxField}
      text="Use meta description"
      layout="vertical"
    />
    <InputField
      name={ProductFormNames.ImageOption}
      label="Image"
      Component={RadioGroupField}
      options={OpenGraphImageOptions}
      layout="vertical"
    />
  </SectionCard>
);

export default ProductOpenGraphSection;

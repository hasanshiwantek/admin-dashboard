import CheckboxField from "@/components/form/fields/CheckboxField";
import { SelectField } from "@/components/form/fields/SelectField";
import InputField from "@/components/form/InputField";
import SectionCard from "@/components/SectionCard/SectionCard";
import { Button } from "@/components/ui/Button";
import { Plus } from "lucide-react";
import Link from "next/link";
import {
  ProductFormNames,
  ProductSection,
  ProductTypeOptions,
} from "../[id]/constant";
import { measurementInputProps } from "../[id]/utils";
import { PRODUCT_CATEGORIES_ROUTE } from "../constant";
import CategoryTreeField from "./CategoryTreeField";
import { ProductBasicInfoSectionProps } from "./type";

const ProductBasicInfoSection = ({
  priceInputProps,
  brands,
  categories,
  onIdentityChange,
}: ProductBasicInfoSectionProps) => (
  <SectionCard
    id={ProductSection.Basic}
    title="Basic information"
    className="scroll-mt-24"
  >
    <InputField
      name={ProductFormNames.IsVisible}
      Component={CheckboxField}
      text="Visible on storefront"
      layout="vertical"
    />
    <div className="grid grid-cols-1 gap-x-8 gap-y-5 xl:grid-cols-2">
      <InputField
        name={ProductFormNames.Name}
        label="Product name"
        required
        layout="vertical"
        placeholder="Sample Product Name"
        className="max-w-none"
        getValueOnChange={onIdentityChange}
        runAfterOnChange
      />
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
        name={ProductFormNames.ProductType}
        label="Product type"
        layout="vertical"
        Component={SelectField}
        options={ProductTypeOptions}
        placeholder="Select type"
        className="max-w-none"
      />
      <InputField
        name={ProductFormNames.Price}
        label="Default price"
        required
        layout="vertical"
        {...priceInputProps}
        hint="Excluding tax"
      />
      <InputField
        name={ProductFormNames.BrandId}
        label="Brand"
        layout="vertical"
        Component={SelectField}
        options={brands}
        valueKey="id"
        labelKey="name"
        placeholder="Select brand"
        className="max-w-none"
        getValueOnChange={onIdentityChange}
        runAfterOnChange
      />
      <InputField
        name={ProductFormNames.Weight}
        label="Weight"
        required
        layout="vertical"
        endIcon="lbs"
        {...measurementInputProps}
      />
    </div>
    <InputField
      name={ProductFormNames.CategoryIds}
      label="Categories"
      layout="vertical"
      Component={CategoryTreeField}
      categories={categories}
      labelEndComponent={
        <Button asChild variant="link" className="ml-auto h-auto p-0">
          <Link href={PRODUCT_CATEGORIES_ROUTE}>
            <Plus className="size-5" />
            Add categories
          </Link>
        </Button>
      }
      labelClassName="w-full"
    />
  </SectionCard>
);

export default ProductBasicInfoSection;

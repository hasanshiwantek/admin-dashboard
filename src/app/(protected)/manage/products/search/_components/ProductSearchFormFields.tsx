import CategoryTreeSm from "@/app/components/products/add/CategoryTreeSm";
import { SelectField } from "@/components/form/fields/SelectField";
import InputField from "@/components/form/InputField";
import HelpTooltip from "@/components/HelpTooltip/HelpTooltip";
import SectionCard from "@/components/SectionCard/SectionCard";
import { wholeNumberInputProps } from "../../utils";
import {
  FeaturedOptions,
  FreeShippingOptions,
  ProductSearchFormNames,
  SortByOptions,
  SortOrderOptions,
  VisibilityOptions,
} from "../constant";
import { ProductSearchFormFieldsProps, RangeFieldsProps } from "./type";

const rangeBoxProps = (prefix?: string) =>
  prefix
    ? {
        startIcon: prefix,
        inputWrapperClassName: "w-[16rem]",
        className: "w-full",
      }
    : { ...wholeNumberInputProps, className: "w-[16rem] max-w-none" };

const RangeFields = ({ label, min, max, prefix }: RangeFieldsProps) => (
  <InputField
    name={min}
    label={label}
    showColon
    controlClassName="w-fit"
    beforeFieldComponent={
      <span className="w-14 text-[1.4rem] text-gray-600">From</span>
    }
    afterFieldComponent={
      <>
        <span className="text-[1.4rem] text-gray-600">to</span>
        <InputField name={max} layout="vertical" {...rangeBoxProps(prefix)} />
      </>
    }
    {...rangeBoxProps(prefix)}
  />
);

const ProductSearchFormFields = ({
  brands,
  brandsLoading,
  currencySymbol,
}: ProductSearchFormFieldsProps) => (
  <>
    <SectionCard title="Advanced Search">
      <InputField
        name={ProductSearchFormNames.SearchKeywords}
        label="Search Keywords"
        showColon
        labelEndComponent={
          <HelpTooltip
            content={
              <div className="flex flex-col">
                <strong>Search Keywords</strong>
                The search keywords you type into this box will be used to
                search the following fields for all products: name.
              </div>
            }
          />
        }
      />
      <InputField
        name={ProductSearchFormNames.BrandId}
        label="Brand Name"
        showColon
        Component={SelectField}
        options={brands}
        valueKey="id"
        labelKey="name"
        loading={brandsLoading}
        loadingText="Loading brands..."
        placeholder="All Brand Names"
      />
      <InputField
        name={ProductSearchFormNames.CategoryIds}
        label="Categories"
        Component={CategoryTreeSm}
      />
    </SectionCard>

    <SectionCard title="Search by Range">
      <RangeFields
        label="Price Range"
        min={ProductSearchFormNames.PriceMin}
        max={ProductSearchFormNames.PriceMax}
        prefix={currencySymbol}
      />
      <RangeFields
        label="Quantity Sold"
        min={ProductSearchFormNames.SoldMin}
        max={ProductSearchFormNames.SoldMax}
      />
      <RangeFields
        label="Inventory Level"
        min={ProductSearchFormNames.InventoryMin}
        max={ProductSearchFormNames.InventoryMax}
      />
    </SectionCard>

    <SectionCard title="Search by Setting">
      <InputField
        name={ProductSearchFormNames.IsVisible}
        label="Product Visibility"
        showColon
        Component={SelectField}
        options={VisibilityOptions}
        placeholder="No Preference"
      />
      <InputField
        name={ProductSearchFormNames.IsFeatured}
        label="Featured Product"
        showColon
        Component={SelectField}
        options={FeaturedOptions}
        placeholder="No Preference"
      />
      <InputField
        name={ProductSearchFormNames.FreeShipping}
        label="Free Shipping"
        showColon
        Component={SelectField}
        options={FreeShippingOptions}
        placeholder="No Preference"
      />
    </SectionCard>

    <SectionCard title="Sort Order">
      <InputField
        name={ProductSearchFormNames.SortBy}
        label="Sort Order"
        showColon
        Component={SelectField}
        options={SortByOptions}
        placeholder="ID"
        controlClassName="max-w-[60rem]"
        afterFieldComponent={
          <InputField
            name={ProductSearchFormNames.SortOrder}
            layout="vertical"
            Component={SelectField}
            options={SortOrderOptions}
            placeholder="Ascending Order"
            containerClassName="flex-1"
          />
        }
      />
    </SectionCard>
  </>
);

export default ProductSearchFormFields;

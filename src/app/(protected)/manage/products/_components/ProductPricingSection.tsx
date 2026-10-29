import { SelectField } from "@/components/form/fields/SelectField";
import InputField from "@/components/form/InputField";
import HelpTooltip from "@/components/HelpTooltip/HelpTooltip";
import SectionCard from "@/components/SectionCard/SectionCard";
import { Button } from "@/components/ui/Button";
import Table from "@/components/ui/Table/Table";
import { ChevronDown, ChevronRight, Plus } from "lucide-react";
import {
  ProductFormNames,
  ProductSection,
  TaxClassOptions,
} from "../[id]/constant";
import { ProductPricingSectionProps } from "./type";

const SUBHEADING = "text-[1.8rem]! font-normal text-text-heading!";

const ProductPricingSection = ({
  priceInputProps,
  showAdvanced,
  onToggleAdvanced,
  discountTypeOptions,
  bulkPricingTiers,
  bulkPricingColumns,
  onAddTier,
}: ProductPricingSectionProps) => (
  <SectionCard
    id={ProductSection.Pricing}
    title="Pricing"
    className="scroll-mt-24"
  >
    <div className="grid grid-cols-1 gap-x-8 gap-y-5 xl:grid-cols-2">
      <InputField
        name={ProductFormNames.Price}
        label="Default price"
        required
        layout="vertical"
        hint="Excluding tax"
        {...priceInputProps}
      />
      <InputField
        name={ProductFormNames.TaxClass}
        label="Tax class"
        layout="vertical"
        Component={SelectField}
        options={TaxClassOptions}
        placeholder="Select a tax class"
        className="max-w-none"
      />
    </div>

    <Button
      type="button"
      variant="link"
      onClick={onToggleAdvanced}
      aria-expanded={showAdvanced}
      className="h-auto w-fit p-0 text-2xl"
    >
      {showAdvanced ? (
        <ChevronDown className="size-6" />
      ) : (
        <ChevronRight className="size-6" />
      )}
      {showAdvanced ? "Hide advanced pricing" : "Show advanced pricing"}
    </Button>

    {showAdvanced && (
      <>
        <div className="grid grid-cols-1 gap-x-8 gap-y-5 xl:grid-cols-3">
          <InputField
            name={ProductFormNames.CostPrice}
            label="Cost"
            layout="vertical"
            {...priceInputProps}
          />
          <InputField
            name={ProductFormNames.Msrp}
            label="MSRP"
            layout="vertical"
            {...priceInputProps}
          />
          <InputField
            name={ProductFormNames.SalePrice}
            label="Sale price"
            layout="vertical"
            {...priceInputProps}
          />
        </div>

        <div className="flex flex-col gap-3">
          <h3 className={SUBHEADING}>Tax configuration</h3>
          <p className="text-[1.4rem] text-gray-600">
            Map the tax codes defined by your external tax provider to this
            product.
          </p>
        </div>
        <InputField
          name={ProductFormNames.TaxCode}
          label="Tax provider tax code"
          layout="vertical"
          labelEndComponent={
            <HelpTooltip content="An identifier your tax provider uses to apply the right tax rate to this product." />
          }
          controlClassName="max-w-[41.6rem]"
          className="max-w-none"
        />

        <div className="flex flex-col gap-3">
          <h3 className={SUBHEADING}>Bulk pricing</h3>
          <p className="text-[1.4rem] text-gray-600">
            Create bulk pricing rules to offer price discounts based on quantity
            breaks.
          </p>
        </div>
        <InputField
          name={ProductFormNames.DiscountType}
          label="Discount type"
          layout="vertical"
          Component={SelectField}
          options={discountTypeOptions}
          controlClassName="max-w-[41.6rem]"
          className="max-w-none"
        />
        {bulkPricingTiers.length > 0 && (
          <Table
            data={bulkPricingTiers}
            columns={bulkPricingColumns}
            getRowId={(row) => row.id}
            selectable={false}
            hideRecordCount
            bare
          />
        )}
        <Button
          type="button"
          variant="link"
          onClick={onAddTier}
          className="h-auto w-fit p-0"
        >
          <Plus className="size-5" />
          Add tier
        </Button>
      </>
    )}
  </SectionCard>
);

export default ProductPricingSection;

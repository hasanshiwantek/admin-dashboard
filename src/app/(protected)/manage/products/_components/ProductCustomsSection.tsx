import CheckboxField from "@/components/form/fields/CheckboxField";
import { SelectField } from "@/components/form/fields/SelectField";
import InputField from "@/components/form/InputField";
import SectionCard from "@/components/SectionCard/SectionCard";
import { Button } from "@/components/ui/Button";
import Table from "@/components/ui/Table/Table";
import { Plus } from "lucide-react";
import {
  CountryOptions,
  ProductFormNames,
  ProductSection,
} from "../[id]/constant";
import { ProductCustomsSectionProps } from "./type";

const ProductCustomsSection = ({
  manageCustoms,
  hsCodes,
  hsCodeColumns,
  onAddHsCode,
}: ProductCustomsSectionProps) => (
  <SectionCard
    id={ProductSection.Customs}
    title="Customs information"
    description="Helps border officers calculate customs duties and fees when this product ships internationally. Used by installed apps that need it."
    className="scroll-mt-24"
  >
    <InputField
      name={ProductFormNames.ManageCustoms}
      Component={CheckboxField}
      text="Manage customs information"
      layout="vertical"
    />
    {manageCustoms && (
      <>
        <InputField
          name={ProductFormNames.CountryOfOrigin}
          label="Country of origin (optional)"
          layout="vertical"
          Component={SelectField}
          options={CountryOptions}
          placeholder="Not specified"
          hint="Usually the country where this product was manufactured or produced."
          controlClassName="max-w-[41.6rem]"
          className="max-w-none"
        />
        <InputField
          name={ProductFormNames.CommodityDescription}
          label="Commodity description (optional)"
          layout="vertical"
          isTextArea
          placeholder="Enter a description to help identify this product"
          hint="A short, precise description for border officers to identify and verify this product."
          className="max-w-none"
        />
        <div className="flex flex-col gap-3">
          <h3 className="text-[1.8rem]! font-normal text-text-heading!">
            HS codes
          </h3>
          <p className="text-[1.4rem] text-gray-600">
            Helps border officers classify this product.
          </p>
        </div>
        {hsCodes.length > 0 && (
          <Table
            data={hsCodes}
            columns={hsCodeColumns}
            getRowId={(row) => row.id}
            selectable={false}
            hideRecordCount
            bare
          />
        )}
        <Button
          type="button"
          variant="link"
          onClick={onAddHsCode}
          className="h-auto w-fit p-0"
        >
          <Plus className="size-5" />
          Add HS code
        </Button>
      </>
    )}
  </SectionCard>
);

export default ProductCustomsSection;

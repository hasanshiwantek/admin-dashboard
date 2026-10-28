import FileField from "@/components/form/fields/FileField";
import { SelectField } from "@/components/form/fields/SelectField";
import InputField from "@/components/form/InputField";
import HelpTooltip from "@/components/HelpTooltip/HelpTooltip";
import SettingsCard from "@/components/SettingsCard/SettingsCard";
import {
  BRAND_LOGO_MAX_SIZE_MB,
  BRAND_LOGO_TYPES,
  BrandFormNames,
  BrandTemplateLayoutOptions,
} from "../[id]/constant";
import { BrandFormFieldsProps } from "./type";

const BrandFormFields = ({ isEdit }: BrandFormFieldsProps) => (
  <SettingsCard title="Brand Details">
    {isEdit ? (
      <InputField
        name={BrandFormNames.Name}
        layout="vertical"
        label="Brand name"
        required
        controlClassName="max-w-[41.6rem]"
      />
    ) : (
      <InputField
        name={BrandFormNames.Name}
        layout="vertical"
        label="Brand names"
        required
        isTextArea
        placeholder={"Nike\nAdidas\nApple"}
        hint="Enter one brand per line."
        className="min-h-40"
        controlClassName="max-w-[41.6rem]"
        labelEndComponent={
          <HelpTooltip content="Type the brand names you want to add, one per line, such as Nike, Adidas, Apple and Microsoft." />
        }
      />
    )}
    {isEdit && (
      <>
        <InputField
          name={BrandFormNames.PageTitle}
          layout="vertical"
          label="Page title"
          controlClassName="max-w-[41.6rem]"
        />
        <InputField
          name={BrandFormNames.MetaKeywords}
          layout="vertical"
          label="Meta keywords"
          controlClassName="max-w-[41.6rem]"
        />
        <InputField
          name={BrandFormNames.MetaDescription}
          layout="vertical"
          label="Meta description"
          isTextArea
          controlClassName="max-w-[41.6rem]"
        />
        <InputField
          name={BrandFormNames.SearchKeywords}
          layout="vertical"
          label="Search keywords"
          controlClassName="max-w-[41.6rem]"
        />
        <InputField
          name={BrandFormNames.Logo}
          layout="vertical"
          label="Brand image"
          Component={FileField}
          accept={BRAND_LOGO_TYPES}
          maxSizeMb={BRAND_LOGO_MAX_SIZE_MB}
        />
        <InputField
          name={BrandFormNames.BrandUrl}
          layout="vertical"
          label="Brand URL"
          controlClassName="max-w-[41.6rem]"
        />
        <InputField
          name={BrandFormNames.TemplateLayout}
          layout="vertical"
          label="Template layout file"
          Component={SelectField}
          options={BrandTemplateLayoutOptions}
          controlClassName="max-w-[41.6rem]"
        />
      </>
    )}
  </SettingsCard>
);

export default BrandFormFields;

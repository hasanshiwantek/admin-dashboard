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
        className="min-h-40"
        controlClassName="max-w-[41.6rem]"
        labelEndComponent={
          <HelpTooltip
            side="right"
            contentClassName="max-w-[32rem] p-4"
            content={
              <div className="flex flex-col gap-2 text-[1.4rem]">
                <strong className="text-[1.6rem]">Brand Names</strong>
                <p>
                  Type the brand names you want to add into the text box. Enter
                  one brand per line, such as:
                </p>
                <ul className="list-disc pl-6">
                  <li>Nike</li>
                  <li>ADIDAS</li>
                  <li>Apple</li>
                  <li>Microsoft</li>
                </ul>
              </div>
            }
          />
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

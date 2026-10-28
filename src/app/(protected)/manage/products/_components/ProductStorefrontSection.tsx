import CheckboxField from "@/components/form/fields/CheckboxField";
import { SelectField } from "@/components/form/fields/SelectField";
import InputField from "@/components/form/InputField";
import HelpTooltip from "@/components/HelpTooltip/HelpTooltip";
import SettingsCard from "@/components/SettingsCard/SettingsCard";
import {
  ProductConditionOptions,
  ProductFormNames,
  ProductSection,
  TemplateLayoutOptions,
} from "../[id]/constant";

const ProductStorefrontSection = () => (
  <SettingsCard
    id={ProductSection.Storefront}
    title="Storefront details"
    className="scroll-mt-24"
  >
    <InputField
      name={ProductFormNames.IsFeatured}
      Component={CheckboxField}
      text="Set as a featured product on my storefront"
      layout="vertical"
      labelEndComponent={
        <HelpTooltip content="Featured products are shown in various places on your site, including the front page." />
      }
    />
    <InputField
      name={ProductFormNames.SearchKeywords}
      label="Search keywords"
      layout="vertical"
      placeholder="e.g. widget, affordable, portable"
      className="max-w-none"
      labelEndComponent={
        <HelpTooltip content="Optional keywords, separated by commas, that help shoppers find this product with on-site search." />
      }
    />
    <div className="grid grid-cols-1 gap-x-8 gap-y-5 xl:grid-cols-2">
      <InputField
        name={ProductFormNames.SortOrder}
        label="Sort order"
        layout="vertical"
        inputMode="numeric"
        className="max-w-none"
        labelEndComponent={
          <HelpTooltip content="Defaults to 0. A low number (such as -1) moves the product to the top, a high number (such as 20) to the bottom." />
        }
      />
      <InputField
        name={ProductFormNames.TemplateLayout}
        label="Template layout file"
        layout="vertical"
        Component={SelectField}
        options={TemplateLayoutOptions}
        className="max-w-none"
        labelEndComponent={
          <HelpTooltip content="Advanced users can create an alternate template layout file to use instead of the default one for this product." />
        }
      />
    </div>
    <InputField
      name={ProductFormNames.Warranty}
      label="Warranty information"
      layout="vertical"
      isTextArea
      className="min-h-40 max-w-none"
      labelEndComponent={
        <HelpTooltip content="If you don't offer a warranty or are unsure, check the manufacturer's website for details." />
      }
    />
    <InputField
      name={ProductFormNames.AvailabilityText}
      label="Availability text"
      layout="vertical"
      placeholder="Usually ships in 24 hours."
      className="max-w-none"
      labelEndComponent={
        <HelpTooltip content="A few words telling the customer how long it normally takes to ship this product." />
      }
    />
    <div className="grid grid-cols-1 items-end gap-x-8 gap-y-5 xl:grid-cols-2">
      <InputField
        name={ProductFormNames.Condition}
        label="Condition"
        layout="vertical"
        Component={SelectField}
        options={ProductConditionOptions}
        className="max-w-none"
        labelEndComponent={
          <HelpTooltip content="The condition of a product is often used by marketing feeds such as Google Shopping." />
        }
      />
      <InputField
        name={ProductFormNames.ShowCondition}
        Component={CheckboxField}
        text="Show condition on storefront"
        layout="vertical"
        containerClassName="pb-3"
      />
    </div>
  </SettingsCard>
);

export default ProductStorefrontSection;

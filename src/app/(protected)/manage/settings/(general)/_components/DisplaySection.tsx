import CheckboxField from "@/components/form/fields/CheckboxField";
import RadioGroupField from "@/components/form/fields/RadioGroupField";
import SelectField from "@/components/form/fields/SelectField";
import InputField from "@/components/form/InputField";
import {
  breadcrumbOptions,
  categoryProductListOptions,
  categorySortOptions,
  controlPanelCheckboxes,
  DisplayField,
  GeneralSection,
  priceDisplayOptions,
  productDisplayCheckboxes,
  storefrontDisplayCheckboxes,
} from "../constant";
import { fieldPath } from "../utils";
import CheckboxSettingsList from "./CheckboxSettingsList";
import InlineFieldRow from "./InlineFieldRow";
import SettingsCard from "../../_components/SettingsCard";
import { CircleHelp } from "lucide-react";

const section = GeneralSection.Display;
const name = (field: DisplayField) => fieldPath(section, field);

const DisplaySection = () => (
  <div className="flex flex-col gap-8">
    <SettingsCard title="Display Settings">
      <InputField
        name={name(DisplayField.ProductBreadcrumbs)}
        label="Product Breadcrumbs"
        Component={SelectField}
        options={breadcrumbOptions}
        controlClassName="max-w-md"
        afterFieldComponent={
          <CircleHelp className="w-6 h-6 text-muted-foreground" />
        }
      />
      <CheckboxSettingsList
        section={section}
        items={storefrontDisplayCheckboxes}
      />
    </SettingsCard>

    <SettingsCard title="Control Panel">
      <CheckboxSettingsList section={section} items={controlPanelCheckboxes} />
    </SettingsCard>

    <SettingsCard title="Category Settings">
      <InputField
        name={name(DisplayField.CategoryProductList)}
        label="Category Product List"
        Component={RadioGroupField}
        options={categoryProductListOptions}
      />
      <InputField
        name={name(DisplayField.DefaultProductSort)}
        label="Default Product Sort"
        Component={SelectField}
        options={categorySortOptions}
        controlClassName="max-w-md"
        afterFieldComponent={
          <CircleHelp className="w-6 h-6 text-muted-foreground" />
        }
      />
      <InlineFieldRow label="Menu Display Depth" className="items-center">
        <InputField
          name={name(DisplayField.MenuDisplayDepth)}
          type="number"
          min={1}
          layout="vertical"
          className="w-24"
        />
        <span className="text-[1.4rem]! text-gray-700!">levels deep</span>
      </InlineFieldRow>
    </SettingsCard>

    <SettingsCard title="Product Settings">
      <InputField
        name={name(DisplayField.ShowProductPrice)}
        label="Show Product's Price?"
        Component={CheckboxField}
        text="Yes, show the product's price in my store"
      />
      <InputField
        name={name(DisplayField.DetailPageDefaultPrice)}
        label="Price on the product details page when selections don't map to a price"
        Component={SelectField}
        options={priceDisplayOptions}
        controlClassName="max-w-sm"
        afterFieldComponent={
          <span className="text-blue-600 text-sm cursor-pointer whitespace-nowrap">
            Learn more
          </span>
        }
      />
      <InputField
        name={name(DisplayField.ListPageDefaultPrice)}
        label="Price on the product list page when unselected options don't map to a price"
        Component={SelectField}
        options={priceDisplayOptions}
        controlClassName="max-w-sm"
        afterFieldComponent={
          <span className="text-blue-600 text-sm cursor-pointer whitespace-nowrap">
            Learn more
          </span>
        }
      />
      <CheckboxSettingsList
        section={section}
        items={productDisplayCheckboxes}
      />
      <InputField
        name={name(DisplayField.DefaultPreOrderMessage)}
        label="Default Pre-Order Message"
         controlClassName="max-w-md"
         afterFieldComponent={
          <CircleHelp className="w-6 h-6 text-muted-foreground" />
        }
      />
    </SettingsCard>
  </div>
);

export default DisplaySection;

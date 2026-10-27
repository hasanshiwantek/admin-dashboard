import CategoryTreeSm from "@/app/components/products/add/CategoryTreeSm";
import CheckboxField from "@/components/form/fields/CheckboxField";
import DateTimeField from "@/components/form/fields/DateTimeField";
import RadioGroupField from "@/components/form/fields/RadioGroupField";
import SelectField from "@/components/form/fields/SelectField";
import InputField from "@/components/form/InputField";
import RichTextEditor from "@/components/ui/RichTextEditor";
import {
  BannerLocation,
  BannerLocationOptions,
  BannerPlacementOptions,
} from "../constant";
import {
  BannerDateType,
  BannerDateTypeOptions,
  BannerFormNames,
} from "../[id]/constant";
import { BannerFormFieldsProps } from "./type";

const BannerFormFields = ({
  locationType,
  dateType,
  brandOptions,
  onLocationTypeChange,
  onDateTypeChange,
}: BannerFormFieldsProps) => (
  <>
    <InputField name={BannerFormNames.Title} label="Name" required />

    <InputField
      name={BannerFormNames.Content}
      label="Content"
      Component={RichTextEditor}
      controlClassName="max-w-7xl"
    />

    <InputField
      name={BannerFormNames.LocationType}
      label="Location"
      required
      Component={RadioGroupField}
      options={BannerLocationOptions}
      getValueOnChange={onLocationTypeChange}
    />

    {locationType === BannerLocation.Category && (
      <InputField
        name={BannerFormNames.LocationId}
        label="Category"
        required
        Component={CategoryTreeSm}
        single
        containerClassName="max-w-5xl"
      />
    )}

    {locationType === BannerLocation.Brand && (
      <InputField
        name={BannerFormNames.LocationId}
        label="Brand"
        required
        Component={SelectField}
        options={brandOptions}
        placeholder="-- Choose a brand --"
      />
    )}

    <InputField
      name={BannerFormNames.DateType}
      label="Date range"
      Component={RadioGroupField}
      options={BannerDateTypeOptions}
      getValueOnChange={onDateTypeChange}
    />

    {dateType === BannerDateType.Range && (
      <div className="flex flex-col gap-3 -mt-4">
        <InputField
          name={BannerFormNames.StartDate}
          Component={DateTimeField}
          label="From"
          controlClassName="pl-10"
        />
        <InputField
          name={BannerFormNames.EndDate}
          Component={DateTimeField}
          label="Through"
          controlClassName="pl-10"
        />
      </div>
    )}

    <InputField
      name={BannerFormNames.Visible}
      label="Visible"
      Component={CheckboxField}
      text="Yes, this banner should be visible on my web site"
    />

    <InputField
      name={BannerFormNames.Placement}
      label="Placement"
      required
      Component={SelectField}
      options={BannerPlacementOptions}
      placeholder="-- Choose a location --"
    />
  </>
);

export default BannerFormFields;

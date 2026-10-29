import CheckboxField from "@/components/form/fields/CheckboxField";
import CheckboxListField from "@/components/form/fields/CheckboxListField";
import RadioGroupField from "@/components/form/fields/RadioGroupField";
import { SelectField } from "@/components/form/fields/SelectField";
import InputField from "@/components/form/InputField";
import HelpTooltip from "@/components/HelpTooltip/HelpTooltip";
import SectionCard from "@/components/SectionCard/SectionCard";
import { countryOptions } from "../../../../locations/constant";
import {
  customerGroupOptions,
  TaxZoneAppliesTo,
  taxZoneAppliesToOptions,
  TaxZoneBasedOn,
  taxZoneBasedOnOptions,
  taxPriceDisplayOptions,
  TaxZoneSettingsFormNames,
} from "../constant";
import { TaxZoneSettingsFieldsProps } from "./type";

const LABEL = "font-semibold! text-text-heading";
const CARD = "border-0 shadow-sm p-12! gap-8";
const RADIOS = "gap-3";
const RADIO_OPTION = "gap-4 text-[1.4rem]! text-muted-plum-gray";
const CHECK = "text-[1.4rem]! text-muted-plum-gray";
const LIST = "h-[17rem] max-w-[40rem]";
const NARROW = "max-w-[40rem]";

const TaxZoneSettingsFields = ({
  basedOn,
  appliesTo,
  subdivisionOptions,
}: TaxZoneSettingsFieldsProps) => (
  <>
    <SectionCard className={CARD}>
      <InputField
        name={TaxZoneSettingsFormNames.Name}
        label="Tax zone name"
        layout="vertical"
        labelClassName={LABEL}
        controlClassName="max-w-[57rem]"
        afterFieldComponent={
          <HelpTooltip
            content="Only you see this name; customers never do."
            iconClassName="fill-muted-plum-gray"
          />
        }
      />

      <InputField
        name={TaxZoneSettingsFormNames.BasedOn}
        label="This tax zone is based on one or more"
        layout="vertical"
        labelClassName={LABEL}
        Component={RadioGroupField}
        options={taxZoneBasedOnOptions}
        className={RADIOS}
        optionClassName={RADIO_OPTION}
      />

      {basedOn === TaxZoneBasedOn.Countries && (
        <InputField
          name={TaxZoneSettingsFormNames.Countries}
          label="Countries"
          layout="vertical"
          Component={CheckboxListField}
          options={countryOptions}
          className={LIST}
        />
      )}

      {basedOn === TaxZoneBasedOn.Subdivisions && (
        <>
          <InputField
            name={TaxZoneSettingsFormNames.SubdivisionCountry}
            label="Country"
            layout="vertical"
            Component={CheckboxListField}
            options={countryOptions}
            className={LIST}
          />
          <InputField
            name={TaxZoneSettingsFormNames.Subdivisions}
            label="Subdivisions"
            layout="vertical"
            Component={CheckboxListField}
            options={subdivisionOptions}
            className={LIST}
          />
        </>
      )}

      {basedOn === TaxZoneBasedOn.PostalCodes && (
        <>
          <InputField
            name={TaxZoneSettingsFormNames.PostalCodeCountry}
            label="Country"
            layout="vertical"
            Component={SelectField}
            options={countryOptions}
            className={NARROW}
          />
          <InputField
            name={TaxZoneSettingsFormNames.PostalCodes}
            label="Postal codes"
            layout="vertical"
            hint="One per line or separated by commas."
            hintPosition="top"
            isTextArea
            className={`min-h-[12rem] ${NARROW}`}
          />
        </>
      )}

      <InputField
        name={TaxZoneSettingsFormNames.AppliesTo}
        label="Tax zone applies to"
        layout="vertical"
        labelClassName={LABEL}
        Component={RadioGroupField}
        options={taxZoneAppliesToOptions}
        className={RADIOS}
        optionClassName={RADIO_OPTION}
      />

      {appliesTo === TaxZoneAppliesTo.Groups && (
        <InputField
          name={TaxZoneSettingsFormNames.CustomerGroups}
          label="Customer groups"
          layout="vertical"
          Component={CheckboxListField}
          options={customerGroupOptions}
          className={`h-[10rem] ${NARROW}`}
        />
      )}

      <InputField
        name={TaxZoneSettingsFormNames.IsEnabled}
        Component={CheckboxField}
        text="Enable this tax zone"
        layout="vertical"
        className={CHECK}
      />
    </SectionCard>

    <SectionCard className={CARD}>
      <InputField
        name={TaxZoneSettingsFormNames.PriceDisplay}
        label="How are prices displayed on your storefront"
        layout="vertical"
        labelClassName={LABEL}
        Component={RadioGroupField}
        options={taxPriceDisplayOptions}
        className={RADIOS}
        optionClassName={RADIO_OPTION}
      />

      <div className="flex flex-col gap-2">
        <p className={`text-[1.4rem]! ${LABEL}`}>
          Show prices both including and excluding tax
        </p>
        <InputField
          name={TaxZoneSettingsFormNames.ShowBothOnListing}
          Component={CheckboxField}
          text="Product listing page"
          layout="vertical"
          className={CHECK}
        />
        <InputField
          name={TaxZoneSettingsFormNames.ShowBothOnDetail}
          Component={CheckboxField}
          text="Product detail page"
          layout="vertical"
          className={CHECK}
        />
      </div>
    </SectionCard>
  </>
);

export default TaxZoneSettingsFields;

import { SelectField } from "@/components/form/fields/SelectField";
import InputField from "@/components/form/InputField";
import SettingsCard from "@/components/SettingsCard/SettingsCard";
import {
  CurrencyFormNames,
  decimalPlacesOptions,
  LABEL_CLASS,
  symbolLocationOptions,
} from "../constant";
import { CurrencyDisplaySettingsSectionProps } from "./type";

const CurrencyDisplaySettingsSection = ({
  preview,
}: CurrencyDisplaySettingsSectionProps) => (
  <SettingsCard
    title="Display settings"
    description="Customize how your currency displays."
    className="border-0 shadow-sm"
  >
    <p className="text-[2.8rem]! font-light text-text-heading!">{preview}</p>
    <div className="grid max-w-[65rem] grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2">
      <InputField
        name={CurrencyFormNames.Symbol}
        label="Symbol"
        layout="vertical"
        className="max-w-none"
        labelClassName={LABEL_CLASS}
      />
      <InputField
        name={CurrencyFormNames.SymbolLocation}
        label="Symbol Location"
        layout="vertical"
        Component={SelectField}
        options={symbolLocationOptions}
        className="max-w-none"
        labelClassName={LABEL_CLASS}
      />
      <InputField
        name={CurrencyFormNames.DecimalToken}
        label="Decimal token"
        layout="vertical"
        maxLength={1}
        className="max-w-none"
        labelClassName={LABEL_CLASS}
      />
      <InputField
        name={CurrencyFormNames.ThousandsToken}
        label="Thousands token"
        layout="vertical"
        maxLength={1}
        className="max-w-none"
        labelClassName={LABEL_CLASS}
      />
      <InputField
        name={CurrencyFormNames.DecimalPlaces}
        label="Decimal places"
        layout="vertical"
        Component={SelectField}
        options={decimalPlacesOptions}
        className="max-w-none"
        labelClassName={LABEL_CLASS}
      />
    </div>
  </SettingsCard>
);

export default CurrencyDisplaySettingsSection;

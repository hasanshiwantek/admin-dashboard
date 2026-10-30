import { SelectField } from "@/components/form/fields/SelectField";
import InputField from "@/components/form/InputField";
import SectionCard from "@/components/SectionCard/SectionCard";
import { CurrencyFormNames, FIELD_WIDTH, LABEL_CLASS } from "../constant";
import { CurrencyDisplaySectionProps } from "./type";

const CurrencyDisplaySection = ({
  code,
  countries,
}: CurrencyDisplaySectionProps) => (
  <SectionCard
    title="Currency display configurations"
    description="Configure how the currency is presented to your customers."
    className="border-0 shadow-sm"
  >
    <InputField
      name={CurrencyFormNames.Name}
      label="Display name"
      layout="vertical"
      className={FIELD_WIDTH}
      labelClassName={LABEL_CLASS}
    />
    <InputField
      name={CurrencyFormNames.DefaultForCountries}
      label={
        <>
          Default to {code} in these countries{" "}
          <span className="font-normal text-gray-500">(optional)</span>
        </>
      }
      layout="vertical"
      Component={SelectField}
      multi
      options={countries}
      valueKey="code"
      labelKey="name"
      placeholder="Choose country"
      className={FIELD_WIDTH}
      labelClassName={LABEL_CLASS}
    />
  </SectionCard>
);

export default CurrencyDisplaySection;

import { SelectField } from "@/components/form/fields/SelectField";
import InputField from "@/components/form/InputField";
import { availableCountryOptions, OfflinePaymentFormNames } from "../constant";
import { OfflinePaymentFormFieldsProps } from "./type";

const OfflinePaymentFormFields = ({ method }: OfflinePaymentFormFieldsProps) => (
  <>
    <h3 className="mb-10 text-[2rem]! font-normal text-text-heading!">
      {method.name}
    </h3>

    <InputField
      name={OfflinePaymentFormNames.DisplayName}
      label={method.displayNameLabel}
      required
      hideColon
      layout="vertical"
      hint={method.displayNameHint}
      hintPosition="top"
      controlClassName="max-w-[46rem]"
      containerClassName="mb-8"
    />

    <InputField
      name={OfflinePaymentFormNames.AvailableCountries}
      label={method.countriesLabel}
      required
      hideColon
      layout="vertical"
      hint={method.countriesHint}
      hintPosition="top"
      Component={SelectField}
      multi
      options={availableCountryOptions}
      placeholder="Choose countries"
      controlClassName="max-w-[46rem]"
      containerClassName="mb-8"
    />

    <InputField
      name={OfflinePaymentFormNames.Instructions}
      label={method.instructionsLabel}
      required
      hideColon
      layout="vertical"
      hint={method.instructionsHint}
      hintPosition="top"
      isTextArea
      className="min-h-[18rem] max-w-[46rem]"
    />
  </>
);

export default OfflinePaymentFormFields;

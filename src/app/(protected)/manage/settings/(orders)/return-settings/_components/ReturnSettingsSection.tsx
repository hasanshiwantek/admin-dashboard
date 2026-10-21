import CheckboxField from "@/components/form/fields/CheckboxField";
import InputField from "@/components/form/InputField";
import SettingsCard from "../../../_components/SettingsCard";
import { ReturnSettingsFormNames } from "../constant";

const ReturnSettingsSection = () => (
  <SettingsCard title="Returns Settings">
    <InputField
      name={ReturnSettingsFormNames.EnableReturns}
      label="Enable Returns System?"
      hideColon
      Component={CheckboxField}
      text="Yes, enable returns requests"
      containerClassName="items-center!"
    />
  </SettingsCard>
);

export default ReturnSettingsSection;

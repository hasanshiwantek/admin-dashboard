import CheckboxField from "@/components/form/fields/CheckboxField";
import InputField from "@/components/form/InputField";
import SectionCard from "@/components/SectionCard/SectionCard";
import { ReturnSettingsFormNames } from "../constant";

const ReturnSettingsSection = () => (
  <SectionCard title="Returns Settings">
    <InputField
      name={ReturnSettingsFormNames.EnableReturns}
      label="Enable Returns System?"
      Component={CheckboxField}
      text="Yes, enable returns requests"
      containerClassName="items-center!"
    />
  </SectionCard>
);

export default ReturnSettingsSection;

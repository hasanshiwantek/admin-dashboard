import RadioGroupField from "@/components/form/fields/RadioGroupField";
import InputField from "@/components/form/InputField";
import SettingsCard from "../../../_components/SettingsCard";
import { CommentSettingsFormNames, commentSystemOptions } from "../constant";

const GeneralSettingsSection = () => (
  <SettingsCard title="Choose a comment system">
    <InputField
      name={CommentSettingsFormNames.CommentSystem}
      label="I want to use"
      Component={RadioGroupField}
      options={commentSystemOptions}
      className="h-[19rem] max-w-[42rem] content-start gap-0 rounded-sm border border-gray-300 bg-white p-3"
      optionClassName="gap-4 text-[1.4rem]! text-gray-800"
    />
  </SettingsCard>
);

export default GeneralSettingsSection;

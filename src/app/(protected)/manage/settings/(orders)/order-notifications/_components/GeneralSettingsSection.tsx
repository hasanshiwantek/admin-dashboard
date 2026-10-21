import CheckboxListField from "@/components/form/fields/CheckboxListField";
import InputField from "@/components/form/InputField";
import SettingsCard from "../../../_components/SettingsCard";
import {
  customerEmailStatusOptions,
  notificationMethodOptions,
  OrderNotificationFormNames,
} from "../constant";

const GeneralSettingsSection = () => (
  <SettingsCard title="Notification Settings">
    <InputField
      name={OrderNotificationFormNames.Methods}
      label="Notification Methods"
      Component={CheckboxListField}
      options={notificationMethodOptions}
      className="h-[17rem]"
    />
    <InputField
      name={OrderNotificationFormNames.CustomerEmailStatuses}
      label="Email customers when"
      Component={CheckboxListField}
      options={customerEmailStatusOptions}
      className="h-[17rem]"
    />
  </SettingsCard>
);

export default GeneralSettingsSection;

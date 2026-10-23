import CheckboxListField from "@/components/form/fields/CheckboxListField";
import InputField from "@/components/form/InputField";
import SettingsCard from "../../../_components/SettingsCard";
import {
  customerEmailStatusOptions,
  notificationMethodOptions,
  OrderNotificationFormNames,
} from "../constant";
import { CircleHelp } from "lucide-react";

const GeneralSettingsSection = () => (
  <SettingsCard title="Notification Settings">
    <InputField
      name={OrderNotificationFormNames.Methods}
      label="Notification Methods"
      Component={CheckboxListField}
      options={notificationMethodOptions}
      className="h-[17rem]"
      showColon={true}
        afterFieldComponent={
    <CircleHelp className="size-5 shrink-0 text-muted-foreground" />
  }
  controlClassName="max-w-2xl!"

    />
   <InputField
  name={OrderNotificationFormNames.CustomerEmailStatuses}
  label="Email customers when"
  Component={CheckboxListField}
  options={customerEmailStatusOptions}
  className="h-[17rem]"
  showColon={true}
  afterFieldComponent={
    <CircleHelp className="size-5 shrink-0 text-muted-foreground" />
  }
  controlClassName="max-w-2xl!"
 
/>
  </SettingsCard>
);

export default GeneralSettingsSection;

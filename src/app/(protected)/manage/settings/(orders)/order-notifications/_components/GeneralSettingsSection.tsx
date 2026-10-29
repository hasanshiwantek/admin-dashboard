import CheckboxListField from "@/components/form/fields/CheckboxListField";
import InputField from "@/components/form/InputField";
import SectionCard from "@/components/SectionCard/SectionCard";
import {
  customerEmailStatusOptions,
  notificationMethodOptions,
  OrderNotificationFormNames,
} from "../constant";

import HelpTooltip from "@/components/HelpTooltip/HelpTooltip";

const GeneralSettingsSection = () => (
  <SectionCard title="Notification Settings">
    <InputField
      name={OrderNotificationFormNames.Methods}
      label="Notification Methods"
      Component={CheckboxListField}
      options={notificationMethodOptions}
      className="h-[17rem]"
      showColon={true}
      afterFieldComponent={
        <HelpTooltip
          side="right"
          content={
            <div className="flex flex-col gap-1">
              <strong>Notification Methods</strong>
              <p>
                Choose a list of notification methods to trigger when your store
                receives a new order. You can choose multiple notification
                methods if required.
              </p>
              <p>When you click</p>
            </div>
          }
          iconClassName="fill-muted-plum-gray"
        />
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
        <HelpTooltip
          side="right"
          content={
            <div className="flex flex-col gap-1">
              <strong>Email customers when</strong>
              <p>
                When changing the status of an order an email can be sent to the
                customer automatically to notify him/her of the change. Choose
                which statuses you
              </p>
            </div>
          }
          iconClassName="fill-muted-plum-gray"
        />
      }
      controlClassName="max-w-2xl!"
    />
  </SectionCard>
);

export default GeneralSettingsSection;

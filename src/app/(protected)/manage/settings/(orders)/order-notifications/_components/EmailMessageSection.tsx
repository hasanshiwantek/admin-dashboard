import InputField from "@/components/form/InputField";
import { Button } from "@/components/ui/button";
import SettingsCard from "../../../_components/SettingsCard";
import { OrderNotificationFormNames } from "../constant";
import { EmailMessageSectionProps } from "./type";

const EmailMessageSection = ({
  testing,
  onTestNotification,
}: EmailMessageSectionProps) => (
  <div className="flex flex-col gap-6">
    <p className="text-[1.4rem]! text-gray-700!">
      To receive an email notification when an order is placed from your
      store, simply enter your email address into the form below.
    </p>
    <SettingsCard title="Email Message Settings">
      <InputField
        name={OrderNotificationFormNames.EmailAddress}
        label="Email Address"
        type="email"
        required
        controlClassName="max-w-[30rem]"
        hint="New order notifications are sent to this address."
      />
      <div className="grid grid-cols-[14rem_1fr] gap-x-8 2xl:grid-cols-[18rem_1fr]">
        <span />
        <Button
          type="button"
          variant="link"
          className="h-auto justify-self-start p-0 text-[1.4rem] text-link"
          disabled={testing}
          onClick={onTestNotification}
        >
          {testing ? "Sending test..." : "Test Notification Method"}
        </Button>
      </div>
    </SettingsCard>
  </div>
);

export default EmailMessageSection;

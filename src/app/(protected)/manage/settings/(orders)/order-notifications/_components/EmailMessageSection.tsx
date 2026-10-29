import InputField from "@/components/form/InputField";
import { Button } from "@/components/ui/Button";
import SectionCard from "@/components/SectionCard/SectionCard";
import { OrderNotificationFormNames } from "../constant";
import { EmailMessageSectionProps } from "./type";
import HelpTooltip from "@/components/HelpTooltip/HelpTooltip";

const EmailMessageSection = ({
  testing,
  onTestNotification,
}: EmailMessageSectionProps) => (
  <div className="flex flex-col gap-6">
    <p className="text-[1.4rem]! text-gray-700!">
      To receive an email notification when an order is placed from your store,
      simply enter your email address into the form below.
    </p>
    <SectionCard title="Email Message Settings">
      <InputField
        name={OrderNotificationFormNames.EmailAddress}
        label="Email Address"
        type="email"
        required
        controlClassName="max-w-[30rem]"
        hint="New order notifications are sent to this address."
        afterFieldComponent={
          <HelpTooltip
            side="right"
            content={
              <div className="flex flex-col gap-1">
                <strong>Email Address</strong>
                <p>
                  To which email address do you want the order notification to
                  be sent? You can enter multiple email addresses as long as
                  they are separated by a comma, such as:
                </p>
                <p>
                  <strong>john@site.com,mike@site.com</strong>
                </p>
              </div>
            }
            iconClassName="fill-muted-plum-gray"
          />
        }
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
    </SectionCard>
  </div>
);

export default EmailMessageSection;

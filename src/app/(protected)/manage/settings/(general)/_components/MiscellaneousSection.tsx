"use client";

import CheckboxField from "@/components/form/fields/CheckboxField";
import RadioGroupField from "@/components/form/fields/RadioGroupField";
import SelectField from "@/components/form/fields/SelectField";
import { useFormContext } from "@/components/form/Form";
import InputField from "@/components/form/InputField";
import Link from "next/link";
import { useWatch } from "react-hook-form";
import {
  GeneralSection,
  MiscellaneousField,
  smtpOptions,
  timeUnitOptions,
} from "../constant";
import { fieldPath } from "../utils";
import InlineFieldRow from "./InlineFieldRow";
import SettingsCard from "../../_components/SettingsCard";
import SettingsNotice from "../../_components/SettingsNotice";
import { CircleHelp } from "lucide-react";
import HelpTooltip from "@/components/HelpTooltip/HelpTooltip";

const TRANSACTIONAL_EMAILS_ROUTE = "/manage/marketing/transactional-emails";
const HINT_CLASS = "pt-3 text-[1.4rem]! text-gray-700!";

const name = (field: MiscellaneousField) =>
  fieldPath(GeneralSection.Miscellaneous, field);

const MiscellaneousSection = () => {
  const { control } = useFormContext();
  const abandonedCartEmails = useWatch({
    control,
    name: name(MiscellaneousField.EnableAbandonedCartEmails),
  });
  const throttlerEnabled = useWatch({
    control,
    name: name(MiscellaneousField.EnableThrottler),
  });

  return (
    <div className="flex flex-col gap-8">
      <SettingsCard title="Email Settings">
        <InlineFieldRow label="Product Review Emails">
          <p className="w-full text-[1.4rem]! text-gray-700!">
            Send emails to customers asking them to review products they have
            purchased (preview and control these emails in{" "}
            <Link
              href={TRANSACTIONAL_EMAILS_ROUTE}
              className="text-link hover:underline"
            >
              Marketing - Transactional emails
            </Link>
            )
          </p>
          <InputField
            name={name(MiscellaneousField.ReviewEmailDays)}
            type="number"
            min={0}
            layout="vertical"
            className="w-24"
          />
          <span className={HINT_CLASS}>
            days after the order is marked as Shipped or Completed
          </span>
        </InlineFieldRow>
        <InputField
          name={name(MiscellaneousField.SendReviewEmailToGuests)}
          Component={CheckboxField}
          text="Yes, send product review emails to guest customers"
        />

        <InputField
          name={name(MiscellaneousField.ForwardOrderInvoices)}
          label="Forward Order Invoices"
          Component={CheckboxField}
          text="Yes, forward order invoice emails to"
        />
        <InputField
          name={name(MiscellaneousField.InvoiceEmailRecipient)}
          placeholder="sales@example.com, info@example.com"
          hint="Type the email addresses, separated by commas."
          controlClassName="max-w-md"
        />

        <InputField
          name={name(MiscellaneousField.SmtpServerOption)}
          label="Use SMTP Server"
          Component={RadioGroupField}
          options={smtpOptions}
        />
        <InputField
          name={name(MiscellaneousField.AdministratorEmail)}
          label="Administrator's Email"
          type="email"
          placeholder="info@example.com"
          controlClassName="max-w-md"
          afterFieldComponent={
            <HelpTooltip
              side="right"
              content={
                <div className="flex flex-col gap-1">
                  <p>
                    The email address where all system notifications should be
                    sent to.
                  </p>
                </div>
              }
              iconClassName="fill-muted-plum-gray"
            />
          }
        />
        <InputField
          name={name(MiscellaneousField.RequireMarketingConsent)}
          label="Require Consent"
          Component={CheckboxField}
          text="Yes, require customers to give consent to receive marketing emails (GDPR recommended)"
        />

        <InputField
          name={name(MiscellaneousField.EnableAbandonedCartEmails)}
          label="Abandoned Cart Emails"
          Component={CheckboxField}
          text="Email me when a shopper abandons their cart and leaves my store"
        />
        {abandonedCartEmails && (
          <>
            <InlineFieldRow>
              <span className={HINT_CLASS}>Email me after</span>
              <InputField
                name={name(MiscellaneousField.AbandonedCartThreshold)}
                type="number"
                min={1}
                layout="vertical"
                className="w-24"
              />
              <span className={HINT_CLASS}>carts are abandoned</span>
            </InlineFieldRow>
            <InputField
              name={name(MiscellaneousField.EmailEveryAbandonedCart)}
              Component={CheckboxField}
              text="Email me every time a cart is abandoned"
            />
            <InputField
              name={name(MiscellaneousField.StopEmailOnCompleteOrder)}
              Component={CheckboxField}
              text='Stop sending when the shopper clicks the "Complete Order" link in the email'
            />
          </>
        )}

        <InputField
          name={name(MiscellaneousField.EnableConvertedCartEmails)}
          label="Converted Cart Emails"
          Component={CheckboxField}
          text="Email me when an abandoned cart is saved and results in an order"
        />
        <InputField
          name={name(MiscellaneousField.ConvertedCartRecipient)}
          label="Send Emails To (Optional)"
          type="email"
          placeholder="info@example.com"
          controlClassName="max-w-md"
          afterFieldComponent={
            <HelpTooltip
              side="right"
              content={
                <div className="flex flex-col gap-1">
                  <p>
                    Who should these abandoned and converted emails be sent to?
                    Enter a single email address here.
                  </p>
                </div>
              }
              iconClassName="fill-muted-plum-gray"
            />
          }
        />
      </SettingsCard>

      <SettingsCard title="Advanced Store Settings">
        <InputField
          name={name(MiscellaneousField.AllowPurchasing)}
          label="Allow Purchasing?"
          Component={CheckboxField}
          text="Yes, allow people to purchase from my store"
        />
      </SettingsCard>

      <SettingsCard title="Order Settings">
        <SettingsNotice tone="warning">
          Once your store starts receiving orders this number can only ever be
          increased.
        </SettingsNotice>
        <InputField
          name={name(MiscellaneousField.StartingOrderNumber)}
          label="Starting Order Number (Optional)"
          type="number"
          min={1}
          controlClassName="max-w-xs"
          afterFieldComponent={
            <HelpTooltip
              side="right"
              content={
                <div className="flex flex-col gap-1">
                  <p>
                    Set the order number that the next order placed in your
                    store will receive.
                  </p>
                </div>
              }
              iconClassName="fill-muted-plum-gray"
            />
          }
        />
      </SettingsCard>

      <SettingsCard title="Throttler">
        <InputField
          name={name(MiscellaneousField.EnableThrottler)}
          label="Enable Throttler"
          Component={CheckboxField}
          text="Yes, turn on throttler in my store"
        />
        {throttlerEnabled && (
          <InlineFieldRow label="Allow (Optional)">
            <InputField
              name={name(MiscellaneousField.ThrottleReviewsPerPeriod)}
              type="number"
              min={1}
              placeholder="1"
              layout="vertical"
              className="w-24"
            />
            <span className={HINT_CLASS}>reviews to be posted every</span>
            <InputField
              name={name(MiscellaneousField.ThrottlePeriodValue)}
              type="number"
              min={1}
              placeholder="30"
              layout="vertical"
              className="w-24"
            />
            <InputField
              name={name(MiscellaneousField.ThrottlePeriodUnit)}
              layout="vertical"
              Component={SelectField}
              options={timeUnitOptions}
              className="w-32"
            />
          </InlineFieldRow>
        )}
      </SettingsCard>
    </div>
  );
};

export default MiscellaneousSection;

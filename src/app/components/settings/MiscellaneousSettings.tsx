"use client";

import { useWatch } from "react-hook-form";
import { Control } from "react-hook-form";
import InputField from "@/components/form/InputField";
import CheckboxField from "@/components/form/fields/CheckboxField";
import RadioGroupField from "@/components/form/fields/RadioGroupField";
import SelectField from "@/components/form/fields/SelectField";
import { Info } from "lucide-react";
import {
  MiscellaneousField,
  PERIOD_UNIT_OPTIONS,
  SMTP_OPTIONS,
} from "./constant";
import PageTitle from "@/components/ui/PageTitle";
import { useFormContext } from "@/components/form/Form";

export const MiscellaneousSettings = () => {
  const { control } = useFormContext();

  const enableAbandoned = useWatch({
    control,
    name: MiscellaneousField.EnableAbandonedCartEmails,
  });

  const enableThrottler = useWatch({
    control,
    name: MiscellaneousField.EnableThrottler,
  });

  return (
    <div className="space-y-8">
      {/* Email Settings */}
      <div className="bg-white rounded-sm border border-gray-200 p-6">
        <PageTitle title={"Email Settings"} hideActionButton />

        <div className="flex flex-col lg:flex-row items-start gap-4 py-3">
          <div className="w-full lg:w-72 text-right pr-4 pt-2 2xl:!text-2xl">
            Product Review Emails
          </div>
          <div className="flex-1 flex flex-col gap-2">
            <p className="text-sm text-gray-700 2xl:!text-2xl">
              Send emails to customers asking them to review products they have
              purchased (preview and control status of these emails in{" "}
              <a href="#" className="text-blue-600 hover:underline">
                Marketing - Transactional emails
              </a>
              )
            </p>
          </div>
        </div>
        <div className="flex flex-col lg:flex-row items-start lg:items-center gap-2">
          <InputField
            name={MiscellaneousField.ReviewEmailDays}
            control={control}
            type="number"
            className="w-20"
          />
          <span className="text-sm text-gray-700">
            days after the order is marked as Shipped or Completed
          </span>
        </div>
        <InputField
          name={MiscellaneousField.SendReviewEmailToGuests}
          control={control}
          Component={CheckboxField}
          text="Yes, send product review emails to guest customers"
          className="mt-2"
        />
        <InputField
          name={MiscellaneousField.ForwardOrderInvoices}
          label="Forward Order Invoices"
          control={control}
          Component={CheckboxField}
          text="Yes, forward order invoice emails to"
          className="w-full "
        />

        <div className="flex flex-col lg:flex-row items-start lg:items-center gap-4">
          <InputField
            name={MiscellaneousField.InvoiceEmailRecipient}
            control={control}
            placeholder="sales@ctspoint.com, info@ctspoint.cc"
            className="w-64"
          />
          <span className="text-sm text-gray-700 2xl:!text-2xl">
            Type the email addresses, separated by commas.
          </span>
        </div>

        <InputField
          name={MiscellaneousField.SmtpServerOption}
          label="Use SMTP Server"
          control={control}
          Component={RadioGroupField}
          options={SMTP_OPTIONS}
          className="w-full "
        />

        <InputField
          name={MiscellaneousField.AdministratorEmail}
          label="Administrator's Email"
          control={control}
          placeholder="info@ctspoint.com"
          className="w-64"
        />

        <InputField
          name={MiscellaneousField.RequireMarketingConsent}
          label="Require Consent"
          control={control}
          Component={CheckboxField}
          text="Yes, require customers to give consent to receive marketing emails (GDPR recommended)"
          className="w-full "
        />

        <InputField
          name={MiscellaneousField.EnableAbandonedCartEmails}
          label="Abandoned Cart Emails"
          control={control}
          Component={CheckboxField}
          text="Email me when a shopper abandons their cart and leaves my store"
          className="w-full "
        />

        {enableAbandoned && (
          <div className=" space-y-2">
            <div className="flex flex-col lg:flex-row items-start lg:items-center gap-2">
              <InputField
                name={MiscellaneousField.AbandonedCartThreshold}
                control={control}
                type="number"
                className="w-20"
              />
              <span className="text-sm text-gray-700 2xl:!text-2xl">
                carts are abandoned
              </span>
            </div>
            <InputField
              name={MiscellaneousField.EmailEveryAbandonedCart}
              control={control}
              Component={CheckboxField}
              text="Email me every time a cart is abandoned"
            />
            <InputField
              name={MiscellaneousField.StopEmailOnCompleteOrder}
              control={control}
              Component={CheckboxField}
              text='Stop sending when the shopper clicks the "Complete Order" link in the email'
            />
          </div>
        )}

        <InputField
          name={MiscellaneousField.EnableConvertedCartEmails}
          label="Converted Cart Emails"
          control={control}
          Component={CheckboxField}
          text="Email me when an abandoned cart is saved and results in an order"
          className="w-full "
        />

        <InputField
          name={MiscellaneousField.ConvertedCartRecipient}
          label="Send Emails To (Optional)"
          control={control}
          placeholder="info@ctspoint.com"
          className="w-64"
        />
      </div>

      {/* Advanced Store Settings */}
      <div className="bg-white rounded-sm border border-gray-200 p-6">
        <PageTitle title={"Advanced Store Settings"} hideActionButton />

        <InputField
          name={MiscellaneousField.AllowPurchasing}
          label="Allow Purchasing?"
          control={control}
          Component={CheckboxField}
          text="Yes, allow people to purchase from my store"
          className="w-full "
        />
      </div>

      {/* Order Settings */}
      <div className="bg-white rounded-sm border border-gray-200 p-6">
        <PageTitle title={"Order Settings"} hideActionButton />

        <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 mb-4">
          <p className="text-sm text-gray-700 2xl:!text-2xl">
            Once your store starts receiving orders this number can only ever be
            increased.
          </p>
        </div>
        <InputField
          name={MiscellaneousField.StartingOrderNumber}
          label="Starting Order Number (Optional)"
          control={control}
          type="number"
          className="w-32"
        />
      </div>

      {/* Throttler */}
      <div className="bg-white rounded-sm border border-gray-200 p-6">
        <PageTitle title={"Throttler"} hideActionButton />
        <InputField
          name={MiscellaneousField.EnableThrottler}
          label="Enable Throttler"
          control={control}
          Component={CheckboxField}
          text="Yes, turn on throttler in my store"
          className="w-full "
        />

        {enableThrottler && (
          <div className="flex flex-col lg:flex-row items-start gap-4 py-3">
            <div className="w-full lg:w-72 text-right pr-4 pt-2 2xl:!text-2xl">
              Allow (Optional)
            </div>
            <div className="flex-1 flex flex-col lg:flex-row items-start lg:items-center gap-2">
              <InputField
                name={MiscellaneousField.ThrottleReviewsPerPeriod}
                control={control}
                type="number"
                className="w-20"
                placeholder="1"
              />
              <span className="text-sm text-gray-700 2xl:!text-2xl">
                reviews to be posted every
              </span>
              <InputField
                name={MiscellaneousField.ThrottlePeriodValue}
                control={control}
                type="number"
                className="w-20"
                placeholder="30"
              />
              <InputField
                name={MiscellaneousField.ThrottlePeriodUnit}
                control={control}
                Component={SelectField}
                options={PERIOD_UNIT_OPTIONS}
                className="w-28"
              />
              <Info className="w-4 h-4 text-gray-400 flex-shrink-0" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

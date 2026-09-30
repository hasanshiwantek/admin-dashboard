"use client";
import Form from "@/components/form/Form";
import InputField from "@/components/form/InputField";
import CheckboxField from "@/components/form/fields/CheckboxField";
import { useAppDispatch, useAppSelector } from "@/hooks/useReduxHooks";
import { createEmailMarketing } from "@/redux/slices/marketingSlice";
import { Info } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  EmailMarketingFormNames,
  EmailMarketingGeneralSettingsDefaultValues,
} from "../constants";
import type { EmailMarketingGeneralSettings } from "../types";

const GeneralSettings = () => {
  const dispatch = useAppDispatch();
  const { emailMarketing, loading } = useAppSelector(
    (state: any) => state.marketingReducer,
  );

  const form = useForm<EmailMarketingGeneralSettings>({
    defaultValues: EmailMarketingGeneralSettingsDefaultValues,
  });
  const { control, watch, reset } = form;

  const [allowNewsletterSubscriptions, showNewsletterSummary] = watch([
    EmailMarketingFormNames.AllowNewsletterSubscriptions,
    EmailMarketingFormNames.ShowNewsletterSummary,
  ]);

  useEffect(() => {
    if (emailMarketing) {
      reset(emailMarketing);
    }
  }, [emailMarketing, reset]);

  const onSubmit = async (data: EmailMarketingGeneralSettings) => {
    try {
      await dispatch(createEmailMarketing({ data })).unwrap();
    } catch (err) {}
  };

  return (
    <div>
      <h2 className="text-4xl! font-semibold! text-gray-900 mb-4">
        Newsletter settings
      </h2>
      <Form
        form={form}
        onSubmit={onSubmit}
        className="pb-0"
        bodyClassName="[&>:not(:last-child)]:border-b [&>:not(:last-child)]:border-gray-200 p-0!"
        footer={{
          onCancel: () => reset(),
          loading: form.formState.isSubmitting,
          disabled: loading,
        }}
      >
        <InputField
          name={EmailMarketingFormNames.AllowNewsletterSubscriptions}
          label="Allow newsletter subscriptions"
          Component={CheckboxField}
          control={control}
          className="pt-0!"
          labelClassName="pt-0!"
          containerClassName="p-6"
          text={
            <>
              Yes, allow customers to subscribe to the store newsletter
              <Info className="w-4 h-4 text-gray-400" />
            </>
          }
        />

        {allowNewsletterSubscriptions && (
          <>
            <InputField
              name={EmailMarketingFormNames.CheckNewsletterBoxByDefault}
              label="Check newsletter box by default"
              className="pt-0!"
              labelClassName="pt-0!"
              containerClassName="p-6"
              Component={CheckboxField}
              control={control}
              text={
                <>
                  Yes, tick the newsletter subscription box by default
                  <Info className="w-4 h-4 text-gray-400" />
                </>
              }
              hint="Enabling this setting places your business at risk of non-compliance with privacy regulations such as the EU General Data Protection Regulation (GDPR)."
            />
            <div>
              <InputField
                name={EmailMarketingFormNames.ShowNewsletterSummary}
                label="Show newsletter summary"
                Component={CheckboxField}
                control={control}
                className="pt-0!"
                labelClassName="pt-0!"
                containerClassName="p-6"
                text={
                  <>
                    Yes, Enable Newsletter Summary
                    <Info className="w-4 h-4 text-gray-400" />
                  </>
                }
              />

              {showNewsletterSummary && (
                <InputField
                  name={EmailMarketingFormNames.NewsletterSummaryText}
                  isTextArea
                  control={control}
                  placeholder="Provide here basic information to your shoppers about your newsletter, including cadence and content, and third-party app of your choice so they are informed before they subscribe."
                  className="min-h-[100px] resize-none"
                  maxLength={250}
                  hint="(250 characters max)"
                  controlClassName="max-w-5xl"
                  containerClassName="px-6 pb-6"
                />
              )}
            </div>
          </>
        )}
      </Form>

      {/* <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-8">
        <div className="p-10">
          <h2 className="!text-3xl !font-semibold text-gray-900 mb-6">
            Recommended Solutions
          </h2>
          <div className="border border-gray-200 rounded-lg p-6">
            <div className="mb-4">
              <span className="text-xs text-blue-600 font-medium">
                Email Marketing
              </span>
              <div className="mt-2">
                <svg
                  className="h-12"
                  viewBox="0 0 120 30"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <text
                    x="0"
                    y="24"
                    fontFamily="serif"
                    fontSize="28"
                    fontWeight="400"
                    fill="black"
                  >
                    klaviyo
                  </text>
                  <polygon points="115,5 120,10 115,15" fill="black" />
                </svg>
              </div>
            </div>

            <p className="text-sm text-gray-700 mb-4">
              Centralize and use every piece of your customer data to deliver
              hyper-personalized email and SMS experiences, increasing
              conversions and revenue.
            </p>

            <ul className="space-y-2 mb-6">
              <li className="text-sm text-gray-700 flex items-start">
                <span className="mr-2">•</span>
                <span>
                  Segment in real-time using historical data, browsing behavior,
                  order value, and custom attributes - no coding required
                </span>
              </li>
              <li className="text-sm text-gray-700 flex items-start">
                <span className="mr-2">•</span>
                <span>
                  Automate smarter with pre-built browse and cart reminders,
                  in-stock alerts, price drop notifications, and more
                </span>
              </li>
              <li className="text-sm text-gray-700 flex items-start">
                <span className="mr-2">•</span>
                <span>
                  Sync BigCommerce customer, catalog, and order event data with
                  a one-click integration
                </span>
              </li>
              <li className="text-sm text-gray-700 flex items-start">
                <span className="mr-2">•</span>
                <span>
                  Track performance, predict customer behavior, get actionable
                  insights, and benchmark progress against your peers
                </span>
              </li>
            </ul>

            <button className="btn-outline-primary">Install now</button>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default GeneralSettings;

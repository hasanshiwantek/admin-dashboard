"use client";

import Form from "@/components/form/Form";
import InputField from "@/components/form/InputField";
import CheckboxField from "@/components/form/fields/CheckboxField";
import { Info } from "lucide-react";
import PageTitle from "@/components/ui/PageTitle";
import { EmailMarketingFormNames } from "../constants";
import { UseFormReturn } from "react-hook-form";
import { EmailMarketingGeneralSettings } from "../types";

interface GeneralSettingsProps {
  form: UseFormReturn<EmailMarketingGeneralSettings>;
  loading: boolean;
  allowNewsletterSubscriptions: boolean;
  showNewsletterSummary: boolean;
  onSubmit: (data: EmailMarketingGeneralSettings) => void;
  handleCancel: () => void;
}

const GeneralSettings = ({
  form,
  loading,
  allowNewsletterSubscriptions,
  showNewsletterSummary,
  onSubmit,
  handleCancel,
}: GeneralSettingsProps) => {
  const { control } = form;

  return (
    <div>
      <PageTitle
        title="Newsletter settings"
        titleClassName="text-4xl! font-semibold! text-gray-900 mb-4"
        hideActionButton
      />
      <Form
        form={form}
        onSubmit={onSubmit}
        className="pb-0"
        bodyClassName="[&>:not(:last-child)]:border-b [&>:not(:last-child)]:border-gray-200 p-0!"
        footer={{
          onCancel: handleCancel,
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
    </div>
  );
};

export default GeneralSettings;
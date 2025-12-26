import { CheckboxField } from "./StoreSettings";
import { FormField } from "./StoreSettings";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroupField } from "./StoreSettings";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Info } from "lucide-react";
import { Button } from "@/components/ui/button";

export const MiscellaneousSettings = ({
  settings,
  onSettingsChange,
}: {
  settings: any;
  onSettingsChange: any;
}) => {
  const updateSetting = (key: any, value: any) => {
    onSettingsChange({ ...settings, [key]: value });
  };

  // Note: The logic for CustomSmtpSettings has been moved into the RadioGroupField,
  // which simplifies the main component but requires careful state management.
  // For this response, we focus on the structure.

  return (
    <div className="space-y-8">
      {/* 1. Email Settings */}
      <div className="bg-white rounded-sm border border-gray-200 p-6">
        <h2 className="!font-semibold mb-6 2xl:!text-[2.4rem]">Email Settings</h2>

        <div className="flex flex-col lg:flex-row items-start gap-4 py-3">
          <Label className="w-full lg:w-72 text-right pr-4 pt-2 2xl:!text-2xl">
            Product Review Emails
          </Label>
          <div className="flex-1 flex flex-col gap-2">
            <p className="text-sm text-gray-700 2xl:!text-2xl">
              Send emails to customers asking them to review products whey have
              purchased (preview and control status of these emails in{" "}
              <a href="#" className="text-blue-600 hover:underline">
                Marketing - Transactional emails
              </a>
              )
            </p>
            <div className="flex flex-col lg:flex-row items-start lg:items-center space-x-2">
              <Input
                type="number"
                value={settings.reviewEmailDays}
                onChange={(e) =>
                  updateSetting("reviewEmailDays", e.target.value)
                }
                className="w-20"
              />
              <span className="text-sm text-gray-700">
                days after the order is marked as Shipped or Completed
              </span>
            </div>
            <div className="flex items-center space-x-2 mt-2">
              <Checkbox
                id="send-review-email-guests"
                checked={settings.sendReviewEmailToGuests}
                onCheckedChange={(checked) =>
                  updateSetting("sendReviewEmailToGuests", checked)
                }
              />
              <Label
                htmlFor="send-review-email-guests"
                className="font-normal text-lg 2xl:!text-2xl"
              >
                Yes, send product review emails to guest customers
              </Label>
            </div>
          </div>
        </div>

        <CheckboxField
           className="w-full lg:w-72"
          label="Forward Order Invoices"
          checked={settings.forwardOrderInvoices}
          onCheckedChange={(checked) =>
            updateSetting("forwardOrderInvoices", checked)
          }
          infoText="Yes, forward order invoice emails to"
        />
        <div className="flex flex-col lg:flex-row items-start lg:items-center gap-4 lg:ml-75">
          <Input
          value={settings.invoiceEmailRecipient}
          onChange={(e) =>
            updateSetting("invoiceEmailRecipient", e.target.value)
          }
          className="w-64"
          placeholder="sales@ctspoint.com, info@ctspoint.cc"
        />
        <span className="text-sm text-gray-700 2xl:!text-2xl">
          Type the email addresses, separated by commas.
        </span>
        </div>

        <RadioGroupField
          className="w-full lg:w-72"
          title="Use SMTP Server"
          name="smtp-server"
          value={settings.smtpServerOption}
          onValueChange={(value) => updateSetting("smtpServerOption", value)}
          options={[
            { value: "default", label: "Use my default mail settings" },
            {
              value: "custom",
              label: "Let me specify my own SMTP server details",
            },
          ]}
        />

        <FormField className="w-full lg:w-72" label="Administrator's Email">
          <Input
            value={settings.administratorEmail}
            onChange={(e) =>
              updateSetting("administratorEmail", e.target.value)
            }
            className="w-64"
            placeholder="info@ctspoint.com"
          />
        </FormField>

        <CheckboxField
          className="w-full lg:w-72"
          label="Require Consent"
          checked={settings.requireMarketingConsent}
          onCheckedChange={(checked) =>
            updateSetting("requireMarketingConsent", checked)
          }
          infoText="Yes, require customers to give consent to receive marketing emails (GDPR recommended)"
        />

        <CheckboxField
          className="w-full lg:w-72"
          label="Abandoned Cart Emails"
          checked={settings.enableAbandonedCartEmails}
          onCheckedChange={(checked) =>
            updateSetting("enableAbandonedCartEmails", checked)
          }
          infoText="Email me when a shopper abandons their cart and leaves my store"
        />

        {settings.enableAbandonedCartEmails && (
          <div className="lg:pl-75 space-y-2">
            <div className="flex flex-col lg:flex-row items-start lg:items-center space-x-2">
                <Checkbox
                id="email-every-cart"
                checked={settings.emailEveryAbandonedCart}
                onCheckedChange={(checked) =>
                  updateSetting("emailEveryAbandonedCart", checked)
                }
              />
              <span className="text-sm text-gray-700 2xl:!text-2xl">Email me every time</span>
              <Input
                type="number"
                value={settings.abandonedCartThreshold}
                onChange={(e) =>
                  updateSetting("abandonedCartThreshold", e.target.value)
                }
                className="w-20"
              />
              <span className="text-sm text-gray-700 2xl:!text-2xl">carts are abandoned</span>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="email-every-cart"
                checked={settings.emailEveryAbandonedCart}
                onCheckedChange={(checked) =>
                  updateSetting("emailEveryAbandonedCart", checked)
                }
              />
              <Label htmlFor="email-every-cart" className="font-normal text-lg 2xl:!text-2xl">
                Email me every time a cart is abandoned
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="stop-email-complete"
                checked={settings.stopEmailOnCompleteOrder}
                onCheckedChange={(checked) =>
                  updateSetting("stopEmailOnCompleteOrder", checked)
                }
              />
              <Label
                htmlFor="stop-email-complete"
                className="font-normal text-lg 2xl:!text-2xl"
              >
                Stop sending when the shopper clicks the "Complete Order" link
                in the email
              </Label>
            </div>
          </div>
        )}

        <CheckboxField
          className="w-full 2xl:w-72"
          label="Converted Cart Emails"
          checked={settings.enableConvertedCartEmails}
          onCheckedChange={(checked) =>
            updateSetting("enableConvertedCartEmails", checked)
          }
          infoText="Email me when an abandoned cart is saved and results in an order"
        />

        <FormField className="w-full lg:w-72" label="Send Emails To (Optional)">
          <Input
            value={settings.convertedCartRecipient}
            onChange={(e) =>
              updateSetting("convertedCartRecipient", e.target.value)
            }
            className="w-64"
            placeholder="info@ctspoint.com"
          />
        </FormField>
      </div>

      {/* 2. Advanced Store Settings */}
      <div className="bg-white rounded-sm border border-gray-200 p-6">
        <h2 className="!font-semibold mb-6 2xl:!text-[2.4rem]">Advanced Store Settings</h2>
        <CheckboxField 
          className="w-full lg:w-72"
          label="Allow Purchasing?"
          checked={settings.allowPurchasing}
          onCheckedChange={(checked) =>
            updateSetting("allowPurchasing", checked)
          }
          infoText="Yes, allow people to purchase from my store"
        />
      </div>

      {/* 3. Order Settings */}
      <div className="bg-white rounded-sm border border-gray-200 p-6">
        <h2 className="!font-semibold mb-4 2xl:!text-[2.4rem]">Order Settings</h2>
        <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 mb-4">
          <p className="text-sm text-gray-700 2xl:!text-2xl">
            Once your store starts receiving orders this number can only ever be
            increased.
          </p>
        </div>
        <FormField className="w-full lg:w-72" label="Starting Order Number (Optional)">
          <Input
            type="number"
            value={settings.startingOrderNumber}
            onChange={(e) =>
              updateSetting("startingOrderNumber", e.target.value)
            }
            className="w-32"
          />
        </FormField>
      </div>

      {/* 4. Throttler */}
      <div className="bg-white rounded-sm border border-gray-200 p-6">
        <h2 className="!font-semibold mb-6 2xl:!text-[2.4rem]">Throttler</h2>
        <CheckboxField
          className="w-full lg:w-72"
          label="Enable Throttler"
          checked={settings.enableThrottler}
          onCheckedChange={(checked) =>
            updateSetting("enableThrottler", checked)
          }
          infoText="Yes, turn on throttler in my store"
        />
        {settings.enableThrottler && (
          <div className="flex flex-col lg:flex-row items-start gap-4 py-3">
            <Label className="w-full lg:w-72 text-right pr-4 pt-2 2xl:!text-2xl">
              Allow (Optional)
            </Label>
            <div className="flex-1 flex flex-col lg:flex-row items-start lg:items-center space-y-2 lg:space-y-0 lg:space-x-2">
              <Input
                type="number"
                value={settings.throttleReviewsPerPeriod}
                onChange={(e) =>
                  updateSetting("throttleReviewsPerPeriod", e.target.value)
                }
                className="w-20"
                placeholder="1"
              />
              <span className="text-sm text-gray-700 2xl:!text-2xl">
                reviews to be posted every
              </span>
              <Input
                type="number"
                value={settings.throttlePeriodValue}
                onChange={(e) =>
                  updateSetting("throttlePeriodValue", e.target.value)
                }
                className="w-20"
                placeholder="30"
              />
              <Select
                value={settings.throttlePeriodUnit}
                onValueChange={(value) =>
                  updateSetting("throttlePeriodUnit", value)
                }
              >
                <SelectTrigger className="w-28">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="minutes">minutes</SelectItem>
                  <SelectItem value="hours">hours</SelectItem>
                  <SelectItem value="days">days</SelectItem>
                </SelectContent>
              </Select>
              <Info className="w-4 h-4 text-gray-400 flex-shrink-0" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

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
import { CspSettings } from "./StoreSettings";
import { XFrameOptionsSettings } from "./StoreSettings";
import { HstsSettings } from "./StoreSettings";
import { Info } from "lucide-react";
// 🆕 SecurityPrivacySettings Component
export const SecurityPrivacySettings = ({
  settings,
  onSettingsChange,
}: {
  settings: any;
  onSettingsChange: any;
}) => {
  const updateSetting = (key: any, value: any) => {
    onSettingsChange({ ...settings, [key]: value });
  };

  return (
    <div className="space-y-8">
      {/* 1. Shopper Security Section (from image_b08be9.png) */}
      <div className="bg-white rounded-sm border border-gray-200 p-6">
        <h2 className="!font-semibold mb-6">Security</h2>

        <CheckboxField
          label="Configure complexity of the shoppers password?"
          checked={settings.enforcePasswordComplexity}
          onCheckedChange={(checked) =>
            updateSetting("enforcePasswordComplexity", checked)
          }
          infoText="Yes, I would like to enforce complexity rules for shopper passwords"
        />

        <div className="mt-8">
          <p className="text-sm text-gray-600 mb-4">
            For advanced users only, this section allows you to configure the
            automatic logout duration for inactive shoppers.{" "}
            <a href="#" className="text-blue-600 hover:underline">
              Learn more
            </a>
          </p>

          <RadioGroupField
            title="Inactive shopper logout"
            name="inactive-logout"
            value={settings.inactiveShopperLogout}
            onValueChange={(value) =>
              updateSetting("inactiveShopperLogout", value)
            }
            options={[
              { value: "default", label: "Use the default 7 day duration" },
              { value: "custom", label: "Let me customize the duration" },
            ]}
          />

          {settings.inactiveShopperLogout === "custom" && (
            <FormField label="Custom Inactive Duration" hasInfo={false}>
              <Input
                value={settings.customLogoutDuration}
                onChange={(e) =>
                  updateSetting("customLogoutDuration", e.target.value)
                }
                className="w-20"
              />
              <Select
                value={settings.customLogoutDurationUnit}
                onValueChange={(value) =>
                  updateSetting("customLogoutDurationUnit", value)
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
            </FormField>
          )}

          <CheckboxField
            label="Shopper activity extends logout duration"
            checked={settings.shopperActivityExtendsLogout}
            onCheckedChange={(checked) =>
              updateSetting("shopperActivityExtendsLogout", checked)
            }
            infoText="Yes, extend my shoppers logout duration while they are active"
          />
        </div>

        <hr className="my-6" />

        <FormField label="Control Panel Inactivity Timeout">
          <Select
            value={settings.controlPanelTimeout}
            onValueChange={(value) =>
              updateSetting("controlPanelTimeout", value)
            }
          >
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1hour">1 hour</SelectItem>
              <SelectItem value="2hours">2 hours</SelectItem>
              <SelectItem value="4hours">4 hours</SelectItem>
              <SelectItem value="8hours">8 hours</SelectItem>
            </SelectContent>
          </Select>
        </FormField>

        <CheckboxField
          label="Enable reCAPTCHA on storefront?"
          checked={settings.enableRecaptchaStorefront}
          onCheckedChange={(checked) =>
            updateSetting("enableRecaptchaStorefront", checked)
          }
          infoText="Yes, enable reCAPTCHA security"
        />

        {settings.enableRecaptchaStorefront && (
          <div className="space-y-3 pl-48">
            <FormField label="reCAPTCHA Site Key" hasInfo={true}>
              <Input
                value={settings.recaptchaSiteKey}
                onChange={(e) =>
                  updateSetting("recaptchaSiteKey", e.target.value)
                }
                className="w-96"
                placeholder="(Site Key)"
              />
            </FormField>
            <FormField label="reCAPTCHA Secret Key" hasInfo={true}>
              <Input
                value={settings.recaptchaSecretKey}
                onChange={(e) =>
                  updateSetting("recaptchaSecretKey", e.target.value)
                }
                className="w-96"
                placeholder="(Secret Key)"
              />
            </FormField>
          </div>
        )}

        <FormField label="Failed Login Lockout">
          <Input
            type="number"
            value={settings.failedLoginLockout}
            onChange={(e) =>
              updateSetting("failedLoginLockout", e.target.value)
            }
            className="w-20"
          />
        </FormField>

        <CheckboxField
          label="Enable reCAPTCHA on a storefront pre-launch login page?"
          checked={settings.enableRecaptchaPrelaunch}
          onCheckedChange={(checked) =>
            updateSetting("enableRecaptchaPrelaunch", checked)
          }
          infoText="Yes, enable reCAPTCHA security on the pre-launch login page."
        />
      </div>

      {/* 2. Privacy and Storefront Security Section (from image_b08c23.png) */}
      <div className="border border-gray-200">
        <div className="bg-white  p-6 rounded-sm ">
          <h2 className="!font-semibold mb-6">Your customers' privacy</h2>
          <p className="text-sm text-gray-600 mb-4">
            <a href="#" className="text-blue-600 hover:underline">
              Learn more
            </a>
          </p>

          <CheckboxField
            label="Cookie consent tracking"
            checked={settings.enableCookieConsent}
            onCheckedChange={(checked) =>
              updateSetting("enableCookieConsent", checked)
            }
            infoText="Yes, turn on the cookie consent banner on my store."
          />

          <FormField label="Privacy Policy URL" hasInfo={true}>
            <Input
              value={settings.privacyPolicyUrl}
              onChange={(e) =>
                updateSetting("privacyPolicyUrl", e.target.value)
              }
              className="w-96"
              placeholder="https://example.com/privacy-policy"
            />
          </FormField>

          <RadioGroupField
            title="Collect data for my business"
            name="data-collection-limit"
            value={settings.dataCollectionLimit}
            onValueChange={(value) =>
              updateSetting("dataCollectionLimit", value)
            }
            options={[
              { value: "off", label: "Off" },
              {
                value: "moderate",
                label: "On with moderate limits to data collected (Legacy)",
              },
              {
                value: "strict",
                label: "On with strict limits to data collected",
              },
            ]}
          />
        </div>

        <hr className="my-6" />

        <div className="bg-white  p-6 rounded-sm ">
          <h2 className="!font-semibold mb-4">Storefront</h2>
          <p className="text-sm text-gray-600 mb-4">
            For advanced users only, this section allows you to configure
            advanced security policies for your storefront.{" "}
            <a href="#" className="text-blue-600 hover:underline">
              Learn more
            </a>
          </p>
          <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 mb-4">
            <p className="text-sm text-gray-700">
              Changing these settings can have serious consequences for your
              storefront if done incorrectly. Please consult the documentation
              before making any changes. It is recommended to not modify these
              settings at all unless you know exactly what you're doing.
            </p>
          </div>

          {/* HSTS Settings */}
          <div className="flex items-start gap-4 py-3">
            <Label className="w-48 text-right pr-4 pt-2">HSTS Settings</Label>
            <div className="flex-1 flex flex-col gap-2">
              <p className="text-sm text-gray-700">
                HSTS is enforced for all stores with HTTPS only enabled. To
                disable the effects of HSTS set the "Max-Age" to 0 (not
                recommended).
              </p>
              <Checkbox
                id="enable-hsts"
                checked={settings.enableHsts}
                onCheckedChange={(checked) =>
                  updateSetting("enableHsts", checked)
                }
              />
              <Label htmlFor="enable-hsts" className="font-normal ml-2">
                Set Max-Age Header (max-age) to:
              </Label>
            </div>
            <Info className="w-4 h-4 text-gray-400 flex-shrink-0 mt-2" />
          </div>
          {settings.enableHsts && (
            <HstsSettings settings={settings} updateSetting={updateSetting} />
          )}

          <hr className="my-6" />

          {/* CSP Settings */}
          <CspSettings settings={settings} updateSetting={updateSetting} />

          <hr className="my-6" />

          <CheckboxField
            label="Enable Nonce-Based Script Security"
            checked={settings.enableNonceSecurity}
            onCheckedChange={(checked) =>
              updateSetting("enableNonceSecurity", checked)
            }
            infoText="Generate and enforce a nonce in the CSP for payment pages."
          />

          <hr className="my-6" />

          {/* X-Frame-Options Header Settings */}
          <XFrameOptionsSettings
            settings={settings}
            updateSetting={updateSetting}
          />
        </div>
      </div>
    </div>
  );
};

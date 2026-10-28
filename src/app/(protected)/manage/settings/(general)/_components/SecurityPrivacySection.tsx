"use client";

import CheckboxField from "@/components/form/fields/CheckboxField";
import RadioGroupField from "@/components/form/fields/RadioGroupField";
import SelectField from "@/components/form/fields/SelectField";
import { useFormContext } from "@/components/form/Form";
import InputField from "@/components/form/InputField";
import { useWatch } from "react-hook-form";
import {
  controlPanelTimeoutOptions,
  dataCollectionOptions,
  GeneralSection,
  LogoutOption,
  logoutOptions,
  SecurityPrivacyField,
  timeUnitOptions,
} from "../constant";
import { fieldPath } from "../utils";
import InlineFieldRow from "./InlineFieldRow";
import SettingsCard from "@/components/SettingsCard/SettingsCard";
import SettingsNotice from "../../_components/SettingsNotice";
import { CircleHelp, Info } from "lucide-react";
import HelpTooltip from "@/components/HelpTooltip/HelpTooltip";

const name = (field: SecurityPrivacyField) =>
  fieldPath(GeneralSection.SecurityPrivacy, field);

const SecurityPrivacySection = () => {
  const { control } = useFormContext();
  const inactiveLogout = useWatch({
    control,
    name: name(SecurityPrivacyField.InactiveShopperLogout),
  });
  const recaptchaEnabled = useWatch({
    control,
    name: name(SecurityPrivacyField.EnableRecaptchaStorefront),
  });

  return (
    <div className="flex flex-col gap-8">
      <SettingsCard title="Security">
        <InputField
          name={name(SecurityPrivacyField.EnforcePasswordComplexity)}
          label="Configure complexity of the shopper's password?"
          Component={CheckboxField}
          text="Yes, I would like to enforce complexity rules for shopper passwords"
        />
      </SettingsCard>

      <SettingsCard
        title="Inactive Shopper Logout"
        description="For advanced users only, this section allows you to configure the automatic logout duration for inactive shoppers."
      >
        <InputField
          name={name(SecurityPrivacyField.InactiveShopperLogout)}
          label="Inactive shopper logout"
          Component={RadioGroupField}
          options={logoutOptions}
        />

        {inactiveLogout === LogoutOption.Custom && (
          <InlineFieldRow label="Custom inactive duration">
            <InputField
              name={name(SecurityPrivacyField.CustomLogoutDuration)}
              type="number"
              min={1}
              layout="vertical"
              className="w-24"
            />
            <InputField
              name={name(SecurityPrivacyField.CustomLogoutDurationUnit)}
              layout="vertical"
              Component={SelectField}
              options={timeUnitOptions}
              className="w-32"
            />
          </InlineFieldRow>
        )}

        <InputField
          name={name(SecurityPrivacyField.ShopperActivityExtendsLogout)}
          label="Shopper activity extends logout duration"
          Component={CheckboxField}
          text="Yes, extend my shoppers' logout duration while they are active"
        />
      </SettingsCard>

      <SettingsCard title="Control Panel & reCAPTCHA">
        <InputField
          name={name(SecurityPrivacyField.ControlPanelTimeout)}
          label="Control Panel Inactivity Timeout"
          Component={SelectField}
          options={controlPanelTimeoutOptions}
          controlClassName="max-w-xs"
          afterFieldComponent={
            <HelpTooltip
              side="right"
              content="This is how long you can work in the BigCommerce control panel without being logged out for security reasons."
              iconClassName="fill-muted-plum-gray"
            />
          }
        />
        <InputField
          name={name(SecurityPrivacyField.EnableRecaptchaStorefront)}
          label="Enable reCAPTCHA on storefront?"
          Component={CheckboxField}
          text="Yes, enable reCAPTCHA security"
        />

        {recaptchaEnabled && (
          <>
            <InputField
              name={name(SecurityPrivacyField.RecaptchaSiteKey)}
              label="reCAPTCHA Site Key"
              placeholder="(Site Key)"
              controlClassName="max-w-md"
              showColon={true}
              afterFieldComponent={
                <HelpTooltip
                  side="right"
                  content={
                    <div className="flex flex-col gap-1">
                      <strong>reCAPTCHA Site Key?</strong>
                      <p>
                        By entering the reCAPTCHA keys, these keys will be used
                        for all reCAPTCHA in your store. If these keys are not
                        specified, the BigCommerce reCAPTCHA keys will be used
                        instead.
                      </p>
                    </div>
                  }
                  iconClassName="fill-muted-plum-gray"
                />
              }
            />
            <InputField
              name={name(SecurityPrivacyField.RecaptchaSecretKey)}
              label="reCAPTCHA Secret Key"
              placeholder="(Secret Key)"
              controlClassName="max-w-md"
              showColon={true}
              afterFieldComponent={
                <HelpTooltip
                  side="right"
                  content={
                    <div className="flex flex-col gap-1">
                      <strong>reCAPTCHA Secret Key?</strong>
                      <p>
                        By entering the reCAPTCHA keys, these keys will be used
                        for all reCAPTCHA in your store. If these keys are not
                        specified, the BigCommerce reCAPTCHA keys will be used
                        instead.
                      </p>
                    </div>
                  }
                  iconClassName="fill-muted-plum-gray"
                />
              }
            />
          </>
        )}

        <InputField
          name={name(SecurityPrivacyField.FailedLoginLockout)}
          label="Failed Login Lockout"
          type="number"
          min={0}
          controlClassName="max-w-xs"
        />
        <InputField
          name={name(SecurityPrivacyField.EnableRecaptchaPrelaunch)}
          label="Enable reCAPTCHA on a storefront pre-launch login page?"
          Component={CheckboxField}
          text="Yes, enable reCAPTCHA security on the pre-launch login page."
        />
      </SettingsCard>

      <SettingsCard title="Your Customers' Privacy">
        <InputField
          name={name(SecurityPrivacyField.EnableCookieConsent)}
          label="Cookie consent tracking"
          Component={CheckboxField}
          text="Yes, turn on the cookie consent banner on my store."
        />
        <InputField
          name={name(SecurityPrivacyField.PrivacyPolicyUrl)}
          label="Privacy Policy URL"
          placeholder="https://example.com/privacy-policy"
        />
        <InputField
          name={name(SecurityPrivacyField.DataCollectionLimit)}
          label="Collect data for my business"
          Component={RadioGroupField}
          options={dataCollectionOptions}
        />
      </SettingsCard>

      <SettingsCard
        title="Storefront"
        description="For advanced users only, this section allows you to configure advanced security policies for your storefront."
      >
        <SettingsNotice tone="warning">
          Changing these settings can have serious consequences for your
          storefront if done incorrectly. Please consult the documentation
          before making any changes. It is recommended to not modify these
          settings at all unless you know exactly what you&apos;re doing.
        </SettingsNotice>
        <InputField
          name={name(SecurityPrivacyField.EnableNonceSecurity)}
          label="Enable Nonce-Based Script Security"
          Component={CheckboxField}
          text="Generate and enforce a nonce in the CSP for payment pages."
        />
      </SettingsCard>
    </div>
  );
};

export default SecurityPrivacySection;

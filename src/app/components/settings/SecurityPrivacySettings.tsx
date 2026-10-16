"use client";

import { useWatch } from "react-hook-form";
import { Control } from "react-hook-form";
import InputField from "@/components/form/InputField";
import CheckboxField from "@/components/form/fields/CheckboxField";
import RadioGroupField from "@/components/form/fields/RadioGroupField";
import SelectField from "@/components/form/fields/SelectField";
import {
  DATA_COLLECTION_OPTIONS,
  DURATION_UNIT_OPTIONS,
  LOGOUT_OPTIONS,
  SecurityPrivacyField,
  TIMEOUT_OPTIONS,
} from "./constant";
import PageTitle from "@/components/ui/PageTitle";

export const SecurityPrivacySettings = ({
  control,
}: {
  control: Control<any>;
}) => {
  const inactiveLogout = useWatch({
    control,
    name: SecurityPrivacyField.InactiveShopperLogout,
  });

  const enableRecaptcha = useWatch({
    control,
    name: SecurityPrivacyField.EnableRecaptchaStorefront,
  });

  return (
    <div className="space-y-8">
      {/* Shopper Security */}
      <div className="bg-white rounded-sm border border-gray-200 p-6">
        <PageTitle title={"Security"} hideActionButton />
        <div className="space-y-4">
          <InputField
            name={SecurityPrivacyField.EnforcePasswordComplexity}
            label="Configure complexity of the shoppers password?"
            control={control}
            Component={CheckboxField}
            text="Yes, I would like to enforce complexity rules for shopper passwords"
            className="w-full "
            labelClassName="lg:text-right"
          />
        </div>
      </div>

      {/* Inactive logout */}
      <div className="bg-white rounded-sm border border-gray-200 p-6">
        <div className="2xl:!text-2xl">
          <p className="text-sm text-gray-600 mb-4 2xl:!text-2xl">
            For advanced users only, this section allows you to configure the
            automatic logout duration for inactive shoppers.{" "}
            <a href="#" className="text-blue-600 hover:underline">
              Learn more
            </a>
          </p>

          <div className="space-y-4">
            <InputField
              name={SecurityPrivacyField.InactiveShopperLogout}
              label="Inactive shopper logout"
              control={control}
              Component={RadioGroupField}
              options={LOGOUT_OPTIONS}
              className="w-full "
              labelClassName=" lg:text-right"
            />

            {inactiveLogout === "custom" && (
              <div className="flex gap-3 lg:ml-72">
                <InputField
                  name={SecurityPrivacyField.CustomLogoutDuration}
                  label="Custom Inactive Duration"
                  control={control}
                  className="w-20"
                />
                <InputField
                  name={SecurityPrivacyField.CustomLogoutDurationUnit}
                  label="Unit"
                  control={control}
                  Component={SelectField}
                  options={DURATION_UNIT_OPTIONS}
                  className="w-28"
                />
              </div>
            )}

            <InputField
              name={SecurityPrivacyField.ShopperActivityExtendsLogout}
              label="Shopper activity extends logout duration"
              control={control}
              Component={CheckboxField}
              text="Yes, extend my shoppers logout duration while they are active"
              className="w-full "
              labelClassName="lg:text-right"
            />
          </div>
        </div>
      </div>

      {/* Control panel + reCAPTCHA */}
      <div className="bg-white rounded-sm border border-gray-200 p-6">
        <div className="space-y-4">
          <InputField
            name={SecurityPrivacyField.ControlPanelTimeout}
            label="Control Panel Inactivity Timeout"
            control={control}
            Component={SelectField}
            options={TIMEOUT_OPTIONS}
            className="w-full "
            labelClassName="lg:text-right"
          />

          <InputField
            name={SecurityPrivacyField.EnableRecaptchaStorefront}
            label="Enable reCAPTCHA on storefront?"
            control={control}
            Component={CheckboxField}
            text="Yes, enable reCAPTCHA security"
            className="w-full "
            labelClassName="lg:text-right"
          />

          {enableRecaptcha && (
            <div className="space-y-3 lg:ml-72">
              <InputField
                name={SecurityPrivacyField.RecaptchaSiteKey}
                label="reCAPTCHA Site Key"
                control={control}
                placeholder="(Site Key)"
                className="w-96"
              />
              <InputField
                name={SecurityPrivacyField.RecaptchaSecretKey}
                label="reCAPTCHA Secret Key"
                control={control}
                placeholder="(Secret Key)"
                className="w-96"
              />
            </div>
          )}

          <InputField
            name={SecurityPrivacyField.FailedLoginLockout}
            label="Failed Login Lockout"
            control={control}
            type="number"
            className="w-full "
            labelClassName=" lg:text-right"
          />

          <InputField
            name={SecurityPrivacyField.EnableRecaptchaPrelaunch}
            label="Enable reCAPTCHA on a storefront pre-launch login page?"
            control={control}
            Component={CheckboxField}
            text="Yes, enable reCAPTCHA security on the pre-launch login page."
            className="w-full "
            labelClassName=" lg:text-right"
          />
        </div>
      </div>

      {/* Privacy */}
      <div className="border border-gray-200">
        <div className="bg-white p-6 rounded-sm">
          <PageTitle title={"Your customers privacy"} hideActionButton />

          <p className="text-sm text-gray-600 mb-4">
            <a href="#" className="text-blue-600 hover:underline">
              Learn more
            </a>
          </p>

          <div className="space-y-4">
            <InputField
              name={SecurityPrivacyField.EnableCookieConsent}
              label="Cookie consent tracking"
              control={control}
              Component={CheckboxField}
              text="Yes, turn on the cookie consent banner on my store."
              className="w-full "
              labelClassName=" lg:text-right"
            />

            <InputField
              name={SecurityPrivacyField.PrivacyPolicyUrl}
              label="Privacy Policy URL"
              control={control}
              placeholder="https://example.com/privacy-policy"
              className="w-full "
              labelClassName=" lg:text-right"
            />

            <InputField
              name={SecurityPrivacyField.DataCollectionLimit}
              label="Collect data for my business"
              control={control}
              Component={RadioGroupField}
              options={DATA_COLLECTION_OPTIONS}
              className="w-full "
              labelClassName=" lg:text-right"
            />
          </div>
        </div>

        <hr className="my-6" />

        <div className="bg-white p-6 rounded-sm">
          <PageTitle title={"Storefront"} hideActionButton />

          <p className="text-sm text-gray-600 mb-4 2xl:!text-2xl">
            For advanced users only, this section allows you to configure
            advanced security policies for your storefront.{" "}
            <a href="#" className="text-blue-600 hover:underline">
              Learn more
            </a>
          </p>
          <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 mb-4">
            <p className="text-sm text-gray-700 2xl:!text-2xl">
              Changing these settings can have serious consequences for your
              storefront if done incorrectly. Please consult the documentation
              before making any changes. It is recommended to not modify these
              settings at all unless you know exactly what you&apos;re doing.
            </p>
          </div>

          {/* HSTS / CSP / X-Frame — convert these sub-components to accept control as well */}
          {/* <HstsSettings control={control} /> */}
          {/* <CspSettings control={control} /> */}
          {/* <XFrameOptionsSettings control={control} /> */}

          <InputField
            name={SecurityPrivacyField.EnableNonceSecurity}
            label="Enable Nonce-Based Script Security"
            control={control}
            Component={CheckboxField}
            text="Generate and enforce a nonce in the CSP for payment pages."
            className="w-full "
            labelClassName="lg:text-right"
          />
        </div>
      </div>
    </div>
  );
};

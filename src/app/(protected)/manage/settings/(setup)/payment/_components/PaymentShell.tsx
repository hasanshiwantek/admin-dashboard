"use client";

import { SelectField } from "@/components/form/fields/SelectField";
import Form from "@/components/form/Form";
import InputField from "@/components/form/InputField";
import AppTabs from "@/components/ui/AppTabs/AppTabs";
import PageLayout from "@/components/ui/PageLayout";
import { SETTINGS_ROUTE } from "../../../(products)/constant";
import SettingsNotice from "../../../_components/SettingsNotice";
import {
  currencyOptions,
  PAYMENT_METHODS_LEARN_MORE_URL,
  PaymentCurrencyFormNames,
} from "../constant";
import { PaymentShellProps } from "./type";

const PaymentShell = ({
  currencyForm,
  onCurrencySubmit,
  tabs,
  activeTab,
  handleTabChange,
  children,
}: PaymentShellProps) => (
  <PageLayout
    backButton={{ label: "Settings", href: SETTINGS_ROUTE }}
    title="Payment methods"
    titleProps={{
      titleClassName:
        "text-[36px] font-light leading-tight text-text-primary-light",
    }}
    headerClassName="mb-8"
    className="min-h-screen p-10"
  >
    <p className="mb-10 text-[1.5rem]! text-text-heading!">
      Set up payment methods for the currencies you support in your store.{" "}
      <a
        href={PAYMENT_METHODS_LEARN_MORE_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="text-primary-blue hover:underline"
      >
        Learn more
      </a>
    </p>

    <Form
      form={currencyForm}
      onSubmit={onCurrencySubmit}
      footer={false}
      bodyClassName="mb-10 border-0 bg-transparent p-0"
    >
      <InputField
        name={PaymentCurrencyFormNames.Currency}
        label="Show payment methods for"
        required
        layout="vertical"
        Component={SelectField}
        options={currencyOptions}
        controlClassName="max-w-[45rem]"
      />
    </Form>

    <SettingsNotice tone="warning" showIcon>
      Online payment methods are disabled for this store. Please switch to a
      paid plan to activate online payments.
    </SettingsNotice>

    <AppTabs
      tabs={tabs}
      activeTab={activeTab}
      onTabChange={handleTabChange}
      variant="underline"
      className="mt-2 mb-4 border-b-0"
      tabClassName="px-6 text-[1.5rem]! text-primary-blue"
      activeTabClassName="border-primary-blue font-normal text-text-heading"
    />

    {children}
  </PageLayout>
);

export default PaymentShell;

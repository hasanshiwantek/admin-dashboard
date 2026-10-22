"use client";

import CheckboxField from "@/components/form/fields/CheckboxField";
import Form from "@/components/form/Form";
import InputField from "@/components/form/InputField";
import OfflinePaymentMethodsSection from "./_components/OfflinePaymentMethodsSection";
import PaymentShell from "./_components/PaymentShell";
import { PaymentConfigFormNames, TEST_CARD_NUMBER } from "./constant";
import usePaymentPageContainer from "./container";

const PaymentPage = () => {
  const { shell, form, offlineMethods, onSubmit } = usePaymentPageContainer();

  return (
    <PaymentShell {...shell}>
      <OfflinePaymentMethodsSection methods={offlineMethods} />

      <Form
        form={form}
        onSubmit={onSubmit}
        footer={false}
        bodyClassName="mt-6 border-0 bg-transparent p-0"
      >
        <InputField
          name={PaymentConfigFormNames.TestCardPayments}
          Component={CheckboxField}
          text="Enable test credit card payments"
          hint={`To process test orders, use card number ${TEST_CARD_NUMBER}, name "success" and any future date for expiration date.`}
          layout="vertical"
          className="text-[1.5rem]! text-text-heading"
        />
      </Form>
    </PaymentShell>
  );
};

export default PaymentPage;

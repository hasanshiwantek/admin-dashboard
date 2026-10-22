"use client";

import Form from "@/components/form/Form";
import OfflinePaymentFormFields from "../_components/OfflinePaymentFormFields";
import PaymentShell from "../_components/PaymentShell";
import useOfflinePaymentPageContainer from "./container";

const OfflinePaymentPage = () => {
  const { shell, method, form, onSubmit, handleCancel } =
    useOfflinePaymentPageContainer();

  return (
    <PaymentShell {...shell}>
      <Form
        form={form}
        onSubmit={onSubmit}
        bodyClassName="gap-0 border-0 shadow-sm"
        footer={{
          submitText: "Save",
          loadingText: "Saving...",
          onCancel: handleCancel,
        }}
      >
        <OfflinePaymentFormFields method={method} />
      </Form>
    </PaymentShell>
  );
};

export default OfflinePaymentPage;

"use client";

import Form from "@/components/form/Form";
import BasicTaxSection from "../../../../_components/BasicTaxSection";
import TaxRateFields from "../../../_components/TaxRateFields";
import TaxZoneShell from "../../../_components/TaxZoneShell";
import useTaxRateFormPageContainer from "./container";

const TaxRateFormPage = () => {
  const { shell, form, isEdit, classRates, onSubmit, handleCancel } =
    useTaxRateFormPageContainer();

  return (
    <TaxZoneShell {...shell}>
      <BasicTaxSection title={isEdit ? "Edit tax rate" : "Add a tax rate"}>
        <Form
          form={form}
          onSubmit={onSubmit}
          bodyClassName="gap-0 border-0 bg-transparent p-0"
          footer={{
            submitText: "Save",
            loadingText: "Saving...",
            onCancel: handleCancel,
          }}
        >
          <TaxRateFields classRates={classRates} />
        </Form>
      </BasicTaxSection>
    </TaxZoneShell>
  );
};

export default TaxRateFormPage;

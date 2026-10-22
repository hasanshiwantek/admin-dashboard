"use client";

import Form from "@/components/form/Form";
import BasicTaxSection from "../_components/BasicTaxSection";
import BasicTaxShell from "../_components/BasicTaxShell";
import TaxClassesFields from "../_components/TaxClassesFields";
import useTaxClassesPageContainer from "./container";

const TaxClassesPage = () => {
  const {
    shell,
    form,
    rows,
    handleAddClass,
    handleRemoveClass,
    onSubmit,
    handleCancel,
  } = useTaxClassesPageContainer();

  return (
    <BasicTaxShell {...shell}>
      <BasicTaxSection title="Configure tax classes">
        <Form
          form={form}
          onSubmit={onSubmit}
          bodyClassName="rounded-sm border-0 shadow-sm"
          footer={{
            submitText: "Save",
            loadingText: "Saving...",
            onCancel: handleCancel,
          }}
        >
          <TaxClassesFields
            rows={rows}
            onAdd={handleAddClass}
            onRemove={handleRemoveClass}
          />
        </Form>
      </BasicTaxSection>
    </BasicTaxShell>
  );
};

export default TaxClassesPage;

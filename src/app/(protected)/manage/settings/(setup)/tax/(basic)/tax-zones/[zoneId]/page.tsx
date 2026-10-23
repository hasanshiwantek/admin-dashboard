"use client";

import Form from "@/components/form/Form";
import TaxZoneSettingsFields from "../_components/TaxZoneSettingsFields";
import TaxZoneShell from "../_components/TaxZoneShell";
import useTaxZoneSettingsPageContainer from "./container";

const TaxZoneSettingsPage = () => {
  const {
    shell,
    form,
    basedOn,
    appliesTo,
    subdivisionOptions,
    onSubmit,
    handleCancel,
  } = useTaxZoneSettingsPageContainer();

  return (
    <TaxZoneShell {...shell}>
      <Form
        form={form}
        onSubmit={onSubmit}
        bodyClassName="gap-8 border-0 bg-transparent p-0"
        footer={{
          submitText: "Save",
          loadingText: "Saving...",
          onCancel: handleCancel,
        }}
      >
        <TaxZoneSettingsFields
          basedOn={basedOn}
          appliesTo={appliesTo}
          subdivisionOptions={subdivisionOptions}
        />
      </Form>
    </TaxZoneShell>
  );
};

export default TaxZoneSettingsPage;

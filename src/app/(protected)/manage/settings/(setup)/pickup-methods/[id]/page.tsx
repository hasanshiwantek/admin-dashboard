"use client";

import Form from "@/components/form/Form";
import PageLayout from "@/components/ui/PageLayout";
import PickupMethodFormFields from "../_components/PickupMethodFormFields";
import { PICKUP_METHODS_ROUTE } from "../constant";
import usePickupMethodFormPageContainer from "./container";

const PickupMethodFormPage = () => {
  const { form, isEdit, title, locations, onSubmit, handleCancel } =
    usePickupMethodFormPageContainer();

  return (
    <PageLayout
      backButton={{ label: "Pick up in-store", href: PICKUP_METHODS_ROUTE }}
      title={title}
      titleProps={{
        titleClassName:
          "text-[36px] font-light leading-tight text-text-primary-light",
      }}
      className="min-h-screen p-10"
    >
      <Form
        form={form}
        onSubmit={onSubmit}
        bodyClassName="gap-0 border-0 bg-transparent p-0"
        footer={{
          submitText: isEdit ? "Save" : "Add",
          loadingText: isEdit ? "Saving..." : "Adding...",
          onCancel: handleCancel,
        }}
      >
        <PickupMethodFormFields locations={locations} />
      </Form>
    </PageLayout>
  );
};

export default PickupMethodFormPage;

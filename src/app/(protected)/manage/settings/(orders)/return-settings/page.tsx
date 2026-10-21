"use client";

import Form from "@/components/form/Form";
import { LOADING_DIM_CLASS } from "@/components/LoadingOverlay/constant";
import LoadingOverlay from "@/components/LoadingOverlay/LoadingOverlay";
import PageLayout from "@/components/ui/PageLayout";
import { cn } from "@/lib/utils";
import { SETTINGS_ROUTE } from "../constant";
import ReturnSettingsSection from "./_components/ReturnSettingsSection";
import useReturnSettingsContainer from "./container";

const ReturnSettingsPage = () => {
  const { form, loading, saving, onSubmit, handleCancel } =
    useReturnSettingsContainer();

  return (
    <PageLayout
      backButton={{ label: "Settings", href: SETTINGS_ROUTE }}
      title="Returns"
      titleProps={{
        description:
          "The returns system will allow your customers to request a return on items they've purchased. These are also known as RMA requests.",
        descriptionClassName: "text-xl! 2xl:text-2xl!",
      }}
    >
      <Form
        form={form}
        onSubmit={onSubmit}
        bodyClassName="relative gap-0 border-0 bg-transparent p-0"
        footer={{
          submitText: "Save",
          loadingText: "Saving...",
          onCancel: handleCancel,
          loading: saving,
          disabled: loading,
        }}
      >
        <div
          className={cn(
            "transition-opacity duration-200",
            loading && LOADING_DIM_CLASS,
          )}
        >
          <ReturnSettingsSection />
        </div>
        {loading && <LoadingOverlay />}
      </Form>
    </PageLayout>
  );
};

export default ReturnSettingsPage;

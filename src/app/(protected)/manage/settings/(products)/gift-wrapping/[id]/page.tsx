"use client";

import Form from "@/components/form/Form";
import { LOADING_DIM_CLASS } from "@/components/LoadingOverlay/constant";
import LoadingOverlay from "@/components/LoadingOverlay/LoadingOverlay";
import PageLayout from "@/components/ui/PageLayout";
import { cn } from "@/lib/utils";
import GiftWrappingFormFields from "../_components/GiftWrappingFormFields";
import { GIFT_WRAPPING_ROUTE } from "../constant";
import useGiftWrappingFormContainer from "./container";

const GiftWrappingFormPage = () => {
  const { form, isEdit, loading, saving, onSubmit, handleCancel } =
    useGiftWrappingFormContainer();

  return (
    <PageLayout
      backButton={{ label: "Gift Wrapping", href: GIFT_WRAPPING_ROUTE }}
      title={
        isEdit ? "Edit Gift Wrapping Option" : "Add a New Gift Wrapping Option"
      }
      titleProps={{
        description: isEdit
          ? "Update the gift wrapping option below and click Save."
          : "Fill in the form below to add a new gift wrapping option to your store.",
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
          <GiftWrappingFormFields />
        </div>
        {loading && <LoadingOverlay />}
      </Form>
    </PageLayout>
  );
};

export default GiftWrappingFormPage;

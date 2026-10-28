"use client";

import Form from "@/components/form/Form";
import { LOADING_DIM_CLASS } from "@/components/LoadingOverlay/constant";
import LoadingOverlay from "@/components/LoadingOverlay/LoadingOverlay";
import PageLayout from "@/components/ui/PageLayout";
import { cn } from "@/lib/utils";
import BrandFormFields from "../_components/BrandFormFields";
import { BRANDS_ROUTE } from "../constant";
import useBrandFormPageContainer from "./container";

const BrandFormPage = () => {
  const { form, isEdit, loading, saving, onSubmit, handleCancel } =
    useBrandFormPageContainer();

  return (
    <PageLayout
      backButton={{ label: "Brands", href: BRANDS_ROUTE }}
      title={isEdit ? "Edit Brand" : "Add Brands"}
      titleProps={{
        description: isEdit
          ? "Modify the details of the brand below and click Save."
          : "Brands can be associated with products, allowing your customers to shop by browsing their favorite brands. Add brands by typing them into the text box, one brand per line.",
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
          <BrandFormFields isEdit={isEdit} />
        </div>
        {loading && <LoadingOverlay />}
      </Form>
    </PageLayout>
  );
};

export default BrandFormPage;

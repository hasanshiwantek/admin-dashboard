"use client";

import Form from "@/components/form/Form";
import { LOADING_DIM_CLASS } from "@/components/LoadingOverlay/constant";
import LoadingOverlay from "@/components/LoadingOverlay/LoadingOverlay";
import PageLayout from "@/components/ui/PageLayout";
import { cn } from "@/lib/utils";
import BannerFormFields from "../_components/BannerFormFields";
import { BANNERS_ROUTE } from "../constant";
import useBannerFormPageContainer from "./container";

const BannerFormPage = () => {
  const {
    form,
    isEdit,
    loading,
    saving,
    locationType,
    dateType,
    brandOptions,
    handleLocationTypeChange,
    handleDateTypeChange,
    onSubmit,
    handleCancel,
  } = useBannerFormPageContainer();

  return (
    <PageLayout
      backButton={{ label: "Banners", href: BANNERS_ROUTE }}
      title={isEdit ? "Edit a banner" : "Create a banner"}
      titleProps={{
        description:
          "Banners are a great way to advertise sales, display coupon codes and promotions, relay important information, and to add design elements such as images and videos.",
        descriptionClassName: "text-xl! 2xl:text-2xl!",
      }}
    >
      <Form
        form={form}
        onSubmit={onSubmit}
        bodyClassName="relative"
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
            "flex flex-col gap-8 transition-opacity duration-200",
            loading && LOADING_DIM_CLASS,
          )}
        >
          <BannerFormFields
            locationType={locationType}
            dateType={dateType}
            brandOptions={brandOptions}
            onLocationTypeChange={handleLocationTypeChange}
            onDateTypeChange={handleDateTypeChange}
          />
        </div>
        {loading && <LoadingOverlay />}
      </Form>
    </PageLayout>
  );
};

export default BannerFormPage;

"use client";

import Form from "@/components/form/Form";
import { LOADING_DIM_CLASS } from "@/components/LoadingOverlay/constant";
import LoadingOverlay from "@/components/LoadingOverlay/LoadingOverlay";
import PageLayout from "@/components/ui/PageLayout";
import { cn } from "@/lib/utils";
import { SETTINGS_ROUTE } from "../constant";
import AdvancedSection from "./_components/AdvancedSection";
import GeneralSection from "./_components/GeneralSection";
import usePromotionSettingsContainer from "./container";

const PromotionSettingsPage = () => {
  const { form, loading, saving, onSubmit } = usePromotionSettingsContainer();

  return (
    <PageLayout
      backButton={{ label: "Settings", href: SETTINGS_ROUTE }}
      title="Promotions and coupons"
    >
      <Form
        form={form}
        onSubmit={onSubmit}
        bodyClassName="relative gap-0 border-0 bg-transparent p-0"
        footer={{
          submitText: "Save",
          loadingText: "Saving...",
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
          <GeneralSection />
          <AdvancedSection />
        </div>
        {loading && <LoadingOverlay />}
      </Form>
    </PageLayout>
  );
};

export default PromotionSettingsPage;

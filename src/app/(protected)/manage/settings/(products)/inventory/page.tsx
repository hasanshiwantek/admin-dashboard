"use client";

import Form from "@/components/form/Form";
import { LOADING_DIM_CLASS } from "@/components/LoadingOverlay/constant";
import LoadingOverlay from "@/components/LoadingOverlay/LoadingOverlay";
import PageLayout from "@/components/ui/PageLayout";
import { cn } from "@/lib/utils";
import { SETTINGS_ROUTE } from "../constant";
import BackorderDisplaySection from "./_components/BackorderDisplaySection";
import EmailNotificationsSection from "./_components/EmailNotificationsSection";
import GeneralSection from "./_components/GeneralSection";
import StockLevelSection from "./_components/StockLevelSection";
import useInventorySettingsContainer from "./container";

const InventorySettingsPage = () => {
  const {
    form,
    backorderMessages,
    backorderMessageColumns,
    hasMessageErrors,
    showHideInFiltering,
    showBackorderNotice,
    showPreOrderInventory,
    isDirty,
    loading,
    saving,
    onSubmit,
    handleAddMessage,
    handleCancel,
  } = useInventorySettingsContainer();

  return (
    <PageLayout
      backButton={{ label: "Settings", href: SETTINGS_ROUTE }}
      title="Inventory"
      className="p-18! max-w-[1000px] mx-auto"
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
          disabled: loading || !isDirty,
        }}
      >
        <div
          className={cn(
            "flex flex-col gap-8 transition-opacity duration-200",
            loading && LOADING_DIM_CLASS,
          )}
        >
          <GeneralSection
            showHideInFiltering={showHideInFiltering}
            showBackorderNotice={showBackorderNotice}
          />
          <StockLevelSection showPreOrderInventory={showPreOrderInventory} />
          <BackorderDisplaySection
            messages={backorderMessages}
            columns={backorderMessageColumns}
            hasMessageErrors={hasMessageErrors}
            onAddMessage={handleAddMessage}
          />
          <EmailNotificationsSection />
        </div>
        {loading && <LoadingOverlay className="justify-start pt-40" />}
      </Form>
    </PageLayout>
  );
};

export default InventorySettingsPage;

"use client";

import Form from "@/components/form/Form";
import { LOADING_DIM_CLASS } from "@/components/LoadingOverlay/constant";
import LoadingOverlay from "@/components/LoadingOverlay/LoadingOverlay";
import AppTabs from "@/components/ui/AppTabs/AppTabs";
import PageLayout from "@/components/ui/PageLayout";
import { cn } from "@/lib/utils";
import { notFound } from "next/navigation";
import { ReactNode } from "react";
import DisplaySection from "../_components/DisplaySection";
import MiscellaneousSection from "../_components/MiscellaneousSection";
import SearchSection from "../_components/SearchSection";
import SecurityPrivacySection from "../_components/SecurityPrivacySection";
import ShareSection from "../_components/ShareSection";
import UrlStructureSection from "../_components/UrlStructureSection";
import WebsiteSection from "../_components/WebsiteSection";
import { GeneralTab, generalTabs, SETTINGS_ROUTE } from "../constant";
import useGeneralSettingsContainer from "./container";

// One panel per tab; a missing panel is a type error
const tabPanels: Record<GeneralTab, ReactNode> = {
  [GeneralTab.Website]: <WebsiteSection />,
  [GeneralTab.Display]: <DisplaySection />,
  [GeneralTab.Share]: <ShareSection />,
  [GeneralTab.UrlStructure]: <UrlStructureSection />,
  [GeneralTab.Search]: <SearchSection />,
  [GeneralTab.Security]: <SecurityPrivacySection />,
  [GeneralTab.Misc]: <MiscellaneousSection />,
};

const tabs = generalTabs.map((tab) => ({
  ...tab,
  content: tabPanels[tab.key],
}));

const GeneralSettingsPage = () => {
  const {
    isValidTab,
    form,
    activeTab,
    setActiveTab,
    loading,
    onSubmit,
    onInvalid,
    handleCancel,
  } = useGeneralSettingsContainer();

  // /manage/settings/<anything else> isn't a general settings tab
  if (!isValidTab) notFound();

  return (
    <PageLayout
      backButton={{ label: "Settings", href: SETTINGS_ROUTE }}
      title="Store Settings"
      titleProps={{
        description:
          "Update the settings in the form below and click Save, or click Cancel to keep the current settings.",
        descriptionClassName: "text-xl! 2xl:text-2xl!",
      }}
    >
      <Form
        form={form}
        onSubmit={onSubmit}
        onInvalid={onInvalid}
        bodyClassName="relative gap-0 border-0 bg-transparent p-0"
        footer={{
          submitText: "Save",
          onCancel: handleCancel,
          disabled: loading,
        }}
      >
        <AppTabs
          tabs={tabs}
          activeTab={activeTab}
          onTabChange={setActiveTab}
          variant="underline"
          className="mb-6"
          contentClassName={cn(
            "transition-opacity duration-200",
            loading && LOADING_DIM_CLASS,
          )}
        />
        {/* Spinner near the top so it's visible on long tabs */}
        {loading && <LoadingOverlay className="justify-start pt-40" />}
      </Form>
    </PageLayout>
  );
};

export default GeneralSettingsPage;

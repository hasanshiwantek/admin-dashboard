"use client";

import Form from "@/components/form/Form";
import { LOADING_DIM_CLASS } from "@/components/LoadingOverlay/constant";
import LoadingOverlay from "@/components/LoadingOverlay/LoadingOverlay";
import AppTabs from "@/components/ui/AppTabs/AppTabs";
import PageLayout from "@/components/ui/PageLayout";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";
import { SETTINGS_ROUTE } from "../constant";
import BuiltInSection from "./_components/BuiltInSection";
import GeneralSettingsSection from "./_components/GeneralSettingsSection";
import { CommentTab } from "./constant";
import useCommentSettingsContainer from "./container";

const CommentSettingsPage = () => {
  const {
    form,
    tabs,
    activeTab,
    setActiveTab,
    loading,
    saving,
    onSubmit,
    handleCancel,
  } = useCommentSettingsContainer();

  const panels: Record<CommentTab, ReactNode> = {
    [CommentTab.General]: <GeneralSettingsSection />,
    [CommentTab.BuiltIn]: <BuiltInSection />,
  };

  return (
    <PageLayout
      backButton={{ label: "Settings", href: SETTINGS_ROUTE }}
      title="Comments"
      titleProps={{
        description:
          "This page allows you to select which system you'd like to use for managing customer comments on your store.",
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
        <AppTabs
          tabs={tabs.map((tab) => ({ ...tab, content: panels[tab.key] }))}
          activeTab={activeTab}
          onTabChange={setActiveTab}
          variant="underline"
          className="mb-6"
          contentClassName={cn(
            "transition-opacity duration-200",
            loading && LOADING_DIM_CLASS,
          )}
        />
        {loading && <LoadingOverlay className="justify-start pt-40" />}
      </Form>
    </PageLayout>
  );
};

export default CommentSettingsPage;

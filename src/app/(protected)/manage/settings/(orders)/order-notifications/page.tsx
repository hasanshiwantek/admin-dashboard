"use client";

import Form from "@/components/form/Form";
import { LOADING_DIM_CLASS } from "@/components/LoadingOverlay/constant";
import LoadingOverlay from "@/components/LoadingOverlay/LoadingOverlay";
import AppTabs from "@/components/ui/AppTabs/AppTabs";
import PageLayout from "@/components/ui/PageLayout";
import { cn } from "@/lib/utils";
import TestNotificationSentModal from "@/Modals/SettingsModals/TestNotificationSentModal/TestNotificationSentModal";
import { ReactNode } from "react";
import EmailMessageSection from "./_components/EmailMessageSection";
import GeneralSettingsSection from "./_components/GeneralSettingsSection";
import { SETTINGS_ROUTE } from "../constant";
import { NotificationTab } from "./constant";
import useOrderNotificationsContainer from "./container";

const OrderNotificationsPage = () => {
  const {
    form,
    tabs,
    activeTab,
    setActiveTab,
    loading,
    saving,
    testing,
    onSubmit,
    onInvalid,
    handleTestNotification,
    testSentTo,
    closeTestSentModal,
    handleCancel,
  } = useOrderNotificationsContainer();

  const panels: Record<NotificationTab, ReactNode> = {
    [NotificationTab.General]: <GeneralSettingsSection />,
    [NotificationTab.EmailMessage]: (
      <EmailMessageSection
        testing={testing}
        onTestNotification={handleTestNotification}
      />
    ),
  };

  return (
    <PageLayout
      backButton={{ label: "Settings", href: SETTINGS_ROUTE }}
      title="Notifications"
      titleProps={{
        description:
          "Update the order notifications settings in the form below. To enable a new order notification method, select it from the list and click 'Save'. You will then see a tab to setup that notification method below.",
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
      <TestNotificationSentModal
        email={testSentTo}
        onClose={closeTestSentModal}
      />
    </PageLayout>
  );
};

export default OrderNotificationsPage;

"use client";

import Form from "@/components/form/Form";
import AppTabs from "@/components/ui/AppTabs/AppTabs";
import PageLayout from "@/components/ui/PageLayout";
import { ReactNode } from "react";
import { SETTINGS_ROUTE } from "../../(products)/constant";
import MailServersSection from "./_components/MailServersSection";
import WebHostsSection from "./_components/WebHostsSection";
import ZoneDetailsSection from "./_components/ZoneDetailsSection";
import { DnsTab } from "./constant";
import useDnsPageContainer from "./container";

const DnsPage = () => {
  const {
    form,
    tabs,
    activeTab,
    setActiveTab,
    storeDomain,
    mode,
    forwardKeys,
    handleAddForward,
    handleRemoveForward,
    mxRecords,
    mxColumns,
    handleAddMxRecord,
    records,
    recordColumns,
    handleAddRecord,
    handleRestoreZoneDefaults,
    handleMoveToCustomDomain,
    onSubmit,
    onInvalid,
    handleCancel,
  } = useDnsPageContainer();

  const panels: Record<DnsTab, ReactNode> = {
    [DnsTab.MailServers]: (
      <MailServersSection
        mode={mode}
        forwardKeys={forwardKeys}
        storeDomain={storeDomain}
        onAddForward={handleAddForward}
        onRemoveForward={handleRemoveForward}
        mxRecords={mxRecords}
        mxColumns={mxColumns}
        onAddMxRecord={handleAddMxRecord}
      />
    ),
    [DnsTab.WebHosts]: (
      <WebHostsSection
        records={records}
        columns={recordColumns}
        onAddRecord={handleAddRecord}
      />
    ),
    [DnsTab.ZoneDetails]: (
      <ZoneDetailsSection onRestoreDefaults={handleRestoreZoneDefaults} />
    ),
  };

  return (
    <PageLayout
      backButton={{ label: "Settings", href: SETTINGS_ROUTE }}
      title="Custom Domain"
      titleProps={{
        description:
          "A custom domain provides a unique brand identity for your store and can help you sell more.",
        titleClassName:
          "text-[36px] font-light leading-tight text-text-primary-light",
        descriptionClassName: "text-[1.4rem]! text-text-heading!",
      }}
    >
      <Form
        form={form}
        onSubmit={onSubmit}
        onInvalid={onInvalid}
        bodyClassName="gap-0 border-0 bg-transparent p-0"
        footer={{
          submitText: "Save",
          loadingText: "Saving...",
          onCancel: handleCancel,
        }}
      >
        <AppTabs
          tabs={tabs.map((tab) => ({
            ...tab,
            content: panels[tab.key as DnsTab],
          }))}
          activeTab={activeTab}
          onTabChange={setActiveTab}
          variant="underline"
          className="mb-10"
          tabClassName="px-5 text-[1.4rem]! font-normal text-muted-plum-gray"
          activeTabClassName="border-primary-blue text-text-heading"
        />
      </Form>
    </PageLayout>
  );
};

export default DnsPage;

"use client";

import AppTabs from "@/components/ui/AppTabs/AppTabs";
import PageLayout from "@/components/ui/PageLayout";
import Table from "@/components/ui/Table/Table";
import { ReactNode } from "react";
import { ADVANCED_TITLE_PROPS, SETTINGS_ROUTE } from "../constant";
import { staffLogColumns } from "./columns";
import {
  STAFF_LOG_DESCRIPTION,
  STORE_LOGS_DESCRIPTION,
  StoreLogTab,
  storeLogTabs,
} from "./constant";
import useStoreLogsContainer from "./container";

const StoreLogsPage = () => {
  const { logs, loading, error, pagination } = useStoreLogsContainer();

  const tabPanels: Record<StoreLogTab, ReactNode> = {
    [StoreLogTab.StaffActions]: (
      <div className="flex flex-col gap-6">
        <p className="text-[1.4rem]! text-gray-700!">{STAFF_LOG_DESCRIPTION}</p>
        <Table
          data={logs}
          columns={staffLogColumns}
          getRowId={(log) => log.id}
          loading={loading}
          error={error}
          emptyMessage="No staff logs found."
          selectable={false}
          hideRecordCount
          pagination={pagination}
        />
      </div>
    ),
  };

  const tabs = storeLogTabs.map((tab) => ({
    ...tab,
    content: tabPanels[tab.key],
  }));

  return (
    <PageLayout
      backButton={{ label: "Settings", href: SETTINGS_ROUTE }}
      title="Store logs"
      titleProps={{ description: STORE_LOGS_DESCRIPTION, ...ADVANCED_TITLE_PROPS }}
    >
      <AppTabs tabs={tabs} variant="underline" contentClassName="mt-6" />
    </PageLayout>
  );
};

export default StoreLogsPage;

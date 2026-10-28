"use client";
import React, { useEffect } from "react";
import AppTabs from "@/components/ui/AppTabs/AppTabs";
import { TabItem } from "@/components/ui/AppTabs/types";
import PageLayout from "@/components/ui/PageLayout";
import PageTitle from "@/components/ui/PageTitle";
import { useAppDispatch, useAppSelector } from "@/hooks/useReduxHooks";
import { getEmailMarketing } from "@/redux/slices/marketingSlice";
import GeneralSettings from "./_components/GeneralSettings";
import Subscriber from "./_components/Subscriber";


const tabs: TabItem[] = [
  { key: "general", label: "General settings", content: <GeneralSettings /> },
  { key: "subscribers", label: "Subscribers", content: <Subscriber /> },
];

const Page = () => {
  const dispatch = useAppDispatch();
  const { error } = useAppSelector((state: any) => state.marketingReducer);

  useEffect(() => {
    dispatch(getEmailMarketing());
  }, [dispatch]);

  return (
    <PageLayout>
      <PageTitle
        title="Email marketing"
        titleClassName="font-light! 2xl:text-5xl!"
        description={
          <p className="text-xl! text-gray-600">
            Use email marketing to advertise sales, promote your business and
            market specific products{" "}
            <a href="#" className="text-blue-600 hover:underline">
              [Learn more]
            </a>
            .
          </p>
        }
        hideActionButton
      />

      {error && (
        <div className="px-15 py-4">
          <div className="bg-red-50 border border-red-200 rounded p-4">
            <p className="text-red-600">{error}</p>
          </div>
        </div>
      )}

      <AppTabs
        tabs={tabs}
        defaultTab="general"
        variant="underline"
        contentClassName="mt-4"
        activeTabClassName="font-normal!"
      />
    </PageLayout>
  );
};

export default Page;
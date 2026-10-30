"use client";

import AppTabs from "@/components/ui/AppTabs/AppTabs";
import PageLayout from "@/components/ui/PageLayout";
import PageTitle from "@/components/ui/PageTitle";
import GeneralSettings from "./_components/GeneralSettings";
import Subscriber from "./_components/Subscriber";
import useEmailMarketingContainer from "./container";

const Page = () => {
  const {
    error,
    loading,
    emailMarketing,
    form,
    allowNewsletterSubscriptions,
    showNewsletterSummary,
    onSubmit,
    handleCancel,
    openDeleteModal,
    setOpenDeleteModal,
    deleteLoading,
    handleDeleteAll,
    handleExportSubscribers,
  } = useEmailMarketingContainer();

  const tabs = [
    {
      key: "general",
      label: "General settings",
      content: (
        <GeneralSettings
          form={form}
          loading={loading}
          allowNewsletterSubscriptions={allowNewsletterSubscriptions}
          showNewsletterSummary={showNewsletterSummary}
          onSubmit={onSubmit}
          handleCancel={handleCancel}
        />
      ),
    },
    {
      key: "subscribers",
      label: "Subscribers",
      content: (
        <Subscriber
          emailMarketing={emailMarketing}
          openDeleteModal={openDeleteModal}
          setOpenDeleteModal={setOpenDeleteModal}
          deleteLoading={deleteLoading}
          handleDeleteAll={handleDeleteAll}
          handleExportSubscribers={handleExportSubscribers}
        />
      ),
    },
  ];

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
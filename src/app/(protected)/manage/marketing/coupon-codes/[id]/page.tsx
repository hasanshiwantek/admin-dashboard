"use client";

import { Loader2 } from "lucide-react";
import AppTabs from "@/components/ui/AppTabs/AppTabs";
import Form from "@/components/form/Form";
import PageTitle from "@/components/ui/PageTitle";
import useCouponFormContainer from "./container";
import GeneralCouponTab from "../_components/GeneralCouponTab";

const CouponFormPage = () => {
  const {
    form,
    isEdit,
    loading,
    saving,
    activeTab,
    setActiveTab,
    onSubmit,
    handleCancel,
  } = useCouponFormContainer();

  const tabs = [
    {
      key: "general",
      label: "General",
      content: <GeneralCouponTab />,
    },
  ];

  if (isEdit && loading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
          <p className="text-gray-600">Loading coupon data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="p-10 border-b">
        <PageTitle
          title={isEdit ? "Edit coupon code" : "Create a coupon code"}
          description={
            isEdit
              ? "Update the coupon code details below."
              : "Coupon codes allow you to provide customers with discounts on products available for purchase from your store. Fill out the form below to create a unique coupon code."
          }
          hideActionButton
          containerClassName="mb-6"
          textContainerClassName="mb-0 gap-2"
          titleClassName="font-light! text-3xl! 2xl:text-5xl! text-gray-800!"
        />
      </div>

      <Form
        form={form}
        onSubmit={onSubmit}
        footer={{
          submitText: isEdit ? "Update Coupon Code" : "Create Coupon Code",
          onCancel: handleCancel,
          loading: saving,
          disabled: loading || saving,
        }}
        className="max-w-full"
        bodyClassName="p-10"
      >
        <div className="p-10">
          <AppTabs
            tabs={tabs}
            activeTab={activeTab}
            onTabChange={setActiveTab}
            variant="underline"
            maxVisibleTabs={2}
            className="w-full"
            tabClassName="px-6 py-3 text-[16px]!"
            activeTabClassName="border-b-2 border-blue-600"
            contentClassName="mt-6"
          />
        </div>
      </Form>
    </div>
  );
};

export default CouponFormPage;
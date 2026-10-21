"use client";

import PageLayout from "@/components/ui/PageLayout";
import ShippingMethodsSection from "../_components/ShippingMethodsSection";
import { SHIPPING_ROUTE } from "../constant";
import useShippingZonePageContainer from "./container";

const ShippingZonePage = () => {
  const {
    zoneName,
    staticMethods,
    realtimeMethods,
    methodsLoader,
    handleToggleMethod,
    handleMethodSaved,
  } = useShippingZonePageContainer();

  return (
    <PageLayout
      backButton={{ label: "Shipping", href: SHIPPING_ROUTE }}
      title={zoneName || "Shipping zone"}
      titleProps={{
        titleClassName:
          "text-[36px] font-light leading-tight text-text-primary-light",
      }}
      headerClassName="mb-8"
      className="min-h-screen gap-10 p-10"
    >
      <ShippingMethodsSection
        title="Static shipping quotes"
        methods={staticMethods}
        loading={methodsLoader}
        onToggle={handleToggleMethod}
        onMethodSaved={handleMethodSaved}
      />

      <ShippingMethodsSection
        title="Real time shipping quotes"
        methods={realtimeMethods}
        loading={methodsLoader}
        onToggle={handleToggleMethod}
        onMethodSaved={handleMethodSaved}
      />
    </PageLayout>
  );
};

export default ShippingZonePage;

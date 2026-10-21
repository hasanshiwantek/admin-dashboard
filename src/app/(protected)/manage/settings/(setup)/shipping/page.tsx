"use client";

import PageLayout from "@/components/ui/PageLayout";
import ShippingOriginSection from "./_components/ShippingOriginSection";
import ShippingZonesSection from "./_components/ShippingZonesSection";
import useShippingPageContainer from "./container";

const ShippingPage = () => {
  const { handleDeleteZone, handleToggleZone, loading, sourceAddress, zones } =
    useShippingPageContainer();

  return (
    <PageLayout
      backButton={{ label: "Settings", href: "/manage/settings" }}
      title="Shipping"
      titleProps={{
        titleClassName:
          "text-[36px] font-light leading-tight text-text-primary-light",
      }}
      headerClassName="mb-8"
      className="min-h-screen p-10"
    >
      <ShippingOriginSection
        address={sourceAddress}
        loading={loading}
      />

      <ShippingZonesSection
        zones={zones}
        loading={loading}
        onToggle={handleToggleZone}
        onDelete={handleDeleteZone}
      />
    </PageLayout>
  );
};

export default ShippingPage;

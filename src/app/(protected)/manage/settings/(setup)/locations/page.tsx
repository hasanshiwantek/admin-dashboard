"use client";

import PageLayout from "@/components/ui/PageLayout";
import Table from "@/components/ui/Table/Table";
import Link from "next/link";
import { SETTINGS_ROUTE } from "../../(products)/constant";
import { SHIPPING_ROUTE } from "../shipping/constant";
import { LOCATIONS_LEARN_MORE_URL } from "./constant";
import useLocationsPageContainer from "./container";

const LocationsPage = () => {
  const { locations, loading, columns, rowActions, handleAddLocation } =
    useLocationsPageContainer();

  return (
    <PageLayout
      backButton={{ label: "Settings", href: SETTINGS_ROUTE }}
      title="Locations"
      titleProps={{
        description: (
          <>
            Locations represent the physical places where you stock inventory.
            Go to{" "}
            <Link href={SHIPPING_ROUTE} className="text-primary-blue">
              Shipping
            </Link>{" "}
            to manage shipping and pickup methods.{" "}
            <a
              href={LOCATIONS_LEARN_MORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-blue hover:underline"
            >
              Learn more
            </a>
          </>
        ),
        buttonText: "Add new",
        onButtonClick: handleAddLocation,
        titleClassName:
          "text-[36px] font-light leading-tight text-text-primary-light",
        descriptionClassName: "text-[1.5rem]! text-text-heading!",
      }}
      className="min-h-screen p-10"
    >
      <Table
        data={locations}
        columns={columns}
        getRowId={(location) => location.id}
        loading={loading}
        rowActions={rowActions}
        emptyMessage="No locations found."
        selectable={false}
        hideRecordCount
      />
    </PageLayout>
  );
};

export default LocationsPage;

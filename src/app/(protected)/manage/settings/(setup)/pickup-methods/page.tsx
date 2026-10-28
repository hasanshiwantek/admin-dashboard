"use client";

import { Button } from "@/components/ui/Button";
import PageLayout from "@/components/ui/PageLayout";
import Table from "@/components/ui/Table/Table";
import DeletePickupMethodModal from "@/Modals/PickupMethodModals/DeletePickupMethodModal/DeletePickupMethodModal";
import { Plus } from "lucide-react";
import Link from "next/link";
import { SETTINGS_ROUTE } from "../../(products)/constant";
import SettingsCard from "@/components/SettingsCard/SettingsCard";
import { LOCATIONS_ROUTE } from "../locations/constant";
import { ADD_PICKUP_METHOD_ROUTE } from "./constant";
import usePickupMethodsPageContainer from "./container";

const PickupMethodsPage = () => {
  const {
    rows,
    loading,
    columns,
    sort,
    setSort,
    deleteTarget,
    handleDeleteOpenChange,
    handleDeleted,
  } = usePickupMethodsPageContainer();

  return (
    <PageLayout
      backButton={{ label: "Settings", href: SETTINGS_ROUTE }}
      title="Pick up in-store"
      titleProps={{
        description: "Configure pick up methods for your checkout.",
        titleClassName:
          "text-[36px] font-light leading-tight text-text-primary-light",
        descriptionClassName: "text-[1.5rem]! text-text-heading!",
        action: (
          <Link
            href={LOCATIONS_ROUTE}
            className="self-start text-[1.5rem] text-primary-blue hover:underline"
          >
            Manage locations
          </Link>
        ),
      }}
      className="min-h-screen p-10"
    >
      <SettingsCard
        title="Pick up methods"
        className="border-0 shadow-sm"
        action={
          <Button variant="primary" asChild size="xl">
            <Link href={ADD_PICKUP_METHOD_ROUTE}>
              <Plus className="size-6" />
              Add new
            </Link>
          </Button>
        }
      >
        <Table
          data={rows}
          columns={columns}
          getRowId={(method) => method.id}
          loading={loading}
          sort={sort}
          onSortChange={setSort}
          emptyMessage="No pick up methods yet."
          selectable={false}
          hideRecordCount
          bare
        />
      </SettingsCard>

      {deleteTarget && (
        <DeletePickupMethodModal
          pickupMethod={{ id: deleteTarget.id, name: deleteTarget.name }}
          open
          onOpenChange={handleDeleteOpenChange}
          onDeleted={handleDeleted}
        />
      )}
    </PageLayout>
  );
};

export default PickupMethodsPage;

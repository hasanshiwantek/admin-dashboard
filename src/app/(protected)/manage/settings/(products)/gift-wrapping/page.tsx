"use client";

import { Button } from "@/components/ui/Button";
import PageLayout from "@/components/ui/PageLayout";
import Table from "@/components/ui/Table/Table";
import DeleteGiftWrappingModal from "@/Modals/SettingsModals/DeleteGiftWrappingModal/DeleteGiftWrappingModal";
import Link from "next/link";
import SettingsNotice from "../../_components/SettingsNotice";
import { SETTINGS_ROUTE } from "../constant";
import { giftWrappingColumns } from "./columns";
import { ADD_GIFT_WRAPPING_ROUTE } from "./constant";
import useGiftWrappingContainer from "./container";

const GiftWrappingPage = () => {
  const {
    giftWrappings,
    loading,
    isEmpty,
    selectedIds,
    rowDeleteId,
    rowActions,
    handleToggleRow,
    handleToggleAll,
    handleDeleted,
    closeRowDelete,
  } = useGiftWrappingContainer();

  return (
    <PageLayout
      backButton={{ label: "Settings", href: SETTINGS_ROUTE }}
      title="Gift Wrapping"
      titleProps={{
        description:
          "Customers can choose to have items in their order gift wrapped. Available gift wrapping options for customer purchases are shown below.",
        descriptionClassName: "text-xl! 2xl:text-2xl!",
      }}
    >
      <div className="flex flex-col gap-6">
        {isEmpty && (
          <SettingsNotice tone="success">
            You do not have any gift wrapping options yet.
          </SettingsNotice>
        )}

        <div className="flex items-center gap-3">
          <Button asChild variant="outline">
            <Link href={ADD_GIFT_WRAPPING_ROUTE}>
              Add a New Gift Wrapping Option
            </Link>
          </Button>
          <DeleteGiftWrappingModal
            ids={selectedIds}
            onDeleted={handleDeleted}
            trigger={
              <Button
                type="button"
                variant="outline"
                disabled={!selectedIds.length}
              >
                Delete Selected
              </Button>
            }
          />
        </div>

        {!isEmpty && (
          <Table
            data={giftWrappings}
            columns={giftWrappingColumns}
            getRowId={(giftWrapping) => giftWrapping.id}
            loading={loading}
            selectedIds={selectedIds}
            onToggleRow={handleToggleRow}
            onToggleAll={handleToggleAll}
            selectAllInHeader
            rowActions={rowActions}
            hideRecordCount
          />
        )}
      </div>

      <DeleteGiftWrappingModal
        ids={rowDeleteId ? [rowDeleteId] : []}
        open={!!rowDeleteId}
        onOpenChange={(open) => !open && closeRowDelete()}
        onDeleted={handleDeleted}
      />
    </PageLayout>
  );
};

export default GiftWrappingPage;

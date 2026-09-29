"use client";

import ConfirmationModal from "@/app/components/orders/edit/CaptuedPaymentModal";
import PageLayout from "@/components/ui/PageLayout";
import PageTitle from "@/components/ui/PageTitle";
import Table from "@/components/ui/Table/Table";
import useBannerListingPageContainer from "./container";

const BannerListingPage = () => {
  const {
    table,
    getRowActions,
    bannerList,
    loading,
    columns,
    pagination,
    bulkActions,
    deleteLoading,
    showDeleteConfirm,
    deleteMessage,
    closeDeleteConfirm,
    confirmDelete,
  } = useBannerListingPageContainer();

  return (
    <PageLayout>
      <PageTitle
        title={"Banners"}
        titleClassName={"text-6xl!"}
        description={
          "Use banners to advertise sales, display promotions, share important information and to add special design elements. Only the most recently created banner will show even if multiple banners are set to visible (and have an active date range)"
        }
        descriptionClassName={"text-2xl!"}
        hideActionButton
      />
      <Table<any>
        data={bannerList}
        loading={loading}
        columns={columns}
        rowActions={(banner) => getRowActions(banner)}
        getRowId={(banner) => banner.id}
        emptyMessage="No banners yet."
        hideRecordCount
        bulkActions={bulkActions}
        selectAllInHeader
        selectable
        sort={table.sort}
        onSortChange={table.setSort}
        selectedIds={table.selectedIds}
        alwaysShowBulkActions
        onToggleRow={(id, checked) => table.toggleSelect(Number(id), checked)}
        onToggleAll={(checked, allIds) =>
          table.toggleSelectAll(checked, allIds.map(Number))
        }
        pagination={pagination}
        className="p-0!"
        selectionHeaderClassName="p-0! border-t-0!"
        selectionInfoClassName="xl:p-0!"
        topPaginationClassName="xl:p-4!"
        bottomPaginationClassName="xl:p-4!"
      />
      <ConfirmationModal
        open={showDeleteConfirm}
        onClose={closeDeleteConfirm}
        onConfirm={confirmDelete}
        title="Delete Banner"
        message={deleteMessage}
        confirmText="Delete"
        cancelText="Cancel"
        loading={deleteLoading}
      />
    </PageLayout>
  );
};

export default BannerListingPage;

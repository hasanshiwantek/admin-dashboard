"use client";
import ConfirmationModal from "@/app/(protected)/manage/user-settings/additional-authentication/helpers/ConfirmationModal";
import Table from "@/components/ui/Table/Table";
import { Button } from "@/components/ui/Button";
import useAllReviewsContainer from "./helpers/useAllReviewsContainer";
export default function AllReviews() {
  const {
    filteredReviews,
    loading,
    error,
    selectedIds,
    currentPage,
    setCurrentPage,
    perPage,
    setPerPage,
    totalPages,
    showDeleteModal,
    setShowDeleteModal,
    handleSelectAll,
    handleSelectOne,
    handleDeleteSelected,
    confirmDelete,
    handleApproveSelected,
    handleDisapproveSelected,
    getRowActions,
    handleProductClick,
    Alert,
    columns,
  } = useAllReviewsContainer();

  if (error) {
    return (
      <div className="text-center py-10 text-red-500 text-lg">
        Error: {error}
      </div>
    );
  }

  return (
    <div className="p-10">
      <h1 className="!text-[30px] 2xl:!text-[3.2rem] !font-normal !text-[#34313F] !my-5">
        Reviews
      </h1>
      <p className="text-[#34313F] !text-[15px] 2xl:!text-[1.4rem] mb-6">
        When someone writes a review for a product from your site it will appear
        in the list below.
      </p>

      <div className="bg-white p-4 shadow-md rounded-sm">
        {/* Toolbar */}
        <div className="flex flex-wrap gap-3 items-center mb-4">
          <Button
            variant="outline"
            onClick={handleDeleteSelected}
            disabled={!selectedIds.length}
          >
            Delete Selected
          </Button>
          <Button
            variant="outline"
            onClick={handleApproveSelected}
            disabled={!selectedIds.length}
          >
            Approve Selected
          </Button>
          <Button
            variant="outline"
            onClick={handleDisapproveSelected}
            disabled={!selectedIds.length}
          >
            Disapprove Selected
          </Button>
        </div>

        {/* Generic Table */}
        <Table
          bare
          data={filteredReviews}
          columns={columns}
          getRowId={(review) => review.id}
          loading={loading}
          error={error}
          emptyMessage="No reviews yet."
          hideRecordCount
          selectable
          selectAllInHeader
          selectedIds={selectedIds}
          onToggleRow={(id, checked) => handleSelectOne(Number(id), checked)}
          onToggleAll={handleSelectAll}
          rowActions={getRowActions}
          pagination={{
            currentPage,
            totalPages,
            perPage,
            onPageChange: setCurrentPage,
            onPerPageChange: (val) => {
              setPerPage(val);
              setCurrentPage(1);
            },
          }}
        />
      </div>

      <ConfirmationModal
        open={showDeleteModal}
        onOpenChange={setShowDeleteModal}
        variant="warning"
        title="Delete reviews?"
        description="Are you sure you want to delete the selected reviews?"
        onConfirm={confirmDelete}
      />

      <Alert />
    </div>
  );
}

"use client";

import { Button } from "@/components/ui/Button";
import PageLayout from "@/components/ui/PageLayout";
import Table from "@/components/ui/Table/Table";
import DeleteReviewsModal from "@/Modals/ReviewModals/DeleteReviewsModal/DeleteReviewsModal";
import PreviewReviewModal from "@/Modals/ReviewModals/PreviewReviewModal/PreviewReviewModal";
import useReviewsPageContainer from "./container";

const ReviewsPage = () => {
  const {
    table,
    rows,
    loading,
    error,
    columns,
    selectedIds,
    setSelectedIds,
    handleApproveSelected,
    handleDisapproveSelected,
    deleteOpen,
    setDeleteOpen,
    handleDeleted,
    previewId,
    previewOpen,
    setPreviewOpen,
    pagination,
  } = useReviewsPageContainer();

  return (
    <PageLayout
      title="Reviews"
      titleProps={{
        description:
          "When someone writes a review for a product from your site it will appear in the list below.",
        titleClassName:
          "my-5! text-[30px]! font-normal! text-text-heading! 2xl:text-[3.2rem]!",
        descriptionClassName:
          "mb-6 text-[15px]! text-text-heading! 2xl:text-[1.4rem]!",
      }}
    >
      <div className="rounded-sm bg-white p-4 shadow-md">
        <div className="mb-4 flex flex-wrap items-center gap-3">
          <Button
            type="button"
            variant="outline"
            size="xl"
            onClick={() => setDeleteOpen(true)}
            disabled={!selectedIds.length}
          >
            Delete Selected
          </Button>
          <Button
            type="button"
            variant="outline"
            size="xl"
            onClick={handleApproveSelected}
            disabled={!selectedIds.length}
          >
            Approve Selected
          </Button>
          <Button
            type="button"
            variant="outline"
            size="xl"
            onClick={handleDisapproveSelected}
            disabled={!selectedIds.length}
          >
            Disapprove Selected
          </Button>
        </div>

        <Table
          bare
          data={rows}
          columns={columns}
          getRowId={(review) => review.id}
          loading={loading}
          error={error}
          emptyMessage="No reviews yet."
          hideRecordCount
          selectable
          selectAllInHeader
          selectedIds={selectedIds}
          onToggleRow={(id, checked) => table.toggleSelect(Number(id), checked)}
          onToggleAll={(checked, allIds) =>
            setSelectedIds(checked ? allIds.map(Number) : [])
          }
          pagination={pagination}
        />
      </div>

      <DeleteReviewsModal
        reviewIds={selectedIds}
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        onDeleted={handleDeleted}
      />
      <PreviewReviewModal
        reviewId={previewId}
        open={previewOpen}
        onOpenChange={setPreviewOpen}
      />
    </PageLayout>
  );
};

export default ReviewsPage;

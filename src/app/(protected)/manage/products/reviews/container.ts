import useTableContainer from "@/components/ui/Table/TableContainer";
import { ActionEnums } from "@/const/appConstants";
import { useAppDispatch, useAppSelector } from "@/hooks/useReduxHooks";
import {
  approveReview,
  disapproveReview,
  fetchAllReviews,
} from "@/redux/slices/reviewSlice";
import { errorMessage } from "@/utils/message";
import { getSelectedStore } from "@/utils/storage";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { getStorefrontProductUrl } from "../utils";
import { getReviewColumns } from "./columns";
import {
  DEFAULT_REVIEWS_PAGE_SIZE,
  editReviewRoute,
  ReviewBulkStatus,
} from "./constant";
import type { Review } from "./type";

const useReviewsPageContainer = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const { reviews, reviewsLoading, error, pagination } = useAppSelector(
    (state) => state.review,
  ) as {
    reviews: Review[] | null;
    reviewsLoading: boolean;
    error: string | null;
    pagination: { lastPage?: number } | null;
  };
  const rows = reviews ?? [];

  const table = useTableContainer<number>({
    defaultPerPage: DEFAULT_REVIEWS_PAGE_SIZE,
    fetcher: ({ page, pageSize }) =>
      dispatch(fetchAllReviews({ page, pageSize: Number(pageSize) })),
  });
  const { selectedIds, setSelectedIds, clearSelection, refetch } = table;

  const [previewId, setPreviewId] = useState<number | null>(null);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const setSelectedStatus = async (status: ReviewBulkStatus) => {
    if (!selectedIds.length) return;
    const thunk =
      status === ReviewBulkStatus.Approved ? approveReview : disapproveReview;
    const result = await dispatch(thunk({ ids: selectedIds, status }));
    if (thunk.rejected.match(result)) {
      return errorMessage(result.payload as string);
    }
    clearSelection();
    refetch();
  };

  const handleProductClick = (review: Review) => {
    const baseUrl = getSelectedStore()?.baseUrl;
    if (!baseUrl) return errorMessage("Store URL or product URL not found.");
    window.open(
      getStorefrontProductUrl(baseUrl, review.product?.product_url ?? ""),
      "_blank",
    );
  };

  const handleReviewAction = (review: Review) => (action: ActionEnums) => {
    switch (action) {
      case ActionEnums.PREVIEW:
        setPreviewId(review.id);
        return setPreviewOpen(true);
      case ActionEnums.EDIT:
        return router.push(editReviewRoute(review.id));
    }
  };

  return {
    table,
    rows,
    // Only the first load shows skeletons, so a refresh keeps rows mounted
    loading: reviewsLoading && !rows.length,
    error,
    columns: getReviewColumns({
      onProductClick: handleProductClick,
      onAction: handleReviewAction,
    }),
    selectedIds,
    setSelectedIds,
    handleApproveSelected: () => setSelectedStatus(ReviewBulkStatus.Approved),
    handleDisapproveSelected: () =>
      setSelectedStatus(ReviewBulkStatus.Disapproved),
    deleteOpen,
    setDeleteOpen,
    handleDeleted: () => {
      clearSelection();
      refetch();
    },
    previewId,
    previewOpen,
    setPreviewOpen,
    pagination: {
      currentPage: table.page,
      totalPages: pagination?.lastPage ?? 1,
      perPage: table.perPage,
      onPageChange: table.setPage,
      onPerPageChange: table.setPerPage,
    },
  };
};

export default useReviewsPageContainer;

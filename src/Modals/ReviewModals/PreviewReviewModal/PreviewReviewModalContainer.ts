import type { Review } from "@/app/(protected)/manage/products/reviews/type";
import { useAppDispatch, useAppSelector } from "@/hooks/useReduxHooks";
import { getReviewById } from "@/redux/slices/reviewSlice";
import { useEffect } from "react";
import { PreviewReviewModalProps } from "./type";

const usePreviewReviewContainer = ({
  open,
  reviewId,
}: Pick<PreviewReviewModalProps, "open" | "reviewId">) => {
  const dispatch = useAppDispatch();
  const currentReview = useAppSelector(
    (state) => state.review.currentReview,
  ) as Review | null;

  useEffect(() => {
    if (open && reviewId) dispatch(getReviewById({ id: reviewId }));
  }, [open, reviewId, dispatch]);

  // Ignore a review left in the store from an earlier preview or edit
  const review = reviewId && currentReview?.id === reviewId ? currentReview : null;

  // Skeleton until this review is in, including the frame before the request starts
  return { review, loading: !review };
};

export default usePreviewReviewContainer;

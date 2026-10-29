"use client";

import { getReviewAuthor } from "@/app/(protected)/manage/products/reviews/utils";
import Modal from "@/components/Modal/Modal";
import PreviewReviewSkeleton from "@/components/Skeletons/PreviewReviewSkeleton";
import SkeletonLoader from "@/components/Skeletons/SkeletonLoader";
import StarRating from "@/components/StarRating/StarRating";
import usePreviewReviewContainer from "./PreviewReviewModalContainer";
import { PreviewReviewModalProps } from "./type";

const PreviewReviewModal = ({
  reviewId,
  open,
  onOpenChange,
}: PreviewReviewModalProps) => {
  const { review, loading } = usePreviewReviewContainer({ open, reviewId });

  return (
    <Modal
      open={open}
      onOpenChange={onOpenChange}
      title="Preview Review"
      titleClassName="text-4xl"
      size="xl"
      footer={false}
    >
      <SkeletonLoader loading={loading} skeleton={<PreviewReviewSkeleton />}>
        <div className="flex min-h-40 flex-col">
          <h2 className="mb-1 text-3xl font-bold text-gray-900">
            {review?.subject || review?.name}
          </h2>
          <StarRating rating={Number(review?.rating ?? 0)} />

          <hr className="my-3 border-gray-300" />

          <p className="mb-1 text-[1.4rem]! font-semibold text-gray-800">
            <span className="font-bold">Product:</span>{" "}
            {review?.product?.name || "-"}
          </p>
          <p className="text-[1.4rem]! text-gray-800">
            <span className="font-bold">Posted By:</span>{" "}
            {review ? getReviewAuthor(review) : "-"}
          </p>

          <hr className="my-3 border-gray-300" />

          <p className="text-[1.4rem]! whitespace-pre-line text-gray-700">
            {review?.comment}
          </p>
        </div>
      </SkeletonLoader>
    </Modal>
  );
};

export default PreviewReviewModal;

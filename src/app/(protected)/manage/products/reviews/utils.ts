import type { Review } from "./type";

export const isReviewApproved = (review: Review) => Number(review.approved) === 1;

export const getReviewAuthor = (review: Review) =>
  review.name || review.user?.name || "—";

export const formatReviewDate = (date?: string | null) =>
  date
    ? new Date(date).toLocaleDateString("en-US", {
        month: "short",
        day: "2-digit",
        year: "numeric",
      })
    : "—";

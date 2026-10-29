import type { Review } from "../type";
import { RatingValue, ReviewFormNames, ReviewStatus } from "./constant";
import type { ReviewFormValues, ReviewPayload } from "./type";

export const transformGetReview = (review: Review): ReviewFormValues => ({
  [ReviewFormNames.Name]: review.subject ?? "",
  [ReviewFormNames.UserName]: review.name || review.user?.name || "",
  [ReviewFormNames.Comment]: review.comment ?? "",
  [ReviewFormNames.Approved]:
    Number(review.approved) === 1 ? ReviewStatus.Approved : ReviewStatus.Pending,
  [ReviewFormNames.Rating]: String(
    review.rating ?? RatingValue.Five,
  ) as RatingValue,
});

export const transformPostReview = (values: ReviewFormValues): ReviewPayload => ({
  subject: values.name,
  comment: values.comment,
  name: values.userName ?? "",
  approved: values.approved === ReviewStatus.Approved,
  rating: Number(values.rating),
});

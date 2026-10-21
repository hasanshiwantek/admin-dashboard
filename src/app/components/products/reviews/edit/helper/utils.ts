import { RatingValue, ReviewField, ReviewStatus } from "./constant";
import { ReviewFormValues } from "./type";
export const transformGetReviewPayload = (review: any): ReviewFormValues => ({
  [ReviewField.Name]: review?.subject ?? "",
  [ReviewField.UserName]: review?.name || review?.user?.name || "",
  [ReviewField.Comment]: review?.comment ?? "",
  [ReviewField.Approved]: String(
    review?.approved ?? ReviewStatus.Pending,
  ) as ReviewStatus,
  [ReviewField.Rating]: String(
    review?.rating ?? RatingValue.Five,
  ) as RatingValue,
});

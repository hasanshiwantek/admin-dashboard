import { ReviewFormValues } from "./type";

export enum RatingValue {
  One = "1",
  Two = "2",
  Three = "3",
  Four = "4",
  Five = "5",
}
export enum ReviewStatus {
  Pending = "0",
  Approved = "1",
}
export enum ReviewField {
  Name = "name",
  Comment = "comment",
  UserName = "userName",
  Approved = "approved",
  Rating = "rating",
}
export const RATING_OPTIONS = [
  { value: RatingValue.One, label: "Terrible (1 Star)" },
  { value: RatingValue.Two, label: "Bad (2 Stars)" },
  { value: RatingValue.Three, label: "OK (3 Stars)" },
  { value: RatingValue.Four, label: "Good (4 Stars)" },
  { value: RatingValue.Five, label: "Excellent (5 Stars)" },
];
export const REVIEW_STATUS_OPTIONS = [
  { value: ReviewStatus.Pending, label: "Pending" },
  { value: ReviewStatus.Approved, label: "Approved" },
];
export const reviewDefaultValues: ReviewFormValues = {
  [ReviewField.Name]: "",
  [ReviewField.UserName]: "",
  [ReviewField.Comment]: "",
  [ReviewField.Approved]: ReviewStatus.Pending,
  [ReviewField.Rating]: RatingValue.Five,
};

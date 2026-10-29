import { SelectOption } from "@/components/ui/Select";
import type { ReviewFormValues } from "./type";

export enum ReviewFormNames {
  Name = "name",
  Comment = "comment",
  UserName = "userName",
  Approved = "approved",
  Rating = "rating",
}

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

export const RatingOptions: SelectOption[] = [
  { value: RatingValue.One, label: "Terrible (1 Star)" },
  { value: RatingValue.Two, label: "Bad (2 Stars)" },
  { value: RatingValue.Three, label: "OK (3 Stars)" },
  { value: RatingValue.Four, label: "Good (4 Stars)" },
  { value: RatingValue.Five, label: "Excellent (5 Stars)" },
];

export const ReviewStatusOptions: SelectOption[] = [
  { value: ReviewStatus.Pending, label: "Pending" },
  { value: ReviewStatus.Approved, label: "Approved" },
];

export const reviewDefaults: ReviewFormValues = {
  [ReviewFormNames.Name]: "",
  [ReviewFormNames.UserName]: "",
  [ReviewFormNames.Comment]: "",
  [ReviewFormNames.Approved]: ReviewStatus.Pending,
  [ReviewFormNames.Rating]: RatingValue.Five,
};

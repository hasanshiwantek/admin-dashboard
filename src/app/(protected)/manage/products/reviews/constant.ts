import { ActionItem } from "@/components/ActionButton/type";
import { ActionEnums } from "@/const/appConstants";

export const REVIEWS_ROUTE = "/manage/products/reviews";
export const editReviewRoute = (id: number | string) => `${REVIEWS_ROUTE}/${id}`;

export const DEFAULT_REVIEWS_PAGE_SIZE = "20";

export enum ReviewBulkStatus {
  Approved = "approved",
  Disapproved = "disapproved",
}

export const REVIEW_ROW_ACTIONS: ActionItem[] = [
  { type: ActionEnums.PREVIEW, label: "Preview" },
  { type: ActionEnums.EDIT, label: "Edit" },
];

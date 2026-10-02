import { PromotionDisplay, PromotionStatus } from "./constant";

export type DiscountKind = PromotionDisplay.Automatic | PromotionDisplay.Coupon;

export type DiscountStatus =
  | PromotionStatus.Active
  | PromotionStatus.Inactive
  | PromotionStatus.Archived;

export type DiscountToggleStatus = Exclude<
  DiscountStatus,
  PromotionStatus.Archived
>;

export type DiscountType = string;

export type DiscountChannel = string;

export interface Promotion {
  id: number;
  kind: DiscountKind;
  name: string;
  displayName: string;
  isFeatured: boolean;
  currency: string;
  type: DiscountType;
  channel: DiscountChannel;
  status: DiscountStatus;
  active: boolean;
  usesUsed: number;
  usesLimit: number | null;
  usesLabel: string;
  codesCount: number;
  codesLabel: string | null;
  code: string | null;
  startDate: string;
  endDate: string | null;
  startLabel: string;
  endLabel: string | null;
}

export interface PromotionListResponse {
  data?: { items?: Promotion[] };
  pagination?: {
    total?: number;
    totalPages?: number;
    lastPage?: number;
  };
}

export interface UpdatePromotionStatusArgs {
  ids: number[];
  status: DiscountStatus;
  /** Status to roll back to on failure. When set, the rows are updated
   *  optimistically; otherwise the caller refetches on success. */
  previousStatus?: DiscountStatus;
}

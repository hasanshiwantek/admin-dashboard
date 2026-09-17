export interface CouponCodeForm {
  couponCode: string;
  couponName: string;
  discountType:
    | "per_total_discount"
    | "per_item_discount"
    | "percentage_discount"
    | "shipping_discount"
    | "free_shipping";
  discountAmount: string;
  minimumPurchase: string;
  limitTotalUses: boolean;
  limitUsesPerCustomer: boolean;
  excludeCartDiscounts: boolean;
  enabled: boolean;
  expiration: string;
  appliesToCategories: boolean;
  appliesToProducts: boolean;
  categoryIds: string[];
  productIds: string | null;
  limitByLocation: boolean;
  limitByShipping: boolean;
}

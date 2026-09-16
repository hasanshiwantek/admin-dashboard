export interface CouponCodeForm {
  couponCode: string;
  couponName: string;
  discountType:
    | "dollarAmountOrder"
    | "dollarAmountItem"
    | "percentageItem"
    | "dollarAmountShipping"
    | "freeShipping";
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

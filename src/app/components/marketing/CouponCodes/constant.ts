import { CouponCodeForm } from "./types";

export const DefaultCouponCodeFormValues: CouponCodeForm = {
  couponCode: "",
  couponName: "",
  discountType: "dollarAmountOrder",
  discountAmount: "0.00",
  minimumPurchase: "0.00",
  limitTotalUses: false,
  limitUsesPerCustomer: false,
  excludeCartDiscounts: false,
  enabled: true,
  expiration: "",
  appliesToCategories: true,
  appliesToProducts: false,
  categoryIds: [],
  productIds: null,
  limitByLocation: false,
  limitByShipping: false,
};

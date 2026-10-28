import { toBoolean } from "@/lib/utils";
import { CouponCodeForm } from "./types";


export const mapCouponDataToForm = (
  couponData: any,
): CouponCodeForm => {
  

  return {
    couponCode: couponData.couponCode || "",
    couponName: couponData.couponName || "",
    discountType:
      couponData.discountType || "per_total_discount",
    discountAmount: couponData.discountAmount || "0.00",
    minimumPurchase: couponData.minimumPurchase || "0.00",

    limitTotalUses: toBoolean(couponData.limitTotalUses),
    limitUsesPerCustomer: toBoolean(
      couponData.limitUsesPerCustomer,
    ),
    excludeCartDiscounts: toBoolean(
      couponData.excludeCartDiscounts,
    ),
    enabled: toBoolean(couponData.enabled),
    expiration: couponData.expiration || "",

    appliesTo: couponData.appliesTo || "all",
    appliesToCategories: toBoolean(
      couponData.appliesToCategories,
    ),
    appliesToProducts: toBoolean(
      couponData.appliesToProducts,
    ),

    categoryIds: couponData.categoryIds || [],
    productIds: couponData.productIds || null,

    limitByLocation: toBoolean(couponData.limitByLocation),
    limitByShipping: toBoolean(couponData.limitByShipping),
  };
};
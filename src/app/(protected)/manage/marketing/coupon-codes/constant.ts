import { ActionEnums } from "@/const/appConstants";
import { CouponCodeForm } from "./types"

export enum AppliesTo {
  Categories = "categories",
  Products = "products",
}

export const DefaultCouponCodeFormValues: CouponCodeForm = {
  couponCode: "",
  couponName: "",
  discountType: "per_total_discount",
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
productIds: [],
  limitByLocation: false,
  limitByShipping: false,
  appliesTo: AppliesTo.Categories
};

export enum DiscountType {
  PerTotalDiscount = "per_total_discount",
  FreeShipping = "free_shipping",
}

export const DiscountTypeOptions = [
  {
    label: "Dollar amount off the order total",
    value: DiscountType.PerTotalDiscount,
  },
];


export   const values = [9, 11, 13];
export const AppliesToOptions = [
  {
    label: "This coupon code can be used with these categories:",
    value: AppliesTo.Categories,
  },
  {
    label:
      "This coupon code will be applied if any of the following products are added to the cart:",
    value: AppliesTo.Products,
  },
] as const;

export enum CouponFormFields {
  CouponCode = "couponCode",
  CouponName = "couponName",
  DiscountType = "discountType",
  DiscountAmount = "discountAmount",
  MinimumPurchase = "minimumPurchase",
  LimitTotalUses = "limitTotalUses",
  LimitUsesPerCustomer = "limitUsesPerCustomer",
  ExcludeCartDiscounts = "excludeCartDiscounts",
  Enabled = "enabled",
  Expiration = "expiration",
  AppliesTo = "appliesTo",
  CategoryIds = "categoryIds",
  ProductIds = "productIds",
  AppliesToCategories = "appliesToCategories",
  AppliesToProducts = "appliesToProducts",
  LimitByLocation = "limitByLocation",
  LimitByShipping = "limitByShipping",
}
export const couponActions = [
  { type: ActionEnums.EDIT, label: "Edit" },
  { type: ActionEnums.COPY, label: "Copy to Clipboard" },
  { type: ActionEnums.VIEW, label: "View Orders" },
  { type: ActionEnums.DELETE, label: "Delete", className: "text-red-600" },
];

export const CouponCodesRoute = "/manage/marketing/coupon-codes";
export const CouponAddRoute = "/manage/marketing/coupon-codes/new";
export const CouponEditRoute = (id: number | string) =>
  `/manage/marketing/coupon-codes/${id}`;
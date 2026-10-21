import {
  BannerDateType,
  BannerField,
  BannerLocation,
  BannerPlacement,
} from "@/app/(protected)/manage/marketing/banners/constant";
import { needsLocationId } from "@/app/(protected)/manage/marketing/banners/utils";
import { BlogFormFieldName } from "@/app/components/blog/constant";
import { boolean, date, object, ref, string, number, mixed, array, InferType } from "yup";

export const bannerSchema = object({
  [BannerField.Title]: string().trim().required("Banner name is required"),
  [BannerField.Content]: string().nullable(),
  [BannerField.LocationType]: string()
    .oneOf(
      Object.values(BannerLocation),
      "Choose where this banner should appear",
    )
    .required("Choose where this banner should appear"),
  [BannerField.LocationId]: string()
    .nullable()
    .default(null)
    .when(BannerField.LocationType, ([type], schema) =>
      needsLocationId(type)
        ? schema.required(
            type === BannerLocation.Brand
              ? "Choose a brand"
              : "Choose a category",
          )
        : schema,
    ),
  [BannerField.DateType]: string()
    .oneOf(Object.values(BannerDateType))
    .required(),
  [BannerField.StartDate]: date()
    .nullable()
    .default(null)
    .when(BannerField.DateType, {
      is: BannerDateType.Range,
      then: (schema) => schema.required("Start date is required"),
    }),
  [BannerField.EndDate]: date()
    .nullable()
    .default(null)
    .when(BannerField.DateType, {
      is: BannerDateType.Range,
      then: (schema) =>
        schema
          .required("End date is required")
          .min(
            ref(BannerField.StartDate),
            "End date must be after the start date",
          ),
    }),
  [BannerField.Visible]: boolean().default(true).nullable(),
  [BannerField.Placement]: string()
    .oneOf(Object.values(BannerPlacement), "Choose a placement")
    .required("Choose a placement"),
});

export const storeProfileSchema = object({
  storeDisplayName: string().required("Store display name is required"),
  address: string().required("Address is required"),
  addressType: string().required("Address type is required"),
  email: string()
    .email("Please enter a valid email address")
    .required("Email is required"),
  phone: string().default(""),
});
export const CategorySchema = object({
  name: string().trim().required("Enter category display name"),
  channel: string().required("Channel is required"),
  parentId: number().nullable(),
  isVisible: boolean(),
});
export const BlogSchema = object({
  [BlogFormFieldName.Title]: string().trim().required("Title is required"),
  [BlogFormFieldName.Body]: string().trim().nullable().default(""),
  [BlogFormFieldName.Author]: string().trim().nullable().default(""),
  [BlogFormFieldName.Tags]: string().trim().nullable().default(""),
  [BlogFormFieldName.PostUrl]: string().trim().nullable().default(""),
  [BlogFormFieldName.MetaDescription]: string()
    .trim()
    .nullable()
    .max(160)
    .default(""),
  [BlogFormFieldName.Thumbnail]: mixed<FileList>().nullable().optional(),
});

export const CouponCodeSchema = object({
  couponCode: string().trim().required("Coupon code is required"),

  couponName: string().trim().required("Coupon name is required"),

  discountType: string()
    .oneOf([
      "per_total_discount",
      "per_item_discount",
      "percentage_discount",
      "shipping_discount",
      "free_shipping",
    ])
    .defined(),

  discountAmount: string().defined(),
  minimumPurchase: string().defined(),

  limitTotalUses: boolean().defined(),
  limitUsesPerCustomer: boolean().defined(),
  excludeCartDiscounts: boolean().defined(),
  enabled: boolean().defined(),

  expiration: string().defined(),

  appliesToCategories: boolean().defined(),
  appliesToProducts: boolean().defined(),

  categoryIds: array().of(string().defined()).defined(),

  productIds: string().nullable().defined(),

  limitByLocation: boolean().defined(),
  limitByShipping: boolean().defined(),

  appliesTo: string()
    .oneOf(["categories", "products"])
    .required("Choose what this coupon applies to"),
})
  .test("discount-amount-validation", function (values) {
    if (!values || values.discountType === "free_shipping") {
      return true;
    }

    const amount = values.discountAmount;

    if (!amount || amount.trim() === "") {
      return this.createError({
        path: "discountAmount",
        message: "Discount amount is required",
      });
    }

    if (!(Number(amount) > 0)) {
      return this.createError({
        path: "discountAmount",
        message: "Discount amount must be greater than 0",
      });
    }

    return true;
  })
  .test("category-validation", function (values) {
    if (
      values?.appliesToCategories &&
      (!values.categoryIds || values.categoryIds.length === 0)
    ) {
      return this.createError({
        path: "categoryIds",
        message: "Select at least one category",
      });
    }

    return true;
  });

export type CouponCodeForm = InferType<typeof CouponCodeSchema>;

import {
  BannerDateType,
  BannerField,
  BannerLocation,
  BannerPlacement,
} from "@/app/(protected)/manage/marketing/banners/constant";
import { needsLocationId } from "@/app/(protected)/manage/marketing/banners/utils";
import { BlogFormFieldName } from "@/app/components/blog/constant";
import { RatingValue, ReviewField, ReviewStatus } from "@/app/components/products/reviews/edit/helper/constant";
import {
  PageTypeEnums,
  WebPageField,
} from "@/app/components/storefront/constants";
import { boolean, date, object, ref, string, number, mixed, array } from "yup";

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

export const WebPageSchema = object({
  [WebPageField.PageType]: string().required("Page type is required"),
  [WebPageField.PageName]: string().trim().required("Page name is required"),
  [WebPageField.PageUrl]: string().trim().nullable().default(""),
  [WebPageField.PageContent]: string().nullable().default(""),
  [WebPageField.Link]: string()
    .nullable()
    .default("")
    .when(WebPageField.PageType, {
      is: PageTypeEnums.Link,
      then: (schema) =>
        schema
          .required("Link is required")
          .matches(/^https:\/\//i, "Link must start with https://"),
    }),
  [WebPageField.RawHtml]: string().nullable().default(""),
  [WebPageField.EmailQuestionsTo]: string()
    .email("Invalid email address")
    .nullable()
    .default(""),
  [WebPageField.ShowTheseFields]: array().of(string()).default([]),
  [WebPageField.ShowInNavigation]: boolean().default(false),
  [WebPageField.ParentPage]: string().nullable().default(""),
  [WebPageField.RestrictToCustomersOnly]: boolean().default(false),
  [WebPageField.SortOrder]: number().nullable().default(0),
  [WebPageField.PageTitle]: string().nullable().default(""),
  [WebPageField.MetaKeywords]: string().nullable().default(""),
  [WebPageField.MetaDescription]: string().nullable().default(""),
  [WebPageField.SearchKeywords]: string().nullable().default(""),
});

// ReviewSchema
export const ReviewSchema = object({
  [ReviewField.Name]: string().trim().required("Review title is required"),
  [ReviewField.Comment]: string().trim().required("Review is required"),
  [ReviewField.UserName]: string().trim().required("Author name is required"),
  [ReviewField.Approved]: string()
    .oneOf(Object.values(ReviewStatus), "Invalid status")
    .required("Status is required"),
  [ReviewField.Rating]: string()
    .oneOf(Object.values(RatingValue), "Invalid rating")
    .required("Rating is required"),
});

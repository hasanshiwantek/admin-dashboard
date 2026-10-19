import {
  BannerDateType,
  BannerField,
  BannerLocation,
  BannerPlacement,
} from "@/app/(protected)/manage/marketing/banners/constant";
import { needsLocationId } from "@/app/(protected)/manage/marketing/banners/utils";
import { UserField } from "@/app/(protected)/manage/settings/(advanced)/users/constant";
import {
  DisplayField,
  GeneralSection,
  LogoutOption,
  MiscellaneousField,
  SearchField,
  SecurityPrivacyField,
  ShareField,
  UrlFormat,
  UrlStructureField,
  WebsiteField,
} from "@/app/(protected)/manage/settings/(general)/constant";
import { BlogFormFieldName } from "@/app/components/blog/constant";
import { ShippingAddressField } from "@/Modals/ShippingModals/ConfigureShippingAddressModal/constant";
import { ChargeShippingType } from "@/Modals/ShippingModals/constant";
import { FedExField } from "@/Modals/ShippingModals/FedExConfigModal/constant";
import {
  RateSymbol,
  ShipByWeightField,
} from "@/Modals/ShippingModals/ShipByWeightModal/constant";
import { DisplayNameField } from "@/Modals/ShippingModals/ShippingQuotesDisplayNameModal/constant";
import { array, boolean, date, mixed, number, object, ref, string } from "yup";

export const BannerSchema = object({
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

export const StoreProfileSchema = object({
  storeDisplayName: string().required("Store display name is required"),
  address: string().required("Address is required"),
  addressType: string().required("Address type is required"),
  email: string()
    .email("Please enter a valid email address")
    .required("Email is required"),
  phone: string().default(""),
});

// ─── Shipping modals ──────────────────────────────────────────

// Optional numeric text input: empty is fine, otherwise must parse as a number
const optionalNumber = (label: string) =>
  string()
    .default("")
    .test(
      "is-number",
      `${label} must be a valid number.`,
      (value) => !value || !isNaN(Number(value)),
    );

export const ShippingAddressSchema = object({
  [ShippingAddressField.AddressLine1]: string()
    .trim()
    .required("Address line 1 is required"),
  [ShippingAddressField.AddressLine2]: string().default(""),
  [ShippingAddressField.City]: string().trim().required("City is required"),
  [ShippingAddressField.PostalCode]: string()
    .trim()
    .required("Postal code is required"),
  [ShippingAddressField.Country]: string().default(""),
  [ShippingAddressField.State]: string().default(""),
  [ShippingAddressField.PhoneNumber]: string().default(""),
});

export const DisplayNameSchema = object({
  [DisplayNameField.DisplayName]: string()
    .trim()
    .required("Display name is required."),
});

export const ShipByWeightSchema = object({
  [ShipByWeightField.DisplayName]: string()
    .trim()
    .required("Display name is required."),
  [ShipByWeightField.ChargeShipping]: string()
    .oneOf(Object.values(ChargeShippingType))
    .required(),
  [ShipByWeightField.DefaultShippingCost]: optionalNumber(
    "Default shipping cost",
  ),
  [ShipByWeightField.RateSymbol]: string()
    .oneOf(Object.values(RateSymbol))
    .required(),
  [ShipByWeightField.Ranges]: array()
    .of(
      object({
        from: optionalNumber("From"),
        upTo: optionalNumber("Up to"),
        cost: optionalNumber("Cost"),
      }),
    )
    .required(),
});

export const FedexConfigSchema = object({
  [FedExField.DisplayName]: string()
    .trim()
    .required("Display name is required"),
  [FedExField.DropOffType]: string().default(""),
  [FedExField.PackagingType]: string().default(""),
  [FedExField.PackingMethod]: string().default(""),
  [FedExField.RateType]: string().default(""),
  [FedExField.IncludePackageValue]: boolean().default(false),
  [FedExField.DestinationType]: string().default(""),
  [FedExField.DeliveryServices]: array().of(string().required()).default([]),
  [FedExField.Key]: string().trim().required("Key is required"),
  [FedExField.Password]: string().default(""),
  [FedExField.AccountNumber]: string()
    .trim()
    .required("Account number is required"),
  [FedExField.ApiBaseUrl]: string().trim().required("API base URL is required"),
  [FedExField.DestCountry]: string().default(""),
  [FedExField.DestState]: string().default(""),
  [FedExField.DestZip]: string().default(""),
  [FedExField.PkgWeight]: string().default(""),
  [FedExField.PkgValue]: string().default(""),
  [FedExField.PkgLength]: string().default(""),
  [FedExField.PkgWidth]: string().default(""),
  [FedExField.PkgHeight]: string().default(""),
});

// ─── General settings ─────────────────────────────────────────

const text = () => string().default("");
const flag = (value = false) => boolean().default(value);

// Comma-separated list where every entry must be an email
const emailList = (label: string) =>
  text().test(
    "email-list",
    `${label} must be email addresses separated by commas.`,
    (value) =>
      !value ||
      value
        .split(",")
        .map((email) => email.trim())
        .filter(Boolean)
        .every((email) => string().email().isValidSync(email)),
  );

// A URL format needs its custom value only when "Custom" is chosen
const customUrl = (formatField: UrlStructureField) =>
  text().when(formatField, {
    is: UrlFormat.Custom,
    then: (schema) => schema.trim().required("Enter a custom URL format"),
  });

export const GeneralSettingsSchema = object({
  [GeneralSection.Website]: object({
    [WebsiteField.HomePageTitle]: text(),
    [WebsiteField.MetaKeywords]: text(),
    [WebsiteField.MetaDescription]: text(),
    [WebsiteField.WwwRedirect]: text(),
    [WebsiteField.RobotsTxt]: text(),
  }),
  [GeneralSection.Display]: object({
    [DisplayField.ProductBreadcrumbs]: text(),
    [DisplayField.ShowQuantityBox]: flag(),
    [DisplayField.EnableSearchSuggest]: flag(),
    [DisplayField.AutoApproveReviews]: flag(),
    [DisplayField.EnableWishlist]: flag(),
    [DisplayField.EnableProductComparisons]: flag(),
    [DisplayField.EnableAccountCreation]: flag(),
    [DisplayField.UseWysiwygEditor]: flag(),
    [DisplayField.ShowProductThumbnails]: flag(),
    [DisplayField.CategoryProductList]: text(),
    [DisplayField.DefaultProductSort]: text(),
    [DisplayField.MenuDisplayDepth]: optionalNumber("Menu display depth"),
    [DisplayField.ShowProductPrice]: flag(true),
    [DisplayField.DetailPageDefaultPrice]: text(),
    [DisplayField.ListPageDefaultPrice]: text(),
    [DisplayField.HidePriceFromGuests]: flag(),
    [DisplayField.ShowProductSku]: flag(),
    [DisplayField.ShowProductWeight]: flag(),
    [DisplayField.ShowProductBrand]: flag(),
    [DisplayField.ShowProductShippingCost]: flag(),
    [DisplayField.ShowProductRating]: flag(),
    [DisplayField.ShowAddToCartLink]: flag(),
    [DisplayField.DefaultPreOrderMessage]: text(),
  }),
  [GeneralSection.Share]: object({
    [ShareField.Facebook]: flag(true),
    [ShareField.Twitter]: flag(true),
    [ShareField.Linkedin]: flag(true),
    [ShareField.Pinterest]: flag(true),
    [ShareField.FacebookLike]: flag(),
    [ShareField.Email]: flag(true),
    [ShareField.Print]: flag(true),
    [ShareField.PoweredByLink]: flag(true),
  }),
  [GeneralSection.UrlStructure]: object({
    [UrlStructureField.ProductUrlFormat]: text(),
    [UrlStructureField.ProductCustomUrl]: customUrl(
      UrlStructureField.ProductUrlFormat,
    ),
    [UrlStructureField.CategoryUrlFormat]: text(),
    [UrlStructureField.CategoryCustomUrl]: customUrl(
      UrlStructureField.CategoryUrlFormat,
    ),
    [UrlStructureField.WebPageUrlFormat]: text(),
    [UrlStructureField.WebPageCustomUrl]: customUrl(
      UrlStructureField.WebPageUrlFormat,
    ),
  }),
  [GeneralSection.Search]: object({
    [SearchField.DefaultProductSort]: text(),
    [SearchField.DefaultContentSort]: text(),
    [SearchField.StorefrontSearchLogic]: text(),
  }),
  [GeneralSection.SecurityPrivacy]: object({
    [SecurityPrivacyField.EnforcePasswordComplexity]: flag(),
    [SecurityPrivacyField.InactiveShopperLogout]: text(),
    [SecurityPrivacyField.CustomLogoutDuration]: optionalNumber(
      "Custom inactive duration",
    ).when(SecurityPrivacyField.InactiveShopperLogout, {
      is: LogoutOption.Custom,
      then: (schema) => schema.required("Enter the inactive duration"),
    }),
    [SecurityPrivacyField.CustomLogoutDurationUnit]: text(),
    [SecurityPrivacyField.ShopperActivityExtendsLogout]: flag(),
    [SecurityPrivacyField.ControlPanelTimeout]: text(),
    [SecurityPrivacyField.EnableRecaptchaStorefront]: flag(),
    [SecurityPrivacyField.RecaptchaSiteKey]: text().when(
      SecurityPrivacyField.EnableRecaptchaStorefront,
      {
        is: true,
        then: (schema) =>
          schema.trim().required("reCAPTCHA site key is required"),
      },
    ),
    [SecurityPrivacyField.RecaptchaSecretKey]: text().when(
      SecurityPrivacyField.EnableRecaptchaStorefront,
      {
        is: true,
        then: (schema) =>
          schema.trim().required("reCAPTCHA secret key is required"),
      },
    ),
    [SecurityPrivacyField.FailedLoginLockout]: optionalNumber(
      "Failed login lockout",
    ),
    [SecurityPrivacyField.EnableRecaptchaPrelaunch]: flag(),
    [SecurityPrivacyField.EnableCookieConsent]: flag(),
    [SecurityPrivacyField.PrivacyPolicyUrl]: text().url(
      "Enter a valid URL, e.g. https://example.com/privacy-policy",
    ),
    [SecurityPrivacyField.DataCollectionLimit]: text(),
    [SecurityPrivacyField.EnableNonceSecurity]: flag(),
  }),
  [GeneralSection.Miscellaneous]: object({
    [MiscellaneousField.ReviewEmailDays]: optionalNumber("Review email days"),
    [MiscellaneousField.SendReviewEmailToGuests]: flag(),
    [MiscellaneousField.ForwardOrderInvoices]: flag(),
    [MiscellaneousField.InvoiceEmailRecipient]: emailList("Invoice recipients"),
    [MiscellaneousField.SmtpServerOption]: text(),
    [MiscellaneousField.AdministratorEmail]: text().email(
      "Enter a valid email address",
    ),
    [MiscellaneousField.RequireMarketingConsent]: flag(),
    [MiscellaneousField.EnableAbandonedCartEmails]: flag(),
    [MiscellaneousField.AbandonedCartThreshold]: optionalNumber(
      "Abandoned cart threshold",
    ),
    [MiscellaneousField.EmailEveryAbandonedCart]: flag(),
    [MiscellaneousField.StopEmailOnCompleteOrder]: flag(),
    [MiscellaneousField.EnableConvertedCartEmails]: flag(),
    [MiscellaneousField.ConvertedCartRecipient]: text().email(
      "Enter a valid email address",
    ),
    [MiscellaneousField.AllowPurchasing]: flag(),
    [MiscellaneousField.StartingOrderNumber]: optionalNumber(
      "Starting order number",
    ),
    [MiscellaneousField.EnableThrottler]: flag(),
    [MiscellaneousField.ThrottleReviewsPerPeriod]: optionalNumber("Reviews"),
    [MiscellaneousField.ThrottlePeriodValue]: optionalNumber("Period"),
    [MiscellaneousField.ThrottlePeriodUnit]: text(),
  }),
});

// ─── Admin users (add / edit) ─────────────────────────────────

export const AdminUserSchema = object({
  [UserField.FirstName]: string().trim().required("First name is required"),
  [UserField.LastName]: string().trim().required("Last name is required"),
  [UserField.Email]: string()
    .trim()
    .required("Email is required")
    .email("Invalid email address"),
  [UserField.PhoneNumber]: string().trim().required("Phone number is required"),
  [UserField.UserRole]: string().required("Choose a user role"),
  [UserField.Permissions]: array().of(number().required()).default([]),
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

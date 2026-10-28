import {
  BannerDateType,
  BannerFormNames,
} from "@/app/(protected)/manage/marketing/banners/[id]/constant";
import {
  BannerLocation,
  BannerPlacement,
} from "@/app/(protected)/manage/marketing/banners/constant";
import { needsLocationId } from "@/app/(protected)/manage/marketing/banners/utils";
import { UserField } from "@/app/(protected)/manage/settings/(advanced)/users/constant";
import {
  DnsRecordFormNames,
  DnsSection,
  MailForwardFormNames,
  MailServerFormNames,
  MailServerMode,
  MxRecordFormNames,
  WebHostFormNames,
  ZoneDetailFormNames,
} from "@/app/(protected)/manage/settings/(domain)/dns/constant";
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
import { PromotionSettingsFormNames } from "@/app/(protected)/manage/settings/(marketing)/promotions/constant";
import { OrderNotificationFormNames } from "@/app/(protected)/manage/settings/(orders)/order-notifications/constant";
import { isEmailEnabled } from "@/app/(protected)/manage/settings/(orders)/order-notifications/utils";
import { OrderStatusesFormNames } from "@/app/(protected)/manage/settings/(orders)/order-statuses/constant";
import { ReturnSettingsFormNames } from "@/app/(protected)/manage/settings/(orders)/return-settings/constant";
import { CommentSettingsFormNames } from "@/app/(protected)/manage/settings/(products)/comments/constant";
import { GiftWrappingFormNames } from "@/app/(protected)/manage/settings/(products)/gift-wrapping/constant";
import {
  BackorderMessageFormNames,
  InventoryFormNames,
} from "@/app/(protected)/manage/settings/(products)/inventory/constant";
import { CurrencyFormNames } from "@/app/(protected)/manage/settings/(setup)/currencies/constant";
import {
  LocationFormNames,
  OpeningHourFormNames,
  SpecialHourFormNames,
} from "@/app/(protected)/manage/settings/(setup)/locations/constant";
import {
  OfflinePaymentFormNames,
  PaymentConfigFormNames,
  PaymentCurrencyFormNames,
} from "@/app/(protected)/manage/settings/(setup)/payment/constant";
import { PickupMethodFormNames } from "@/app/(protected)/manage/settings/(setup)/pickup-methods/constant";
import {
  TaxClassesFormNames,
  TaxClassRowFormNames,
} from "@/app/(protected)/manage/settings/(setup)/tax/(basic)/constant";
import {
  TaxRateClassFormNames,
  TaxRateFormNames,
  TaxZoneAppliesTo,
  TaxZoneBasedOn,
  TaxZoneSettingsFormNames,
} from "@/app/(protected)/manage/settings/(setup)/tax/(basic)/tax-zones/constant";
import { BlogFormFieldName } from "@/app/components/blog/constant";
import { MessageField } from "@/app/components/orders/message/helper/constant";
import {
  RatingValue,
  ReviewField,
  ReviewStatus,
} from "@/app/components/products/reviews/edit/helper/constant";
import {
  PageTypeEnums,
  WebPageField,
} from "@/app/components/storefront/constants";
import { AddCurrencyFormNames } from "@/Modals/CurrencyModals/AddCurrencyModal/constant";
import {
  UpdateUrlsFormNames,
  UpdateUrlsScope,
} from "@/Modals/SettingsModals/UpdateUrlsModal/constant";
import { ShippingAddressField } from "@/Modals/ShippingModals/ConfigureShippingAddressModal/constant";
import { ChargeShippingType } from "@/Modals/ShippingModals/constant";
import { FedExField } from "@/Modals/ShippingModals/FedExConfigModal/constant";
import {
  RateSymbol,
  ShipByWeightField,
} from "@/Modals/ShippingModals/ShipByWeightModal/constant";
import { DisplayNameField } from "@/Modals/ShippingModals/ShippingQuotesDisplayNameModal/constant";
import {
  array,
  boolean,
  date,
  InferType,
  mixed,
  number,
  object,
  ref,
  string,
} from "yup";
import { CustomerField } from "@/app/(protected)/manage/customers/add/constant";
import { REGEX } from "@/const/regex";
import { AddressField } from "@/app/(protected)/manage/customers/edit/[id]/[addressId]/constant";
import {
  ScriptCategory,
  ScriptFormNames,
  ScriptLoadMethod,
  ScriptLocation,
  ScriptPlacement,
  ScriptType,
} from "@/app/(protected)/manage/storefront/script-manager/[id]/constant";

export const BannerSchema = object({
  [BannerFormNames.Title]: string().trim().required("Banner name is required"),
  [BannerFormNames.Content]: string().nullable(),
  [BannerFormNames.LocationType]: string()
    .oneOf(
      Object.values(BannerLocation),
      "Choose where this banner should appear",
    )
    .required("Choose where this banner should appear"),
  [BannerFormNames.LocationId]: string()
    .nullable()
    .default(null)
    .when(BannerFormNames.LocationType, ([type], schema) =>
      needsLocationId(type)
        ? schema.required(
            type === BannerLocation.Brand
              ? "Choose a brand"
              : "Choose a category",
          )
        : schema,
    ),
  [BannerFormNames.DateType]: string()
    .oneOf(Object.values(BannerDateType))
    .required(),
  [BannerFormNames.StartDate]: date()
    .nullable()
    .default(null)
    .when(BannerFormNames.DateType, {
      is: BannerDateType.Range,
      then: (schema) => schema.required("Start date is required"),
    }),
  [BannerFormNames.EndDate]: date()
    .nullable()
    .default(null)
    .when(BannerFormNames.DateType, {
      is: BannerDateType.Range,
      then: (schema) =>
        schema
          .required("End date is required")
          .min(
            ref(BannerFormNames.StartDate),
            "End date must be after the start date",
          ),
    }),
  [BannerFormNames.Visible]: boolean().default(true).nullable(),
  [BannerFormNames.Placement]: string()
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

export const UpdateUrlsSchema = object({
  [UpdateUrlsFormNames.Scope]: string()
    .oneOf(Object.values(UpdateUrlsScope))
    .default(UpdateUrlsScope.NotCustomized),
  [UpdateUrlsFormNames.CreateRedirects]: flag(true),
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

// ─── Order notifications ──────────────────────────────────────

export const OrderNotificationSchema = object({
  [OrderNotificationFormNames.Methods]: array()
    .of(string().required())
    .default([]),
  [OrderNotificationFormNames.CustomerEmailStatuses]: array()
    .of(string().required())
    .default([]),
  // Needed only while the "Email Message" method is enabled
  [OrderNotificationFormNames.EmailAddress]: text()
    .trim()
    .when(OrderNotificationFormNames.Methods, {
      is: (methods?: string[]) => isEmailEnabled(methods),
      then: (schema) =>
        schema
          .required("Email address is required")
          .email("Enter a valid email address"),
    }),
});

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

  productIds: array().of(string().defined()).default([]).defined(),

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
    // Category validation sirf categories select hone par chalegi
    if (values?.appliesTo !== "categories") {
      return true;
    }

    if (!values.categoryIds || values.categoryIds.length === 0) {
      return this.createError({
        path: "categoryIds",
        message: "Select at least one category",
      });
    }

    return true;
  });

export type CouponCodeForm = InferType<typeof CouponCodeSchema>;
// WebPageSchema
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
          .matches(REGEX.HTTPS_PREFIX, "Link must start with https://"),
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

// MessageSchema
export const MessageSchema = object({
  [MessageField.Email]: string().email().required("Email is required"),
  [MessageField.Subject]: string().trim().required("Subject is required"),
  [MessageField.Message]: string().trim().required("Message is required"),
});

// #region Orders Settings

// #region Return
export const ReturnSettingsSchema = object({
  [ReturnSettingsFormNames.EnableReturns]: flag(),
});
// #endregion

// #region Order Statuses
export const OrderStatusesSchema = object({
  [OrderStatusesFormNames.Statuses]: array()
    .of(
      object({
        [OrderStatusesFormNames.Id]: string().required(),
        [OrderStatusesFormNames.Name]: string()
          .trim()
          .required("Cannot be empty or blank. Please enter an order status."),
      }),
    )
    .default([]),
});

// #endregion

// #region Products Settings

// #region Inventory
const optionalEmail = () => text().trim().email("Enter a valid email address");

// A text input that's needed only while its checkbox is ticked
const textWhenChecked = (checkbox: InventoryFormNames, message: string) =>
  text()
    .trim()
    .when(checkbox, {
      is: true,
      then: (schema) => schema.required(message),
    });

export const InventorySettingsSchema = object({
  [InventoryFormNames.ProductUnavailableAction]: text(),
  [InventoryFormNames.OptionUnavailableAction]: text(),
  [InventoryFormNames.HideOutOfStockInFiltering]: flag(),
  [InventoryFormNames.UpdateStockLevels]: text(),
  [InventoryFormNames.AutoAdjustStockLevels]: flag(),
  [InventoryFormNames.StockLevelDisplay]: text(),
  [InventoryFormNames.ShowPreOrderInventory]: flag(),
  [InventoryFormNames.OutOfStockMessage]: text(),
  [InventoryFormNames.ShowOutOfStockOnListing]: flag(),
  [InventoryFormNames.ShowQuantityOnBackorder]: flag(),
  [InventoryFormNames.ShowBackorderMessage]: flag(),
  [InventoryFormNames.BackorderMessages]: array()
    .of(
      object({
        [BackorderMessageFormNames.MessageId]: text(),
        [BackorderMessageFormNames.Name]: string()
          .trim()
          .required("Name is required"),
        [BackorderMessageFormNames.Message]: text(),
        [BackorderMessageFormNames.IsDefault]: flag(),
      }),
    )
    .default([]),
  [InventoryFormNames.ShowQuantityOnHand]: flag(),
  [InventoryFormNames.ShowBackorderPrompt]: flag(),
  [InventoryFormNames.BackorderPromptText]: textWhenChecked(
    InventoryFormNames.ShowBackorderPrompt,
    "Enter the backorder availability prompt",
  ),
  [InventoryFormNames.ShowShippingExpectation]: flag(),
  [InventoryFormNames.ShippingExpectationText]: textWhenChecked(
    InventoryFormNames.ShowShippingExpectation,
    "Enter the shipping expectation message",
  ),
  [InventoryFormNames.LowStockEmail]: optionalEmail(),
  [InventoryFormNames.OutOfStockEmail]: optionalEmail(),
});
// #endregion

// #region Gift Wrapping
export const GiftWrappingSchema = object({
  [GiftWrappingFormNames.Name]: string().trim().required("Name is required"),
  [GiftWrappingFormNames.PreviewImage]: mixed<File | string>()
    .nullable()
    .default(null),
  [GiftWrappingFormNames.Price]: string()
    .trim()
    .required("Price is required")
    .test(
      "price",
      "Price must be a number of 0 or more",
      (value) => !value || (!isNaN(Number(value)) && Number(value) >= 0),
    ),
  [GiftWrappingFormNames.AllowGiftMessages]: flag(true),
  [GiftWrappingFormNames.IsVisible]: flag(true),
});
// #endregion

// #region Comments
export const CommentSettingsSchema = object({
  [CommentSettingsFormNames.CommentSystem]: text(),
  [CommentSettingsFormNames.EnabledFor]: array()
    .of(string().required())
    .default([]),
  [CommentSettingsFormNames.OnlyPastCustomers]: flag(true),
});
// #endregion

// #endregion

// #region Setup Settings

// #region Payment
export const PaymentCurrencySchema = object({
  [PaymentCurrencyFormNames.Currency]: string().required(
    "Currency is required",
  ),
});

export const PaymentConfigSchema = object({
  [PaymentConfigFormNames.TestCardPayments]: flag(),
});

export const OfflinePaymentSchema = (infoName: string) =>
  object({
    [OfflinePaymentFormNames.DisplayName]: string()
      .trim()
      .required("Display name is required"),
    [OfflinePaymentFormNames.AvailableCountries]: array()
      .of(string().required())
      .min(1, "Please select one or more available countries")
      .required()
      .default([]),
    [OfflinePaymentFormNames.Instructions]: string()
      .trim()
      .required(`${infoName} is required`),
  });
// #endregion

// #region Locations
const coordinate = (label: string, max: number) =>
  string()
    .trim()
    .required(`${label} is required`)
    .test(
      "coordinate",
      `${label} must be between -${max} and ${max}`,
      (value) =>
        !value ||
        (Number.isFinite(Number(value)) && Math.abs(Number(value)) <= max),
    );

export const LocationSchema = object({
  [LocationFormNames.Name]: string().trim().required("Name is required"),
  [LocationFormNames.Code]: text(),
  [LocationFormNames.Address1]: string()
    .trim()
    .required("Address 1 is required"),
  [LocationFormNames.Address2]: text(),
  [LocationFormNames.City]: string().trim().required("City is required"),
  [LocationFormNames.Country]: string().required("Country is required"),
  [LocationFormNames.PostalCode]: string()
    .trim()
    .required("Postal code is required"),
  [LocationFormNames.State]: string().trim().required("State is required"),
  [LocationFormNames.Latitude]: coordinate("Latitude", 90),
  [LocationFormNames.Longitude]: coordinate("Longitude", 180),
  [LocationFormNames.Phone]: text(),
  [LocationFormNames.Email]: string()
    .trim()
    .email("Enter a valid email address")
    .required("Email is required"),
  [LocationFormNames.ShowDetails]: flag(true),
  [LocationFormNames.Description]: text(),
  [LocationFormNames.OpeningHours]: array()
    .of(
      object({
        [OpeningHourFormNames.Day]: string().required(),
        [OpeningHourFormNames.Open]: flag(),
        [OpeningHourFormNames.Opening]: text(),
        [OpeningHourFormNames.Closing]: text(),
      }),
    )
    .required()
    .default([]),
  [LocationFormNames.SpecialHours]: array()
    .of(
      object({
        [SpecialHourFormNames.Name]: string()
          .trim()
          .required("Name is required"),
        [SpecialHourFormNames.Date]: string().required("Date is required"),
        [SpecialHourFormNames.Open]: flag(),
        [SpecialHourFormNames.AllDay]: flag(),
        [SpecialHourFormNames.Opening]: text(),
        [SpecialHourFormNames.Closing]: text(),
        [SpecialHourFormNames.Annual]: flag(),
      }),
    )
    .required()
    .default([]),
});
// #endregion

// #region Pickup Methods
export const PickupMethodSchema = object({
  [PickupMethodFormNames.Name]: string().trim().required("Name is required."),
  [PickupMethodFormNames.LocationId]: string().required(
    "Location is required.",
  ),
  [PickupMethodFormNames.EstimatedReadyTime]: string()
    .trim()
    .required("Estimated ready-for-pickup time is required."),
  [PickupMethodFormNames.Instructions]: string()
    .trim()
    .required("Instruction message for pickup is required."),
});
// #endregion

// #region Currencies
export const AddCurrencySchema = object({
  [AddCurrencyFormNames.Code]: string().required("Currency code is required."),
});

export const CurrencySchema = object({
  [CurrencyFormNames.Name]: string()
    .trim()
    .required("Display name is required."),
  [CurrencyFormNames.DefaultForCountries]: array()
    .of(string().required())
    .required()
    .default([]),
  [CurrencyFormNames.TransactingCurrency]: string().required(
    "Transacting currency is required.",
  ),
  [CurrencyFormNames.ExchangeRateType]: string().required(),
  [CurrencyFormNames.ExchangeRate]: string()
    .trim()
    .required("Exchange rate is required.")
    .test(
      "exchangeRate",
      "Exchange rate must be a number greater than 0.",
      (value) => !isNaN(Number(value)) && Number(value) > 0,
    ),
  [CurrencyFormNames.Symbol]: string()
    .trim()
    .required("Currency symbol is required."),
  [CurrencyFormNames.SymbolLocation]: string().required(
    "Symbol location is required.",
  ),
  [CurrencyFormNames.DecimalToken]: string().required(
    "Decimal separator is required.",
  ),
  [CurrencyFormNames.ThousandsToken]: string().required(
    "Thousands separator is required.",
  ),
  [CurrencyFormNames.DecimalPlaces]: string().required(
    "Decimal places is required.",
  ),
});
// #endregion

// #region Basic Tax
export const TaxClassesSchema = object({
  [TaxClassesFormNames.Classes]: array()
    .of(
      object({
        [TaxClassRowFormNames.ClassId]: text(),
        [TaxClassRowFormNames.Label]: string()
          .trim()
          .required("Tax class label is required"),
        [TaxClassRowFormNames.IsDefault]: flag(),
      }),
    )
    .required()
    .default([]),
});

const stringList = () => array().of(string().required()).required().default([]);

// The list a zone is "based on" must have entries; the other two are ignored
const zoneListWhen = (basedOn: TaxZoneBasedOn, message: string) =>
  stringList().when(TaxZoneSettingsFormNames.BasedOn, {
    is: basedOn,
    then: (schema) => schema.min(1, message),
  });

export const TaxZoneSettingsSchema = object({
  [TaxZoneSettingsFormNames.Name]: string()
    .trim()
    .required("Tax zone name is required"),
  [TaxZoneSettingsFormNames.BasedOn]: text(),
  [TaxZoneSettingsFormNames.Countries]: zoneListWhen(
    TaxZoneBasedOn.Countries,
    "Select at least one country",
  ),
  [TaxZoneSettingsFormNames.SubdivisionCountry]: text(),
  [TaxZoneSettingsFormNames.Subdivisions]: zoneListWhen(
    TaxZoneBasedOn.Subdivisions,
    "Select at least one subdivision",
  ),
  [TaxZoneSettingsFormNames.PostalCodeCountry]: text(),
  [TaxZoneSettingsFormNames.PostalCodes]: text().when(
    TaxZoneSettingsFormNames.BasedOn,
    {
      is: TaxZoneBasedOn.PostalCodes,
      then: (schema) =>
        schema.trim().required("Enter at least one postal code"),
    },
  ),
  [TaxZoneSettingsFormNames.AppliesTo]: text(),
  [TaxZoneSettingsFormNames.CustomerGroups]: stringList().when(
    TaxZoneSettingsFormNames.AppliesTo,
    {
      is: TaxZoneAppliesTo.Groups,
      then: (schema) => schema.min(1, "Select at least one customer group"),
    },
  ),
  [TaxZoneSettingsFormNames.IsEnabled]: flag(true),
  [TaxZoneSettingsFormNames.PriceDisplay]: text(),
  [TaxZoneSettingsFormNames.ShowBothOnListing]: flag(),
  [TaxZoneSettingsFormNames.ShowBothOnDetail]: flag(),
});

export const TaxRateSchema = object({
  [TaxRateFormNames.Name]: string()
    .trim()
    .required("Tax rate name is required"),
  [TaxRateFormNames.ClassRates]: array()
    .of(
      object({
        [TaxRateClassFormNames.ClassId]: text(),
        [TaxRateClassFormNames.ClassName]: text(),
        // Blank means no rate for that class
        [TaxRateClassFormNames.Rate]: text().test(
          "percent",
          "Enter a rate between 0 and 100",
          (value) =>
            !value ||
            (!isNaN(Number(value)) &&
              Number(value) >= 0 &&
              Number(value) <= 100),
        ),
      }),
    )
    .required()
    .default([]),
  [TaxRateFormNames.Priority]: string()
    .trim()
    .required("Calculation priority is required")
    .test(
      "priority",
      "Enter a whole number of 0 or more",
      (value) => !value || REGEX.WHOLE_NUMBER.test(value),
    ),
  [TaxRateFormNames.IsEnabled]: flag(true),
});
// #endregion

// #endregion

// #region Domain Settings

// #region DNS
const positiveWholeNumber = (label: string) =>
  string()
    .trim()
    .required(`${label} is required`)
    .test(
      "whole",
      `${label} must be a whole number above 0`,
      (value) =>
        !value || (REGEX.WHOLE_NUMBER.test(value) && Number(value) > 0),
    );

export const DnsSettingsSchema = object({
  [DnsSection.MailServers]: object({
    [MailServerFormNames.Mode]: text(),
    // Forwarding rows only matter when forwarding is the chosen option
    [MailServerFormNames.Forwards]: array()
      .of(
        object({
          [MailForwardFormNames.DisplayAddress]: text(),
          [MailForwardFormNames.ForwardTo]: text(),
        }),
      )
      .required()
      .default([])
      .when(MailServerFormNames.Mode, {
        is: MailServerMode.Forward,
        then: (schema) =>
          schema.of(
            object({
              [MailForwardFormNames.DisplayAddress]: string()
                .trim()
                .required("Display address is required")
                .matches(
                  REGEX.EMAIL_LOCAL_PART,
                  "Enter only the part before the @",
                ),
              [MailForwardFormNames.ForwardTo]: string()
                .trim()
                .email("Enter a valid email address")
                .required("Forward email is required"),
            }),
          ),
      }),
    // MX rows only matter when an external email host is the chosen option
    [MailServerFormNames.MxRecords]: array()
      .of(
        object({
          [MxRecordFormNames.Host]: text(),
          [MxRecordFormNames.Value]: text(),
          [MxRecordFormNames.Ttl]: text(),
          [MxRecordFormNames.Priority]: text(),
        }),
      )
      .required()
      .default([])
      .when(MailServerFormNames.Mode, {
        is: MailServerMode.External,
        then: (schema) =>
          schema.of(
            object({
              [MxRecordFormNames.Host]: string()
                .trim()
                .required("Host is required"),
              [MxRecordFormNames.Value]: string()
                .trim()
                .required("Mail server is required"),
              [MxRecordFormNames.Ttl]: positiveWholeNumber("Time to live"),
              // Blank falls back to the default priority
              [MxRecordFormNames.Priority]: text().test(
                "priority",
                "Priority must be a whole number",
                (value) => !value || REGEX.WHOLE_NUMBER.test(value),
              ),
            }),
          ),
      }),
  }),
  [DnsSection.WebHosts]: object({
    [WebHostFormNames.Records]: array()
      .of(
        object({
          [DnsRecordFormNames.RecordId]: text(),
          [DnsRecordFormNames.Type]: string().required("Type is required"),
          [DnsRecordFormNames.Host]: string()
            .trim()
            .required("Host is required"),
          [DnsRecordFormNames.Value]: string()
            .trim()
            .required("Value is required"),
          [DnsRecordFormNames.Ttl]: positiveWholeNumber("Time to live"),
          [DnsRecordFormNames.IsManaged]: flag(),
        }),
      )
      .required()
      .default([]),
  }),
  [DnsSection.ZoneDetails]: object({
    [ZoneDetailFormNames.Refresh]: positiveWholeNumber("Refresh"),
    [ZoneDetailFormNames.Retry]: positiveWholeNumber("Retry"),
    [ZoneDetailFormNames.Expire]: positiveWholeNumber("Expire"),
    [ZoneDetailFormNames.Minimum]: positiveWholeNumber("Minimum"),
  }),
});
// #endregion

// #endregion

// #region Marketing Settings

// #region Promotions
export const PromotionSettingsSchema = object({
  [PromotionSettingsFormNames.CalculationMethod]: text(),
  [PromotionSettingsFormNames.MaxCouponsPerOrder]: text(),
  [PromotionSettingsFormNames.AllowZeroPriceTrigger]: flag(),
  [PromotionSettingsFormNames.AllowOnCustomPriceOverrides]: flag(),
});
// #endregion

// #endregion

// #region Customer
const passwordRules = string()
  .required("Password is required")
  .min(7, "Password must be at least 7 characters")
  .matches(REGEX.HAS_LETTER, "Password must contain at least one letter")
  .matches(REGEX.HAS_NUMBER, "Password must contain at least one number");
export const createCustomerSchema = (isEdit: boolean) =>
  object({
    [CustomerField.firstName]: string().required("First name is required"),
    [CustomerField.lastName]: string().required("Last name is required"),
    [CustomerField.companyName]: string().defined(),
    [CustomerField.email]: string()
      .email("Enter a valid email address")
      .required("Email is required"),
    [CustomerField.customerGroup]: string().defined(),
    [CustomerField.phone]: string().defined(),
    [CustomerField.storeCredit]: string().defined(),
    [CustomerField.acsEmail]: string().defined(),
    [CustomerField.forceReset]: string().defined(),
    [CustomerField.taxCode]: string().defined(),
    [CustomerField.password]: isEdit ? string().defined() : passwordRules,
    [CustomerField.confirmPassword]: isEdit
      ? string().defined()
      : string()
          .required("Confirm password is required")
          .oneOf([ref(CustomerField.password)], "Passwords do not match"),
    [CustomerField.analytics]: string().defined(),
    [CustomerField.functional]: string().defined(),
    [CustomerField.targeting]: string().defined(),
    [CustomerField.address]: string().defined(),
    [CustomerField.state]: string().defined(),
    [CustomerField.country]: string().defined(),
  });
// #endregion Customer

// #region Address
export const AddressSchema = object({
  [AddressField.firstName]: string().trim().required("First name is required"),
  [AddressField.lastName]: string().trim().required("Last name is required"),
  [AddressField.companyName]: string().defined(),
  [AddressField.phoneNumber]: string().defined(),
  [AddressField.addressLine1]: string()
    .trim()
    .required("Address line 1 is required"),
  [AddressField.addressLine2]: string().defined(),
  [AddressField.city]: string().trim().required("City is required"),
  [AddressField.state]: string().required("State is required"),
  [AddressField.country]: string().required("Country is required"),
  [AddressField.zip]: string().defined(),
  [AddressField.type]: string().defined(),
  [AddressField.isDefault]: boolean().defined(),
});

// #endregion Address

// #region Script manager
export const ScriptSchema = object({
  [ScriptFormNames.ScriptName]: string()
    .trim()
    .required(
      "Enter a valid script name. Script names can’t include: @$%^&()=<|~`[]{}:",
    ),
  [ScriptFormNames.Description]: string().defined(),
  [ScriptFormNames.Placement]: string()
    .oneOf(Object.values(ScriptPlacement))
    .required("Placement is required"),
  [ScriptFormNames.Location]: string()
    .oneOf(Object.values(ScriptLocation))
    .required("Location is required"),
  [ScriptFormNames.ScriptCategory]: string()
    .oneOf(Object.values(ScriptCategory))
    .required("Script category is required"),
  [ScriptFormNames.ScriptType]: string()
    .oneOf(Object.values(ScriptType))
    .required("Script type is required"),
  [ScriptFormNames.LoadMethod]: string()
    .oneOf(Object.values(ScriptLoadMethod))
    .defined(),
  [ScriptFormNames.ScriptUrl]: string().when(ScriptFormNames.ScriptType, {
    is: ScriptType.URL,
    then: (schema) => schema.trim().required("Script URL is required"),
    otherwise: (schema) => schema.notRequired(),
  }),
  [ScriptFormNames.IntegrityHashes]: array().of(string().defined()).defined(),
  [ScriptFormNames.CurrentIntegrityHash]: string().defined(),
  [ScriptFormNames.ScriptContents]: string().when(ScriptFormNames.ScriptType, {
    is: ScriptType.SCRIPT,
    then: (schema) => schema.trim().required("Script contents are required"),
    otherwise: (schema) => schema.notRequired(),
  }),
});

// #endregion Script manager

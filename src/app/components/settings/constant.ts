// WWW Redirect Options
export const WwwRedirectOptions = [
  {
    value: "redirect-www-to-no-www",
    label: "Redirect WWW to no WWW",
  },
  {
    value: "redirect-no-www-to-www",
    label: "Redirect no WWW to WWW",
  },
  {
    value: "no-redirect",
    label: "No Redirect",
  },
];
export enum WebsiteField {
  HomePageTitle = "homePageTitle",
  MetaKeywords = "metaKeywords",
  MetaDescription = "metaDescription",
  WwwRedirect = "wwwRedirect",
  RobotsTxt = "robotsTxt",
}
export type ShareId =
  | "facebook"
  | "twitter"
  | "linkedin"
  | "pinterest"
  | "facebook-like"
  | "email"
  | "print";
// Field name constants (optional but keeps things consistent)
export enum DisplayField {
  ProductBreadcrumbs = "productBreadcrumbs",
  ShowQuantityBox = "showQuantityBox",
  EnableSearchSuggest = "enableSearchSuggest",
  AutoApproveReviews = "autoApproveReviews",
  EnableWishlist = "enableWishlist",
  EnableProductComparisons = "enableProductComparisons",
  EnableAccountCreation = "enableAccountCreation",
  UseWysiwygEditor = "useWysiwygEditor",
  ShowProductThumbnails = "showProductThumbnails",
  CategoryProductList = "categoryProductList",
  DefaultProductSort = "defaultProductSort",
  MenuDisplayDepth = "menuDisplayDepth",
  ShowProductPrice = "showProductPrice",
  DetailPageDefaultPrice = "detailPageDefaultPrice",
  ListPageDefaultPrice = "listPageDefaultPrice",
  HidePriceFromGuests = "hidePriceFromGuests",
  ShowProductSku = "showProductSku",
  ShowProductWeight = "showProductWeight",
  ShowProductBrand = "showProductBrand",
  ShowProductShippingCost = "showProductShippingCost",
  ShowProductRating = "showProductRating",
  ShowAddToCartLink = "showAddToCartLink",
  DefaultPreOrderMessage = "defaultPreOrderMessage",
}

export const BREADCRUMB_OPTIONS = [
  { value: "show-one-only", label: "Show One Only" },
  { value: "hide", label: "Dont Show" },
];

export const CATEGORY_PRODUCT_LIST_OPTIONS = [
  {
    value: "current-only",
    label: "Show products from the current category only",
  },
  {
    value: "children-if-empty",
    label:
      "Show products from child categories if the current category is empty",
  },
  {
    value: "current-and-children",
    label: "Show products from the current category and its children",
  },
];

export const DEFAULT_SORT_OPTIONS = [
  { value: "featured", label: "Featured Items" },
  { value: "newest-items", label: "Newest Items" },
  { value: "best-selling", label: "Best Selling" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "name-asc", label: "A to Z" },
  { value: "name-desc", label: "Z to A" },
];

export const PRICE_DISPLAY_OPTIONS = [
  { value: "default-catalog", label: "Default catalog price" },
  { value: "lowest-variation", label: "Lowest variation price" },
];

// url
export enum UrlStructureField {
  ProductUrlFormat = "productUrlFormat",
  ProductCustomUrl = "productCustomUrl",

  CategoryUrlFormat = "categoryUrlFormat",
  CategoryCustomUrl = "categoryCustomUrl",

  WebPageUrlFormat = "webPageUrlFormat",
  WebPageCustomUrl = "webPageCustomUrl",
}

export const URL_FORMAT_OPTIONS = [
  { value: "seo-optimized-short", label: "SEO Optimized (Short)" },
  { value: "seo-optimized-long", label: "SEO Optimized (Long)" },
  { value: "custom", label: "Custom" },
];

// search
export enum SearchField {
  DefaultProductSort = "defaultProductSort",
  DefaultContentSort = "defaultContentSort",
  StorefrontSearchLogic = "storefrontSearchLogic",
}

export const SORT_OPTIONS = [
  { value: "relevance", label: "Relevance" },
  { value: "name-asc", label: "Name: A to Z" },
  { value: "name-desc", label: "Name: Z to A" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "best-selling", label: "Best Selling" },
  { value: "featured-items", label: "Featured Items" },
  { value: "newest-items", label: "Newest Items" },
];

export const CONTENT_SORT_OPTIONS = [
  { value: "relevance", label: "Relevance" },
  { value: "name-asc", label: "Name: A to Z" },
  { value: "name-desc", label: "Name: Z to A" },
];

export const SEARCH_LOGIC_OPTIONS = [
  { value: "one-or-more", label: "Show results containing one or more" },
  { value: "all-words", label: "Show results containing all words" },
];

//

export enum SecurityPrivacyField {
  EnforcePasswordComplexity = "enforcePasswordComplexity",
  InactiveShopperLogout = "inactiveShopperLogout",
  CustomLogoutDuration = "customLogoutDuration",
  CustomLogoutDurationUnit = "customLogoutDurationUnit",
  ShopperActivityExtendsLogout = "shopperActivityExtendsLogout",
  ControlPanelTimeout = "controlPanelTimeout",
  EnableRecaptchaStorefront = "enableRecaptchaStorefront",
  RecaptchaSiteKey = "recaptchaSiteKey",
  RecaptchaSecretKey = "recaptchaSecretKey",
  FailedLoginLockout = "failedLoginLockout",
  EnableRecaptchaPrelaunch = "enableRecaptchaPrelaunch",
  EnableCookieConsent = "enableCookieConsent",
  PrivacyPolicyUrl = "privacyPolicyUrl",
  DataCollectionLimit = "dataCollectionLimit",
  EnableHsts = "enableHsts",
  HstsMaxAge = "hstsMaxAge",
  HstsMaxAgeUnit = "hstsMaxAgeUnit",
  HstsApplySubdomains = "hstsApplySubdomains",
  HstsApplyPreload = "hstsApplyPreload",
  CspConfig = "cspConfig",
  EnableNonceSecurity = "enableNonceSecurity",
  XFrameOptions = "xFrameOptions",
}

export const LOGOUT_OPTIONS = [
  { value: "default", label: "Use the default 7 day duration" },
  { value: "custom", label: "Let me customize the duration" },
];

export const DURATION_UNIT_OPTIONS = [
  { value: "minutes", label: "minutes" },
  { value: "hours", label: "hours" },
  { value: "days", label: "days" },
];

export const TIMEOUT_OPTIONS = [
  { value: "1hour", label: "1 hour" },
  { value: "2hours", label: "2 hours" },
  { value: "4hours", label: "4 hours" },
  { value: "8hours", label: "8 hours" },
];

export const DATA_COLLECTION_OPTIONS = [
  { value: "off", label: "Off" },
  {
    value: "moderate",
    label: "On with moderate limits to data collected (Legacy)",
  },
  { value: "strict", label: "On with strict limits to data collected" },
];

// miscellanous

export enum MiscellaneousField {
  ReviewEmailDays = "reviewEmailDays",
  SendReviewEmailToGuests = "sendReviewEmailToGuests",
  ForwardOrderInvoices = "forwardOrderInvoices",
  InvoiceEmailRecipient = "invoiceEmailRecipient",
  SmtpServerOption = "smtpServerOption",
  AdministratorEmail = "administratorEmail",
  RequireMarketingConsent = "requireMarketingConsent",
  EnableAbandonedCartEmails = "enableAbandonedCartEmails",
  EmailEveryAbandonedCart = "emailEveryAbandonedCart",
  AbandonedCartThreshold = "abandonedCartThreshold",
  StopEmailOnCompleteOrder = "stopEmailOnCompleteOrder",
  EnableConvertedCartEmails = "enableConvertedCartEmails",
  ConvertedCartRecipient = "convertedCartRecipient",
  AllowPurchasing = "allowPurchasing",
  StartingOrderNumber = "startingOrderNumber",
  EnableThrottler = "enableThrottler",
  ThrottleReviewsPerPeriod = "throttleReviewsPerPeriod",
  ThrottlePeriodValue = "throttlePeriodValue",
  ThrottlePeriodUnit = "throttlePeriodUnit",
}

export const SMTP_OPTIONS = [
  { value: "default", label: "Use my default mail settings" },
  { value: "custom", label: "Let me specify my own SMTP server details" },
];

export const PERIOD_UNIT_OPTIONS = [
  { value: "minutes", label: "minutes" },
  { value: "hours", label: "hours" },
  { value: "days", label: "days" },
];

// store setting default values
const website = {
  [WebsiteField.HomePageTitle]: "",
  [WebsiteField.MetaKeywords]: "",
  [WebsiteField.MetaDescription]: "",
  [WebsiteField.WwwRedirect]: "redirect-www-to-no-www",
  [WebsiteField.RobotsTxt]: "",
};
const defaultDisplay = {
  [DisplayField.ProductBreadcrumbs]: "show-one-only",
  [DisplayField.ShowQuantityBox]: false,
  [DisplayField.EnableSearchSuggest]: false,
  [DisplayField.AutoApproveReviews]: false,
  [DisplayField.EnableWishlist]: false,
  [DisplayField.EnableProductComparisons]: false,
  [DisplayField.EnableAccountCreation]: false,
  [DisplayField.UseWysiwygEditor]: false,
  [DisplayField.ShowProductThumbnails]: false,
  [DisplayField.CategoryProductList]: "current-only",
  [DisplayField.DefaultProductSort]: "featured",
  [DisplayField.MenuDisplayDepth]: "1",
  [DisplayField.ShowProductPrice]: true,
  [DisplayField.DetailPageDefaultPrice]: "default-catalog",
  [DisplayField.ListPageDefaultPrice]: "default-catalog",
  [DisplayField.HidePriceFromGuests]: false,
  [DisplayField.ShowProductSku]: false,
  [DisplayField.ShowProductWeight]: false,
  [DisplayField.ShowProductBrand]: false,
  [DisplayField.ShowProductShippingCost]: false,
  [DisplayField.ShowProductRating]: false,
  [DisplayField.ShowAddToCartLink]: false,
  [DisplayField.DefaultPreOrderMessage]: "",
};

const urlStructure = {
  [UrlStructureField.ProductUrlFormat]: "seo-optimized-short",
  [UrlStructureField.ProductCustomUrl]: "",
  [UrlStructureField.CategoryUrlFormat]: "seo-optimized-short",
  [UrlStructureField.CategoryCustomUrl]: "",
  [UrlStructureField.WebPageUrlFormat]: "seo-optimized-short",
  [UrlStructureField.WebPageCustomUrl]: "",
};
const search = {
  [SearchField.DefaultProductSort]: "relevance",
  [SearchField.DefaultContentSort]: "relevance",
  [SearchField.StorefrontSearchLogic]: "one-or-more",
};
const securityPrivacy = {
  [SecurityPrivacyField.EnforcePasswordComplexity]: false,
  [SecurityPrivacyField.InactiveShopperLogout]: "default",
  [SecurityPrivacyField.CustomLogoutDuration]: "",
  [SecurityPrivacyField.CustomLogoutDurationUnit]: "days",
  [SecurityPrivacyField.ShopperActivityExtendsLogout]: false,
  [SecurityPrivacyField.ControlPanelTimeout]: "1hour",
  [SecurityPrivacyField.EnableRecaptchaStorefront]: false,
  [SecurityPrivacyField.RecaptchaSiteKey]: "",
  [SecurityPrivacyField.RecaptchaSecretKey]: "",
  [SecurityPrivacyField.FailedLoginLockout]: "",
  [SecurityPrivacyField.EnableRecaptchaPrelaunch]: false,
  [SecurityPrivacyField.EnableCookieConsent]: false,
  [SecurityPrivacyField.PrivacyPolicyUrl]: "",
  [SecurityPrivacyField.DataCollectionLimit]: "off",
  [SecurityPrivacyField.EnableHsts]: false,
  [SecurityPrivacyField.HstsMaxAge]: "",
  [SecurityPrivacyField.HstsMaxAgeUnit]: "seconds",
  [SecurityPrivacyField.HstsApplySubdomains]: false,
  [SecurityPrivacyField.HstsApplyPreload]: false,
  [SecurityPrivacyField.CspConfig]: "",
  [SecurityPrivacyField.EnableNonceSecurity]: false,
  [SecurityPrivacyField.XFrameOptions]: "",
};
const miscellaneous = {
  [MiscellaneousField.ReviewEmailDays]: "",
  [MiscellaneousField.SendReviewEmailToGuests]: false,
  [MiscellaneousField.ForwardOrderInvoices]: false,
  [MiscellaneousField.InvoiceEmailRecipient]: "",
  [MiscellaneousField.SmtpServerOption]: "default",
  [MiscellaneousField.AdministratorEmail]: "",
  [MiscellaneousField.RequireMarketingConsent]: false,
  [MiscellaneousField.EnableAbandonedCartEmails]: false,
  [MiscellaneousField.AbandonedCartThreshold]: "",
  [MiscellaneousField.EmailEveryAbandonedCart]: false,
  [MiscellaneousField.StopEmailOnCompleteOrder]: false,
  [MiscellaneousField.EnableConvertedCartEmails]: false,
  [MiscellaneousField.ConvertedCartRecipient]: "",
  [MiscellaneousField.AllowPurchasing]: false,
  [MiscellaneousField.StartingOrderNumber]: "",
  [MiscellaneousField.EnableThrottler]: false,
  [MiscellaneousField.ThrottleReviewsPerPeriod]: "",
  [MiscellaneousField.ThrottlePeriodValue]: "",
  [MiscellaneousField.ThrottlePeriodUnit]: "minutes",
};
export const defaultValues = {
  website: website,
  display: defaultDisplay,
  urlStructure: urlStructure,
  search: search,
  securityPrivacy: securityPrivacy,
  miscellaneous: miscellaneous,
};

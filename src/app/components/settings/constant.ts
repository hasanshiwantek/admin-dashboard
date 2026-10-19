import {
  Facebook,
  Linkedin,
  Mail,
  Pin,
  Printer,
  ThumbsUp,
  Twitter,
} from "lucide-react";
import { ShareId } from "./type";

export enum WwwRedirect {
  RedirectWwwToNoWww = "redirect-www-to-no-www",
  RedirectNoWwwToWww = "redirect-no-www-to-www",
  NoRedirect = "no-redirect",
}
// WWW Redirect Options
export const WwwRedirectOptions = [
  {
    value: WwwRedirect.RedirectWwwToNoWww,
    label: "Redirect WWW to no WWW",
  },
  {
    value: WwwRedirect.RedirectNoWwwToWww,
    label: "Redirect no WWW to WWW",
  },
  {
    value: WwwRedirect.NoRedirect,
    label: "No Redirect",
  },
];
export enum WebsiteField {
  HomePageTitle = "website.homePageTitle",
  MetaKeywords = "website.metaKeywords",
  MetaDescription = "website.metaDescription",
  WwwRedirect = "website.wwwRedirect",
  RobotsTxt = "website.robotsTxt",
}

// Field name constants (optional but keeps things consistent)
export enum DisplayField {
  ProductBreadcrumbs = "display.productBreadcrumbs",
  ShowQuantityBox = "display.showQuantityBox",
  EnableSearchSuggest = "display.enableSearchSuggest",
  AutoApproveReviews = "display.autoApproveReviews",
  EnableWishlist = "display.enableWishlist",
  EnableProductComparisons = "display.enableProductComparisons",
  EnableAccountCreation = "display.enableAccountCreation",
  UseWysiwygEditor = "display.useWysiwygEditor",
  ShowProductThumbnails = "display.showProductThumbnails",
  CategoryProductList = "display.categoryProductList",
  DefaultProductSort = "display.defaultProductSort",
  MenuDisplayDepth = "display.menuDisplayDepth",
  ShowProductPrice = "display.showProductPrice",
  DetailPageDefaultPrice = "display.detailPageDefaultPrice",
  ListPageDefaultPrice = "display.listPageDefaultPrice",
  HidePriceFromGuests = "display.hidePriceFromGuests",
  ShowProductSku = "display.showProductSku",
  ShowProductWeight = "display.showProductWeight",
  ShowProductBrand = "display.showProductBrand",
  ShowProductShippingCost = "display.showProductShippingCost",
  ShowProductRating = "display.showProductRating",
  ShowAddToCartLink = "display.showAddToCartLink",
  DefaultPreOrderMessage = "display.defaultPreOrderMessage",
}
export enum BreadcrumbOption {
  ShowOneOnly = "show-one-only",
  Hide = "hide",
}
export const BREADCRUMB_OPTIONS = [
  { value: BreadcrumbOption.ShowOneOnly, label: "Show One Only" },
  { value: BreadcrumbOption.Hide, label: "Dont Show" },
];
export enum CategoryProductList {
  CurrentOnly = "current-only",
  ChildrenIfEmpty = "children-if-empty",
  CurrentAndChildren = "current-and-children",
}
export const CATEGORY_PRODUCT_LIST_OPTIONS = [
  {
    value: CategoryProductList.CurrentOnly,
    label: "Show products from the current category only",
  },
  {
    value: CategoryProductList.ChildrenIfEmpty,
    label:
      "Show products from child categories if the current category is empty",
  },
  {
    value: CategoryProductList.CurrentAndChildren,
    label: "Show products from the current category and its children",
  },
];
export enum DefaultSort {
  Featured = "featured",
  NewestItems = "newest-items",
  BestSelling = "best-selling",
  PriceAsc = "price-asc",
  PriceDesc = "price-desc",
  NameAsc = "name-asc",
  NameDesc = "name-desc",
}
export const DEFAULT_SORT_OPTIONS = [
  { value: DefaultSort.Featured, label: "Featured Items" },
  { value: DefaultSort.NewestItems, label: "Newest Items" },
  { value: DefaultSort.BestSelling, label: "Best Selling" },
  { value: DefaultSort.PriceAsc, label: "Price: Low to High" },
  { value: DefaultSort.PriceDesc, label: "Price: High to Low" },
  { value: DefaultSort.NameAsc, label: "A to Z" },
  { value: DefaultSort.NameDesc, label: "Z to A" },
];
export enum PriceDisplay {
  DefaultCatalog = "default-catalog",
  LowestVariation = "lowest-variation",
}

export const PRICE_DISPLAY_OPTIONS = [
  { value: PriceDisplay.DefaultCatalog, label: "Default catalog price" },
  { value: PriceDisplay.LowestVariation, label: "Lowest variation price" },
];
// url
export enum UrlStructureField {
  ProductUrlFormat = "urlStructure.productUrlFormat",
  ProductCustomUrl = "urlStructure.productCustomUrl",

  CategoryUrlFormat = "urlStructure.categoryUrlFormat",
  CategoryCustomUrl = "urlStructure.categoryCustomUrl",

  WebPageUrlFormat = "urlStructure.webPageUrlFormat",
  WebPageCustomUrl = "urlStructure.webPageCustomUrl",
}

export enum UrlFormat {
  SeoOptimizedShort = "seo-optimized-short",
  SeoOptimizedLong = "seo-optimized-long",
  Custom = "custom",
}
export enum UrlSettingEnums {
  SEO_OPTIMIZED_SHORT = "seo_optimized_short",
  SEO_OPTIMIZED_LONG = "seo_optimized_long",
  CUSTOM = "custom",
}
export const URL_FORMAT_OPTIONS = [
  { value: UrlFormat.SeoOptimizedShort, label: "SEO Optimized (Short)" },
  { value: UrlFormat.SeoOptimizedLong, label: "SEO Optimized (Long)" },
  { value: UrlFormat.Custom, label: "Custom" },
];

// search
export enum SearchField {
  DefaultProductSort = "search.defaultProductSort",
  DefaultContentSort = "search.defaultContentSort",
  StorefrontSearchLogic = "search.storefrontSearchLogic",
}

export enum SortOption {
  Relevance = "relevance",
  NameAsc = "name-asc",
  NameDesc = "name-desc",
  PriceAsc = "price-asc",
  PriceDesc = "price-desc",
  BestSelling = "best-selling",
  FeaturedItems = "featured-items",
  NewestItems = "newest-items",
}

export const SORT_OPTIONS = [
  { value: SortOption.Relevance, label: "Relevance" },
  { value: SortOption.NameAsc, label: "Name: A to Z" },
  { value: SortOption.NameDesc, label: "Name: Z to A" },
  { value: SortOption.PriceAsc, label: "Price: Low to High" },
  { value: SortOption.PriceDesc, label: "Price: High to Low" },
  { value: SortOption.BestSelling, label: "Best Selling" },
  { value: SortOption.FeaturedItems, label: "Featured Items" },
  { value: SortOption.NewestItems, label: "Newest Items" },
];
export enum ContentSort {
  Relevance = "relevance",
  NameAsc = "name-asc",
  NameDesc = "name-desc",
}

export const CONTENT_SORT_OPTIONS = [
  { value: ContentSort.Relevance, label: "Relevance" },
  { value: ContentSort.NameAsc, label: "Name: A to Z" },
  { value: ContentSort.NameDesc, label: "Name: Z to A" },
];
export enum SearchLogic {
  OneOrMore = "one-or-more",
  AllWords = "all-words",
}

export const SEARCH_LOGIC_OPTIONS = [
  {
    value: SearchLogic.OneOrMore,
    label: "Show results containing one or more",
  },
  { value: SearchLogic.AllWords, label: "Show results containing all words" },
];
//

export enum SecurityPrivacyField {
  EnforcePasswordComplexity = "securityPrivacy.enforcePasswordComplexity",
  InactiveShopperLogout = "securityPrivacy.inactiveShopperLogout",
  CustomLogoutDuration = "securityPrivacy.customLogoutDuration",
  CustomLogoutDurationUnit = "securityPrivacy.customLogoutDurationUnit",
  ShopperActivityExtendsLogout = "securityPrivacy.shopperActivityExtendsLogout",
  ControlPanelTimeout = "securityPrivacy.controlPanelTimeout",
  EnableRecaptchaStorefront = "securityPrivacy.enableRecaptchaStorefront",
  RecaptchaSiteKey = "securityPrivacy.recaptchaSiteKey",
  RecaptchaSecretKey = "securityPrivacy.recaptchaSecretKey",
  FailedLoginLockout = "securityPrivacy.failedLoginLockout",
  EnableRecaptchaPrelaunch = "securityPrivacy.enableRecaptchaPrelaunch",
  EnableCookieConsent = "securityPrivacy.enableCookieConsent",
  PrivacyPolicyUrl = "securityPrivacy.privacyPolicyUrl",
  DataCollectionLimit = "securityPrivacy.dataCollectionLimit",
  EnableHsts = "securityPrivacy.enableHsts",
  HstsMaxAge = "securityPrivacy.hstsMaxAge",
  HstsMaxAgeUnit = "securityPrivacy.hstsMaxAgeUnit",
  HstsApplySubdomains = "securityPrivacy.hstsApplySubdomains",
  HstsApplyPreload = "securityPrivacy.hstsApplyPreload",
  CspConfig = "securityPrivacy.cspConfig",
  EnableNonceSecurity = "securityPrivacy.enableNonceSecurity",
  XFrameOptions = "securityPrivacy.xFrameOptions",
}

export enum LogoutOption {
  Default = "default",
  Custom = "custom",
}

export const LOGOUT_OPTIONS = [
  { value: LogoutOption.Default, label: "Use the default 7 day duration" },
  { value: LogoutOption.Custom, label: "Let me customize the duration" },
];
export enum DurationUnit {
  Minutes = "minutes",
  Hours = "hours",
  Days = "days",
}

export const DURATION_UNIT_OPTIONS = [
  { value: DurationUnit.Minutes, label: "minutes" },
  { value: DurationUnit.Hours, label: "hours" },
  { value: DurationUnit.Days, label: "days" },
];
export enum TimeoutOption {
  OneHour = "1hour",
  TwoHours = "2hours",
  FourHours = "4hours",
  EightHours = "8hours",
}

export const TIMEOUT_OPTIONS = [
  { value: TimeoutOption.OneHour, label: "1 hour" },
  { value: TimeoutOption.TwoHours, label: "2 hours" },
  { value: TimeoutOption.FourHours, label: "4 hours" },
  { value: TimeoutOption.EightHours, label: "8 hours" },
];
export enum DataCollection {
  Off = "off",
  Moderate = "moderate",
  Strict = "strict",
}

export const DATA_COLLECTION_OPTIONS = [
  { value: DataCollection.Off, label: "Off" },
  {
    value: DataCollection.Moderate,
    label: "On with moderate limits to data collected (Legacy)",
  },
  {
    value: DataCollection.Strict,
    label: "On with strict limits to data collected",
  },
];
// miscellanous

export enum MiscellaneousField {
  ReviewEmailDays = "miscellaneous.reviewEmailDays",
  SendReviewEmailToGuests = "miscellaneous.sendReviewEmailToGuests",
  ForwardOrderInvoices = "miscellaneous.forwardOrderInvoices",
  InvoiceEmailRecipient = "miscellaneous.invoiceEmailRecipient",
  SmtpServerOption = "miscellaneous.smtpServerOption",
  AdministratorEmail = "miscellaneous.administratorEmail",
  RequireMarketingConsent = "miscellaneous.requireMarketingConsent",
  EnableAbandonedCartEmails = "miscellaneous.enableAbandonedCartEmails",
  EmailEveryAbandonedCart = "miscellaneous.emailEveryAbandonedCart",
  AbandonedCartThreshold = "miscellaneous.abandonedCartThreshold",
  StopEmailOnCompleteOrder = "miscellaneous.stopEmailOnCompleteOrder",
  EnableConvertedCartEmails = "miscellaneous.enableConvertedCartEmails",
  ConvertedCartRecipient = "miscellaneous.convertedCartRecipient",
  AllowPurchasing = "miscellaneous.allowPurchasing",
  StartingOrderNumber = "miscellaneous.startingOrderNumber",
  EnableThrottler = "miscellaneous.enableThrottler",
  ThrottleReviewsPerPeriod = "miscellaneous.throttleReviewsPerPeriod",
  ThrottlePeriodValue = "miscellaneous.throttlePeriodValue",
  ThrottlePeriodUnit = "miscellaneous.throttlePeriodUnit",
}

export enum SmtpOption {
  Default = "default",
  Custom = "custom",
}

export const SMTP_OPTIONS = [
  { value: SmtpOption.Default, label: "Use my default mail settings" },
  {
    value: SmtpOption.Custom,
    label: "Let me specify my own SMTP server details",
  },
];

export enum PeriodUnit {
  Minutes = "minutes",
  Hours = "hours",
  Days = "days",
}

export const PERIOD_UNIT_OPTIONS = [
  { value: PeriodUnit.Minutes, label: "minutes" },
  { value: PeriodUnit.Hours, label: "hours" },
  { value: PeriodUnit.Days, label: "days" },
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

export const SHARE_CONFIG: {
  id: ShareId;
  icon: typeof Facebook;
  color: string;
  iconOnly?: boolean;
}[] = [
  { id: "facebook", icon: Facebook, color: "bg-[#1877F2]" },
  { id: "twitter", icon: Twitter, color: "bg-[#1DA1F2]" },
  { id: "linkedin", icon: Linkedin, color: "bg-[#0A66C2]" },
  { id: "pinterest", icon: Pin, color: "bg-[#E60023]" },
  {
    id: "facebook-like",
    icon: ThumbsUp,
    color: "text-[#1877F2]",
    iconOnly: true,
  },
  { id: "email", icon: Mail, color: "bg-slate-500" },
  { id: "print", icon: Printer, color: "bg-slate-500" },
];
export const URL_STRUCTURE_SECTIONS = [
  {
    title: "Product URL Settings",
    formatField: UrlStructureField.ProductUrlFormat,
    customUrlField: UrlStructureField.ProductCustomUrl,
    shortExample: "https://test.com/ipod-nano/",
    longExample: "https://test.com/products/ipod-nano.html",
  },
  {
    title: "Category URL Settings",
    formatField: UrlStructureField.CategoryUrlFormat,
    customUrlField: UrlStructureField.CategoryCustomUrl,
    shortExample: "https://test.com/apple-ipod/",
    longExample: "https://test.com/categories/apple-ipod.html",
  },
  {
    title: "Web Page URL Settings",
    formatField: UrlStructureField.WebPageUrlFormat,
    customUrlField: UrlStructureField.WebPageCustomUrl,
    shortExample: "https://test.com/about-us/",
    longExample: "https://test.com/pages/about-us.html",
  },
];

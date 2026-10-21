import {
  Facebook,
  Linkedin,
  Mail,
  Pin,
  Printer,
  ThumbsUp,
  Twitter,
} from "lucide-react";
import type {
  CheckboxSettingConfig,
  GeneralSettingsFormValues,
  ShareNetworkConfig,
  UrlStructureSectionConfig,
} from "./type";

export const SETTINGS_ROUTE = "/manage/settings";

// ─── Tabs ─────────────────────────────────────────────────────
// Each tab is also its URL: /manage/settings/<tab>

export enum GeneralTab {
  Website = "website",
  Display = "display",
  Share = "share",
  UrlStructure = "url-structure",
  Search = "search",
  Security = "security",
  Misc = "misc",
}

export const generalTabs = [
  { key: GeneralTab.Website, label: "Website" },
  { key: GeneralTab.Display, label: "Display" },
  { key: GeneralTab.Share, label: "Share" },
  { key: GeneralTab.UrlStructure, label: "URL Structure" },
  { key: GeneralTab.Search, label: "Search" },
  { key: GeneralTab.Security, label: "Security & Privacy" },
  { key: GeneralTab.Misc, label: "Miscellaneous" },
];

// ─── Form sections ────────────────────────────────────────────
// Form values are nested by section: `website.homePageTitle`, ...

export enum GeneralSection {
  Website = "website",
  Display = "display",
  Share = "share",
  UrlStructure = "urlStructure",
  Search = "search",
  SecurityPrivacy = "securityPrivacy",
  Miscellaneous = "miscellaneous",
}

// Which tab shows each section; used to jump to the tab with an error
export const SECTION_TAB: Record<GeneralSection, GeneralTab> = {
  [GeneralSection.Website]: GeneralTab.Website,
  [GeneralSection.Display]: GeneralTab.Display,
  [GeneralSection.Share]: GeneralTab.Share,
  [GeneralSection.UrlStructure]: GeneralTab.UrlStructure,
  [GeneralSection.Search]: GeneralTab.Search,
  [GeneralSection.SecurityPrivacy]: GeneralTab.Security,
  [GeneralSection.Miscellaneous]: GeneralTab.Misc,
};

// ─── Field names (per section) ────────────────────────────────

export enum WebsiteField {
  HomePageTitle = "homePageTitle",
  MetaKeywords = "metaKeywords",
  MetaDescription = "metaDescription",
  WwwRedirect = "wwwRedirect",
  RobotsTxt = "robotsTxt",
}

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

export enum ShareField {
  Facebook = "facebook",
  Twitter = "twitter",
  Linkedin = "linkedin",
  Pinterest = "pinterest",
  FacebookLike = "facebookLike",
  Email = "email",
  Print = "print",
  PoweredByLink = "poweredByLink",
}

export enum UrlStructureField {
  ProductUrlFormat = "productUrlFormat",
  ProductCustomUrl = "productCustomUrl",
  CategoryUrlFormat = "categoryUrlFormat",
  CategoryCustomUrl = "categoryCustomUrl",
  WebPageUrlFormat = "webPageUrlFormat",
  WebPageCustomUrl = "webPageCustomUrl",
}

export enum SearchField {
  DefaultProductSort = "defaultProductSort",
  DefaultContentSort = "defaultContentSort",
  StorefrontSearchLogic = "storefrontSearchLogic",
}

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
  EnableNonceSecurity = "enableNonceSecurity",
}

export enum MiscellaneousField {
  ReviewEmailDays = "reviewEmailDays",
  SendReviewEmailToGuests = "sendReviewEmailToGuests",
  ForwardOrderInvoices = "forwardOrderInvoices",
  InvoiceEmailRecipient = "invoiceEmailRecipient",
  SmtpServerOption = "smtpServerOption",
  AdministratorEmail = "administratorEmail",
  RequireMarketingConsent = "requireMarketingConsent",
  EnableAbandonedCartEmails = "enableAbandonedCartEmails",
  AbandonedCartThreshold = "abandonedCartThreshold",
  EmailEveryAbandonedCart = "emailEveryAbandonedCart",
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

// ─── Option values + select/radio options ─────────────────────

export enum WwwRedirect {
  WwwToNoWww = "redirect-www-to-no-www",
  NoWwwToWww = "redirect-no-www-to-www",
  None = "no-redirect",
}
export const wwwRedirectOptions = [
  { value: WwwRedirect.WwwToNoWww, label: "Redirect WWW to no WWW" },
  { value: WwwRedirect.NoWwwToWww, label: "Redirect no WWW to WWW" },
  { value: WwwRedirect.None, label: "No Redirect" },
];

export enum BreadcrumbOption {
  ShowOneOnly = "show-one-only",
  Hide = "hide",
}
export const breadcrumbOptions = [
  { value: BreadcrumbOption.ShowOneOnly, label: "Show One Only" },
  { value: BreadcrumbOption.Hide, label: "Don't Show" },
];

export enum CategoryProductList {
  CurrentOnly = "current-only",
  ChildrenIfEmpty = "children-if-empty",
  CurrentAndChildren = "current-and-children",
}
export const categoryProductListOptions = [
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

export enum CategorySort {
  Featured = "featured",
  NewestItems = "newest-items",
  BestSelling = "best-selling",
  PriceAsc = "price-asc",
  PriceDesc = "price-desc",
  NameAsc = "name-asc",
  NameDesc = "name-desc",
}
export const categorySortOptions = [
  { value: CategorySort.Featured, label: "Featured Items" },
  { value: CategorySort.NewestItems, label: "Newest Items" },
  { value: CategorySort.BestSelling, label: "Best Selling" },
  { value: CategorySort.PriceAsc, label: "Price: Low to High" },
  { value: CategorySort.PriceDesc, label: "Price: High to Low" },
  { value: CategorySort.NameAsc, label: "A to Z" },
  { value: CategorySort.NameDesc, label: "Z to A" },
];

export enum PriceDisplay {
  DefaultCatalog = "default-catalog",
  LowestVariation = "lowest-variation",
}
export const priceDisplayOptions = [
  { value: PriceDisplay.DefaultCatalog, label: "Default catalog price" },
  { value: PriceDisplay.LowestVariation, label: "Lowest variation price" },
];

export enum UrlFormat {
  SeoOptimizedShort = "seo-optimized-short",
  SeoOptimizedLong = "seo-optimized-long",
  Custom = "custom",
}

export enum SearchSort {
  Relevance = "relevance",
  NameAsc = "name-asc",
  NameDesc = "name-desc",
  PriceAsc = "price-asc",
  PriceDesc = "price-desc",
  BestSelling = "best-selling",
  FeaturedItems = "featured-items",
  NewestItems = "newest-items",
}
export const searchSortOptions = [
  { value: SearchSort.Relevance, label: "Relevance" },
  { value: SearchSort.NameAsc, label: "Name: A to Z" },
  { value: SearchSort.NameDesc, label: "Name: Z to A" },
  { value: SearchSort.PriceAsc, label: "Price: Low to High" },
  { value: SearchSort.PriceDesc, label: "Price: High to Low" },
  { value: SearchSort.BestSelling, label: "Best Selling" },
  { value: SearchSort.FeaturedItems, label: "Featured Items" },
  { value: SearchSort.NewestItems, label: "Newest Items" },
];
export const contentSortOptions = [
  { value: SearchSort.Relevance, label: "Relevance" },
  { value: SearchSort.NameAsc, label: "Name: A to Z" },
  { value: SearchSort.NameDesc, label: "Name: Z to A" },
];

export enum SearchLogic {
  OneOrMore = "one-or-more",
  AllWords = "all-words",
}
export const searchLogicOptions = [
  {
    value: SearchLogic.OneOrMore,
    label: "Show results containing one or more",
  },
  { value: SearchLogic.AllWords, label: "Show results containing all words" },
];

export enum LogoutOption {
  Default = "default",
  Custom = "custom",
}
export const logoutOptions = [
  { value: LogoutOption.Default, label: "Use the default 7 day duration" },
  { value: LogoutOption.Custom, label: "Let me customize the duration" },
];

export enum TimeUnit {
  Minutes = "minutes",
  Hours = "hours",
  Days = "days",
}
export const timeUnitOptions = [
  { value: TimeUnit.Minutes, label: "minutes" },
  { value: TimeUnit.Hours, label: "hours" },
  { value: TimeUnit.Days, label: "days" },
];

export enum ControlPanelTimeout {
  OneHour = "1hour",
  TwoHours = "2hours",
  FourHours = "4hours",
  EightHours = "8hours",
}
export const controlPanelTimeoutOptions = [
  { value: ControlPanelTimeout.OneHour, label: "1 hour" },
  { value: ControlPanelTimeout.TwoHours, label: "2 hours" },
  { value: ControlPanelTimeout.FourHours, label: "4 hours" },
  { value: ControlPanelTimeout.EightHours, label: "8 hours" },
];

export enum DataCollection {
  Off = "off",
  Moderate = "moderate",
  Strict = "strict",
}
export const dataCollectionOptions = [
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

export enum SmtpOption {
  Default = "default",
  Custom = "custom",
}
export const smtpOptions = [
  { value: SmtpOption.Default, label: "Use my default mail settings" },
  {
    value: SmtpOption.Custom,
    label: "Let me specify my own SMTP server details",
  },
];

// ─── Display tab checkbox groups ──────────────────────────────

export const storefrontDisplayCheckboxes: CheckboxSettingConfig<DisplayField>[] =
  [
    {
      field: DisplayField.ShowQuantityBox,
      label: "Show Quantity Box for Products",
      text: "Yes, show the quantity box on the add to cart panel",
    },
    {
      field: DisplayField.EnableSearchSuggest,
      label: "Enable Search Suggest",
      text: "Yes, enable search suggest",
    },
    {
      field: DisplayField.AutoApproveReviews,
      label: "Auto Approve Reviews",
      text: "Yes, auto approve reviews",
    },
    {
      field: DisplayField.EnableWishlist,
      label: "Enable Wishlist",
      text: "Yes, enable the wishlist for my store",
    },
    {
      field: DisplayField.EnableProductComparisons,
      label: "Enable Product Comparisons",
      text: "Yes, enable product comparisons",
    },
    {
      field: DisplayField.EnableAccountCreation,
      label: "Enable Account Creation?",
      text: "Yes, enable account creation in my store",
    },
  ];

export const controlPanelCheckboxes: CheckboxSettingConfig<DisplayField>[] = [
  {
    field: DisplayField.UseWysiwygEditor,
    label: "Use WYSIWYG Editor",
    text: "Yes, enable the WYSIWYG editor",
  },
  {
    field: DisplayField.ShowProductThumbnails,
    label: "Show Product Thumbnails",
    text: "Yes, show product thumbnail images",
  },
];

// Shown after the two "price to display" selects
export const productDisplayCheckboxes: CheckboxSettingConfig<DisplayField>[] = [
  {
    field: DisplayField.HidePriceFromGuests,
    label: "Hide Product's Price from Guests?",
    text: "Yes, only show the product's price to logged in customers",
  },
  {
    field: DisplayField.ShowProductSku,
    label: "Show Product's SKU?",
    text: "Yes, show the product's SKU in my store",
  },
  {
    field: DisplayField.ShowProductWeight,
    label: "Show Product's Weight?",
    text: "Yes, show the product's weight in my store",
  },
  {
    field: DisplayField.ShowProductBrand,
    label: "Show Product's Brand?",
    text: "Yes, show the product's brand in my store",
  },
  {
    field: DisplayField.ShowProductShippingCost,
    label: "Show Product's Shipping Cost?",
    text: "Yes, show the product's shipping cost in my store",
  },
  {
    field: DisplayField.ShowProductRating,
    label: "Show Product's Rating?",
    text: "Yes, show the product's rating in my store",
  },
  {
    field: DisplayField.ShowAddToCartLink,
    label: "Show Add to Cart Link?",
    text: 'Yes, show the "Add to Cart" link in all the small product boxes',
  },
];

// ─── Static content ───────────────────────────────────────────

export const ROBOTS_LEARN_MORE_URL =
  "https://developers.google.com/search/docs/crawling-indexing/robots/intro";

export const urlStructureSections: UrlStructureSectionConfig[] = [
  {
    title: "Product URL Settings",
    formatField: UrlStructureField.ProductUrlFormat,
    customUrlField: UrlStructureField.ProductCustomUrl,
    apiSection: "product",
    customPlaceholder: "/%title%/",
    shortExample: "https://test.com/ipod-nano/",
    longExample: "https://test.com/products/ipod-nano.html",
  },
  {
    title: "Category URL Settings",
    formatField: UrlStructureField.CategoryUrlFormat,
    customUrlField: UrlStructureField.CategoryCustomUrl,
    apiSection: "category",
    customPlaceholder: "/%categoryname%/",
    shortExample: "https://test.com/apple-ipod/",
    longExample: "https://test.com/categories/apple-ipod.html",
  },
  {
    title: "Web Page URL Settings",
    formatField: UrlStructureField.WebPageUrlFormat,
    customUrlField: UrlStructureField.WebPageCustomUrl,
    apiSection: "webpage",
    customPlaceholder: "/%pagename%/",
    shortExample: "https://test.com/about-us/",
    longExample: "https://test.com/pages/about-us.html",
  },
];

// Colours are Tailwind tokens defined in globals.css
export const shareNetworks: ShareNetworkConfig[] = [
  {
    field: ShareField.Facebook,
    label: "Facebook",
    icon: Facebook,
    activeClassName: "bg-bright-azure-blue text-white",
  },
  {
    field: ShareField.Twitter,
    label: "Twitter",
    icon: Twitter,
    activeClassName: "bg-sky-cyan-blue text-white",
  },
  {
    field: ShareField.Linkedin,
    label: "LinkedIn",
    icon: Linkedin,
    activeClassName: "bg-deep-cobalt-blue text-white",
  },
  {
    field: ShareField.Pinterest,
    label: "Pinterest",
    icon: Pin,
    activeClassName: "bg-crimson-red text-white",
  },
  {
    field: ShareField.FacebookLike,
    label: "Facebook Like",
    icon: ThumbsUp,
    activeClassName: "text-bright-azure-blue",
    iconOnly: true,
  },
  {
    field: ShareField.Email,
    label: "Email",
    icon: Mail,
    activeClassName: "bg-slate-500 text-white",
  },
  {
    field: ShareField.Print,
    label: "Print",
    icon: Printer,
    activeClassName: "bg-slate-500 text-white",
  },
];

// ─── Defaults ─────────────────────────────────────────────────

export const generalSettingsDefaults: GeneralSettingsFormValues = {
  [GeneralSection.Website]: {
    [WebsiteField.HomePageTitle]: "",
    [WebsiteField.MetaKeywords]: "",
    [WebsiteField.MetaDescription]: "",
    [WebsiteField.WwwRedirect]: WwwRedirect.WwwToNoWww,
    [WebsiteField.RobotsTxt]: "",
  },
  [GeneralSection.Display]: {
    [DisplayField.ProductBreadcrumbs]: BreadcrumbOption.ShowOneOnly,
    [DisplayField.ShowQuantityBox]: false,
    [DisplayField.EnableSearchSuggest]: false,
    [DisplayField.AutoApproveReviews]: false,
    [DisplayField.EnableWishlist]: false,
    [DisplayField.EnableProductComparisons]: false,
    [DisplayField.EnableAccountCreation]: false,
    [DisplayField.UseWysiwygEditor]: false,
    [DisplayField.ShowProductThumbnails]: false,
    [DisplayField.CategoryProductList]: CategoryProductList.CurrentOnly,
    [DisplayField.DefaultProductSort]: CategorySort.Featured,
    [DisplayField.MenuDisplayDepth]: "1",
    [DisplayField.ShowProductPrice]: true,
    [DisplayField.DetailPageDefaultPrice]: PriceDisplay.DefaultCatalog,
    [DisplayField.ListPageDefaultPrice]: PriceDisplay.DefaultCatalog,
    [DisplayField.HidePriceFromGuests]: false,
    [DisplayField.ShowProductSku]: false,
    [DisplayField.ShowProductWeight]: false,
    [DisplayField.ShowProductBrand]: false,
    [DisplayField.ShowProductShippingCost]: false,
    [DisplayField.ShowProductRating]: false,
    [DisplayField.ShowAddToCartLink]: false,
    [DisplayField.DefaultPreOrderMessage]: "",
  },
  [GeneralSection.Share]: {
    [ShareField.Facebook]: true,
    [ShareField.Twitter]: true,
    [ShareField.Linkedin]: true,
    [ShareField.Pinterest]: true,
    [ShareField.FacebookLike]: false,
    [ShareField.Email]: true,
    [ShareField.Print]: true,
    [ShareField.PoweredByLink]: true,
  },
  [GeneralSection.UrlStructure]: {
    [UrlStructureField.ProductUrlFormat]: UrlFormat.SeoOptimizedShort,
    [UrlStructureField.ProductCustomUrl]: "",
    [UrlStructureField.CategoryUrlFormat]: UrlFormat.SeoOptimizedShort,
    [UrlStructureField.CategoryCustomUrl]: "",
    [UrlStructureField.WebPageUrlFormat]: UrlFormat.SeoOptimizedShort,
    [UrlStructureField.WebPageCustomUrl]: "",
  },
  [GeneralSection.Search]: {
    [SearchField.DefaultProductSort]: SearchSort.Relevance,
    [SearchField.DefaultContentSort]: SearchSort.Relevance,
    [SearchField.StorefrontSearchLogic]: SearchLogic.OneOrMore,
  },
  [GeneralSection.SecurityPrivacy]: {
    [SecurityPrivacyField.EnforcePasswordComplexity]: false,
    [SecurityPrivacyField.InactiveShopperLogout]: LogoutOption.Default,
    [SecurityPrivacyField.CustomLogoutDuration]: "",
    [SecurityPrivacyField.CustomLogoutDurationUnit]: TimeUnit.Days,
    [SecurityPrivacyField.ShopperActivityExtendsLogout]: false,
    [SecurityPrivacyField.ControlPanelTimeout]: ControlPanelTimeout.OneHour,
    [SecurityPrivacyField.EnableRecaptchaStorefront]: false,
    [SecurityPrivacyField.RecaptchaSiteKey]: "",
    [SecurityPrivacyField.RecaptchaSecretKey]: "",
    [SecurityPrivacyField.FailedLoginLockout]: "",
    [SecurityPrivacyField.EnableRecaptchaPrelaunch]: false,
    [SecurityPrivacyField.EnableCookieConsent]: false,
    [SecurityPrivacyField.PrivacyPolicyUrl]: "",
    [SecurityPrivacyField.DataCollectionLimit]: DataCollection.Off,
    [SecurityPrivacyField.EnableNonceSecurity]: false,
  },
  [GeneralSection.Miscellaneous]: {
    [MiscellaneousField.ReviewEmailDays]: "",
    [MiscellaneousField.SendReviewEmailToGuests]: false,
    [MiscellaneousField.ForwardOrderInvoices]: false,
    [MiscellaneousField.InvoiceEmailRecipient]: "",
    [MiscellaneousField.SmtpServerOption]: SmtpOption.Default,
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
    [MiscellaneousField.ThrottlePeriodUnit]: TimeUnit.Minutes,
  },
};

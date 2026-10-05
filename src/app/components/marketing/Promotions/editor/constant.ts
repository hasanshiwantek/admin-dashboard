import { SelectOption } from "@/components/ui/select";
import { generateUniqueCode } from "@/lib/utils";
import dayjs from "dayjs";
import { PromotionDisplay, PromotionStatus } from "../constant";
import type {
  BannerLocation,
  BannerType,
  CodeFormat,
  PromotionBanner,
  PromotionFormValues,
  RewardType,
  RuleValues,
} from "./types";

// ─── Form field names ────────────────────────────────────────────────────────
// Use these for `name`, watch/setValue and schema keys.

export enum PromotionField {
  Kind = "kind",
  Status = "status",
  Priority = "priority",
  // Summary
  Name = "name",
  DisplayName = "displayName",
  Channel = "channel",
  IsFeatured = "isFeatured",
  FeaturedMessage = "featuredMessage",
  // Rules
  Rule = "rule",
  // Coupon code
  CouponMode = "couponMode",
  Code = "code",
  CodeCount = "codeCount",
  CodeLength = "codeLength",
  CodeFormat = "codeFormat",
  CodePrefix = "codePrefix",
  CodeSuffix = "codeSuffix",
  CodeSeparator = "codeSeparator",
  CodeScheduleMode = "codeScheduleMode",
  CodeValidFromDate = "codeValidFromDate",
  CodeValidFromTime = "codeValidFromTime",
  CodeHasValidUntil = "codeHasValidUntil",
  CodeValidUntilDate = "codeValidUntilDate",
  CodeValidUntilTime = "codeValidUntilTime",
  // Targeting
  Currency = "currency",
  CustomerGroup = "customerGroup",
  // Schedule
  StartDate = "startDate",
  StartTime = "startTime",
  HasEndDate = "hasEndDate",
  EndDate = "endDate",
  EndTime = "endTime",
  Recurring = "recurring",
  IntervalWeeks = "intervalWeeks",
  Weekdays = "weekdays",
  TimeStart = "timeStart",
  TimeEnd = "timeEnd",
  // Usage limits
  MaxRedemptionsMode = "maxRedemptionsMode",
  MaxRedemptions = "maxRedemptions",
  PerCustomerLimitMode = "perCustomerLimitMode",
  PerCustomerLimit = "perCustomerLimit",
  CombineMode = "combineMode",
  // Banners
  Banners = "banners",
}

/** Fields of the rule builder's own form. */
export enum PromotionRuleField {
  Source = "source",
  Template = "template",
  ConditionType = "conditionType",
  ReachMetric = "reachMetric",
  ReachValue = "reachValue",
  Include = "include",
  Exclude = "exclude",
  RewardType = "rewardType",
  ApplyFrequency = "applyFrequency",
  GiftQty = "giftQty",
  GiftProduct = "giftProduct",
  DiscountType = "discountType",
  DiscountValue = "discountValue",
  ZoneScope = "zoneScope",
  Zones = "zones",
  MethodScope = "methodScope",
  Methods = "methods",
  CapMode = "capMode",
  CapMax = "capMax",
}

/** Fields of an include / exclude row inside a rule. */
export enum ItemFilterField {
  Type = "type",
  Items = "items",
}

/** Fields of the banner dialog's own form. */
export enum PromotionBannerField {
  Type = "type",
  Content = "content",
  Locations = "locations",
}

// ─── Allowed values (shared by the schemas and the option lists) ────────────

export const ANY = "any";

export const PROMOTION_KINDS = [
  PromotionDisplay.Automatic,
  PromotionDisplay.Coupon,
] as const;
export const RULE_SOURCES = ["custom", "cart", "shipping"] as const;
export const CONDITION_TYPES = ["none", "buys_products"] as const;
export const REACH_METRICS = ["quantity", "total_value"] as const;
export const ITEM_FILTER_TYPES = [
  "all",
  "products",
  "category",
  "brand",
] as const;
export const REWARD_TYPES = [
  "gift",
  "discount_products",
  "discount_subtotal",
  "free_shipping",
  "discount_shipping",
] as const;
export const DISCOUNT_TYPES = ["percent", "fixed"] as const;
export const APPLY_FREQUENCIES = ["once", "unlimited"] as const;
export const SCOPES = ["all", "selected"] as const;
export const COUPON_MODES = ["single", "bulk"] as const;
export const CODE_FORMATS = ["alphanumeric", "numeric", "alphabetic"] as const;
export const CODE_SCHEDULE_MODES = ["promotion", "custom"] as const;
export const LIMIT_MODES = ["none", "limited"] as const;
export const COMBINE_MODES = ["can", "cannot"] as const;
export const CAP_MODES = ["unlimited", "limited"] as const;
export const BANNER_TYPES = [
  "availability",
  "congratulations",
  "eligibility",
  "upsell",
] as const;
export const BANNER_LOCATIONS = [
  "homepage",
  "product",
  "cart",
  "checkout",
] as const;

export const FEATURED_MESSAGE_MAX = 80;
export const CODE_COUNT_RANGE = { min: 1, max: 10000 };
export const CODE_LENGTH_RANGE = { min: 6, max: 16 };

/** Codes can include numbers, letters, hyphens and underscores. */
export const COUPON_CODE_PATTERN = /^[A-Za-z0-9_-]+$/;

// ─── Option lists ────────────────────────────────────────────────────────────

export const CHANNEL_OPTIONS = [{ value: ANY, label: "any channel" }];

export const CONDITION_OPTIONS = [
  { value: "none", label: "No conditions" },
  { value: "buys_products", label: "Buys products" },
];

export const REACH_METRIC_OPTIONS = [
  { value: "quantity", label: "Quantity" },
  { value: "total_value", label: "Total value" },
];

export const INCLUDE_TYPE_OPTIONS = [
  { value: "all", label: "All products" },
  { value: "products", label: "Individual products" },
  { value: "category", label: "In category" },
  { value: "brand", label: "In brand" },
];

export const EXCLUDE_TYPE_OPTIONS = INCLUDE_TYPE_OPTIONS.filter(
  (option) => option.value !== "all",
);

/** As in BigCommerce: an inclusion plus one "And" row, and one exclusion. */
export const MAX_INCLUDE_FILTERS = 2;
export const MAX_EXCLUDE_FILTERS = 1;

export const CART_REWARDS: RewardType[] = [
  "gift",
  "discount_products",
  "discount_subtotal",
];
export const SHIPPING_REWARDS: RewardType[] = [
  "free_shipping",
  "discount_shipping",
];

/** Rewards with a discount amount / percentage. */
export const DISCOUNT_REWARDS: RewardType[] = [
  "discount_products",
  "discount_subtotal",
  "discount_shipping",
];

/** Rewards that support "The reward is limited to a maximum discount of". */
export const CAPPABLE_REWARDS: RewardType[] = DISCOUNT_REWARDS;

export const REWARD_LABELS: Record<RewardType, string> = {
  gift: "A gift in their cart",
  discount_products: "Discount on products",
  discount_subtotal: "Discount on order subtotal",
  free_shipping: "Free shipping",
  discount_shipping: "Discount on shipping",
};

export const REWARD_OPTIONS = [...CART_REWARDS, ...SHIPPING_REWARDS].map(
  (reward) => ({ value: reward, label: REWARD_LABELS[reward] }),
);

export const DISCOUNT_TYPE_OPTIONS = [
  { value: "percent", label: "Percentage" },
  { value: "fixed", label: "Amount" },
];

export const FREQUENCY_OPTIONS = [
  { value: "once", label: "Once" },
  { value: "unlimited", label: "Unlimited times" },
];

export const ZONE_SCOPE_OPTIONS = [
  { value: "all", label: "All shipping zones" },
  { value: "selected", label: "Selected shipping zones" },
];

export const METHOD_SCOPE_OPTIONS = [
  { value: "all", label: "All shipping methods" },
  { value: "selected", label: "Selected shipping methods" },
];

export const CAP_OPTIONS = [
  { value: "unlimited", label: "Has no limit" },
  { value: "limited", label: "Is limited" },
];

export const COMBINE_OPTIONS = [
  { value: "can", label: "can" },
  { value: "cannot", label: "cannot" },
];

export const CODE_FORMAT_OPTIONS: (SelectOption & { value: CodeFormat })[] = [
  { value: "alphanumeric", label: "Numbers and Letters (A1B2)" },
  { value: "numeric", label: "Numbers only (1234)" },
  { value: "alphabetic", label: "Letters only (ABCD)" },
];

export const CODE_CHARSETS: Record<CodeFormat, string> = {
  alphanumeric: "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
  numeric: "0123456789",
  alphabetic: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
};

export const SEPARATOR_OPTIONS = [
  { value: "none", label: "No separator" },
  { value: "-", label: "Dash ( - )" },
  { value: "_", label: "Underscore ( _ )" },
];

export const CUSTOMER_GROUP_OPTIONS = [
  { value: "retail", label: "Retail" },
  { value: "vip", label: "VIP" },
  { value: "wholesale", label: "Wholesale" },
];

export const WEEKDAY_OPTIONS: SelectOption[] = [
  { value: "mon", label: "Monday" },
  { value: "tue", label: "Tuesday" },
  { value: "wed", label: "Wednesday" },
  { value: "thu", label: "Thursday" },
  { value: "fri", label: "Friday" },
  { value: "sat", label: "Saturday" },
  { value: "sun", label: "Sunday" },
];

export const BANNER_TYPE_OPTIONS: {
  value: BannerType;
  label: string;
  /** Shown in the type picker and under the banner editor title. */
  description: string;
  /** When the banner shows, under the description in the banner editor. */
  details: string;
}[] = [
  {
    value: "availability",
    label: "Availability",
    description:
      "Use this banner to show customers that this promotion is active if they add products that aren't part of the promotion to their cart.",
    details:
      "This banner will only display on your online store to your customers while the promotion is active and their cart doesn't yet satisfy its conditions.",
  },
  {
    value: "congratulations",
    label: "Congratulations",
    description:
      "Use this banner to let your customers know that they've received this discount.",
    details:
      "This banner will only display on your online store to your customers when they have satisfied the necessary conditions defined for this discount and the discount has been applied.",
  },
  {
    value: "eligibility",
    label: "Eligibility",
    description:
      "Use this banner to let your customers know that they've met the necessary promotion conditions to qualify for the discount.",
    details:
      "This banner will only display on your online store to your customers when they have satisfied the necessary conditions defined for this discount but the discount hasn't been applied yet.",
  },
  {
    value: "upsell",
    label: "Upsell",
    description:
      "Use this banner to encourage your customers to spend more to qualify for a discount or value-added promotion.",
    details:
      "This banner will only display on your online store to your customers when a difference can be calculated between your specified minimum target (e.g. minimum order spend) and your customer's current position (e.g. current order spend).",
  },
];

export const BANNER_LOCATION_OPTIONS: (SelectOption & {
  value: BannerLocation;
})[] = [
  { value: "homepage", label: "Homepage" },
  { value: "product", label: "Product page" },
  { value: "cart", label: "Cart page" },
  { value: "checkout", label: "Checkout page" },
];

export const BANNER_PLACEHOLDERS = [
  {
    token: "%%condition.required%%",
    description:
      "The total number of items or spend amount required to satisfy the condition.",
  },
  {
    token: "%%condition.matched%%",
    description:
      "The number of matching items in the cart or the cart subtotal that contributes to satisfying the condition.",
  },
  {
    token: "%%condition.remaining%%",
    description: "The number of items or spend amount remaining to qualify.",
  },
  {
    token: "%%action.discount.applied%%",
    description: "The actual discount amount applied by the rule.",
  },
  {
    token: "%%action.discount.configured%%",
    description: "The discount amount set when the rule was created.",
  },
  {
    token: "%%action.offers.redeemed%%",
    description: "The number of items that have been discounted.",
  },
  {
    token: "%%action.offers.redeemable%%",
    description:
      "The number of items for which a discount is available but not redeemed.",
  },
  {
    token: "%%action.offers.total%%",
    description: "The total number of items eligible for discount.",
  },
];

// ─── Rule templates ──────────────────────────────────────────────────────────

export const emptyRule = (): RuleValues => ({
  [PromotionRuleField.Source]: "custom",
  [PromotionRuleField.Template]: null,
  [PromotionRuleField.ConditionType]: "",
  [PromotionRuleField.ReachMetric]: "quantity",
  [PromotionRuleField.ReachValue]: 1,
  [PromotionRuleField.Include]: [{ type: "all", items: [] }],
  [PromotionRuleField.Exclude]: [],
  [PromotionRuleField.RewardType]: "",
  [PromotionRuleField.ApplyFrequency]: "once",
  [PromotionRuleField.GiftQty]: 1,
  [PromotionRuleField.GiftProduct]: [],
  [PromotionRuleField.DiscountType]: "percent",
  [PromotionRuleField.DiscountValue]: null,
  [PromotionRuleField.ZoneScope]: "all",
  [PromotionRuleField.Zones]: [],
  [PromotionRuleField.MethodScope]: "all",
  [PromotionRuleField.Methods]: [],
  [PromotionRuleField.CapMode]: "unlimited",
  [PromotionRuleField.CapMax]: null,
});

export type RuleTemplate = {
  key: string;
  label: string;
  description: string;
  build: () => RuleValues;
};

const fromTemplate = (
  source: RuleValues["source"],
  template: string,
  values: Partial<RuleValues>,
): RuleValues => ({ ...emptyRule(), source, template, ...values });

export const CART_TEMPLATES: RuleTemplate[] = [
  {
    key: "buy_one_get_one_free",
    label: "Buy one, get one free",
    description: "Customers who add a product will receive a gift in their cart.",
    build: () =>
      fromTemplate("cart", "buy_one_get_one_free", {
        conditionType: "buys_products",
        include: [{ type: "products", items: [] }],
        rewardType: "gift",
      }),
  },
  {
    key: "spend_x_free_shipping",
    label: "Spend $X, get free shipping",
    description:
      "Increase average order size with free shipping when a threshold is met.",
    build: () =>
      fromTemplate("cart", "spend_x_free_shipping", {
        conditionType: "buys_products",
        reachMetric: "total_value",
        reachValue: null,
        rewardType: "free_shipping",
      }),
  },
  {
    key: "buy_x_get_percent_off",
    label: "Buy X products, get % off the next",
    description:
      "Discount products as customers add more of them to their cart (e.g. 3rd one 50% off).",
    build: () =>
      fromTemplate("cart", "buy_x_get_percent_off", {
        conditionType: "buys_products",
        reachValue: 2,
        rewardType: "discount_products",
        applyFrequency: "unlimited",
      }),
  },
  {
    key: "discount_order_subtotal",
    label: "Discount order subtotal",
    description: "Reduces the total for the customer's order.",
    build: () =>
      fromTemplate("cart", "discount_order_subtotal", {
        conditionType: "none",
        rewardType: "discount_subtotal",
      }),
  },
];

export const SHIPPING_TEMPLATES: RuleTemplate[] = [
  {
    key: "spend_x_discount_shipping",
    label: "Spend $100, get $10 off shipping",
    description: "Discount on shipping when a condition is met.",
    build: () =>
      fromTemplate("shipping", "spend_x_discount_shipping", {
        conditionType: "buys_products",
        reachMetric: "total_value",
        reachValue: 100,
        rewardType: "discount_shipping",
        discountType: "fixed",
        discountValue: 10,
      }),
  },
];

// ─── Defaults ────────────────────────────────────────────────────────────────

export const newCouponCode = () => generateUniqueCode(10).toUpperCase();

export const bannerDefaultValues = (
  type: BannerType,
  isCoupon: boolean,
): PromotionBanner => ({
  [PromotionBannerField.Type]: type,
  [PromotionBannerField.Content]: "",
  // Coupon banners can only be placed on the cart page.
  [PromotionBannerField.Locations]: isCoupon
    ? BANNER_LOCATION_OPTIONS.filter((option) => option.value === "cart")
    : [],
});

export const promotionDefaultValues = (
  kind: PromotionDisplay = PromotionDisplay.Automatic,
): PromotionFormValues => ({
  [PromotionField.Kind]: kind,
  [PromotionField.Status]: PromotionStatus.Active,
  [PromotionField.Priority]: null,
  [PromotionField.Name]: "",
  [PromotionField.DisplayName]: "",
  [PromotionField.Channel]: ANY,
  [PromotionField.IsFeatured]: false,
  [PromotionField.FeaturedMessage]: "",
  [PromotionField.Rule]: null,
  [PromotionField.CouponMode]: "single",
  [PromotionField.Code]: newCouponCode(),
  [PromotionField.CodeCount]: 10,
  [PromotionField.CodeLength]: 6,
  [PromotionField.CodeFormat]: "alphanumeric",
  [PromotionField.CodePrefix]: "",
  [PromotionField.CodeSuffix]: "",
  [PromotionField.CodeSeparator]: "none",
  [PromotionField.CodeScheduleMode]: "promotion",
  [PromotionField.CodeValidFromDate]: dayjs().startOf("day").toDate(),
  [PromotionField.CodeValidFromTime]: "00:00",
  [PromotionField.CodeHasValidUntil]: false,
  [PromotionField.CodeValidUntilDate]: null,
  [PromotionField.CodeValidUntilTime]: "23:59",
  [PromotionField.Currency]: "USD",
  [PromotionField.CustomerGroup]: null,
  [PromotionField.StartDate]: dayjs().startOf("day").toDate(),
  [PromotionField.StartTime]: "00:00",
  [PromotionField.HasEndDate]: false,
  [PromotionField.EndDate]: null,
  [PromotionField.EndTime]: "23:59",
  [PromotionField.Recurring]: false,
  [PromotionField.IntervalWeeks]: 1,
  [PromotionField.Weekdays]: [],
  [PromotionField.TimeStart]: "00:00",
  [PromotionField.TimeEnd]: "23:59",
  [PromotionField.MaxRedemptionsMode]: "none",
  [PromotionField.MaxRedemptions]: 1,
  [PromotionField.PerCustomerLimitMode]: "none",
  [PromotionField.PerCustomerLimit]: 1,
  [PromotionField.CombineMode]: "can",
  [PromotionField.Banners]: [],
});

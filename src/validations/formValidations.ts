import {
  BannerDateType,
  BannerField,
  BannerLocation,
  BannerPlacement,
} from "@/app/(protected)/manage/marketing/banners/constant";
import { needsLocationId } from "@/app/(protected)/manage/marketing/banners/utils";
import { PromotionDisplay } from "@/app/components/marketing/Promotions/constant";
import {
  APPLY_FREQUENCIES,
  BANNER_LOCATIONS,
  BANNER_TYPES,
  CAP_MODES,
  CAPPABLE_REWARDS,
  CODE_COUNT_RANGE,
  CODE_FORMATS,
  CODE_LENGTH_RANGE,
  CODE_SCHEDULE_MODES,
  COMBINE_MODES,
  CONDITION_TYPES,
  COUPON_CODE_PATTERN,
  COUPON_MODES,
  DISCOUNT_REWARDS,
  DISCOUNT_TYPES,
  FEATURED_MESSAGE_MAX,
  ITEM_FILTER_TYPES,
  LIMIT_MODES,
  ItemFilterField,
  PROMOTION_KINDS,
  PromotionBannerField,
  PromotionField,
  PromotionRuleField,
  REACH_METRICS,
  REWARD_TYPES,
  RULE_SOURCES,
  SCOPES,
} from "@/app/components/marketing/Promotions/editor/constant";
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

// ─── Promotions (standard editor) ────────────────────────────────────────────

/** Empty number inputs become null instead of failing the number cast. */
const optionalNumber = () =>
  number()
    .typeError("Enter a number")
    .transform((value, original) =>
      original === "" || original === null ? null : value,
    )
    .nullable()
    .defined();

const wholeNumber = () =>
  number()
    .typeError("Enter a number")
    .integer("Enter a whole number")
    .min(1, "Enter at least 1")
    .required();

/** A usage limit; its minimum applies only while the limit is switched on. */
const limitCount = () =>
  number()
    .typeError("Enter a number")
    .integer("Enter a whole number")
    .required();

const optionSchema = object({
  value: string().required(),
  label: string().required(),
});

// Added rows start without a type ("Please select a value").
const itemFilterSchema = object({
  [ItemFilterField.Type]: string()
    .oneOf([...ITEM_FILTER_TYPES, ""], "Please select a value")
    .notOneOf([""], "Please select a value")
    .defined(),
  [ItemFilterField.Items]: array(optionSchema)
    .defined()
    .when(ItemFilterField.Type, ([type], schema) =>
      type && type !== "all"
        ? schema.min(1, "Select at least one item")
        : schema,
    ),
});

/**
 * One condition → reward rule, edited in the rule builder.
 * Validate with `context: { anyCurrency }`.
 */
export const promotionRuleSchema = object({
  [PromotionRuleField.Source]: string().oneOf(RULE_SOURCES).required(),
  [PromotionRuleField.Template]: string().nullable().defined(),
  [PromotionRuleField.ConditionType]: string()
    .oneOf([...CONDITION_TYPES, ""], "Select a condition")
    .notOneOf([""], "Select a condition")
    .defined(),
  [PromotionRuleField.ReachMetric]: string().oneOf(REACH_METRICS).required(),
  [PromotionRuleField.ReachValue]: optionalNumber().when(
    PromotionRuleField.ConditionType,
    {
      is: "buys_products",
      then: (schema) =>
        schema
          .nonNullable("Enter a value")
          .positive("Enter a value greater than 0"),
    },
  ),
  // The builder resets these when the condition isn't "Buys products", so
  // hidden rows never block validation.
  [PromotionRuleField.Include]: array(itemFilterSchema).defined(),
  [PromotionRuleField.Exclude]: array(itemFilterSchema).defined(),
  [PromotionRuleField.RewardType]: string()
    .oneOf([...REWARD_TYPES, ""], "Select a reward")
    .notOneOf([""], "Select a reward")
    .defined(),
  [PromotionRuleField.ApplyFrequency]: string()
    .oneOf(APPLY_FREQUENCIES)
    .required(),
  [PromotionRuleField.GiftQty]: wholeNumber(),
  // A list of at most one product, as the chip picker edits it.
  [PromotionRuleField.GiftProduct]: array(optionSchema)
    .defined()
    .max(1)
    .when(PromotionRuleField.RewardType, {
      is: "gift",
      then: (schema) => schema.min(1, "Select a gift product"),
    }),
  [PromotionRuleField.DiscountType]: string().oneOf(DISCOUNT_TYPES).required(),
  [PromotionRuleField.DiscountValue]: optionalNumber().when(
    [
      PromotionRuleField.RewardType,
      PromotionRuleField.DiscountType,
      "$anyCurrency",
    ],
    ([reward, discountType, anyCurrency], schema) => {
      if (!DISCOUNT_REWARDS.includes(reward)) return schema;
      const required = schema
        .nonNullable("Enter a discount")
        .positive("Enter a discount greater than 0");
      if (discountType === "percent")
        return required.max(100, "A percentage discount can't exceed 100%");
      return anyCurrency
        ? required.test(
            "any-currency",
            "Amount based discounts aren't supported with Any currency",
            () => false,
          )
        : required;
    },
  ),
  [PromotionRuleField.ZoneScope]: string().oneOf(SCOPES).required(),
  [PromotionRuleField.Zones]: array(optionSchema)
    .defined()
    .when([PromotionRuleField.RewardType, PromotionRuleField.ZoneScope], {
      is: (reward: string, scope: string) =>
        reward === "free_shipping" && scope === "selected",
      then: (schema) => schema.min(1, "Select at least one shipping zone"),
    }),
  [PromotionRuleField.MethodScope]: string().oneOf(SCOPES).required(),
  [PromotionRuleField.Methods]: array(optionSchema)
    .defined()
    .when([PromotionRuleField.RewardType, PromotionRuleField.MethodScope], {
      is: (reward: string, scope: string) =>
        reward === "discount_shipping" && scope === "selected",
      then: (schema) => schema.min(1, "Select at least one shipping method"),
    }),
  [PromotionRuleField.CapMode]: string().oneOf(CAP_MODES).required(),
  [PromotionRuleField.CapMax]: optionalNumber().when(
    [PromotionRuleField.RewardType, PromotionRuleField.CapMode],
    {
      is: (reward: (typeof REWARD_TYPES)[number], mode: string) =>
        mode === "limited" && CAPPABLE_REWARDS.includes(reward),
      then: (schema) =>
        schema
          .nonNullable("Enter a maximum discount")
          .positive("Enter a maximum discount greater than 0"),
    },
  ),
});

export const promotionBannerSchema = object({
  [PromotionBannerField.Type]: string().oneOf(BANNER_TYPES).required(),
  [PromotionBannerField.Content]: string()
    .trim()
    .required("Enter the banner content"),
  [PromotionBannerField.Locations]: array(
    object({
      value: string().oneOf(BANNER_LOCATIONS).required(),
      label: string().required(),
    }),
  )
    .defined()
    .min(1, "Select at least one location"),
});

const isBulkCoupon = (kind: string, mode: string) =>
  kind === PromotionDisplay.Coupon && mode === "bulk";

const codeAffix = () =>
  string()
    .trim()
    .defined()
    .matches(COUPON_CODE_PATTERN, {
      message: "Use letters, numbers, - or _",
      excludeEmptyString: true,
    });

const codeRange = (
  { min, max }: { min: number; max: number },
  label: string,
) => {
  const message = `${label} must be between ${min} and ${max.toLocaleString()}`;
  return number()
    .typeError("Enter a number")
    .integer("Enter a whole number")
    .required(`${label} is required`)
    .when([PromotionField.Kind, PromotionField.CouponMode], {
      is: isBulkCoupon,
      then: (schema) => schema.min(min, message).max(max, message),
    });
};

/** Combines a calendar day and an "HH:mm" time into a timestamp. */
const atTime = (day: Date, time: string) => {
  const [hours, minutes] = time.split(":").map(Number);
  const result = new Date(day);
  result.setHours(hours, minutes, 0, 0);
  return result.getTime();
};

export const promotionSchema = object({
  [PromotionField.Kind]: string().oneOf(PROMOTION_KINDS).required(),
  [PromotionField.Status]: string().defined(),
  [PromotionField.Priority]: number().nullable().defined(),
  // Summary
  [PromotionField.Name]: string().trim().required("Promotion name is required"),
  [PromotionField.DisplayName]: string().trim().defined(),
  [PromotionField.Channel]: string().required(),
  [PromotionField.IsFeatured]: boolean().defined(),
  [PromotionField.FeaturedMessage]: string()
    .trim()
    .defined()
    .max(
      FEATURED_MESSAGE_MAX,
      `Use ${FEATURED_MESSAGE_MAX} characters or fewer`,
    )
    .when([PromotionField.Kind, PromotionField.IsFeatured], {
      is: (kind: string, featured: boolean) =>
        kind === PromotionDisplay.Automatic && featured,
      then: (schema) =>
        schema.required("Enter a message for the featured promotion"),
    }),
  // Rules — the rule's own fields are validated by promotionRuleSchema in
  // the rule builder.
  [PromotionField.Rule]: mixed<InferType<typeof promotionRuleSchema>>()
    .nullable()
    .defined()
    .test("required", "Add a rule to your promotion", (rule) => !!rule),
  // Coupon code
  [PromotionField.CouponMode]: string().oneOf(COUPON_MODES).required(),
  [PromotionField.Code]: string()
    .trim()
    .defined()
    .when([PromotionField.Kind, PromotionField.CouponMode], {
      is: (kind: string, mode: string) =>
        kind === PromotionDisplay.Coupon && mode === "single",
      then: (schema) =>
        schema
          .required("Coupon code is required")
          .matches(
            COUPON_CODE_PATTERN,
            "Coupon codes can only include numbers, letters, hyphens and underscores",
          ),
    }),
  [PromotionField.CodeCount]: codeRange(CODE_COUNT_RANGE, "Number of codes"),
  [PromotionField.CodeLength]: codeRange(CODE_LENGTH_RANGE, "Code length"),
  [PromotionField.CodeFormat]: string().oneOf(CODE_FORMATS).required(),
  [PromotionField.CodePrefix]: codeAffix(),
  [PromotionField.CodeSuffix]: codeAffix(),
  [PromotionField.CodeSeparator]: string().required(),
  [PromotionField.CodeScheduleMode]: string()
    .oneOf(CODE_SCHEDULE_MODES)
    .required(),
  [PromotionField.CodeValidFromDate]: date()
    .nullable()
    .defined()
    .when(
      [
        PromotionField.Kind,
        PromotionField.CouponMode,
        PromotionField.CodeScheduleMode,
      ],
      {
        is: (kind: string, mode: string, schedule: string) =>
          isBulkCoupon(kind, mode) && schedule === "custom",
        then: (schema) => schema.nonNullable("Select a start date"),
      },
    ),
  [PromotionField.CodeValidFromTime]: string().required(),
  [PromotionField.CodeHasValidUntil]: boolean().defined(),
  [PromotionField.CodeValidUntilDate]: date()
    .nullable()
    .defined()
    .when(
      [
        PromotionField.Kind,
        PromotionField.CouponMode,
        PromotionField.CodeScheduleMode,
        PromotionField.CodeHasValidUntil,
      ],
      {
        is: (kind: string, mode: string, schedule: string, hasEnd: boolean) =>
          isBulkCoupon(kind, mode) && schedule === "custom" && hasEnd,
        then: (schema) => schema.nonNullable("Select an end date"),
      },
    ),
  [PromotionField.CodeValidUntilTime]: string().required(),
  // Targeting — customerGroup is null until the targeting rule is added.
  [PromotionField.Currency]: string().required(),
  [PromotionField.CustomerGroup]: string()
    .nullable()
    .defined()
    .test(
      "selected",
      "Select a customer group or remove this rule",
      (group) => group !== "",
    ),
  // Schedule
  [PromotionField.StartDate]: date()
    .typeError("Select a start date")
    .required("Select a start date"),
  [PromotionField.StartTime]: string().required(),
  [PromotionField.HasEndDate]: boolean().defined(),
  [PromotionField.EndDate]: date()
    .nullable()
    .defined()
    .when(PromotionField.HasEndDate, {
      is: true,
      then: (schema) =>
        schema
          .nonNullable("Select an end date")
          .test(
            "after-start",
            "The promotion must end after it starts",
            function (endDate) {
              const { startDate, startTime, endTime } = this.parent;
              return (
                !endDate ||
                !startDate ||
                atTime(endDate, endTime) > atTime(startDate, startTime)
              );
            },
          ),
    }),
  [PromotionField.EndTime]: string().required(),
  [PromotionField.Recurring]: boolean().defined(),
  [PromotionField.IntervalWeeks]: wholeNumber(),
  [PromotionField.Weekdays]: array(optionSchema)
    .defined()
    .when(PromotionField.Recurring, {
      is: true,
      then: (schema) => schema.min(1, "Select at least one weekday"),
    }),
  [PromotionField.TimeStart]: string().required(),
  [PromotionField.TimeEnd]: string()
    .required()
    .when(PromotionField.Recurring, {
      is: true,
      then: (schema) =>
        schema.test(
          "after-start",
          "End time must be after the start time",
          function (timeEnd) {
            return timeEnd > this.parent[PromotionField.TimeStart];
          },
        ),
    }),
  // Usage limits
  [PromotionField.MaxRedemptionsMode]: string().oneOf(LIMIT_MODES).required(),
  [PromotionField.MaxRedemptions]: limitCount().when(
    PromotionField.MaxRedemptionsMode,
    { is: "limited", then: (schema) => schema.min(1, "Enter at least 1") },
  ),
  [PromotionField.PerCustomerLimitMode]: string()
    .oneOf(LIMIT_MODES)
    .required(),
  // Only coupon promotions show this limit; a value loaded on an automatic
  // promotion is passed back untouched.
  [PromotionField.PerCustomerLimit]: limitCount().when(
    [PromotionField.Kind, PromotionField.PerCustomerLimitMode],
    {
      is: (kind: string, mode: string) =>
        kind === PromotionDisplay.Coupon && mode === "limited",
      then: (schema) => schema.min(1, "Enter at least 1"),
    },
  ),
  [PromotionField.CombineMode]: string().oneOf(COMBINE_MODES).required(),
  // Banners
  [PromotionField.Banners]: array(promotionBannerSchema).defined(),
});

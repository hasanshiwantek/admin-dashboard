import { SelectOption } from "@/components/ui/select";
import dayjs from "dayjs";
import { PromotionDisplay, PromotionStatus } from "../constant";
import {
  ANY,
  BANNER_LOCATION_OPTIONS,
  CAPPABLE_REWARDS,
  CODE_CHARSETS,
  DISCOUNT_REWARDS,
  PromotionField,
  PromotionRuleField,
  REWARD_LABELS,
  SHIPPING_REWARDS,
  WEEKDAY_OPTIONS,
} from "./constant";
import {
  CodeFormat,
  ItemFilter,
  PromotionFormValues,
  RuleValues,
} from "./types";

const API_DATE_TIME = "YYYY-MM-DD HH:mm:ss";

/** "2026-09-29 00:00:00" from a calendar day and an "HH:mm" time. */
export const toApiDateTime = (date: Date, time: string) => {
  const [hours, minutes] = time.split(":").map(Number);
  return dayjs(date)
    .hour(hours)
    .minute(minutes)
    .second(0)
    .format(API_DATE_TIME);
};

export const formatTime12h = (time: string) =>
  dayjs(`2000-01-01 ${time}`).format("h:mm A");

export const isShippingReward = (rule: Pick<RuleValues, PromotionRuleField.RewardType>) =>
  !!rule.rewardType && SHIPPING_REWARDS.includes(rule.rewardType);

export const isCappable = (rule: Pick<RuleValues, PromotionRuleField.RewardType>) =>
  !!rule.rewardType && CAPPABLE_REWARDS.includes(rule.rewardType);

const hasDiscountValue = (rule: Pick<RuleValues, PromotionRuleField.RewardType>) =>
  !!rule.rewardType && DISCOUNT_REWARDS.includes(rule.rewardType);

const formatAmount = (value: number | null, currencySymbol = "$") =>
  `${currencySymbol}${Number(value)}`;

// ─── Rule table summaries ────────────────────────────────────────────────────

export const describeCondition = (rule: RuleValues) => {
  if (rule.conditionType !== "buys_products") return "No conditions";
  return rule.reachMetric === "total_value"
    ? `Buys products for ${formatAmount(rule.reachValue)}`
    : `Buys ${Number(rule.reachValue)} products`;
};

export const describeReward = (rule: RuleValues) => {
  if (!rule.rewardType) return "-";
  const label = REWARD_LABELS[rule.rewardType];
  if (!hasDiscountValue(rule)) return label;
  const value =
    rule.discountType === "percent"
      ? `${Number(rule.discountValue)}%`
      : formatAmount(rule.discountValue);
  return `${value} ${label}`;
};

// ─── Bulk coupon code preview ────────────────────────────────────────────────

const SAMPLE = "A1B2C3D4E5F6G7H8";

export const exampleCouponCode = ({
  codeLength,
  codeFormat,
  codePrefix,
  codeSuffix,
  codeSeparator,
}: Pick<
  PromotionFormValues,
  | PromotionField.CodeLength
  | PromotionField.CodeFormat
  | PromotionField.CodePrefix
  | PromotionField.CodeSuffix
  | PromotionField.CodeSeparator
>) => {
  const length = Number(codeLength) || 0;
  const body = {
    alphanumeric: SAMPLE,
    numeric: "1234567890123456",
    alphabetic: "ABCDEFGHJKLMNPQR",
  }[codeFormat].slice(0, length);
  const separator = codeSeparator === "none" ? "" : codeSeparator;
  return [codePrefix, body, codeSuffix].filter(Boolean).join(separator);
};

const SCALES: [number, string][] = [
  [1e12, "trillion"],
  [1e9, "billion"],
  [1e6, "million"],
  [1e3, "thousand"],
];

/** e.g. "2 billion" unique codes for 6 alphanumeric characters. */
export const uniqueCombinations = (format: CodeFormat, length: number) => {
  const total = Math.pow(CODE_CHARSETS[format].length, Number(length) || 0);
  if (total >= 1e15) return "over 1 quadrillion";
  const scale = SCALES.find(([size]) => total >= size);
  return scale
    ? `${Math.floor(total / scale[0]).toLocaleString()} ${scale[1]}`
    : total.toLocaleString();
};

// ─── Request payload ─────────────────────────────────────────────────────────

const toIds = (filter: ItemFilter) => ({
  type: filter.type,
  ids: filter.type === "all" ? [] : filter.items.map((item) => Number(item.value)),
});

const buildCondition = (rule: RuleValues) =>
  rule.conditionType === "buys_products"
    ? {
        type: "buys_products",
        reach: { metric: rule.reachMetric, value: Number(rule.reachValue) },
        include: rule.include.map(toIds),
        exclude: rule.exclude.map(toIds),
      }
    : { type: "none" };

const buildRewardCap = (rule: RuleValues) =>
  isCappable(rule) && rule.capMode === "limited"
    ? { reward_cap: { limited: true, max_amount: Number(rule.capMax) } }
    : {};

const buildReward = (rule: RuleValues) => {
  const discount = {
    discount_type: rule.discountType,
    discount_value: Number(rule.discountValue),
  };
  switch (rule.rewardType) {
    case "gift":
      return {
        type: "gift",
        gift_qty: Number(rule.giftQty),
        gift_product_id: Number(rule.giftProduct[0]?.value),
      };
    case "discount_products":
    case "discount_subtotal":
      return { type: rule.rewardType, ...discount, ...buildRewardCap(rule) };
    case "free_shipping":
      return {
        type: "free_shipping",
        shipping_zones: {
          scope: rule.zoneScope,
          ids:
            rule.zoneScope === "selected"
              ? rule.zones.map((zone) => Number(zone.value))
              : [],
        },
      };
    case "discount_shipping":
      return {
        type: "discount_shipping",
        ...discount,
        shipping_methods: {
          scope: rule.methodScope,
          ids:
            rule.methodScope === "selected"
              ? rule.methods.map((method) => Number(method.value))
              : [],
        },
        ...buildRewardCap(rule),
      };
    default:
      return {};
  }
};

export const buildRules = (rule: RuleValues) => ({
  source: rule.source,
  template: rule.template,
  condition: buildCondition(rule),
  reward: buildReward(rule),
  // The frequency picker only shows for cart rewards with a "Buys products"
  // condition; otherwise the reward applies once per cart.
  apply_frequency:
    rule.conditionType === "buys_products" && !isShippingReward(rule)
      ? rule.applyFrequency
      : "once",
  apply_per: "cart",
});

const buildCoupon = (values: PromotionFormValues) => {
  if (values.couponMode === "single") return { mode: "single" };
  const custom = values.codeScheduleMode === "custom";
  return {
    mode: "bulk",
    count: Number(values.codeCount),
    length: Number(values.codeLength),
    format: values.codeFormat,
    prefix: values.codePrefix.trim(),
    suffix: values.codeSuffix.trim(),
    separator: values.codeSeparator === "none" ? "" : values.codeSeparator,
    scheduleMode: values.codeScheduleMode,
    ...(custom && {
      validFrom: values.codeValidFromDate
        ? toApiDateTime(values.codeValidFromDate, values.codeValidFromTime)
        : null,
      validUntil:
        values.codeHasValidUntil && values.codeValidUntilDate
          ? toApiDateTime(values.codeValidUntilDate, values.codeValidUntilTime)
          : null,
    }),
  };
};

export const buildPromotionPayload = (values: PromotionFormValues) => {
  const { kind } = values;
  const isCoupon = kind === PromotionDisplay.Coupon;
  const featured = !isCoupon && values.isFeatured;

  const targeting: { type: string; value: string }[] = [
    { type: "currency", value: values.currency },
  ];
  if (values.customerGroup)
    targeting.push({ type: "customer_group", value: values.customerGroup });

  return {
    kind,
    editor: "standard",
    name: values.name.trim(),
    displayName: values.displayName.trim() || null,
    status: values.status || PromotionStatus.Active,
    ...(values.priority !== null && { priority: values.priority }),
    currency: values.currency,
    channel: values.channel || ANY,
    isFeatured: featured,
    featuredMessage: featured ? values.featuredMessage.trim() : null,
    maxRedemptions:
      values.maxRedemptionsMode === "limited"
        ? Number(values.maxRedemptions)
        : null,
    perCustomerLimit:
      values.perCustomerLimitMode === "limited"
        ? Number(values.perCustomerLimit)
        : null,
    canCombine: values.combineMode === "can",
    startsAt: toApiDateTime(values.startDate, values.startTime),
    endsAt:
      values.hasEndDate && values.endDate
        ? toApiDateTime(values.endDate, values.endTime)
        : null,
    rules: values.rule ? buildRules(values.rule) : null,
    schedule: values.recurring
      ? {
          recurring: true,
          interval_weeks: Number(values.intervalWeeks),
          // Monday → Sunday, whatever order they were picked in.
          weekdays: WEEKDAY_OPTIONS.filter((day) =>
            values.weekdays.some((picked) => picked.value === day.value),
          ).map((day) => day.value),
          time_start: values.timeStart,
          time_end: values.timeEnd,
        }
      : null,
    targeting,
    banners: values.banners.map(({ type, content, locations }) => ({
      type,
      content,
      locations: locations.map((location) => location.value),
    })),
    ...(isCoupon && {
      ...(values.couponMode === "single" && { code: values.code.trim() }),
      coupon: buildCoupon(values),
    }),
  };
};

// ─── API response → form values ──────────────────────────────────────────────

const parseJson = <T,>(value: unknown): T | null => {
  if (typeof value !== "string") return (value as T) ?? null;
  try {
    return JSON.parse(value) as T;
  } catch {
    return null;
  }
};

/** Unwraps `{ data: { promotion } }`-style envelopes around a promotion. */
export const extractPromotion = (response: any) =>
  response?.data?.promotion ?? response?.promotion ?? response?.data ?? response;

/** Chip placeholder for an id whose display name is resolved later. */
export const UNRESOLVED_PREFIX = "#";

const idOptions = (ids: unknown, names?: Record<string, string>) =>
  (Array.isArray(ids) ? ids : []).map((entry: any) => {
    const id = String(entry?.id ?? entry);
    return {
      value: id,
      label: entry?.name ?? names?.[id] ?? `${UNRESOLVED_PREFIX}${id}`,
    };
  });

const toFilters = (filters: unknown): ItemFilter[] =>
  (Array.isArray(filters) ? filters : []).map((filter: any) => ({
    type: filter?.type ?? "all",
    items: idOptions(filter?.items ?? filter?.ids),
  }));

const toRule = (rules: any): RuleValues | null => {
  if (!rules?.reward?.type) return null;
  const { condition = {}, reward } = rules;
  const include = toFilters(condition.include);
  return {
    source: rules.source ?? "custom",
    template: rules.template ?? null,
    conditionType: condition.type === "buys_products" ? "buys_products" : "none",
    reachMetric: condition.reach?.metric ?? "quantity",
    reachValue: Number(condition.reach?.value ?? 1),
    include: include.length ? include : [{ type: "all", items: [] }],
    exclude: toFilters(condition.exclude),
    rewardType: reward.type,
    applyFrequency: rules.apply_frequency ?? "once",
    giftQty: Number(reward.gift_qty ?? 1),
    giftProduct:
      reward.gift_product_id != null
        ? idOptions([reward.gift_product ?? reward.gift_product_id])
        : [],
    discountType: reward.discount_type ?? "percent",
    discountValue:
      reward.discount_value != null ? Number(reward.discount_value) : null,
    zoneScope: reward.shipping_zones?.scope ?? "all",
    zones: idOptions(reward.shipping_zones?.ids),
    methodScope: reward.shipping_methods?.scope ?? "all",
    methods: idOptions(reward.shipping_methods?.ids),
    capMode: reward.reward_cap?.limited ? "limited" : "unlimited",
    capMax:
      reward.reward_cap?.max_amount != null
        ? Number(reward.reward_cap.max_amount)
        : null,
  };
};

const splitDateTime = (value?: string | null) => {
  const date = value ? dayjs(value) : null;
  return date?.isValid()
    ? { date: date.startOf("day").toDate(), time: date.format("HH:mm") }
    : null;
};

export const promotionToFormValues = (
  promotion: any,
  defaults: PromotionFormValues,
): PromotionFormValues => {
  const rules = parseJson<any>(promotion?.rules);
  const coupon = parseJson<any>(promotion?.coupon) ?? {};
  const schedule = parseJson<any>(promotion?.schedule);
  const targeting = parseJson<any[]>(promotion?.targeting) ?? [];
  const banners = parseJson<any[]>(promotion?.banners) ?? [];
  const start = splitDateTime(promotion?.startsAt ?? promotion?.startDate);
  const end = splitDateTime(promotion?.endsAt ?? promotion?.endDate);
  const validFrom = splitDateTime(coupon.validFrom);
  const validUntil = splitDateTime(coupon.validUntil);
  const customerGroup = targeting.find((t) => t?.type === "customer_group");

  return {
    ...defaults,
    kind:
      promotion?.kind === PromotionDisplay.Coupon
        ? PromotionDisplay.Coupon
        : PromotionDisplay.Automatic,
    status: promotion?.status ?? defaults.status,
    priority: promotion?.priority ?? null,
    name: promotion?.name ?? "",
    displayName: promotion?.displayName ?? "",
    channel: promotion?.channel ?? ANY,
    isFeatured: !!promotion?.isFeatured,
    featuredMessage: promotion?.featuredMessage ?? "",
    rule: toRule(rules),
    couponMode: coupon.mode === "bulk" ? "bulk" : "single",
    code: promotion?.code ?? defaults.code,
    codeCount: coupon.count ?? defaults.codeCount,
    codeLength: coupon.length ?? defaults.codeLength,
    codeFormat: coupon.format ?? defaults.codeFormat,
    codePrefix: coupon.prefix ?? "",
    codeSuffix: coupon.suffix ?? "",
    codeSeparator: coupon.separator || "none",
    codeScheduleMode: coupon.scheduleMode ?? "promotion",
    codeValidFromDate: validFrom?.date ?? defaults.codeValidFromDate,
    codeValidFromTime: validFrom?.time ?? defaults.codeValidFromTime,
    codeHasValidUntil: !!validUntil,
    codeValidUntilDate: validUntil?.date ?? null,
    codeValidUntilTime: validUntil?.time ?? defaults.codeValidUntilTime,
    currency: promotion?.currency ?? defaults.currency,
    customerGroup: customerGroup?.value ?? null,
    startDate: start?.date ?? defaults.startDate,
    startTime: start?.time ?? defaults.startTime,
    hasEndDate: !!end,
    endDate: end?.date ?? null,
    endTime: end?.time ?? defaults.endTime,
    recurring: !!schedule?.recurring,
    intervalWeeks: schedule?.interval_weeks ?? 1,
    weekdays: WEEKDAY_OPTIONS.filter((day) =>
      (schedule?.weekdays ?? []).includes(day.value),
    ),
    timeStart: schedule?.time_start ?? defaults.timeStart,
    timeEnd: schedule?.time_end ?? defaults.timeEnd,
    maxRedemptionsMode: promotion?.maxRedemptions != null ? "limited" : "none",
    maxRedemptions: promotion?.maxRedemptions ?? defaults.maxRedemptions,
    perCustomerLimitMode:
      promotion?.perCustomerLimit != null ? "limited" : "none",
    perCustomerLimit: promotion?.perCustomerLimit ?? defaults.perCustomerLimit,
    combineMode: promotion?.canCombine === false ? "cannot" : "can",
    banners: banners.map(({ type, content, locations }) => ({
      type,
      content: content ?? "",
      locations: BANNER_LOCATION_OPTIONS.filter((option) =>
        (locations ?? []).includes(option.value),
      ),
    })),
  };
};

/** Product ids in a rule whose chip still shows the "#id" placeholder. */
export const unresolvedProductIds = (rule: RuleValues | null) => {
  if (!rule) return [];
  const products = [
    ...[...rule.include, ...rule.exclude]
      .filter((filter) => filter.type === "products")
      .flatMap((filter) => filter.items),
    ...rule.giftProduct,
  ];
  return [
    ...new Set(
      products
        .filter((item) => item.label.startsWith(UNRESOLVED_PREFIX))
        .map((item) => item.value),
    ),
  ];
};

/** Swaps "#id" product chips for their names. */
export const relabelProducts = (
  rule: RuleValues,
  names: Record<string, string>,
): RuleValues => {
  const relabel = (item: SelectOption) =>
    names[item.value] ? { ...item, label: names[item.value] } : item;
  const relabelFilters = (filters: ItemFilter[]) =>
    filters.map((filter) =>
      filter.type === "products"
        ? { ...filter, items: filter.items.map(relabel) }
        : filter,
    );
  return {
    ...rule,
    include: relabelFilters(rule.include),
    exclude: relabelFilters(rule.exclude),
    giftProduct: rule.giftProduct.map(relabel),
  };
};

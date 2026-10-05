"use client";

import SelectField from "@/components/form/fields/SelectField";
import FormFooter from "@/components/form/FormFooter";
import InputField from "@/components/form/InputField";
import AdornedInput from "@/components/ui/AdornedInput";
import { Button } from "@/components/ui/button";
import ChipSelect from "@/components/ui/ChipSelect";
import NumberStepper from "@/components/ui/NumberStepper";
import PickerField, { PickerRenderProps } from "@/components/ui/PickerField";
import { cn } from "@/lib/utils";
import { promotionRuleSchema } from "@/validations/formValidations";
import { yupResolver } from "@hookform/resolvers/yup";
import { Info, Plus } from "lucide-react";
import { useEffect, useMemo } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import {
  ANY,
  CAP_OPTIONS,
  CONDITION_OPTIONS,
  DISCOUNT_TYPE_OPTIONS,
  EXCLUDE_TYPE_OPTIONS,
  FREQUENCY_OPTIONS,
  INCLUDE_TYPE_OPTIONS,
  ItemFilterField,
  MAX_EXCLUDE_FILTERS,
  MAX_INCLUDE_FILTERS,
  METHOD_SCOPE_OPTIONS,
  PromotionRuleField,
  REACH_METRIC_OPTIONS,
  REWARD_OPTIONS,
  ZONE_SCOPE_OPTIONS,
} from "./constant";
import { PromotionLookups } from "./hooks/usePromotionLookups";
import BrandPickerDialog from "./modals/BrandPickerDialog";
import CategoryPickerDialog from "./modals/CategoryPickerDialog";
import ProductPickerDialog from "./modals/ProductPickerDialog";
import { BulletRow, Pill, Tag } from "./SentenceParts";
import { LINK_BUTTON, SELECT, TEXT } from "./styles";
import { ItemFilter, RuleValues } from "./types";
import { isCappable, isShippingReward } from "./utils";

type FilterKey = PromotionRuleField.Include | PromotionRuleField.Exclude;

/** Matches "include.0.type" / "exclude.2.type". */
const FILTER_TYPE_PATH = new RegExp(
  `^(${PromotionRuleField.Include}|${PromotionRuleField.Exclude})\\.(\\d+)\\.${ItemFilterField.Type}$`,
);

/** Sentence controls sit inline, with their error underneath. */
const INLINE = { layout: "vertical" } as const;

type Props = {
  initialRule: RuleValues;
  isNew: boolean;
  currency: string;
  lookups: PromotionLookups;
  onSave: (rule: RuleValues) => void;
  onCancel: () => void;
};

/** Edits one rule; remount it (via `key`) to start from a new `initialRule`. */
const RuleBuilder = ({
  initialRule,
  isNew,
  currency,
  lookups,
  onSave,
  onCancel,
}: Props) => {
  const anyCurrency = currency === ANY;
  // The builder only shows while the rest of the page is hidden, so the
  // currency can't change under it and `context` stays current.
  const form = useForm<RuleValues, { anyCurrency: boolean }>({
    resolver: yupResolver(promotionRuleSchema),
    defaultValues: initialRule,
    context: { anyCurrency },
  });
  const { control, watch, setValue, handleSubmit } = form;

  const include = useFieldArray({ control, name: PromotionRuleField.Include });
  const exclude = useFieldArray({ control, name: PromotionRuleField.Exclude });
  const filterArrays = useMemo(
    () => ({
      [PromotionRuleField.Include]: include,
      [PromotionRuleField.Exclude]: exclude,
    }),
    [include, exclude],
  );

  // watch([...]) types enum-keyed fields as never, so the tuple is cast.
  const [
    conditionType,
    reachMetric,
    rewardType,
    zoneScope,
    methodScope,
    includeValues,
    capMode,
    discountType,
  ] = watch([
    PromotionRuleField.ConditionType,
    PromotionRuleField.ReachMetric,
    PromotionRuleField.RewardType,
    PromotionRuleField.ZoneScope,
    PromotionRuleField.MethodScope,
    PromotionRuleField.Include,
    PromotionRuleField.CapMode,
    PromotionRuleField.DiscountType,
  ]) as [
    RuleValues[PromotionRuleField.ConditionType],
    RuleValues[PromotionRuleField.ReachMetric],
    RuleValues[PromotionRuleField.RewardType],
    RuleValues[PromotionRuleField.ZoneScope],
    RuleValues[PromotionRuleField.MethodScope],
    RuleValues[PromotionRuleField.Include],
    RuleValues[PromotionRuleField.CapMode],
    RuleValues[PromotionRuleField.DiscountType],
  ];

  // Clear values that a choice makes irrelevant, so hidden fields never
  // block validation or leak into the saved rule.
  useEffect(() => {
    const { unsubscribe } = watch((values, { name, type }) => {
      if (type !== "change" || !name) return;
      if (
        name === PromotionRuleField.ConditionType &&
        values.conditionType !== "buys_products"
      ) {
        include.replace([{ type: "all", items: [] }]);
        exclude.replace([]);
      }
      if (name === PromotionRuleField.ReachMetric)
        setValue(
          PromotionRuleField.ReachValue,
          values.reachMetric === "quantity" ? 1 : null,
        );
      if (name === PromotionRuleField.RewardType) {
        setValue(PromotionRuleField.CapMode, "unlimited");
        setValue(PromotionRuleField.CapMax, null);
      }
      if (name === PromotionRuleField.ZoneScope)
        setValue(PromotionRuleField.Zones, []);
      if (name === PromotionRuleField.MethodScope)
        setValue(PromotionRuleField.Methods, []);
      const filterType = name.match(FILTER_TYPE_PATH);
      if (filterType) {
        const key = filterType[1] as FilterKey;
        const index = Number(filterType[2]);
        const row = values[key]?.[index];
        if (row?.type)
          filterArrays[key].update(index, { type: row.type, items: [] });
      }
    });
    return unsubscribe;
  }, [watch, setValue, include, exclude, filterArrays]);

  const filterPicker = (key: FilterKey, index: number, filter?: ItemFilter) => {
    const name = `${key}.${index}.${ItemFilterField.Items}` as const;
    switch (filter?.type) {
      // Products, categories and brands are picked in dialogs, as in
      // BigCommerce.
      case "products":
        return (
          <InputField
            {...INLINE}
            control={control}
            name={name}
            Component={PickerField}
            placeholder="Select products"
            renderPicker={(props: PickerRenderProps) => (
              <ProductPickerDialog {...props} />
            )}
            containerClassName="flex-1"
          />
        );
      case "category":
        return (
          <InputField
            {...INLINE}
            control={control}
            name={name}
            Component={PickerField}
            options={lookups.categoryOptions}
            placeholder="Select categories"
            renderPicker={(props: PickerRenderProps) => (
              <CategoryPickerDialog
                {...props}
                categoryOptions={lookups.categoryOptions}
              />
            )}
            containerClassName="flex-1"
          />
        );
      case "brand":
        return (
          <InputField
            {...INLINE}
            control={control}
            name={name}
            Component={PickerField}
            options={lookups.brandOptions}
            placeholder="Select brands"
            renderPicker={(props: PickerRenderProps) => (
              <BrandPickerDialog {...props} />
            )}
            containerClassName="flex-1"
          />
        );
      default:
        return null;
    }
  };

  const filterRows = (key: FilterKey) => {
    const array = filterArrays[key];
    const values = watch(key);
    const isInclude = key === PromotionRuleField.Include;
    return array.fields.map((row, index) => {
      const isAnd = isInclude && index > 0;
      return (
        <BulletRow
          key={row.id}
          bullet={!isAnd}
          onRemove={!isInclude || isAnd ? () => array.remove(index) : undefined}
        >
          <Tag className={isAnd ? undefined : "w-[13rem]"}>
            {isAnd
              ? "And"
              : isInclude
                ? "Including products"
                : "Excluding products"}
          </Tag>
          <InputField
            {...INLINE}
            control={control}
            name={`${key}.${index}.${ItemFilterField.Type}`}
            Component={SelectField}
            options={
              isInclude && !isAnd ? INCLUDE_TYPE_OPTIONS : EXCLUDE_TYPE_OPTIONS
            }
            placeholder="Please select a value"
            className={SELECT}
          />
          {filterPicker(key, index, values[index])}
        </BulletRow>
      );
    });
  };

  /** e.g. "• Discounting by a [Percentage ▾] [10 %] from the order sub-total". */
  const discountRow = (lead: string, suffix: string, joiner?: string) => (
    <BulletRow>
      <Tag>{lead}</Tag>
      <InputField
        {...INLINE}
        control={control}
        name={PromotionRuleField.DiscountType}
        Component={SelectField}
        options={
          anyCurrency
            ? DISCOUNT_TYPE_OPTIONS.filter((option) => option.value === "percent")
            : DISCOUNT_TYPE_OPTIONS
        }
        className={cn(SELECT, "min-w-[19rem]")}
      />
      {joiner && <Tag className="bg-transparent px-2">{joiner}</Tag>}
      <InputField
        {...INLINE}
        control={control}
        name={PromotionRuleField.DiscountValue}
        Component={AdornedInput}
        type="number"
        min={0}
        prefix={discountType === "fixed" ? "$" : undefined}
        suffix={discountType === "percent" ? "%" : undefined}
        wrapperClassName="w-[20rem]"
      />
      <Tag>{suffix}</Tag>
    </BulletRow>
  );

  const reward = { rewardType };

  return (
    <div className="flex flex-col gap-6">
      <div className="border-t border-gray-300" />

      {/* Condition */}
      <div className="flex flex-col gap-4">
        <div className="flex items-start gap-3">
          <Pill>If the customer</Pill>
          <InputField
            {...INLINE}
            control={control}
            name={PromotionRuleField.ConditionType}
            Component={SelectField}
            options={CONDITION_OPTIONS}
            placeholder="Select a condition"
            className={SELECT}
          />
        </div>

        {conditionType === "none" && (
          <BulletRow>
            <Tag>Any orders by the customer will trigger this reward.</Tag>
          </BulletRow>
        )}

        {conditionType === "buys_products" && (
          <div className="flex flex-col gap-4">
            <BulletRow>
              <Tag>Reaching a</Tag>
              <InputField
                {...INLINE}
                control={control}
                name={PromotionRuleField.ReachMetric}
                Component={SelectField}
                options={REACH_METRIC_OPTIONS}
                className={cn(SELECT, "min-w-[18rem]")}
              />
              {reachMetric === "total_value" ? (
                <InputField
                  {...INLINE}
                  control={control}
                  name={PromotionRuleField.ReachValue}
                  Component={AdornedInput}
                  type="number"
                  min={0}
                  prefix="$"
                />
              ) : (
                <InputField
                  {...INLINE}
                  control={control}
                  name={PromotionRuleField.ReachValue}
                  Component={NumberStepper}
                />
              )}
              <Tag>
                {reachMetric === "total_value"
                  ? "spent on products"
                  : "products"}
              </Tag>
            </BulletRow>

            {filterRows(PromotionRuleField.Include)}
            {/* "And" can't follow "All products", which already covers it. */}
            {include.fields.length < MAX_INCLUDE_FILTERS &&
              includeValues.every((filter) => filter.type !== "all") && (
                <Button
                  type="button"
                  variant="link"
                  className={cn(LINK_BUTTON, "self-start ml-16")}
                  onClick={() => include.append({ type: "", items: [] })}
                >
                  <Plus />
                  Add another inclusion rule
                </Button>
              )}

            {filterRows(PromotionRuleField.Exclude)}
            {exclude.fields.length < MAX_EXCLUDE_FILTERS && (
              <Button
                type="button"
                variant="link"
                className={cn(LINK_BUTTON, "self-start ml-4")}
                onClick={() => exclude.append({ type: "", items: [] })}
              >
                <Plus />
                Add exclusion rule
              </Button>
            )}
          </div>
        )}
      </div>

      {/* Reward */}
      <div className="flex flex-col gap-4">
        <div className="flex flex-wrap items-start gap-3">
          <Pill>Then reward</Pill>
          <InputField
            {...INLINE}
            control={control}
            name={PromotionRuleField.RewardType}
            Component={SelectField}
            options={REWARD_OPTIONS}
            placeholder="Select a reward"
            className={cn(SELECT, "min-w-[28rem]")}
          />
          {conditionType === "buys_products" && !isShippingReward(reward) && (
            <>
              <InputField
                {...INLINE}
                control={control}
                name={PromotionRuleField.ApplyFrequency}
                Component={SelectField}
                options={FREQUENCY_OPTIONS}
                className={SELECT}
              />
              <Tag>per cart</Tag>
            </>
          )}
        </div>

        {rewardType === "gift" && (
          <BulletRow>
            <InputField
              {...INLINE}
              control={control}
              name={PromotionRuleField.GiftQty}
              Component={NumberStepper}
            />
            <Tag>x</Tag>
            <InputField
              {...INLINE}
              control={control}
              name={PromotionRuleField.GiftProduct}
              Component={PickerField}
              placeholder="Select a product"
              renderPicker={(props: PickerRenderProps) => (
                <ProductPickerDialog {...props} single />
              )}
              className="max-w-[44rem]"
              containerClassName="flex-1"
            />
          </BulletRow>
        )}

        {rewardType === "discount_products" &&
          discountRow("Discounting by a", "from each product's price")}
        {rewardType === "discount_subtotal" &&
          discountRow("Discounting by a", "from the order sub-total")}

        {rewardType === "free_shipping" && (
          <BulletRow>
            <Tag>In</Tag>
            <InputField
              {...INLINE}
              control={control}
              name={PromotionRuleField.ZoneScope}
              Component={SelectField}
              options={ZONE_SCOPE_OPTIONS}
              className={cn(SELECT, "min-w-[26rem]")}
            />
            {zoneScope === "selected" && (
              <InputField
                {...INLINE}
                control={control}
                name={PromotionRuleField.Zones}
                Component={ChipSelect}
                options={lookups.zoneOptions}
                placeholder="Search shipping zones"
                containerClassName="flex-1"
              />
            )}
          </BulletRow>
        )}

        {rewardType === "discount_shipping" && (
          <>
            {discountRow("By a", "from each shipping destination", "of")}
            <BulletRow>
              <Tag>Applied on</Tag>
              <InputField
                {...INLINE}
                control={control}
                name={PromotionRuleField.MethodScope}
                Component={SelectField}
                options={METHOD_SCOPE_OPTIONS}
                className={cn(SELECT, "min-w-[26rem]")}
              />
              {methodScope === "selected" && (
                <InputField
                  {...INLINE}
                  control={control}
                  name={PromotionRuleField.Methods}
                  Component={ChipSelect}
                  options={lookups.methodOptions}
                  placeholder="Search shipping methods"
                  containerClassName="flex-1"
                />
              )}
            </BulletRow>
            {methodScope === "all" && (
              <div className="flex items-center gap-3 max-w-[78rem] ml-4 px-4 py-3 rounded-sm border border-gray-300 border-l-4 border-l-blue-700 bg-white">
                <Info className="size-6 fill-blue-700 text-white shrink-0" />
                <span className="text-lg! 2xl:text-[1.4rem]! text-gray-800">
                  New shipping methods added after the promotion is created
                  will automatically be included in this promotion.
                </span>
              </div>
            )}
          </>
        )}

        {isCappable(reward) && (
          <>
            <div className="flex items-start gap-3 mt-2">
              <Pill>The reward</Pill>
              <InputField
                {...INLINE}
                control={control}
                name={PromotionRuleField.CapMode}
                Component={SelectField}
                options={CAP_OPTIONS}
                className={SELECT}
              />
            </div>
            {capMode === "limited" && (
              <BulletRow>
                <Tag>to</Tag>
                <span className={cn(TEXT, "text-gray-900")}>
                  a maximum discount of
                </span>
                <InputField
                  {...INLINE}
                  control={control}
                  name={PromotionRuleField.CapMax}
                  Component={AdornedInput}
                  type="number"
                  min={0}
                  prefix="$"
                />
              </BulletRow>
            )}
          </>
        )}
      </div>

      <div className="border-t border-gray-300" />

      {/* The page footer is hidden while the builder is open; this one saves
          the rule instead of submitting the promotion. */}
      <FormFooter
        cancelText="Back to promotion"
        submitText={isNew ? "Add rule to promotion" : "Update rule"}
        onSubmit={handleSubmit(onSave)}
        onCancel={onCancel}
      />
    </div>
  );
};

export default RuleBuilder;

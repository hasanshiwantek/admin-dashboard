"use client";

import { useFormContext } from "@/components/form/Form";
import RadioGroupField from "@/components/form/fields/RadioGroupField";
import SelectField from "@/components/form/fields/SelectField";
import InputField from "@/components/form/InputField";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DatePicker } from "@/components/ui/DatePicker";
import TimeSelect from "@/components/ui/TimeSelect";
import { DateTimeFormat } from "@/const/appConstants";
import { cn, formatDateTime } from "@/lib/utils";
import { ArrowLeftRight, Download, Plus, Trash2 } from "lucide-react";
import {
  CODE_FORMAT_OPTIONS,
  PromotionField,
  SEPARATOR_OPTIONS,
} from "../constant";
import useDownloadCodes from "../hooks/useDownloadCodes";
import {
  CARD,
  CARD_HEADER,
  CARD_TITLE,
  DATE_FORMAT,
  DATE_PICKER,
  ICON_BUTTON,
  LABEL,
  LINK_BUTTON,
  SELECT,
  TEXT,
} from "../styles";
import { PromotionFormValues } from "../types";
import {
  exampleCouponCode,
  toApiDateTime,
  uniqueCombinations,
} from "../utils";

/** Shared props for the bulk-code fields laid out in the two-column grid. */
const GRID_FIELD = {
  layout: "vertical",
  labelClassName: LABEL,
  className: "max-w-none",
} as const;

/** Props for a date picker that sits next to a time select. */
const DATE_FIELD = {
  layout: "vertical",
  Component: DatePicker,
  valuePropName: "date",
  dateFormat: DATE_FORMAT,
  allowClear: false,
  className: DATE_PICKER,
} as const;

const SavedBulkCodes = ({ promotionId }: { promotionId: string }) => {
  const { download, downloading } = useDownloadCodes();
  return (
    <div className="flex flex-wrap items-center justify-between gap-6 bg-[#eceef5] rounded-sm px-6 py-5">
      <p className={cn(TEXT, "text-gray-700")}>
        This promotion uses bulk coupon codes generated when it was created.
      </p>
      <Button
        type="button"
        variant="outline"
        size="xl"
        className={TEXT}
        disabled={downloading}
        onClick={() => download(promotionId)}
      >
        <Download className="size-6" />
        {downloading ? "Downloading..." : "Download codes"}
      </Button>
    </div>
  );
};

/**
 * `promotionId` is set when editing a saved promotion: its code mode is fixed
 * and bulk codes can only be downloaded.
 */
const CouponCodeSection = ({ promotionId }: { promotionId?: string }) => {
  const { setValue, watch } = useFormContext<PromotionFormValues>();
  const values = watch();
  const isBulk = values[PromotionField.CouponMode] === "bulk";
  const locked = !!promotionId && isBulk;

  const promotionSchedule = `${formatDateTime(
    toApiDateTime(values.startDate, values.startTime),
    "ddd, MMM D, YYYY, h:mm A",
  )} – ${
    values.hasEndDate && values.endDate
      ? formatDateTime(
          toApiDateTime(values.endDate, values.endTime),
          DateTimeFormat.SHORT_DATE_TIME,
        )
      : "Not set"
  }`;

  return (
    <Card className={CARD}>
      <CardHeader className={CARD_HEADER}>
        <CardTitle className={CARD_TITLE}>Coupon code</CardTitle>
        {!promotionId && (
          <CardAction>
            <Button
              type="button"
              variant="link"
              className={LINK_BUTTON}
              onClick={() =>
                setValue(PromotionField.CouponMode, isBulk ? "single" : "bulk")
              }
            >
              <ArrowLeftRight />
              {isBulk ? "Use single coupon code" : "Use bulk coupon code"}
            </Button>
          </CardAction>
        )}
      </CardHeader>

      <CardContent className="px-0">
        {locked ? (
          <SavedBulkCodes promotionId={promotionId} />
        ) : !isBulk ? (
          <InputField
            name={PromotionField.Code}
            layout="vertical"
            className="max-w-[44rem]"
            hint="Coupon codes can include numbers, letters, hyphens (-) and underscores (_)."
          />
        ) : (
          <div className="flex flex-col gap-6">
            <p className="text-lg! 2xl:text-[1.4rem]! text-gray-600">
              Codes will be generated when you create the promotion. It may
              take time for large volumes, you can leave the window open and
              check back later.
            </p>

            <div className="flex flex-col gap-3 bg-[#eceef5] rounded-sm px-6 py-5">
              <span className={cn(TEXT, "text-gray-700")}>Example code</span>
              <div className="flex flex-wrap items-baseline gap-4">
                <span className="text-4xl! font-bold text-gray-800 break-all">
                  {exampleCouponCode(values)}
                </span>
                <span className={cn(TEXT, "text-gray-700")}>
                  Up to{" "}
                  <strong>
                    {uniqueCombinations(values.codeFormat, values.codeLength)}
                  </strong>{" "}
                  unique combinations
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-5">
              <InputField
                {...GRID_FIELD}
                name={PromotionField.CodeCount}
                label="Number of codes"
                required
                type="number"
              />
              <InputField
                {...GRID_FIELD}
                name={PromotionField.CodeLength}
                label={
                  <>
                    Code length
                    <span className="font-normal text-gray-500">
                      (excluding prefix/suffix)
                    </span>
                  </>
                }
                required
                type="number"
              />
              <InputField
                {...GRID_FIELD}
                name={PromotionField.CodeFormat}
                label="Format"
                required
                Component={SelectField}
                options={CODE_FORMAT_OPTIONS}
                className={cn(SELECT, "w-full max-w-none")}
              />
              <InputField
                {...GRID_FIELD}
                name={PromotionField.CodePrefix}
                label="Prefix"
              />
              <InputField
                {...GRID_FIELD}
                name={PromotionField.CodeSuffix}
                label="Suffix"
              />
              <InputField
                {...GRID_FIELD}
                name={PromotionField.CodeSeparator}
                label="Separator"
                Component={SelectField}
                options={SEPARATOR_OPTIONS}
                className={cn(SELECT, "w-full max-w-none")}
              />
            </div>

            <div className="border-t border-gray-200" />

            <InputField
              name={PromotionField.CodeScheduleMode}
              layout="vertical"
              Component={RadioGroupField}
              options={[
                {
                  value: "promotion",
                  label: "Codes follow the promotion schedule",
                  description: promotionSchedule,
                },
                {
                  value: "custom",
                  label: "Set custom schedule for these codes",
                },
              ]}
              className="gap-5"
              optionClassName={cn(TEXT, "text-gray-800")}
            />

            {values.codeScheduleMode === "custom" && (
              <div className="flex flex-col gap-4 pl-4">
                <div className="flex flex-wrap items-start gap-3">
                  <span className={cn(LABEL, "w-[11rem] pt-3")}>Valid from</span>
                  <InputField
                    {...DATE_FIELD}
                    name={PromotionField.CodeValidFromDate}
                  />
                  <InputField
                    name={PromotionField.CodeValidFromTime}
                    layout="vertical"
                    Component={TimeSelect}
                  />
                </div>
                {values.codeHasValidUntil ? (
                  <div className="flex flex-wrap items-start gap-3">
                    <span className={cn(LABEL, "w-[11rem] pt-3")}>
                      Valid until
                    </span>
                    <InputField
                      {...DATE_FIELD}
                      name={PromotionField.CodeValidUntilDate}
                      placeholder="Select a date"
                    />
                    <InputField
                      name={PromotionField.CodeValidUntilTime}
                      layout="vertical"
                      Component={TimeSelect}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      aria-label="Remove end date"
                      className={ICON_BUTTON}
                      onClick={() => {
                        setValue(PromotionField.CodeHasValidUntil, false);
                        setValue(PromotionField.CodeValidUntilDate, null);
                      }}
                    >
                      <Trash2 />
                    </Button>
                  </div>
                ) : (
                  <Button
                    type="button"
                    variant="link"
                    className={cn(LINK_BUTTON, "self-start")}
                    onClick={() =>
                      setValue(PromotionField.CodeHasValidUntil, true)
                    }
                  >
                    <Plus />
                    Add end date and time
                  </Button>
                )}
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default CouponCodeSection;

"use client";

import { useFormContext } from "@/components/form/Form";
import InputField from "@/components/form/InputField";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import ChipSelect from "@/components/ui/ChipSelect";
import { DatePicker } from "@/components/ui/DatePicker";
import NumberStepper from "@/components/ui/NumberStepper";
import TimeSelect from "@/components/ui/TimeSelect";
import { ListFilter, Plus, Trash2 } from "lucide-react";
import { PromotionField, WEEKDAY_OPTIONS } from "../constant";
import { BulletRow, Pill, Tag } from "../SentenceParts";
import {
  CARD,
  CARD_HEADER,
  CARD_TITLE,
  DATE_FORMAT,
  DATE_PICKER,
  ICON_BUTTON,
  LINK_BUTTON,
} from "../styles";
import { PromotionFormValues } from "../types";

/** Sentence controls sit inline, with their error underneath. */
const INLINE = { layout: "vertical" } as const;

/** Props for a date picker that sits next to a time select. */
const DATE_FIELD = {
  ...INLINE,
  Component: DatePicker,
  valuePropName: "date",
  dateFormat: DATE_FORMAT,
  allowClear: false,
  className: DATE_PICKER,
} as const;

const ScheduleSection = () => {
  const { setValue, watch } = useFormContext<PromotionFormValues>();
  // watch([...]) types enum-keyed fields as never, so the tuple is cast.
  const [hasEndDate, recurring] = watch([
    PromotionField.HasEndDate,
    PromotionField.Recurring,
  ]) as [
    PromotionFormValues[PromotionField.HasEndDate],
    PromotionFormValues[PromotionField.Recurring],
  ];

  return (
    <Card className={CARD}>
      <CardHeader className={CARD_HEADER}>
        <CardTitle className={CARD_TITLE}>Schedule</CardTitle>
      </CardHeader>
      <CardContent className="px-0 flex flex-col gap-5">
        <div className="flex flex-wrap items-start gap-3">
          <Pill className="w-[19rem]">Promotion starts</Pill>
          <InputField {...DATE_FIELD} name={PromotionField.StartDate} />
          <InputField
            {...INLINE}
            name={PromotionField.StartTime}
            Component={TimeSelect}
          />
        </div>

        {recurring && (
          <>
            <BulletRow onRemove={() => setValue(PromotionField.Recurring, false)}>
              <Tag>Available every</Tag>
              <InputField
                {...INLINE}
                name={PromotionField.IntervalWeeks}
                Component={NumberStepper}
              />
              <Tag>weeks, on</Tag>
              <InputField
                {...INLINE}
                name={PromotionField.Weekdays}
                Component={ChipSelect}
                searchable={false}
                options={WEEKDAY_OPTIONS}
                placeholder="Select weekdays"
                className="max-w-[60rem]"
                containerClassName="flex-1"
              />
            </BulletRow>
            <div className="flex flex-wrap items-start gap-3 pl-11">
              <Tag>between</Tag>
              <InputField
                {...INLINE}
                name={PromotionField.TimeStart}
                Component={TimeSelect}
              />
              <Tag>and</Tag>
              <InputField
                {...INLINE}
                name={PromotionField.TimeEnd}
                Component={TimeSelect}
              />
            </div>
          </>
        )}

        {hasEndDate && (
          <div className="flex flex-wrap items-start gap-3">
            <Pill className="w-[19rem]">Ending</Pill>
            <InputField
              {...DATE_FIELD}
              name={PromotionField.EndDate}
              placeholder="Select a date"
            />
            <InputField
              {...INLINE}
              name={PromotionField.EndTime}
              Component={TimeSelect}
            />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              aria-label="Remove end date"
              className={ICON_BUTTON}
              onClick={() => {
                setValue(PromotionField.HasEndDate, false);
                setValue(PromotionField.EndDate, null);
              }}
            >
              <Trash2 />
            </Button>
          </div>
        )}

        {(!hasEndDate || !recurring) && (
          <div className="flex flex-wrap items-center gap-10 pl-4">
            {!hasEndDate && (
              <Button
                type="button"
                variant="link"
                className={LINK_BUTTON}
                onClick={() => setValue(PromotionField.HasEndDate, true)}
              >
                <Plus />
                Add end date and time
              </Button>
            )}
            {!recurring && (
              <Button
                type="button"
                variant="link"
                className={LINK_BUTTON}
                onClick={() => setValue(PromotionField.Recurring, true)}
              >
                <ListFilter />
                Limit availability to particular weeks/days
              </Button>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ScheduleSection;

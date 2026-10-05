"use client";

import SelectField from "@/components/form/fields/SelectField";
import { DateTimeFormat } from "@/const/appConstants";
import { cn } from "@/lib/utils";
import dayjs from "dayjs";
import { useMemo } from "react";

type TimeSelectProps = {
  /** "HH:mm", 24-hour. */
  value: string;
  onChange: (value: string) => void;
  /** Minutes between options. */
  step?: number;
  /** Also offer 11:59 PM, for "until end of day". */
  includeEndOfDay?: boolean;
  className?: string;
};

/** Time-of-day dropdown labelled in 12-hour format ("12:00 AM"). */
export function TimeSelect({
  value,
  onChange,
  step = 30,
  includeEndOfDay = true,
  className,
}: TimeSelectProps) {
  const options = useMemo(() => {
    const times = Array.from({ length: Math.ceil(1440 / step) }, (_, i) =>
      dayjs()
        .startOf("day")
        .add(i * step, "minute")
        .format("HH:mm"),
    );
    if (includeEndOfDay) times.push("23:59");
    if (value && !times.includes(value)) times.push(value);
    return [...new Set(times)].sort().map((time) => ({
      value: time,
      label: dayjs(`2000-01-01 ${time}`).format(DateTimeFormat.TIME_12H),
    }));
  }, [step, includeEndOfDay, value]);

  return (
    <SelectField
      value={value}
      onChange={onChange}
      options={options}
      className={cn("w-[20rem] text-xl! 2xl:text-[1.6rem]! font-normal!", className)}
    />
  );
}

export default TimeSelect;

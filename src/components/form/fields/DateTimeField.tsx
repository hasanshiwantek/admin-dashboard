"use client";

import { DateTimeFormat } from "@/const/appConstants";
import { cn } from "@/lib/utils";
import dayjs from "dayjs";
import { ReactNode, Ref, useMemo } from "react";

type DateTimeFieldProps = {
  value?: Date | null;
  onChange?: (date: Date) => void;
  onBlur?: () => void;
  label?: ReactNode;
  minuteStep?: number;
  yearsAhead?: number;
  showTimezone?: boolean;
  id?: string;
  name?: string;
  disabled?: boolean;
  className?: string;
  "aria-invalid"?: boolean;
  ref?: Ref<HTMLSelectElement>;
};

const MONTHS = Array.from({ length: 12 }, (_, i) =>
  dayjs().month(i).format("MMM"),
);

const SELECT_CLASS = cn(
  "h-13 rounded-sm border border-[#d1d0d4] bg-white px-3 text-xl text-gray-600 cursor-pointer",
  "hover:border-[#86848c] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-blue-300 focus-visible:border-blue-500",
  "aria-invalid:border-destructive disabled:cursor-not-allowed disabled:opacity-50",
);

/** e.g. "Asia/Karachi (GMT +5:00)" for the browser's timezone. */
const timezoneLabel = (date: Date) => {
  const zone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const offset = -date.getTimezoneOffset();
  const sign = offset < 0 ? "-" : "+";
  const hours = Math.floor(Math.abs(offset) / 60);
  const minutes = String(Math.abs(offset) % 60).padStart(2, "0");
  return `${zone.replace(/_/g, " ")} (GMT ${sign}${hours}:${minutes})`;
};

export function DateTimeField({
  value,
  onChange,
  onBlur,
  label,
  minuteStep = 60,
  yearsAhead = 3,
  showTimezone = true,
  id,
  name,
  disabled,
  className,
  "aria-invalid": invalid,
  ref,
}: DateTimeFieldProps) {
  const current = dayjs(value ?? undefined);
  const currentYear = current.year();
  const minutesOfDay = current.hour() * 60 + current.minute();

  const years = useMemo(() => {
    const thisYear = dayjs().year();
    const first = Math.min(thisYear, currentYear);
    const last = Math.max(thisYear + yearsAhead, currentYear);
    return Array.from({ length: last - first + 1 }, (_, i) => first + i);
  }, [currentYear, yearsAhead]);

  const times = useMemo(() => {
    const options = Array.from(
      { length: Math.ceil(1440 / minuteStep) },
      (_, i) => i * minuteStep,
    );
    if (!options.includes(minutesOfDay)) {
      options.push(minutesOfDay);
      options.sort((a, b) => a - b);
    }
    return options;
  }, [minuteStep, minutesOfDay]);

  const update = (part: {
    day?: number;
    month?: number;
    year?: number;
    minutes?: number;
  }) => {
    const year = part.year ?? current.year();
    const month = part.month ?? current.month();
    const monthStart = dayjs().year(year).month(month).date(1);
    const day = Math.min(part.day ?? current.date(), monthStart.daysInMonth());
    const minutes = part.minutes ?? minutesOfDay;
    onChange?.(
      monthStart
        .date(day)
        .hour(Math.floor(minutes / 60))
        .minute(minutes % 60)
        .second(0)
        .millisecond(0)
        .toDate(),
    );
  };

  const selectProps = {
    disabled,
    onBlur,
    "aria-invalid": invalid,
    className: SELECT_CLASS,
  };

  return (
    <div className={cn("flex flex-wrap items-center gap-3", className)}>
      {label && (
        <span className="w-28 text-xl text-gray-600 2xl:text-2xl">{label}</span>
      )}
      <select
        {...selectProps}
        ref={ref}
        id={id}
        name={name}
        aria-label="Day"
        value={current.date()}
        onChange={(e) => update({ day: Number(e.target.value) })}
      >
        {Array.from({ length: current.daysInMonth() }, (_, i) => i + 1).map(
          (day) => (
            <option key={day} value={day}>
              {day}
            </option>
          ),
        )}
      </select>
      <select
        {...selectProps}
        aria-label="Month"
        value={current.month()}
        onChange={(e) => update({ month: Number(e.target.value) })}
      >
        {MONTHS.map((label, month) => (
          <option key={label} value={month}>
            {label}
          </option>
        ))}
      </select>
      <select
        {...selectProps}
        aria-label="Year"
        value={current.year()}
        onChange={(e) => update({ year: Number(e.target.value) })}
      >
        {years.map((year) => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </select>
      <select
        {...selectProps}
        aria-label="Time"
        value={minutesOfDay}
        onChange={(e) => update({ minutes: Number(e.target.value) })}
      >
        {times.map((minutes) => (
          <option key={minutes} value={minutes}>
            {dayjs()
              .startOf("day")
              .add(minutes, "minute")
              .format(DateTimeFormat.TIME_12H)}
          </option>
        ))}
      </select>
      {showTimezone && (
        <span className="text-base text-gray-500">
          {timezoneLabel(current.toDate())}
        </span>
      )}
    </div>
  );
}

export default DateTimeField;

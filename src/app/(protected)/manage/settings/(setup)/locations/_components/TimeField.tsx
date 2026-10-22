"use client";

import { SelectField } from "@/components/form/fields/SelectField";
import { cn } from "@/lib/utils";
import { CLOSED_TIME, HOUR_OPTIONS, MINUTE_OPTIONS } from "../constant";
import { TimeFieldProps } from "./type";

const SELECT_CLASS = "w-[7.6rem] [&_input]:pr-8";

// "HH:mm" as an hour select and a minute select
const TimeField = ({
  value,
  onChange,
  onBlur,
  id,
  name,
  disabled,
  className,
  "aria-invalid": invalid,
  ref,
}: TimeFieldProps) => {
  const [hour, minute] = (value || CLOSED_TIME).split(":");

  return (
    <div className={cn("flex items-center gap-1", className)}>
      <SelectField
        ref={ref}
        id={id}
        name={name}
        options={HOUR_OPTIONS}
        value={hour}
        onChange={(nextHour) => onChange?.(`${nextHour}:${minute}`)}
        onBlur={onBlur}
        disabled={disabled}
        aria-invalid={invalid}
        className={SELECT_CLASS}
      />
      <span className="text-[1.4rem] text-text-heading">:</span>
      <SelectField
        options={MINUTE_OPTIONS}
        value={minute}
        onChange={(nextMinute) => onChange?.(`${hour}:${nextMinute}`)}
        onBlur={onBlur}
        disabled={disabled}
        aria-invalid={invalid}
        className={SELECT_CLASS}
      />
    </div>
  );
};

export default TimeField;

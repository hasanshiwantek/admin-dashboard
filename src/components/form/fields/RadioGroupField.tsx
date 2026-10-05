"use client";

import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { SelectOption } from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { ReactNode, Ref } from "react";

export type RadioOption = SelectOption & {
  /** Secondary text shown under the label. */
  description?: ReactNode;
  /** Shown after the label, e.g. a status tag. */
  badge?: ReactNode;
  disabled?: boolean;
};

type RadioGroupFieldProps = {
  options: readonly RadioOption[];
  value?: string | null;
  onChange?: (value: string) => void;
  onBlur?: () => void;
  id?: string;
  name?: string;
  disabled?: boolean;
  className?: string;
  optionClassName?: string;
  "aria-invalid"?: boolean;
  ref?: Ref<HTMLDivElement>;
};

export function RadioGroupField({
  options,
  value,
  onChange,
  onBlur,
  id,
  name,
  disabled,
  className,
  optionClassName,
  "aria-invalid": invalid,
  ref,
}: RadioGroupFieldProps) {
  return (
    <RadioGroup
      ref={ref}
      id={id}
      name={name}
      value={value ?? ""}
      onValueChange={onChange}
      onBlur={onBlur}
      disabled={disabled}
      aria-invalid={invalid}
      className={className}
    >
      {options.map((option) => (
        <Label
          key={option.value}
          className={cn(
            "font-normal text-gray-600 my-0 2xl:text-2xl!",
            option.description && "items-start",
            option.disabled && "cursor-not-allowed",
            optionClassName,
          )}
        >
          <RadioGroupItem
            value={option.value}
            disabled={option.disabled}
            aria-invalid={invalid}
          />
          {option.description ? (
            <span className="flex flex-col gap-1">
              <span className="flex items-center gap-2">
                {option.label}
                {option.badge}
              </span>
              <span className="text-lg! text-gray-500">
                {option.description}
              </span>
            </span>
          ) : (
            <>
              {option.label}
              {option.badge}
            </>
          )}
        </Label>
      ))}
    </RadioGroup>
  );
}

export default RadioGroupField;

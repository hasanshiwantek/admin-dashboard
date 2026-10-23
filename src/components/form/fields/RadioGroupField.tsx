"use client";

import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { SelectOption } from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { Fragment, ReactNode, Ref } from "react";

type RadioGroupFieldProps = {
  /** `content` renders under that option, outside its label, e.g. fields the
   *  option reveals when chosen */
  options: readonly (Omit<SelectOption, "label"> & {
    label: ReactNode;
    content?: ReactNode;
  })[];
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
        <Fragment key={option.value}>
          <Label
            className={cn(
              "font-normal text-gray-600 my-0 2xl:text-2xl!",
              optionClassName,
            )}
          >
            <RadioGroupItem value={option.value} aria-invalid={invalid} />
            {option.label}
          </Label>
          {option.content}
        </Fragment>
      ))}
    </RadioGroup>
  );
}

export default RadioGroupField;

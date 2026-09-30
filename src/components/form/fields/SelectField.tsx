"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectOption,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Ref } from "react";

type SelectFieldProps = {
  options: readonly SelectOption[];
  value?: string | null;
  onChange?: (value: string) => void;
  onBlur?: () => void;
  placeholder?: string;
  id?: string;
  name?: string;
  disabled?: boolean;
  className?: string;
  "aria-invalid"?: boolean;
  ref?: Ref<HTMLButtonElement>;
};

export function SelectField({
  options,
  value,
  onChange,
  onBlur,
  placeholder,
  id,
  name,
  disabled,
  className,
  "aria-invalid": invalid,
  ref,
}: SelectFieldProps) {
  return (
    <Select
      value={value ?? ""}
      onValueChange={onChange}
      name={name}
      disabled={disabled}
    >
      <SelectTrigger
        ref={ref}
        id={id}
        aria-invalid={invalid}
        onBlur={onBlur}
        className={className}
      >
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

export default SelectField;

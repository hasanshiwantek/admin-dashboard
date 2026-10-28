"use client";

import { cn } from "@/lib/utils";
import PhoneInput, { Country } from "react-phone-number-input";
import "react-phone-number-input/style.css";

type PhoneFieldProps = {
  value?: string | null;
  onChange?: (value: string) => void;
  onBlur?: () => void;
  id?: string;
  name?: string;
  disabled?: boolean;
  placeholder?: string;
  defaultCountry?: Country;
  className?: string;
  "aria-invalid"?: boolean;
};

export function PhoneField({
  value,
  onChange,
  onBlur,
  id,
  name,
  disabled,
  placeholder = "Enter phone number",
  defaultCountry,
  className,
  "aria-invalid": invalid,
}: PhoneFieldProps) {
  return (
    <PhoneInput
      international
      defaultCountry={defaultCountry}
      value={value || undefined}
      onChange={(next) => onChange?.(next ?? "")}
      onBlur={onBlur}
      disabled={disabled}
      placeholder={placeholder}
      className={cn(
        "flex h-14 w-full max-w-md items-center rounded-sm border border-gray-300 bg-white px-4",
        "focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-300",
        invalid && "border-red-500",
        className,
      )}
      numberInputProps={{
        id,
        name,
        "aria-invalid": invalid,
        className:
          "h-full w-full border-0 bg-transparent px-2 text-[1.4rem] outline-none",
      }}
    />
  );
}

export default PhoneField;

"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { ReactNode, Ref } from "react";

type CheckboxFieldProps = {
  text?: ReactNode;
  value?: boolean | null;
  onChange?: (checked: boolean) => void;
  onBlur?: () => void;
  id?: string;
  name?: string;
  disabled?: boolean;
  className?: string;
  "aria-invalid"?: boolean;
  ref?: Ref<HTMLButtonElement>;
};

export function CheckboxField({
  text,
  value,
  onChange,
  onBlur,
  id,
  name,
  disabled,
  className,
  "aria-invalid": invalid,
  ref,
}: CheckboxFieldProps) {
  return (
    <Label
      className={cn(
        "font-normal text-gray-600 my-0 pt-2 2xl:text-2xl!",
        className,
      )}
    >
      <Checkbox
        ref={ref}
        id={id}
        name={name}
        checked={!!value}
        onCheckedChange={(checked) => onChange?.(checked === true)}
        onBlur={onBlur}
        disabled={disabled}
        aria-invalid={invalid}
      />
      {text}
    </Label>
  );
}

export default CheckboxField;

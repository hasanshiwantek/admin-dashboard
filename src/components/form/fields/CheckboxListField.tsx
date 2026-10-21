"use client";

import { ListRenderer } from "@/components/ListRenderer.tsx/ListRenderer";
import { SelectOption } from "@/components/ui/select";
import { cn } from "@/lib/utils";
import CheckboxField from "./CheckboxField";

type CheckboxListFieldProps = {
  options: readonly SelectOption[];
  value?: string[] | null;
  onChange?: (value: string[]) => void;
  onBlur?: () => void;
  id?: string;
  disabled?: boolean;
  className?: string;
  "aria-invalid"?: boolean;
};

const toggleValue = (list: string[], value: string) =>
  list.includes(value) ? list.filter((v) => v !== value) : [...list, value];

// Bordered, scrollable multi-checkbox list with checked rows highlighted.
// The value is the array of checked option values. Set the box height
// with className, e.g. className="h-[17rem]".
export function CheckboxListField({
  options,
  value,
  onChange,
  onBlur,
  id,
  disabled,
  className,
  "aria-invalid": invalid,
}: CheckboxListFieldProps) {
  const checkedValues = value ?? [];

  return (
    <div
      id={id}
      onBlur={onBlur}
      className={cn(
        "max-w-[40rem] overflow-y-auto rounded-sm border border-gray-300 bg-white",
        invalid && "border-red-500",
        disabled && "opacity-50",
        className,
      )}
    >
      <ListRenderer
        data={[...options]}
        keyExtractor={(option) => option.value}
        emptyComponent={<></>}
        className="space-y-0! p-0!"
        renderItem={(option) => {
          const checked = checkedValues.includes(option.value);
          return (
            <CheckboxField
              text={option.label}
              value={checked}
              disabled={disabled}
              onChange={() =>
                onChange?.(toggleValue(checkedValues, option.value))
              }
              className={cn(
                "w-full gap-4 px-5 py-3 text-[1.4rem] text-gray-700 hover:bg-gray-50 2xl:text-[1.4rem]!",
                checked && "bg-blue-50 hover:bg-blue-50",
                disabled && "cursor-not-allowed",
              )}
            />
          );
        }}
      />
    </div>
  );
}

export default CheckboxListField;

"use client";

import Chip from "@/components/Chips/Chips";
import { SelectOption } from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { Search } from "lucide-react";
import { ReactNode, useState } from "react";

const TEXT = "text-xl! 2xl:text-[1.6rem]!";

export type PickerRenderProps = {
  value: SelectOption[];
  /** Replaces the selection and closes the picker. */
  onApply: (value: SelectOption[]) => void;
  onClose: () => void;
};

export type PickerFieldProps = {
  value: SelectOption[];
  onChange: (value: SelectOption[]) => void;
  /** The picker (usually a dialog) shown while open. */
  renderPicker: (props: PickerRenderProps) => ReactNode;
  /** Used to label chips whose value only carries an id. */
  options?: SelectOption[];
  placeholder?: string;
  disabled?: boolean;
  "aria-invalid"?: boolean;
  className?: string;
};

/**
 * Shows picks as removable chips; clicking the field opens a picker (e.g. a
 * category tree or a searchable brand list in a dialog).
 */
export function PickerField({
  value,
  onChange,
  renderPicker,
  options,
  placeholder = "Select",
  disabled,
  "aria-invalid": invalid,
  className,
}: PickerFieldProps) {
  const [open, setOpen] = useState(false);

  const chipLabel = (item: SelectOption) =>
    options?.find((option) => option.value === item.value)?.label ??
    item.label;

  return (
    <>
      {/* A div, not a button: the chips inside have their own remove buttons. */}
      <div
        role="button"
        tabIndex={disabled ? -1 : 0}
        aria-disabled={disabled}
        aria-haspopup="dialog"
        onClick={() => !disabled && setOpen(true)}
        onKeyDown={(e) => {
          if (!disabled && (e.key === "Enter" || e.key === " ")) {
            e.preventDefault();
            setOpen(true);
          }
        }}
        className={cn(
          "flex flex-wrap items-center gap-2 w-full max-w-[56rem] min-h-13 px-3 py-1.5 rounded-sm bg-white text-left cursor-pointer",
          "border border-[#d1d0d4] hover:border-[#86848c]",
          invalid && "border-destructive",
          disabled && "opacity-50 cursor-not-allowed",
          className,
        )}
      >
        <Search className="size-6 text-gray-500 shrink-0" />
        {value.length ? (
          value.map((item) => (
            // Removing a chip shouldn't also open the picker.
            <span key={item.value} onClick={(e) => e.stopPropagation()}>
              <Chip
                label={chipLabel(item)}
                onRemove={() =>
                  onChange(value.filter((other) => other.value !== item.value))
                }
              />
            </span>
          ))
        ) : (
          <span className={cn(TEXT, "text-gray-400")}>{placeholder}</span>
        )}
      </div>

      {open &&
        renderPicker({
          value,
          onApply: (next) => {
            onChange(next);
            setOpen(false);
          },
          onClose: () => setOpen(false),
        })}
    </>
  );
}

export default PickerField;

"use client";

import { cn } from "@/lib/utils";
import { CircleMinus, CirclePlus } from "lucide-react";
import { Ref } from "react";

type SortOrderStepperProps = {
  value?: number | string | null;
  onChange?: (value: number) => void;
  onBlur?: () => void;
  id?: string;
  name?: string;
  min?: number;
  className?: string;
  "aria-invalid"?: boolean;
  ref?: Ref<HTMLInputElement>;
};

const SortOrderStepper = ({
  value,
  onChange,
  onBlur,
  id,
  name,
  min = 0,
  className,
  "aria-invalid": invalid,
  ref,
}: SortOrderStepperProps) => {
  const current = Number(value) || 0;
  const update = (next: number) => onChange?.(Math.max(min, next));

  return (
    <div
      className={cn(
        "flex items-center gap-2 w-fit h-13 px-3 rounded-sm border border-[#d1d0d4] bg-white hover:border-[#86848c] focus-within:border-blue-500",
        invalid && "border-destructive",
        className,
      )}
    >
      <button
        type="button"
        aria-label="Decrease sort order"
        className="text-gray-600 hover:text-gray-800 disabled:opacity-40 cursor-pointer"
        onClick={() => update(current - 1)}
        disabled={current <= min}
      >
        <CircleMinus className="size-8" strokeWidth={1.5} />
      </button>
      <input
        ref={ref}
        id={id}
        name={name}
        type="number"
        min={min}
        value={current}
        onBlur={onBlur}
        onWheel={(e) => e.currentTarget.blur()}
        onChange={(e) => update(Number(e.target.value) || 0)}
        className="w-16 text-center text-xl! text-gray-700 bg-transparent outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
      />
      <button
        type="button"
        aria-label="Increase sort order"
        className="text-gray-600 hover:text-gray-800 cursor-pointer"
        onClick={() => update(current + 1)}
      >
        <CirclePlus className="size-8" strokeWidth={1.5} />
      </button>
    </div>
  );
};

export default SortOrderStepper;

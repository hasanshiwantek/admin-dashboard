"use client";

import { cn } from "@/lib/utils";
import { CircleMinus, CirclePlus } from "lucide-react";

type NumberStepperProps = {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  className?: string;
};

/** Integer input with ⊖ / ⊕ buttons, clamped to `min`..`max`. */
export function NumberStepper({
  value,
  onChange,
  min = 1,
  max,
  className,
}: NumberStepperProps) {
  const clamp = (next: number) =>
    Math.max(min, max === undefined ? next : Math.min(max, next));

  return (
    <div
      className={cn(
        "inline-flex items-center h-13 rounded-sm bg-white px-2 border border-[#d1d0d4] hover:border-[#86848c]",
        className,
      )}
    >
      <button
        type="button"
        aria-label="Decrease"
        disabled={value <= min}
        onClick={() => onChange(clamp(value - 1))}
        className="text-gray-500 disabled:opacity-40 cursor-pointer"
      >
        <CircleMinus className="size-8" />
      </button>
      <input
        type="number"
        value={Number.isNaN(value) ? "" : value}
        onChange={(e) => onChange(clamp(Number(e.target.value)))}
        className="w-24 text-center text-xl! 2xl:text-[1.6rem]! outline-none bg-transparent [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none"
      />
      <button
        type="button"
        aria-label="Increase"
        disabled={max !== undefined && value >= max}
        onClick={() => onChange(clamp(value + 1))}
        className="text-blue-600 disabled:opacity-40 cursor-pointer"
      >
        <CirclePlus className="size-8" />
      </button>
    </div>
  );
}

export default NumberStepper;

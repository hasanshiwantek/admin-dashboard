"use client";

import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { CircleMinus, CirclePlus } from "lucide-react";
import { SortOrderStepperProps } from "./type";

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
        "flex h-13 w-fit items-center gap-2 rounded-sm border border-pale-ash-gray bg-white px-3 focus-within:border-blue-500 hover:border-smoky-gray",
        invalid && "border-destructive",
        className,
      )}
    >
      <Button
        type="button"
        variant="ghost"
        size="icon"
        aria-label="Decrease sort order"
        className="size-auto p-0 text-gray-600 hover:bg-transparent hover:text-gray-800"
        onClick={() => update(current - 1)}
        disabled={current <= min}
      >
        <CircleMinus className="size-8!" strokeWidth={1.5} />
      </Button>
      <input
        ref={ref}
        id={id}
        name={name}
        type="number"
        min={min}
        value={current}
        onBlur={onBlur}
        onWheel={(event) => event.currentTarget.blur()}
        onChange={(event) => update(Number(event.target.value) || 0)}
        className="w-16 [appearance:textfield] bg-transparent text-center text-xl! text-gray-700 outline-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
      />
      <Button
        type="button"
        variant="ghost"
        size="icon"
        aria-label="Increase sort order"
        className="size-auto p-0 text-gray-600 hover:bg-transparent hover:text-gray-800"
        onClick={() => update(current + 1)}
      >
        <CirclePlus className="size-8!" strokeWidth={1.5} />
      </Button>
    </div>
  );
};

export default SortOrderStepper;

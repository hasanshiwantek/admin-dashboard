"use client";

import { cn } from "@/lib/utils";
import { X } from "lucide-react";
import { ReactNode } from "react";

export interface ChipProps {
  label: ReactNode;
  onRemove?: () => void;
  className?: string;
}

export default function Chip({ label, onRemove, className }: ChipProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded bg-chip-bg p-1.5 text-[16px]! font-normal! text-chip-text",
        className,
      )}
    >
      {label}
      {onRemove && (
        <button
          type="button"
          onClick={onRemove}
          aria-label="Remove"
          className="text-gray-500 hover:text-gray-800 transition cursor-pointer"
        >
          <X size={16} />
        </button>
      )}
    </span>
  );
}

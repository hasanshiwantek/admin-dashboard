"use client";

import { cn } from "@/lib/utils";
import { X } from "lucide-react";
import { ReactNode } from "react";
import Chip from "./Chips";

export interface ChipItem {
  id: string;
  label: ReactNode;
  onRemove?: () => void;
}

export interface ChipListProps {
  chips: ChipItem[];
  onClearAll?: () => void;
  clearAllLabel?: string;
  className?: string;
}

export default function ChipList({
  chips,
  onClearAll,
  clearAllLabel = "Clear all",
  className,
}: ChipListProps) {
  if (!chips || chips.length === 0) return null;

  return (
    <div className={cn("flex flex-wrap items-center gap-3 mb-5", className)}>
      {chips.map((chip) => (
        <Chip key={chip.id} label={chip.label} onRemove={chip.onRemove} />
      ))}

      {onClearAll && (
        <button
          type="button"
          onClick={onClearAll}
          className="inline-flex items-center gap-1 text-blue-600 hover:underline text-lg 2xl:!text-[1.4rem] cursor-pointer"
        >
          <X size={16} />
          {clearAllLabel}
        </button>
      )}
    </div>
  );
}

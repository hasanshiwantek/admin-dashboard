"use client";

import { TableCell, TableRow } from "@/components/ui/Table";
import { cn } from "@/lib/utils";
import { useDroppable } from "@dnd-kit/core";
import { ArrowUpToLine } from "lucide-react";
import { CATEGORY_ROOT_DROP_ID } from "../constant";
import { CategoryRootDropZoneProps } from "./type";

// Shown while dragging: drop here to make the category top-level
const CategoryRootDropZone = ({ disabled }: CategoryRootDropZoneProps) => {
  const { setNodeRef, isOver } = useDroppable({
    id: CATEGORY_ROOT_DROP_ID,
    disabled,
  });

  return (
    <TableRow ref={setNodeRef} className="hover:bg-transparent">
      <TableCell colSpan={7} className="p-2">
        <div
          className={cn(
            "flex items-center justify-center gap-3 rounded-sm border-2 border-dashed py-5 text-xl transition-colors 2xl:text-[1.6rem]",
            disabled
              ? "border-gray-200 text-gray-400"
              : "border-blue-300 text-blue-600",
            isOver && "border-blue-500 bg-blue-50",
          )}
        >
          <ArrowUpToLine className="size-6" />
          {disabled ? "Already a top-level category" : "Move to top level"}
        </div>
      </TableCell>
    </TableRow>
  );
};

export default CategoryRootDropZone;

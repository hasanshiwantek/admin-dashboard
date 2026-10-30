"use client";

import VisibilityToggle from "@/app/components/dropdowns/VisibilityToggle";
import ActionButton from "@/components/ActionButton/ActionButton";
import { Button } from "@/components/ui/Button";
import { Checkbox } from "@/components/ui/Checkbox";
import { TableCell, TableRow } from "@/components/ui/Table";
import { cn } from "@/lib/utils";
import { useDraggable, useDroppable } from "@dnd-kit/core";
import { ChevronDown, ChevronRight, Folder } from "lucide-react";
import Link from "next/link";
import {
  CATEGORY_INDENT,
  CATEGORY_ROW_ACTIONS,
  editCategoryRoute,
} from "../constant";
import { isCategoryVisible } from "../utils";
import { CategoryRowProps } from "./type";

// A category row: drag it by any part of the row, or drop another category
// onto it to nest that category here
const CategoryRow = ({
  category,
  level = 0,
  selectedIds,
  expandedIds,
  blockedDropIds,
  onToggleSelect,
  onToggleExpand,
  onToggleVisibility,
  onAction,
}: CategoryRowProps) => {
  const {
    attributes,
    listeners,
    setNodeRef: setDragRef,
    isDragging,
  } = useDraggable({ id: category.id });
  const { setNodeRef: setDropRef, isOver } = useDroppable({
    id: category.id,
    disabled: blockedDropIds.includes(category.id),
  });

  const children = category.subcategories ?? [];
  const isExpanded = expandedIds.has(category.id);

  return (
    <>
      <TableRow
        ref={(node) => {
          setDragRef(node);
          setDropRef(node);
        }}
        {...attributes}
        {...listeners}
        className={cn(
          "group my-8 cursor-move bg-white",
          isDragging && "opacity-40",
          isOver && "bg-blue-50 outline-2 -outline-offset-2 outline-blue-500",
        )}
      >
        <TableCell className="w-[30px]">
          <Checkbox
            className="-mt-10"
            id={String(category.id)}
            checked={selectedIds.includes(category.id)}
            onCheckedChange={(checked) =>
              onToggleSelect(category, checked === true)
            }
          />
        </TableCell>
        <TableCell className="w-[30px]">
          {children.length > 0 && (
            <Button
              type="button"
              variant="ghost"
              aria-label={isExpanded ? "Collapse" : "Expand"}
              style={{ marginLeft: `${level * 10}px` }}
              className="h-auto p-0 hover:bg-transparent"
              onClick={(event) => {
                event.stopPropagation();
                onToggleExpand(category.id);
              }}
            >
              {isExpanded ? <ChevronDown size={15} /> : <ChevronRight size={15} />}
            </Button>
          )}
        </TableCell>
        <TableCell className="flex select-none items-center gap-2 py-6 text-xl font-medium text-blue-600">
          <div
            className="flex items-center gap-2"
            style={{ paddingLeft: `${level * CATEGORY_INDENT}px` }}
          >
            <Folder className="h-8 w-8 fill-sky-200 text-indigo-300" />
            {/* Not natively draggable, so dragging from the name moves the row */}
            <Link
              href={editCategoryRoute(category.id)}
              draggable={false}
              className="cursor-pointer text-blue-600! hover:text-blue-800! 2xl:text-[1.6rem]!"
            >
              {category.name}
            </Link>
          </div>
        </TableCell>
        <TableCell className="text-left text-xl 2xl:text-[1.6rem]!">
          {category.total_products}
        </TableCell>
        <TableCell className="text-left text-xl 2xl:text-[1.6rem]!">
          {category.in_subcategories}
        </TableCell>
        <TableCell className="relative transition-all hover:bg-blue-100">
          <VisibilityToggle
            productId={category.id}
            value={isCategoryVisible(category) ? "ENABLED" : "DISABLED"}
            onChange={(_, value) =>
              onToggleVisibility(category, value === "ENABLED")
            }
          />
        </TableCell>
        <TableCell>
          <ActionButton
            data={category}
            actions={CATEGORY_ROW_ACTIONS}
            onAction={onAction}
            label={`Actions for ${category.name}`}
            icon="•••"
            triggerProps={{ className: "text-xl" }}
          />
        </TableCell>
      </TableRow>

      {/* Rows can't sit inside ListRenderer's wrapper divs in a table body */}
      {isExpanded &&
        children.map((child) => (
          <CategoryRow
            key={child.id}
            category={child}
            level={level + 1}
            selectedIds={selectedIds}
            expandedIds={expandedIds}
            blockedDropIds={blockedDropIds}
            onToggleSelect={onToggleSelect}
            onToggleExpand={onToggleExpand}
            onToggleVisibility={onToggleVisibility}
            onAction={onAction}
          />
        ))}
    </>
  );
};

export default CategoryRow;

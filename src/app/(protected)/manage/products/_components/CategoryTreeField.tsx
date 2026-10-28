"use client";

import { ListRenderer } from "@/components/ListRenderer.tsx/ListRenderer";
import { Button } from "@/components/ui/Button";
import { Checkbox } from "@/components/ui/Checkbox";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { Folder, MinusCircle, PlusCircle } from "lucide-react";
import { useMemo, useState } from "react";
import { getExpandedCategoryIds, normalizeCategories } from "../utils";
import { CategoryNodeProps, CategoryTreeFieldProps } from "./type";

const CategoryNode = ({
  category,
  level,
  selected,
  expanded,
  onToggleSelected,
  onToggleExpanded,
}: CategoryNodeProps) => {
  const isOpen = expanded.has(category.id);
  const id = `category-${category.id}`;

  return (
    <div className="relative">
      <div className="relative flex items-center py-2 transition-all hover:bg-blue-100">
        <div
          className="absolute h-full border-l border-dotted border-indigo-300"
          style={{ left: `${level * 2 + 0.8}rem` }}
        />
        <div
          style={{ paddingLeft: `${level * 2}rem` }}
          className="relative z-10 flex items-center gap-3"
        >
          <span className="flex w-6 justify-center">
            {category.children.length > 0 && (
              <Button
                type="button"
                variant="ghost"
                size="icon"
                aria-label={isOpen ? "Collapse" : "Expand"}
                onClick={() => onToggleExpanded(category.id)}
                className="size-7 p-0 hover:bg-transparent"
              >
                {isOpen ? (
                  <MinusCircle className="size-7! text-indigo-400" />
                ) : (
                  <PlusCircle className="size-7! text-indigo-400" />
                )}
              </Button>
            )}
          </span>
          <Checkbox
            id={id}
            checked={selected.includes(category.id)}
            onCheckedChange={() => onToggleSelected(category.id)}
          />
          <Folder className="size-7 fill-sky-200 text-indigo-300" />
          <Label htmlFor={id} className="text-2xl font-light text-gray-500">
            {category.name}
          </Label>
        </div>
      </div>

      {isOpen && (
        <ListRenderer
          data={category.children}
          keyExtractor={(child) => child.id}
          emptyComponent={<></>}
          className="space-y-0!"
          renderItem={(child) => (
            <CategoryNode
              category={child}
              level={level + 1}
              selected={selected}
              expanded={expanded}
              onToggleSelected={onToggleSelected}
              onToggleExpanded={onToggleExpanded}
            />
          )}
        />
      )}
    </div>
  );
};

// Category checkboxes as a tree; parents of selected categories start open
const CategoryTreeField = ({
  categories: rawCategories,
  value,
  onChange,
  className,
}: CategoryTreeFieldProps) => {
  const selected = useMemo(() => value ?? [], [value]);
  const categories = useMemo(
    () => normalizeCategories(rawCategories),
    [rawCategories],
  );
  const [toggled, setToggled] = useState<Set<number>>(new Set());

  // Ancestors of a selection are open unless the user collapsed them
  const expanded = useMemo(() => {
    const open = getExpandedCategoryIds(categories, selected);
    toggled.forEach((id) => (open.has(id) ? open.delete(id) : open.add(id)));
    return open;
  }, [categories, selected, toggled]);

  const handleToggleSelected = (id: number) =>
    onChange?.(
      selected.includes(id)
        ? selected.filter((selectedId) => selectedId !== id)
        : [...selected, id],
    );

  const handleToggleExpanded = (id: number) =>
    setToggled((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  return (
    <div
      className={cn(
        "max-h-[50rem] overflow-y-auto rounded-sm border border-gray-200 bg-white p-4",
        className,
      )}
    >
      <ListRenderer
        data={categories}
        keyExtractor={(category) => category.id}
        emptyComponent={
          <p className="text-[1.4rem] text-gray-500">No categories yet.</p>
        }
        className="space-y-0!"
        renderItem={(category) => (
          <CategoryNode
            category={category}
            level={0}
            selected={selected}
            expanded={expanded}
            onToggleSelected={handleToggleSelected}
            onToggleExpanded={handleToggleExpanded}
          />
        )}
      />
    </div>
  );
};

export default CategoryTreeField;

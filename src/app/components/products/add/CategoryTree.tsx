"use client";

import { useEffect, useMemo, useState } from "react";
import { useFormContext, Controller } from "react-hook-form";
import { Checkbox } from "@/components/ui/checkbox";
import { PlusCircle, MinusCircle, Folder } from "lucide-react";
import { Label } from "@/components/ui/label";
import { useAppDispatch, useAppSelector } from "@/hooks/useReduxHooks";
import { fetchCategories } from "@/redux/slices/categorySlice";

type Category = {
  id: number;
  name: string;
  children?: Category[];
};

interface CategoryTreeProps {
  name: string; // Form field name, e.g., "categoryIds"
}

// Normalize backend categories recursively
const normalizeCategories = (data: any[]): Category[] => {
  return data.map((item) => ({
    id: Number(item.id),
    name: item.name,
    children: item.subcategories ? normalizeCategories(item.subcategories) : [],
  }));
};

// Recursive check: does this category or any descendant exist in selected IDs?
const hasSelectedDescendant = (category: Category, selected: number[]): boolean => {
  if (selected.includes(category.id)) return true;
  return (category.children || []).some((child) =>
    hasSelectedDescendant(child, selected)
  );
};

export default function CategoryTree({ name }: CategoryTreeProps) {
  const dispatch = useAppDispatch();
  const allCategories = useAppSelector((state: any) => state.category.categories);
  const categoriesDataRaw = allCategories?.data || [];

  // Fetch categories on mount
  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const { control, watch, setValue } = useFormContext();

  // Keep track of which categories are expanded
  const [openMap, setOpenMap] = useState<Record<string, boolean>>({});

  // Current selected IDs
  const selected: number[] = watch(name) || [];

  // Memoize normalized categories to avoid re-computation
  const categories: Category[] = useMemo(
    () => normalizeCategories(categoriesDataRaw),
    [categoriesDataRaw]
  );

  // Auto-expand parents whenever `categories` or `selected` changes
  useEffect(() => {
    if (!categories.length) return;

    const newOpenMap: Record<string, boolean> = {};

    const expandIfNeeded = (category: Category) => {
      if (hasSelectedDescendant(category, selected)) {
        newOpenMap[category.id] = true;
      }
      category.children?.forEach(expandIfNeeded);
    };

    categories.forEach(expandIfNeeded);
    setOpenMap(newOpenMap); // reset openMap per product
  }, [categories, selected]);

  // Toggle category selection
  const toggleCategory = (id: number) => {
    if (selected.includes(id)) {
      setValue(name, selected.filter((cid) => cid !== id));
    } else {
      setValue(name, [...selected, id]);
    }
  };

  // Toggle open/close state of a category
  const toggleOpen = (id: number) => {
    setOpenMap((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  // Recursive render of categories
  const renderCategory = (category: Category, level = 0) => {
    const isOpen = openMap[category.id] || false;

    return (
      <div key={category.id} className="relative">
        <div className="flex items-center py-2 hover:bg-blue-100 transition-all group relative">
          {/* Vertical connector line */}
          <div
            className="absolute border-l border-dotted border-indigo-300 h-full"
            style={{ left: `${level * 20 + 8}px` }}
          />
          <div
            style={{ paddingLeft: `${level * 20}px` }}
            className="flex items-center gap-3 relative z-10"
          >
            {/* Expand/Collapse button */}
            <span className="w-6 flex justify-center">
              {category.children?.length ? (
                <button
                  type="button"
                  onClick={() => toggleOpen(category.id)}
                  className="focus:outline-none"
                >
                  {isOpen ? (
                    <MinusCircle className="text-indigo-400 w-7 h-7 cursor-pointer" />
                  ) : (
                    <PlusCircle className="text-indigo-400 w-7 h-7 cursor-pointer" />
                  )}
                </button>
              ) : (
                <span className="w-6 h-6" />
              )}
            </span>

            {/* Checkbox */}
            <div className="relative w-6 h-6 flex items-center justify-center">
              <Checkbox
                key={category.id + "-" + selected.join("-")} // force re-render on selection change
                id={category.id.toString()}
                checked={selected.includes(category.id)}
                onCheckedChange={() => toggleCategory(category.id)}
                className="rounded border-gray-300 z-10"
              />
              <div className="absolute left-full top-1/2 -translate-y-1/2 w-6 h-px bg-indigo-300" />
            </div>

            {/* Folder icon */}
            <Folder className="text-indigo-300 w-7 h-7" fill="lightblue" strokeWidth={2} />

            {/* Category label */}
            <Label
              htmlFor={category.id.toString()}
              className="text-gray-500 text-2xl font-light"
            >
              {category.name}
            </Label>
          </div>
        </div>

        {/* Render children recursively */}
        {isOpen &&
          Array.isArray(category.children) &&
          category.children.map((child) => renderCategory(child, level + 1))}
      </div>
    );
  };

  return (
    <Controller
      control={control}
      name={name}
      defaultValue={[]}
      render={() => (
        <div className="p-4 border border-gray-200 rounded-md bg-white shadow-sm overflow-y-auto max-h-[500px]">
          <div className="pl-1">{categories.map((cat) => renderCategory(cat))}</div>
        </div>
      )}
    />
  );
}
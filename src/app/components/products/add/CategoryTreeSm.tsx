"use client";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useAppDispatch, useAppSelector } from "@/hooks/useReduxHooks";
import { fetchCategories } from "@/redux/slices/categorySlice";
import { Folder, MinusCircle, PlusCircle } from "lucide-react";
import { useEffect, useState } from "react";
import type { RegisterOptions } from "react-hook-form";
import { Controller, useFormContext } from "react-hook-form";

type Category = {
  id: string;
  name: string;
  children?: Category[];
};

interface CategoryTreeProps {
  name: string;
  rules?: RegisterOptions;
  showSelectAll?: boolean;
}
const normalizeCategories = (data: any[]): Category[] => {
  return data.map((item) => ({
    id: item.id.toString(),
    name: item.name,
    children: item.subcategories ? normalizeCategories(item.subcategories) : [],
  }));
};

const flattenCategoryIds = (nodes: Category[]): string[] => {
  return nodes.reduce<string[]>((acc, node) => {
    acc.push(node.id);

    if (node.children?.length) {
      acc.push(...flattenCategoryIds(node.children));
    }

    return acc;
  }, []);
};

export default function CategoryTreeSm({
  name,
  rules,
  showSelectAll = false,
}: CategoryTreeProps) {
  const dispatch = useAppDispatch();
  const allCategories = useAppSelector(
    (state: any) => state.category.categories,
  );
  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const { control, setValue, getValues, watch } = useFormContext();
  const [openMap, setOpenMap] = useState<Record<string, boolean>>({});
  const categoriesDataRaw = allCategories?.data || [];

  const categories: Category[] = normalizeCategories(categoriesDataRaw);
  const allCategoryIds = flattenCategoryIds(categories).map(String);
  const selectedIds = ((watch(name) ?? []) as Array<string | number>).map(
    String,
  );
  const isAllSelected =
    allCategoryIds.length > 0 &&
    allCategoryIds.every((id) => selectedIds.includes(id));

  useEffect(() => {
    const selected = selectedIds?.map(String);
    const nextOpenMap: Record<string, boolean> = {};

    const markAncestorPath = (
      nodes: Category[],
      ancestorChain: string[] = [],
    ) => {
      nodes.forEach((node) => {
        const currentPath = [...ancestorChain, node.id];

        if (selected.includes(node.id)) {
          currentPath.forEach((id) => {
            nextOpenMap[id] = true;
          });
        }

        if (node.children?.length) {
          markAncestorPath(node.children, currentPath);
        }
      });
    };

    markAncestorPath(categories);
    setOpenMap((prev) => {
      const merged = { ...prev, ...nextOpenMap };
      const isSame =
        Object.keys(prev).length === Object.keys(merged).length &&
        Object.entries(merged).every(([key, value]) => prev[key] === value);

      return isSame ? prev : merged;
    });
  }, [categories, name, selectedIds]);

  const toggleCategory = (id: string) => {
    const selected = ((getValues(name) ?? []) as Array<string | number>).map(
      String,
    );
    if (selected.includes(id)) {
      setValue(
        name,
        selected.filter((cid) => cid !== id),
        { shouldValidate: true, shouldDirty: true },
      );
    } else {
      setValue(name, [...selected, id], {
        shouldValidate: true,
        shouldDirty: true,
      });
    }
  };

  const toggleOpen = (id: string) => {
    setOpenMap((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleAllCategories = (checked: boolean) => {
    setValue(name, checked ? allCategoryIds : [], {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  const renderCategory = (category: Category, level = 0) => {
    const selected = ((getValues(name) ?? []) as Array<string | number>).map(
      String,
    );
    const isOpen = openMap[category.id] || false;

    return (
      <div key={category.id} className="relative ">
        <div className="flex items-center  hover:bg-blue-100 transition-all group relative w-[250px]">
          {/* Vertical line based on level */}
          <div
            className="absolute border-l border-dotted border-indigo-300 h-full"
            style={{ left: `${level * 20 + 8}px` }}
          />

          {/* Padding for nesting */}
          <div
            style={{ paddingLeft: `${level * 20}px` }}
            className="flex items-center gap-3 relative z-10"
          >
            {/* Expand / collapse icon */}
            <span className="w-6 flex justify-center">
              {category.children?.length ? (
                <button
                  type="button"
                  onClick={() => toggleOpen(category.id)}
                  className="focus:outline-none "
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

            {/* Checkbox with connector */}
            <div className="relative w-6 h-6 flex items-center justify-center">
              <Checkbox
                id={category.id}
                checked={selected.includes(String(category.id))}
                onCheckedChange={() => toggleCategory(category.id)}
                className="rounded border-gray-300 z-10"
              />
              {/* Horizontal line between checkbox and folder */}
              <div className="absolute left-full top-1/2 -translate-y-1/2 w-6 h-px bg-indigo-300" />
            </div>

            {/* Folder icon */}
            <Folder
              className="text-indigo-300 w-6 h-6 flex-shrink-0"
              strokeWidth={1.5}
              fill="lightblue"
            />

            {/* Category label */}
            <Label
              htmlFor={category.id}
              className="text-gray-700 text-lg font-light"
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
      rules={rules}
      render={() => (
        <div className="p-4 border border-gray-200 rounded-md bg-white shadow-sm overflow-y-auto h-[200px]">
          {showSelectAll && categories.length > 0 && (
            <div className="pl-1 flex items-center gap-2 hover:bg-blue-100 transition-all group relative w-[250px]">
              <div className="relative w-6 h-6 flex items-center justify-center">
                <Checkbox
                  id={`${name}-select-all`}
                  checked={isAllSelected}
                  onCheckedChange={(checked) =>
                    toggleAllCategories(checked === true)
                  }
                  className="rounded border-gray-300"
                />
                {/* Horizontal line between checkbox and folder */}
                <div className="absolute left-full top-1/2 -translate-y-1/2 w-6 h-px bg-indigo-300" />
              </div>

              <Folder
                className="text-indigo-300 w-6 h-6 flex-shrink-0"
                strokeWidth={1.5}
                fill="lightblue"
              />
              <Label
                htmlFor={`${name}-select-all`}
                className="text-gray-700 text-lg font-light"
              >
                Select all categories
              </Label>
            </div>
          )}

          <div className="pl-1">
            {categories.map((cat) => renderCategory(cat))}
          </div>
        </div>
      )}
    />
  );
}

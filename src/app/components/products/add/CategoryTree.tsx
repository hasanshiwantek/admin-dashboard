"use client";
import { useState, useEffect } from "react";
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
  name: string;
}

// Convert API `subcategories` to `children` recursively
const normalizeCategories = (data: any[]): Category[] => {
  return data.map((item) => ({
    id: Number(item.id),
    name: item.name,
    children: item.subcategories ? normalizeCategories(item.subcategories) : [],
  }));
};

export default function CategoryTree({ name }: CategoryTreeProps) {
  const dispatch = useAppDispatch();
  const allCategories = useAppSelector(
    (state: any) => state.category.categories
  );
  const categoriesDataRaw = allCategories?.data || [];

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const { control, setValue, getValues } = useFormContext();
  const [openMap, setOpenMap] = useState<Record<string, boolean>>({});
  const categories: Category[] = normalizeCategories(categoriesDataRaw);

  const toggleCategory = (id: number) => {
    const selected = getValues(name) || [];
    if (selected.includes(id)) {
      setValue(
        name,
        selected.filter((cid: number) => cid !== id)
      );
    } else {
      setValue(name, [...selected, id]);
    }
  };

  const toggleOpen = (id: number) => {
    setOpenMap((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const renderCategory = (category: Category, level = 0) => {
    const selected = getValues(name) || [];
    const isOpen = openMap[category.id] || false;

    return (
      <div key={category.id} className="relative">
        <div className="flex items-center py-2 hover:bg-blue-100 transition-all group relative">
          <div
            className="absolute border-l border-dotted border-indigo-300 h-full"
            style={{ left: `${level * 20 + 8}px` }}
          />
          <div
            style={{ paddingLeft: `${level * 20}px` }}
            className="flex items-center gap-3 relative z-10"
          >
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
            <div className="relative w-6 h-6 flex items-center justify-center">
              <Checkbox
                id={category.id.toString()} // ✅ convert number to string
                checked={selected.includes(category.id)}
                onCheckedChange={() => toggleCategory(category.id)}
                className="rounded border-gray-300 z-10"
              />
              <div className="absolute left-full top-1/2 -translate-y-1/2 w-6 h-px bg-indigo-300" />
            </div>
            <Folder
              className="text-indigo-300 w-7 h-7"
              fill="lightblue"
              strokeWidth={2}
            />
            <Label
              htmlFor={category.id.toString()} // ✅ match string id
              className="text-gray-500 text-2xl font-light"
            >
              {category.name}
            </Label>
          </div>
        </div>

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
          <div className="pl-1">
            {categories.map((cat) => renderCategory(cat))}
          </div>
        </div>
      )}
    />
  );
}

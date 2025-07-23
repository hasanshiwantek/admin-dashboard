"use client";
import { useState } from "react";
import { useFormContext, Controller } from "react-hook-form";
import { Checkbox } from "@/components/ui/checkbox";
import { productCategories } from "@/const/productCategories";
import { PlusCircle, MinusCircle, Folder } from "lucide-react";
import { Label } from "@/components/ui/label";

type Category = {
  id: string;
  name: string;
  children?: Category[];
};

interface CategoryTreeProps {
  name: string;
}

export default function CategoryTreeSm({ name }: CategoryTreeProps) {
  const { control, setValue, getValues } = useFormContext();
  const [openMap, setOpenMap] = useState<Record<string, boolean>>({});

  const categories = productCategories;

  const toggleCategory = (id: string) => {
    const selected = getValues(name) || [];
    if (selected.includes(id)) {
      setValue(
        name,
        selected.filter((cid: string) => cid !== id)
      );
    } else {
      setValue(name, [...selected, id]);
    }
  };

  const toggleOpen = (id: string) => {
    setOpenMap((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const renderCategory = (category: Category, level = 0) => {
    const selected = getValues(name) || [];
    const isOpen = openMap[category.id] || false;

    return (
      <div key={category.id} className="relative ">
        <div className="flex items-center  hover:bg-blue-100 transition-all group relative w-[250px]  ">
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
                checked={selected.includes(category.id)}
                onCheckedChange={() => toggleCategory(category.id)}
                className="rounded border-gray-300 z-10"
              />
              {/* Horizontal line between checkbox and folder */}
              <div className="absolute left-full top-1/2 -translate-y-1/2 w-6 h-px bg-indigo-300" />
            </div>

            {/* Folder icon */}
            <Folder
              className="text-indigo-300 w-7 h-7"
              fill="lightblue"
              strokeWidth={2}
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
      render={() => (
        <div className="p-4 border border-gray-200 rounded-md bg-white shadow-sm overflow-y-auto h-[200px]">
          <div className="pl-1">
            {categories.map((cat) => renderCategory(cat))}
          </div>
        </div>
      )}
    />
  );
}

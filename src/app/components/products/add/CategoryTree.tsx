'use client';
import { useState } from "react";
import { useFormContext, Controller } from "react-hook-form";
import { Checkbox } from "@/components/ui/checkbox";
import { productCategories } from "@/const/productCategories";
import { Plus, Minus } from "lucide-react";

type Category = {
  id: string;
  name: string;
  children?: Category[];
};

interface CategoryTreeProps {
//   categories: Category[]; // this will be needed if data is coming from db.
  name: string;
}

export default function CategoryTree({  name }: CategoryTreeProps) {
  const { control, setValue, getValues } = useFormContext();
  const [openMap, setOpenMap] = useState<Record<string, boolean>>({});

  const categories = productCategories;

  const toggleCategory = (id: string) => {
    const selected = getValues(name) || [];
    if (selected.includes(id)) {
      setValue(name, selected.filter((cid: string) => cid !== id));
    } else {
      setValue(name, [...selected, id]);
    }
  };

  const renderCategory = (category: Category) => {
    const selected = getValues(name) || [];
    const isOpen = openMap[category.id] || false;

    const toggleOpen = (id: string) => {
    setOpenMap(prev => ({ ...prev, [id]: !prev[id] }));
    };

      return (
          <div key={category.id} className="ml-4 my-1">
              <div className="flex items-center space-x-2">
                  {category.children?.length ? (
                      <button type="button" onClick={() => toggleOpen(category.id)} className="w-6 h-6">
                          {isOpen ? <Minus className="w-6 h-6" /> : <Plus className="w-6 h-6" />}
                      </button>
                  ) : (
                      <span className="w-6 h-6" />
                  )}
                  <Checkbox
                      id={category.id}
                      checked={selected.includes(category.id)}
                      onCheckedChange={() => toggleCategory(category.id)}
                  />
                  <label htmlFor={category.id} className="text-xl">{category.name}</label>
              </div>

              {isOpen && Array.isArray(category.children) && category.children.map(child => renderCategory(child))}
          </div>
      );
  };

  return (
    <Controller
      control={control}
      name={name}
      defaultValue={[]}
      render={() => (
        <div className="p-4 border rounded bg-white overflow-y-auto max-h-100">
          <h3 className="text-md font-semibold mb-2">Categories</h3>
          {categories.map(cat => renderCategory(cat))}
        </div>
      )}
    />
  );
}

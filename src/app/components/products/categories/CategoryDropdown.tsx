"use client";

import SelectField from "@/components/form/fields/SelectField";
import { useMemo } from "react";

type Category = {
  id: number;
  name: string;
  parent_id: number | null;
  subcategories?: Category[];
};

type FlattenedCategory = {
  id: number;
  name: string;
  path: string;
};

const flattenCategories = (
  categories: Category[],
  parentPath = "",
): FlattenedCategory[] =>
  categories.flatMap((cat) => {
    const path = parentPath ? `${parentPath} / ${cat.name}` : cat.name;
    return [
      { id: cat.id, name: cat.name, path },
      ...flattenCategories(cat.subcategories ?? [], path),
    ];
  });

export default function CategoryDropdown({
  categoryData,
  value,
  onChange,
  className,
}: {
  categoryData: Category[];
  value: { id: number | null; path: string };
  /** Clearing the field reports { id: null, path: "" } */
  onChange: (val: { id: number | null; path: string }) => void;
  className?: string;
}) {
  const categories = useMemo(
    () => flattenCategories(categoryData),
    [categoryData],
  );

  const handleChange = (id: string) => {
    if (!id) return onChange({ id: null, path: "" });
    const category = categories.find((cat) => String(cat.id) === id);
    if (category) onChange({ id: category.id, path: category.path });
  };

  return (
    <SelectField
      options={categories}
      value={value?.id != null ? String(value.id) : null}
      onChange={handleChange}
      valueKey="id"
      labelKey="path"
      renderOption={(cat) => (
        <div>
          <h3 className="font-medium">{cat.name}</h3>
          <span className="!font-medium text-muted-foreground">{cat.path}</span>
        </div>
      )}
      placeholder="Start typing category name"
      className={className}
    />
  );
}

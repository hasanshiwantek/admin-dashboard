// components/CategoryDropdown.tsx
"use client";

import { useEffect, useMemo, useState } from "react";
import { Input } from "@/components/ui/input";

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

export default function CategoryDropdown({
  categoryData,
  value,
  onChange,
}: {
  categoryData: Category[];
  value: { id: number | null; path: string };
  onChange: (val: { id: number; path: string }) => void;
}) {
  const [search, setSearch] = useState("");
  const [showList, setShowList] = useState(false);

  const flattenCategories = (
    categories: Category[],
    parentPath = ""
  ): FlattenedCategory[] => {
    let result: FlattenedCategory[] = [];
    for (const cat of categories) {
      const currentPath = parentPath ? `${parentPath} / ${cat.name}` : cat.name;
      result.push({ id: cat.id, name: cat.name, path: currentPath });

      if (cat.subcategories?.length) {
        result = result.concat(
          flattenCategories(cat.subcategories, currentPath)
        );
      }
    }
    return result;
  };

  const flattened = useMemo(
    () => flattenCategories(categoryData),
    [categoryData]
  );

  const filtered = flattened.filter((cat) =>
    cat.path.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    if (value?.path) {
      setSearch(value.path);
    }
  }, [value]);

  return (
    <div className="relative">
      <Input
        placeholder="Start typing category name"
        value={search}
        onChange={(e) => {
          const value = e.target.value;
          setSearch(value);
          setShowList(value.length > 0);
          console.log("Search Term: ",value);
          
        }}
        onFocus={() => {
          if (search.length > 0) {
            setShowList(true);
          }
        }}
        className="!max-w-full"
      />

      {showList && (
        <div className="absolute z-40 mt-1 max-h-64 w-full overflow-auto rounded-md border bg-white shadow-md">
          {filtered.length ? (
            filtered.map((cat) => (
              <div
                key={cat.id}
                className="cursor-pointer px-4 py-2 hover:bg-muted"
                onClick={() => {
                  onChange({ id: cat.id, path: cat.path });
                  setSearch(cat.path);
                  setShowList(false);
                }}
              >
                <h3 className="font-medium">{cat.name}</h3>
                <span className="!font-medium text-muted-foreground">
                  {cat.path}
                </span>
              </div>
            ))
          ) : (
            <p className="px-4 py-2 text-sm text-muted-foreground">
              No results found
            </p>
          )}
        </div>
      )}
    </div>
  );
}

"use client";

import { useEffect, useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import { useSearchParams } from "next/navigation";

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

export default function CategoryDropdownForClear({
    categoryData,
    value,
    onChange,
    onClear,
}: {
    categoryData: Category[];
    value: { id: number | null; path: string };
    onChange: (val: { id: number; path: string }) => void;
    onClear?: () => void;
}) {
    const [search, setSearch] = useState("");
    const [showList, setShowList] = useState(false);
    const searchParams = useSearchParams();

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

    // ✅ Watch value.id — when parent resets to null, clear input
    useEffect(() => {
        if (value?.path) {
            setSearch(value.path);
        } else {

        }
    }, [value]);
    useEffect(() => {
        if (!searchParams.get("t")) return;
        setSearch(""); 
        setShowList(false);
    }, [searchParams]);
    return (
        <div className="relative w-full">
            <div className="flex items-center gap-2 mb-2">

                <Input
                    placeholder="Start typing category name"
                    value={search}
                    onChange={(e) => {
                        const value = e.target.value;
                        setSearch(value);
                        setShowList(value.length > 0);
                    }}
                    onFocus={() => {
                        if (search.length > 0) {
                            setShowList(true);
                        }
                    }}
                    className="!max-w-full"
                />
                {search && (
                    <button
                        type="button"
                        onClick={() => {
                            setSearch("");       // ✅ clear input
                            setShowList(false);  // ✅ hide list
                            onClear?.();         // ✅ call parent's onClear
                        }}
                        className="absolute right-2 text-gray-400 hover:text-gray-600"
                    >
                        ✕
                    </button>
                )}
            </div>

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
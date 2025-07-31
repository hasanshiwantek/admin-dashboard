
"use client";

import { useState } from "react";
import { useForm, FormProvider, useFormContext } from "react-hook-form";
import {
  TableCell,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Folder, Plus, ChevronRight, ChevronDown } from "lucide-react";
import VisibilityToggle from "../../dropdowns/VisibilityToggle";
import { updateCategory } from "@/redux/slices/categorySlice";
import { useAppDispatch } from "@/hooks/useReduxHooks";
const CategoryRow = ({
  category,
  level = 0,
}: {
  category: any;
  level?: number;
}) => {
  const [expanded, setExpanded] = useState(false);
  const { register } = useFormContext();
  const dispatch = useAppDispatch();
  const hasChildren = category.children?.length;
  const [visibilityMap, setVisibilityMap] = useState<{
    [key: number]: "ENABLED" | "DISABLED";
  }>({});
  return (
    <>
      <TableRow className="bg-white my-8  ">
        <TableCell className="w-[30px]">
          <Checkbox
            className="-mt-10"
            id={category.id}
            {...register(`categories.${category.id}`)}
          />
        </TableCell>
        <TableCell className="w-[30px] ">
          {hasChildren && (
            <button type="button" onClick={() => setExpanded(!expanded)}>
              {expanded ? (
                <ChevronDown size={15} />
              ) : (
                <ChevronRight size={15} />
              )}
            </button>
          )}
        </TableCell>
        <TableCell className="flex  items-center gap-2 text-blue-600 font-medium text-xl py-6">
          <div
            style={{ marginLeft: `${level * 20}px` }}
            className="flex items-center gap-2"
          >
            <Folder className="text-indigo-300 w-8 h-8" fill="lightblue" />
            {category.name}
          </div>
        </TableCell>
        <TableCell className="text-center text-xl">0</TableCell>
        <TableCell className="text-center text-xl">0</TableCell>

        <TableCell className="relative hover:bg-blue-100 transition-all">
          <VisibilityToggle
            productId={category.id}
            value={
              visibilityMap[category.id] ?? category.isVisible
                ? "ENABLED"
                : "DISABLED"
            }
            onChange={(id, value) => {
              const isVisible = value === "ENABLED";
              setVisibilityMap((prev: any) => ({
                ...prev,
                [id]: isVisible,
              }));
              dispatch(
                updateCategory({
                  id,
                  data: { isVisible },
                })
              );
            }}
          />
        </TableCell>
      </TableRow>

      {expanded &&
        hasChildren &&
        category.children.map((child: any) => (
          <CategoryRow key={child.id} category={child} level={level + 1} />
        ))}
    </>
  );
};

export default CategoryRow
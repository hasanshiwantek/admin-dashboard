"use client";

import { useState } from "react";
import { useFormContext } from "react-hook-form";
import {
  TableCell,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  Folder, 
  ChevronRight, 
  ChevronDown 
} from "lucide-react";
import OrderActionsDropdown from "../../orders/OrderActionsDropdown";

const CategoryRow = ({
  category,
  level = 0,
}: {
  category: any;
  level?: number;
}) => {
  const [expanded, setExpanded] = useState(false);
  const { register } = useFormContext();
  const hasChildren = category.children?.length;

  const editdropdownActions = [
      {
        label: "Edit",
      },
      {
        label: "Create sub-category",
      },
      {
        label: "Disable visibility",
      },
      {
        label: "View products",
      },
      {
        label: "View in page builder",
      },
      {
        label: "Manage product filters",
      },
      {
        label: "View on storefront",
      },
      {
        label: "Delete",
      },
    ];

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
        <TableCell className="text-center">
          <span className="!text-white bg-green-700 rounded px-3 py-1 text-lg">
            ENABLED
          </span>
        </TableCell>
        <TableCell>
          <OrderActionsDropdown
            actions={editdropdownActions}
            trigger={
              <Button
                variant="ghost"
                size="icon"
                className="text-xl cursor-pointer"
              >
                •••
              </Button>
            }
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

export default CategoryRow;
"use client";

import { useState } from "react";
import { useFormContext, useForm } from "react-hook-form";
import { TableCell, TableRow } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Folder, ChevronRight, ChevronDown } from "lucide-react";
import OrderActionsDropdown from "../../orders/OrderActionsDropdown";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import VisibilityToggle from "../../dropdowns/VisibilityToggle";
import { useAppDispatch } from "@/hooks/useReduxHooks";
import { updateCategory, deleteCategory } from "@/redux/slices/categorySlice";
import { refetchCategories } from "@/lib/categoryUtils";
import { useRouter } from "next/navigation";
import Link from "next/link";

const CategoryRow = ({
  category,
  level = 0,
  selectedIds,
  setSelectedIds,
  expandedIds,
  setExpandedIds,
  highlightId,
}: {
  category: any;
  level?: number;
  selectedIds: number[];
  setSelectedIds: React.Dispatch<React.SetStateAction<any[]>>;
  expandedIds: Set<number>;
  setExpandedIds: React.Dispatch<React.SetStateAction<Set<number>>>;
  highlightId: number | null;
}) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: category.id,
    });

  const router = useRouter();
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const [expanded, setExpanded] = useState(false);
  const dispatch = useAppDispatch();
  const { register, watch, setValue } = useFormContext();
  const isSelected = selectedIds.some((cat: any) => cat === category);

  const handleChange = (checked: any) => {
    setSelectedIds((prev) =>
      checked ? [...prev, category] : prev.filter((cat) => cat !== category)
    );
  };

  const hasChildren = category.subcategories?.length;
  const [visibilityMap, setVisibilityMap] = useState<{
    [key: number]: "ENABLED" | "DISABLED";
  }>({});

  const editdropdownActions = (category: any) => [
    {
      label: "Edit",
      onClick: () => {
        router.push(`/manage/products/categories/edit/${category?.id}`);
      },
    },
    {
      label: "Create sub-category",
    },
    {
      label: "Disable visibility",
      onClick: () => {
        const name = category?.name;
        const payload = {
          name,
          isVisible: false,
        };
        const id: number = category?.id;
        dispatch(
          updateCategory({
            id,
            data: payload,
          })
        );
        setTimeout(() => {
          refetchCategories(dispatch);
        }, 2000);
      },
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
      onClick: () => {
        console.log("Catgeory", category);

        const ids = {
          ids: [category?.id],
        };
        const confirm = window.confirm("Delete selected category?");
        if (!confirm) {
          return;
        } else {
          try {
            dispatch(deleteCategory({ data: ids }));
            setTimeout(() => {
              refetchCategories(dispatch);
            }, 2000);
          } catch (err) {
            console.log(err, "Error while deleting");
          }
        }
      },
    },
  ];

  return (
    <>
      <TableRow
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
        className="group cursor-move bg-white my-8"
      >
        <TableCell className="w-[30px]">
          <Checkbox
            className="-mt-10"
            id={String(category.id)}
            checked={isSelected}
            onCheckedChange={handleChange}
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
            className="flex items-center gap-2 "
          >
            <Folder className="text-indigo-300 w-8 h-8" fill="lightblue" />
            <Link
              href={`/manage/products/categories/edit/${category?.id}`}
              className="cursor-pointer hover:text-blue-800"
            >
              {category.name}
            </Link>
          </div>
        </TableCell>
        <TableCell className="text-center text-xl">0</TableCell>
        <TableCell className="text-center text-xl">0</TableCell>
        <TableCell className="relative hover:bg-blue-100 transition-all  ">
          <VisibilityToggle
            productId={category.id}
            value={
              visibilityMap[category.id] ?? category.is_visible
                ? "ENABLED"
                : "DISABLED"
            }
            onChange={(id, value) => {
              const isVisible = value === "ENABLED";
              setVisibilityMap((prev: any) => ({
                ...prev,
                [id]: isVisible,
              }));
              const name = category?.name;
              const payload = {
                name,
                isVisible,
              };
              dispatch(
                updateCategory({
                  id,
                  data: payload,
                })
              );
            }}
          />
        </TableCell>
        <TableCell>
          <OrderActionsDropdown
            // actions={editdropdownActions}
            actions={editdropdownActions(category)}
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

      {expanded && hasChildren && (
        <SortableContext
          items={category.subcategories.map((child: any) => child.id)}
          strategy={verticalListSortingStrategy}
        >
          {category.subcategories.map((child: any) => (
            <CategoryRow
              key={child.id}
              category={child}
              level={level + 1}
              selectedIds={selectedIds}
              setSelectedIds={setSelectedIds}
               expandedIds={expandedIds}
              setExpandedIds={setExpandedIds}
              highlightId={highlightId}
            />
          ))}
        </SortableContext>
      )}
    </>
  );
};

export default CategoryRow;

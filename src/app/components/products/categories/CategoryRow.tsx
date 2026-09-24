"use client";

import ConfirmationModal from "@/app/(protected)/manage/user-settings/additional-authentication/helpers/ConfirmationModal";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { TableCell, TableRow } from "@/components/ui/table";
import { useAppDispatch, useAppSelector } from "@/hooks/useReduxHooks";
import { refetchCategories } from "@/lib/categoryUtils";
import { buildQueryParams } from "@/lib/utils";
import { deleteCategory, updateCategory } from "@/redux/slices/categorySlice";
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { ChevronDown, ChevronRight, Folder } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import VisibilityToggle from "../../dropdowns/VisibilityToggle";
import OrderActionsDropdown from "../../orders/OrderActionsDropdown";

const CategoryRow = ({
  category,
  level = 0,
  selectedIds,
  setSelectedIds,
  expandedIds,
  setExpandedIds,
  highlightId,
  isDragging,
  rootId,
}: {
  category: any;
  level?: number;
  selectedIds: number[];
  setSelectedIds: React.Dispatch<React.SetStateAction<any[]>>;
  expandedIds: Set<number>;
  setExpandedIds: React.Dispatch<React.SetStateAction<Set<number>>>;
  highlightId: number | null;
  isDragging?: boolean;
  rootId?: number | null;
}) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: category.id,
    });

  const router = useRouter();
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.4 : 1,
    paddingLeft: `${level * 28}px`,
  };
  const allCategories = useAppSelector(
    (state: any) => state.category.categories,
  );

  const categories = allCategories?.data || [];

  const dispatch = useAppDispatch();
  const isSelected = selectedIds.some((cat: any) => cat === category);

  const handleChange = (checked: any) => {
    setSelectedIds((prev) =>
      checked ? [...prev, category] : prev.filter((cat) => cat !== category),
    );
  };

  const hasChildren = (category.subcategories?.length ?? 0) > 0;
  const [visibilityMap, setVisibilityMap] = useState<{
    [key: number]: "ENABLED" | "DISABLED";
  }>({});
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [pendingDeleteCategoryId, setPendingDeleteCategoryId] = useState<
    number | null
  >(null);
  const editdropdownActions = (category: any) => [
    {
      label: "Edit",
      onClick: () => {
        const mainRootId = rootId;
        const findCategory = categories?.find(
          (item: any) => item?.id == mainRootId,
        );
        if (rootId != category?.id) {
          router.push(
            `/manage/products/categories/edit/${category?.id}?rootParent=${findCategory?.name}`,
          );
        } else {
          router.push(`/manage/products/categories/edit/${category?.id}`);
        }
      },
    },
    {
      label: "Create sub-category",
      onClick: () => {
        const mainRootId = rootId;
        const findCategory = categories?.find(
          (item: any) => item?.id == mainRootId,
        );
        if (rootId != category?.id) {
          router.push(
            `/manage/products/categories/add/${category?.id}?rootParent=${findCategory?.name}`,
          );
        } else {
          router.push(`/manage/products/categories/add/${category?.id}`);
        }
      },
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
          }),
        );
        setTimeout(() => {
          refetchCategories(dispatch);
        }, 2000);
      },
    },
    {
      label: "View products",
      onClick: () => {
        const queryParams = buildQueryParams({ categoryIds: category?.id });
        router.push(`/manage/products${queryParams}`);
      },
    },
    {
      label: "View on storefront",
      onClick: () => {
        window.open(
          `https://server-blink.vercel.app/category/${category?.slug}`,
          "_blank",
        );
      },
    },
    // {
    //   label: "Delete",
    //   onClick: () => {
    //     const ids = {
    //       ids: [category?.id],
    //     };
    //     const confirm = window.confirm("Delete selected category?");
    //     if (!confirm) {
    //       return;
    //     } else {
    //       try {
    //         dispatch(deleteCategory({ data: ids }));
    //         setTimeout(() => {
    //           refetchCategories(dispatch);
    //         }, 2000);
    //       } catch (err) {
    //         console.log(err, "Error while deleting");
    //       }
    //     }
    //   },
    // },
    {
      label: "Delete",
      onClick: () => {
        setPendingDeleteCategoryId(category?.id);
        setShowDeleteModal(true);
      },
    },
  ];

  const isExpanded = expandedIds.has(category.id);
  const toggle = () =>
    setExpandedIds((prev) => {
      const next = new Set(prev);
      next.has(category.id) ? next.delete(category.id) : next.add(category.id);
      return next;
    });

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
          {hasChildren ? (
            <button
              style={{ marginLeft: `${level * 10}px` }}
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                toggle();
              }}
            >
              {isExpanded ? (
                <ChevronDown size={15} />
              ) : (
                <ChevronRight size={15} />
              )}
            </button>
          ) : null}
        </TableCell>
        <TableCell className="flex  items-center gap-2 text-blue-600 font-medium text-xl py-6 select-none">
          <div className="flex items-center gap-2 ">
            <Folder className="text-indigo-300 w-8 h-8" fill="lightblue" />
            <button
              type="button"
              onClick={() => {
                const mainRootId = rootId;
                const findCategory = categories?.find(
                  (item: any) => item?.id == mainRootId,
                );

                if (rootId != category?.id) {
                  router.push(
                    `/manage/products/categories/edit/${category?.id}?rootParent=${findCategory?.name}`,
                  );
                } else {
                  router.push(
                    `/manage/products/categories/edit/${category?.id}`,
                  );
                }
              }}
              className="hover:text-blue-800 2xl:!text-[1.6rem] cursor-pointer"
            >
              {category.name}
            </button>
          </div>
        </TableCell>
        <TableCell className="text-left text-xl 2xl:!text-[1.6rem]">
          {category?.total_products}
        </TableCell>
        <TableCell className="text-left text-xl 2xl:!text-[1.6rem]">
          {category?.in_subcategories}
        </TableCell>
        <TableCell className="relative hover:bg-blue-100 transition-all  ">
          <VisibilityToggle
            productId={category.id}
            value={
              (visibilityMap[category.id] ?? category.is_visible)
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
                }),
              );
            }}
          />
        </TableCell>
        <TableCell>
          <OrderActionsDropdown
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

      {isExpanded && hasChildren && (
        <SortableContext
          items={category.subcategories.map((child: any) => child.id)}
          strategy={verticalListSortingStrategy}
        >
          {category.subcategories?.length > 0 ? (
            category.subcategories.map((child: any) => (
              <CategoryRow
                key={child.id}
                category={child}
                level={level + 1}
                selectedIds={selectedIds}
                setSelectedIds={setSelectedIds}
                expandedIds={expandedIds}
                setExpandedIds={setExpandedIds}
                highlightId={highlightId}
                rootId={rootId || category.id}
              />
            ))
          ) : (
            <div className="text-center text-gray-500 py-4">
              No sub-categories
            </div>
          )}
        </SortableContext>
      )}
      <ConfirmationModal
        open={showDeleteModal}
        onOpenChange={setShowDeleteModal}
        variant="warning"
        title="Delete category?"
        description="Are you sure you want to delete this category?"
        onConfirm={() => {
          if (pendingDeleteCategoryId === null) return;

          try {
            dispatch(
              deleteCategory({
                data: {
                  ids: [pendingDeleteCategoryId],
                },
              }),
            );

            setTimeout(() => {
              refetchCategories(dispatch);
            }, 2000);
          } catch (err) {
            console.log(err, "Error while deleting");
          } finally {
            setShowDeleteModal(false);
            setPendingDeleteCategoryId(null);
          }
        }}
      />
    </>
  );
};

export default CategoryRow;

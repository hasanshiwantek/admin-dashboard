"use client";
import { useState, useEffect } from "react";
import { useForm, FormProvider } from "react-hook-form";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DndContext,
  closestCenter,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import AddCategoryModal from "./AddCategoryModal";
import CategoryRow from "./CategoryRow";
import {
  fetchCategories,
  updateCategory,
  deleteCategory,
  updateBulkCategory,
} from "@/redux/slices/categorySlice";
import { refetchCategories } from "@/lib/categoryUtils";
import { useAppDispatch, useAppSelector } from "@/hooks/useReduxHooks";
import Spinner from "../../loader/Spinner";
import { Checkbox } from "@/components/ui/checkbox";
import CategoryDropdown from "./CategoryDropdown";
import { restrictToWindowEdges } from "@dnd-kit/modifiers";
import { useSearchParams } from "next/navigation";
import CategoryDropdownForClear from "./CategoryDropdownForClear";


export default function ProductCategoriesPage() {
  const methods = useForm();
  const dispatch = useAppDispatch();
  const searchParams = useSearchParams();

  const allCategories = useAppSelector(
    (state: any) => state.category.categories
  );

  const categories = allCategories?.data || [];

  const { loading }: { loading: boolean } = useAppSelector(
    (state) => state.category
  );

  const [selectedIds, setSelectedIds] = useState<any[]>([]);
  const [activeId, setActiveId] = useState<number | null>(null);
  const [parentId, setParentCategory] = useState<number | null>(null);
  const [expandedIds, setExpandedIds] = useState<Set<number>>(new Set());
  const [highlightId, setHighlightId] = useState<number | null>(null);
  const [isUpdateLoading, setIsUpdateLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
        delay: 150,
        tolerance: 5,
      },
    })
  );

  const handleDragStart = (event: any) => {
    setActiveId(Number(event.active.id));
    // 🔒 Lock scroll
  };

  const findCategoryById = (list: any[], id: number): any => {
    for (const item of list) {
      if (item.id === id) return item;
      if (item.subcategories?.length) {
        const found = findCategoryById(item.subcategories, id);
        if (found) return found;
      }
    }
    return null;
  };

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;

    setActiveId(null);
    if (!active || !over) return;

    const activeId = Number(active.id);
    const overId = Number(over.id);

    const dragged = findCategoryById(categories, activeId);

    if (!dragged) return;
    setIsUpdateLoading(true);

    let newParentId = null;

    if (overId) {
      const droppedOn = findCategoryById(categories, overId);

      if (droppedOn && droppedOn.id !== activeId) {
        newParentId = droppedOn.id;
      }
    }

    try {
      await dispatch(
        updateCategory({
          id: activeId,
          data: {
            name: dragged.name,
            description: dragged.description,
            parentId: newParentId,
          },
        })
      ).unwrap().finally(async () => {
        setIsUpdateLoading(false);
        await dispatch(fetchCategories());
      });
    } catch (error) {
      console.error("Failed to move category.", error);
    }

    // setActiveId(null);
  };

  const activeCategory = activeId
    ? findCategoryById(categories, Number(activeId))
    : null;

  const handleDelete = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const catIds = selectedIds?.map((cat: any) => cat?.id);

    if (selectedIds.length === 0) {
      alert("Please select at least one category before deleting.");
      return;
    }

    const confirm = window.confirm("Confirm Deletion?");
    if (!confirm) return;

    try {
      await dispatch(deleteCategory({ data: { ids: catIds } }));
      setSelectedIds([]);
      setTimeout(() => dispatch(fetchCategories()), 500);
    } catch (err) {
      console.error(err);
    }
  };

  const handleBulkVisibility = async (visible: boolean) => {
    if (!selectedIds.length) return;

    const payload = {
      categories: selectedIds.map((cat) => ({
        ...cat,
        isVisible: visible,
      })),
    };

    await dispatch(updateBulkCategory({ data: payload }));
    setSelectedIds([]);
    setTimeout(() => dispatch(fetchCategories()), 500);
  };
  useEffect(() => {
    // ✅ Only run when t= param is present (sidebar same-route refresh)
    if (!searchParams.get("t")) return;
    setSelectedIds([]);
    dispatch(fetchCategories());
  }, [searchParams]);


  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const findPathToId = (
    list: any[],
    id: number,
    path: number[] = []
  ): number[] | null => {
    for (const item of list) {
      const newPath = [...path, item.id];
      if (item.id === id) return newPath;
      if (item.subcategories?.length) {
        const found = findPathToId(item.subcategories, id, newPath);
        if (found) return found;
      }
    }
    return null;
  };

  const expandPath = (ids: number[]) => {
    setExpandedIds((prev) => {
      const next = new Set(prev);
      ids.forEach((i) => next.add(i));
      return next;
    });
  };

  return (
    <>
      <FormProvider {...methods}>
        <form className="p-10">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-5xl font-extralight text-gray-600">
              Product Categories
            </h1>

            <Button
              size="xl"
              className="flex items-center gap-2 btn-primary"
              onClick={() => setOpen(true)}
              type="button"
            >
              <Plus className="!w-6 !h-6" /> Add new
            </Button>
          </div>

          <div className="flex flex-col gap-5 p-6 bg-white">
            <div className="flex gap-2 items-center">
              <CategoryDropdownForClear
                categoryData={categories}
                value={{ id: parentId, path: "" }}
                onChange={(val) => {
                  setParentCategory(val.id);
                  const path = findPathToId(categories, val.id) ?? [];
                  expandPath(path);
                  setHighlightId(val.id);
                }}
                onClear={async () => {
                  setParentCategory(null);
                  setHighlightId(null);
                  await dispatch(fetchCategories()); // ✅ refetch
                }}
              />
            </div>

            <div className="flex gap-4 items-center">
              <Checkbox
                checked={selectedIds.length === categories.length}
                onCheckedChange={(checked) =>
                  setSelectedIds(checked ? categories : [])
                }
              />

              <button
                type="button"
                className="btn-outline-primary"
                onClick={() => handleBulkVisibility(true)}
              >
                Enable Visibility

              </button>

              <button
                type="button"
                className="btn-outline-primary"
                onClick={() => handleBulkVisibility(false)}
              >
                Disable Visibility
              </button>

              <button
                type="button"
                className="btn-outline-primary"
                onClick={handleDelete}
              >
                Delete
              </button>
            </div>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead />
                <TableHead />
                <TableHead>Name</TableHead>
                <TableHead>Products</TableHead>
                <TableHead>Sub</TableHead>
                <TableHead>Visibility</TableHead>
                <TableHead />
              </TableRow>
            </TableHeader>

            <DndContext
              sensors={sensors}
              modifiers={[restrictToVerticalAxis, restrictToWindowEdges]}
              collisionDetection={closestCenter}
              onDragStart={handleDragStart}
              onDragEnd={handleDragEnd}
            >
              <SortableContext
                items={categories.map((c: any) => c.id)}
                strategy={verticalListSortingStrategy}
              >
                <TableBody>
                  {loading || isUpdateLoading ? (
                    <TableRow>
                      <TableCell colSpan={7}>
                        <Spinner />
                      </TableCell>
                    </TableRow>
                  ) : (
                    categories?.map((category: any) => (
                      <CategoryRow
                        key={category.id}
                        category={category}
                        selectedIds={selectedIds}
                        setSelectedIds={setSelectedIds}
                        expandedIds={expandedIds}
                        setExpandedIds={setExpandedIds}
                        highlightId={highlightId}
                      />
                    ))
                  )}
                </TableBody>
              </SortableContext>

              <DragOverlay>
                {activeCategory ? (
                  <div className="bg-white shadow-xl border rounded-md p-3">
                    {activeCategory.name}
                  </div>
                ) : null}
              </DragOverlay>
            </DndContext>
          </Table>
        </form>
      </FormProvider>

      <AddCategoryModal
        open={open}
        onOpenChange={setOpen}
        categoryData={categories}
      />
    </>
  );
}

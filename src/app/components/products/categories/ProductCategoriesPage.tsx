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
import { Button } from "@/components/ui/button";
import { productCategories as initialCategories } from "@/const/productCategories";
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
import { Input } from "@/components/ui/input";
export default function ProductCategoriesPage() {
  const methods = useForm();
  const dispatch = useAppDispatch();
  const allCategories = useAppSelector(
    (state: any) => state.category.categories
  );
  const categories = allCategories?.data || [];
  const { loading, error }: { loading: boolean; error: any } = useAppSelector(
    (state) => state.category
  );

  console.log("All Categories fom frontend", categories);

  const categoryData = allCategories?.data;
  const [selectedIds, setSelectedIds] = useState<any[]>([]);
  const watchCategories = methods.watch("categories", {});
  // const [categories, setCategories] = useState(initialCategories);
  const [activeId, setActiveId] = useState(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    })
  );

  const handleDragStart = (event: any) => {
    setActiveId(event.active.id);
  };

  function removeCategory(tree: any[], id: string): [any, any[]] {
    for (let i = 0; i < tree.length; i++) {
      const cat = tree[i];
      if (cat.id === id) {
        tree.splice(i, 1);
        return [cat, tree];
      }
      if (cat.children) {
        const [found, newChildren] = removeCategory(cat.children, id);
        if (found) {
          cat.children = newChildren;
          return [found, tree];
        }
      }
    }
    return [null, tree];
  }

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

  //   const handleDragEnd = async (event: DragEndEvent) => {
  //     const {active, over } = event;

  //     if (!active || !over || active.id === over.id) return;

  //     const activeId = Number(active.id);
  //     const overId = Number(over.id);
  //     const dragged = findCategoryById(categories, activeId);
  //     const droppedOn = findCategoryById(categories, overId);

  //     if (!dragged || !droppedOn) return;

  //     const newParentId = droppedOn.id;
  //     console.log("Dragged:", dragged);
  // console.log("DroppedOn:", droppedOn);
  // console.log("Dispatching update for ID:", activeId);

  //     try {
  //     await dispatch(
  //       updateCategory({
  //         id: activeId,
  //         data: {
  //           name: dragged.name,
  //           description: dragged.description,
  //           parentId: newParentId,
  //         },
  //       })
  //     ).unwrap();

  //     console.log(`Category "${dragged.name}" moved successfully.`);
  //     await dispatch(fetchCategories())
  //   } catch (error) {
  //     console.error("Failed to move category.");
  //   }
  //   }

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    if (!active || !over || active.id === over.id) return;

    const activeId = Number(active.id);
    const overId = Number(over.id);

    const dragged = findCategoryById(categories, activeId);
    const droppedOn = findCategoryById(categories, overId);

    if (!dragged || !droppedOn) return;

    const isDraggedParent = dragged.parent_id === null;
    const isDroppedOnParent = droppedOn.parent_id === null;

    // ❌ Disallow dragging a parent into another parent
    if (isDraggedParent && !isDroppedOnParent) return;

    const newParentId =
      isDraggedParent && isDroppedOnParent ? null : droppedOn.id;

    try {
      await dispatch(
        updateCategory({
          id: activeId,
          data: {
            name: dragged.name,
            description: dragged.description,
            parent_id: newParentId,
            isVisible: dragged.is_visible === 1, // or adjust according to your data
          },
        })
      ).unwrap();

      console.log(`Category "${dragged.name}" moved successfully.`);
      await dispatch(fetchCategories());
    } catch (error) {
      console.error("Failed to move category.");
    }
  };

  // const handleDragEnd = (event: any) => {
  //   const { active, over } = event;
  //   if (active.id !== over?.id) {
  //     const oldIndex = categories.findIndex((c) => c.id === active.id);
  //     const newIndex = categories.findIndex((c) => c.id === over?.id);
  //     setCategories(arrayMove(categories, oldIndex, newIndex));
  //   }
  //   setActiveId(null);
  // };

  // const handleDragEnd = (event: any) => {
  //   const {active, over} = event;
  //   if (!over || active.id === over.id) return;

  //   const updated = structuredClone(categories); //deep clone
  //   const [movedItem, newTree] = removeCategory(updated, active.id);

  //   const insertIntoTree = (tree: any[]) => {
  //     for (let node of tree) {
  //       if (node.id === over.id){
  //         if (!node.children) node.children = [];
  //         node.children.push(movedItem);
  //         return true;
  //       }
  //       if (node.children && insertIntoTree(node.children)) return true;
  //     }
  //     return false
  //   };
  //   insertIntoTree(newTree)
  //   setCategories(newTree);
  //   setActiveId(null);
  // }

  const [open, setOpen] = useState(false);

  const onSubmit = (data: any) => {
    console.log("Selected Categories:", data);
  };

  console.log("Selected Category: ", selectedIds);
  const handleDelete = async () => {
    const catIds = selectedIds?.map((cat: any) => cat?.id);
    const ids = {
      ids: catIds,
    };

    if (selectedIds.length === 0) {
      alert("Please select at least one category before deleting.");
      return; // stop here
    }
    const confirm = window.confirm("Confirm Deletion?");
    if (!confirm) {
      return;
    } else {
      try {
        const resultAction = await dispatch(deleteCategory({ data: ids }));
        const result = (resultAction as any).payload;

        if ((resultAction as any).meta.requestStatus === "fulfilled") {
          console.log("✅ Category deleted successfully:", result);
          setSelectedIds([]);
          setTimeout(() => {
            refetchCategories(dispatch);
          }, 700);
        } else {
          console.error("❌ Failed to delete Category:", result);
        }
      } catch (err) {
        console.error("❌ Unexpected error:", err);
      }
    }
  };

  const handleEnableVisibilty = async () => {
    if (selectedIds.length === 0) {
      alert("Please select at least one category.");
      return;
    }

    const payload = {
      categories: selectedIds.map((cat) => {
        const { is_visible, ...rest } = cat; // ❌ Remove is_visible
        return {
          ...rest,
          isVisible: true, // ✅ Add isVisible
        };
      }),
    };

    try {
      const resultAction = await dispatch(
        updateBulkCategory({ data: payload })
      );
      const result = (resultAction as any).payload;

      if ((resultAction as any).meta.requestStatus === "fulfilled") {
        console.log("✅ Categories updated successfully:", result);
        setSelectedIds([]);
        setTimeout(() => {
          refetchCategories(dispatch);
        }, 700);
      } else {
        console.error("❌ Failed to update categories:", result);
      }
    } catch (err) {
      console.error("❌ Unexpected error:", err);
    }
  };

  const handleDisableVisibilty = async () => {
    if (selectedIds.length === 0) {
      alert("Please select at least one category.");
      return;
    }

    const payload = {
      categories: selectedIds.map((cat) => {
        const { is_visible, ...rest } = cat; // ❌ Remove is_visible
        return {
          ...rest,
          isVisible: false, // ✅ Add isVisible
        };
      }),
    };

    try {
      const resultAction = await dispatch(
        updateBulkCategory({ data: payload })
      );
      const result = (resultAction as any).payload;

      if ((resultAction as any).meta.requestStatus === "fulfilled") {
        console.log("✅ Categories updated successfully:", result);
        setSelectedIds([]);
        setTimeout(() => {
          refetchCategories(dispatch);
        }, 700);
      } else {
        console.error("❌ Failed to update categories:", result);
      }
    } catch (err) {
      console.error("❌ Unexpected error:", err);
    }
  };
  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);
  return (
    <>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)} className="p-10">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-5xl font-extralight text-gray-600">
              Product Categories
            </h1>
            <Button
              size="xl"
              className=" flex items-center gap-2 btn-primary"
              onClick={() => setOpen(true)}
              type="button"
            >
              <Plus className="!w-6 !h-6" /> Add new
            </Button>
          </div>
          <div className="flex flex-col  gap-5 p-6 bg-white">
            <div>
              <Input
                type="search"
                placeholder="Find category in the structure"
              />
            </div>
            <div className="flex justify-start items-center  gap-5 ">
              <Checkbox
                checked={
                  selectedIds.length === categories.length &&
                  categories.length > 0
                }
                onCheckedChange={(checked) => {
                  const newSelected = checked
                    ? categories.map((cat: any) => cat)
                    : [];
                  setSelectedIds(newSelected);
                  // Optional: Sync with react-hook-form too
                  methods.setValue("categories", newSelected);
                }}
              />

              <p>{categories?.length} categories</p>
              <div className="flex justify-start items-center ">
                <button
                  className="btn-outline-primary"
                  onClick={handleEnableVisibilty}
                >
                  Enable visibilty
                </button>
                <button
                  className="btn-outline-primary"
                  onClick={handleDisableVisibilty}
                >
                  Disable Visibility
                </button>
                <button className="btn-outline-primary" onClick={handleDelete}>
                  Delete
                </button>
              </div>
            </div>
          </div>

          <Table>
            <TableHeader className="bg-white h-15">
              <TableRow className="border-t ">
                <TableHead className="w-[30px]" />
                <TableHead className="w-[30px]" />
                <TableHead>Name</TableHead>
                <TableHead className="text-center w-[100px]">
                  Products
                </TableHead>
                <TableHead className="text-center w-[150px]">
                  In subcategories
                </TableHead>
                <TableHead className="text-center w-[100px]">
                  Visibility
                </TableHead>
                <TableHead className="text-center w-[100px]"></TableHead>
              </TableRow>
            </TableHeader>
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragStart={handleDragStart}
              onDragEnd={handleDragEnd}
            >
              <SortableContext
                items={categories}
                strategy={verticalListSortingStrategy}
              >
                <TableBody>
                  {loading ? (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-10">
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
                      />
                    ))
                  )}
                </TableBody>
              </SortableContext>
            </DndContext>
          </Table>
        </form>
      </FormProvider>
      <AddCategoryModal
        open={open}
        onOpenChange={setOpen}
        categoryData={categoryData}
      />
    </>
  );
}

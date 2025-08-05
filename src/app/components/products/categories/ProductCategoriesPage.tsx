"use client";
import { useState, useEffect } from "react";
import { useForm, FormProvider } from "react-hook-form";
import {
  Table,
  TableBody,
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
  DragEndEvent
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
import { fetchCategories, updateCategory } from "@/redux/slices/categorySlice";
import { useAppDispatch, useAppSelector } from "@/hooks/useReduxHooks";

export default function ProductCategoriesPage() {
  const methods = useForm();
  const dispatch = useAppDispatch();
  const allCategories = useAppSelector((state: any) => state.category.categories);
  const categories = allCategories?.data || [];
  const { loading, error } = useAppSelector((state) => state.category);

  console.log("All Categories fom frontend", categories);

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


  const handleDragEnd = async (event: DragEndEvent) => {
    const {active, over } = event;

    if (!active || !over || active.id === over.id) return;

    const activeId = Number(active.id);
    const overId = Number(over.id);
    const dragged = findCategoryById(categories, activeId);
    const droppedOn = findCategoryById(categories, overId);

    if (!dragged || !droppedOn) return;

    const newParentId = droppedOn.id;

    try {
    await dispatch(
      updateCategory({
        id: activeId,
        data: {
          name: dragged.name,
          description: dragged.description,
          parent_id: newParentId,
        },
      })
    ).unwrap();

    console.log(`Category "${dragged.name}" moved successfully.`);
  } catch (error) {
    console.error("Failed to move category.");
  }
  }

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

          <Table>
            <TableHeader className="">
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
                  {categories?.map((category: any) => (
                    <CategoryRow key={category.id} category={category} />
                  ))}
                </TableBody>
              </SortableContext>
            </DndContext>
          </Table>
        </form>
      </FormProvider>
      <AddCategoryModal open={open} onOpenChange={setOpen} />
    </>
  );
}

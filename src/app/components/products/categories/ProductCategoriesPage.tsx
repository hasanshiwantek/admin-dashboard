"use client";
import { useState } from "react";
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
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { productCategories as initialCategories } from "@/const/productCategories";

import { Folder, Plus, ChevronRight, ChevronDown } from "lucide-react";
import { productCategories } from "@/const/productCategories";
import AddCategoryModal from "./AddCategoryModal";
import CategoryRow from "./CategoryRow";

export default function ProductCategoriesPage() {
  const methods = useForm();
  const [categories, setCategories] = useState(initialCategories);
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

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (active.id !== over?.id) {
      const oldIndex = categories.findIndex(c => c.id === active.id);
      const newIndex = categories.findIndex(c => c.id === over?.id);
      setCategories(arrayMove(categories, oldIndex, newIndex));
    }
    setActiveId(null);
  };


  const [open, setOpen] = useState(false);

  const onSubmit = (data: any) => {
    console.log("Selected Categories:", data);
  };

  return (
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
              <SortableContext items={categories} strategy={verticalListSortingStrategy}>
              <TableBody>
                {categories.map((category) => (
                  <CategoryRow key={category.id} category={category} />
                ))}
              </TableBody>
            </SortableContext>
          </DndContext>
        </Table>

      </form>
    </FormProvider>
  );
}
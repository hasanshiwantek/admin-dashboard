"use client";

import { useState } from "react";
import { useForm, FormProvider, useFormContext } from "react-hook-form";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Folder, Plus, ChevronRight, ChevronDown } from "lucide-react";
import { productCategories } from "@/const/productCategories";

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
      </TableRow>

      {expanded &&
        hasChildren &&
        category.children.map((child: any) => (
          <CategoryRow key={child.id} category={child} level={level + 1} />
        ))}
    </>
  );
};

export default function ProductCategoriesPage() {
  const methods = useForm();

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
          <Button size="xl" className=" flex items-center gap-2 btn-primary">
            <Plus className="!w-6 !h-6" /> Add new
          </Button>
        </div>

        <div className="border rounded shadow-sm bg-white">
          <div className="p-6 space-y-6">
            <Input
              placeholder="Find category in the structure"
              className="w-[300px]"
            />
            <div className="flex items-center gap-3">
              <Checkbox />
              <span>10 categories</span>
            </div>
            <div className="flex justify-between items-center gap-3 border-t border-b p-4 ">
              <p className="!font-extrabold">ctspoint</p>
              <span className="!font-extrabold">282073</span>
            </div>
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
            <TableBody>
              {productCategories.map((category) => (
                <CategoryRow key={category.id} category={category} />
              ))}
            </TableBody>
          </Table>
        </div>
      </form>
    </FormProvider>
  );
}

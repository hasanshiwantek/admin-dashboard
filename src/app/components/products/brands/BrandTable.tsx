"use client";
import React, { useState } from "react";
import { Trash } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Settings } from "lucide-react";
import OrderActionsDropdown from "../../orders/OrderActionsDropdown";
import { Button } from "@/components/ui/button";
import Pagination from "@/components/ui/pagination";
import Link from "next/link";
const brandData = [
  { name: "104-0067-01", products: 1, id: 0 },
  { name: "10GTEK", products: 3, id: 1 },
  { name: "110-128-311B", products: 1, id: 2 },
  { name: "3.42784E+11", products: 1, id: 3 },
  { name: "3Com", products: 435, id: 4 },
];

const getDropdownActions = (brand: any) => [
  {
    label: "Edit",
    onClick: () => console.log("Edit Brand", brand),
  },
];

const BrandTable = () => {
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  const isAllSelected = selectedIds.length === brandData.length;

  const toggleSelectAll = () => {
    const newSelected = isAllSelected ? [] : brandData.map((brand) => brand.id);
    setSelectedIds(newSelected);
    console.log("Selected IDs:", newSelected);
  };

  const toggleSelectOne = (id: number) => {
    const newSelected = selectedIds.includes(id)
      ? selectedIds.filter((i) => i !== id)
      : [...selectedIds, id];
    setSelectedIds(newSelected);
    console.log("Selected IDs:", newSelected);
  };

  return (
    <div className="p-5">
      <div className="flex flex-col space-y-5">
        <div className="flex flex-col   gap-6 ">
          <h1 className="!font-light">View Brands</h1>
          <p>
            Brands can be associated with products, allowing your customers to
            shop by browsing their favorite brands.
          </p>
        </div>
        <div className="flex items-center gap-5 ">
          <Link href={"/manage/products/brands/add"}>
            <button className="btn-outline-primary">Add a Brand...</button>
          </Link>
          <button className="btn-outline-primary">
            <Trash className="!w-6 !h-6" />
          </button>
          <Input type="text" placeholder="Filter by Keyword" />
          <button className="btn-outline-primary">Filter</button>
        </div>
        <div className="flex justify-end">
          <Pagination
            currentPage={1}
            totalPages={10}
            onPageChange={(page) => console.log("Page changed to:", page)}
            perPage={"20"}
            onPerPageChange={(value) =>
              console.log("Per page changed to:", value)
            }
          />
        </div>
      </div>

      {/* BRANDS Table */}
      <div className="overflow-x-auto rounded-md border bg-white mt-10">
        <Table>
          <TableHeader className="!h-18 bg-gray-50">
            <TableRow className="">
              <TableHead className="w-10">
                <Checkbox
                  checked={isAllSelected}
                  onCheckedChange={toggleSelectAll}
                  aria-label="Select all"
                />
              </TableHead>
              <TableHead className="text-left">Brand Name</TableHead>
              <TableHead className="text-left">Products</TableHead>
              <TableHead className="text-left">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {brandData.map((brand, index) => (
              <TableRow key={index} className="!h-20 ">
                <TableCell className="w-1/6">
                  <Checkbox
                    checked={selectedIds.includes(brand.id)}
                    onCheckedChange={() => toggleSelectOne(brand.id)}
                    aria-label={`Select ${brand.name}`}
                  />
                </TableCell>
                <TableCell>
                  <a href="#" className="text-blue-600 hover:underline">
                    {brand.name}
                  </a>
                </TableCell>
                <TableCell>{brand.products}</TableCell>
                <TableCell>
                  <OrderActionsDropdown
                    actions={getDropdownActions(brand)}
                    trigger={
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-xl cursor-pointer "
                      >
                        <Settings className="!w-6 !h-6 text-gray-500" />
                      </Button>
                    }
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="flex justify-end my-4">
        <Pagination
          currentPage={1}
          totalPages={10}
          onPageChange={(page) => console.log("Page changed to:", page)}
          perPage={"20"}
          onPerPageChange={(value) =>
            console.log("Per page changed to:", value)
          }
        />
      </div>
    </div>
  );
};

export default BrandTable;

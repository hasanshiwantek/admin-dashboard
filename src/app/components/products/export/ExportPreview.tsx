"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import Pagination from "@/components/ui/pagination";
import { Check } from "lucide-react";
import { IoMdClose } from "react-icons/io";
const previewData = [
  {
    id: 296136,
    sku: "EWS1200D-10T",
    name: "WY360 - Dell - PowerEdge 1950 Backplane Power Cable",
    price: 1000,
    visible: <Check className="h-8 w-8 text-green-500" />,
    featured: <IoMdClose className="h-6 w-6 text-red-500" />,
  },
  {
    id: 296136,
    sku: "EWS1200D-10T",
    name: "WY360 - Dell - PowerEdge 1950 Backplane Power Cable",
    price: 1000,
    visible: <Check className="h-8 w-8 text-green-500" />,
    featured: <IoMdClose className="h-6 w-6 text-red-500" />,
  },
  {
    id: 296136,
    sku: "EWS1200D-10T",
    name: "WY360 - Dell - PowerEdge 1950 Backplane Power Cable",
    price: 1000,
    visible: <Check className="h-8 w-8 text-green-500" />,
    featured: <IoMdClose className="h-6 w-6 text-red-500" />,
  },
  {
    id: 296136,
    sku: "EWS1200D-10T",
    name: "WY360 - Dell - PowerEdge 1950 Backplane Power Cable",
    price: 1000,
    visible: <Check className="h-8 w-8 text-green-500" />,
    featured: <IoMdClose className="h-6 w-6 text-red-500" />,
  },
  {
    id: 296136,
    sku: "EWS1200D-10T",
    name: "WY360 - Dell - PowerEdge 1950 Backplane Power Cable",
    price: 1000,
    visible: <Check className="h-8 w-8 text-green-500" />,
    featured: <IoMdClose className="h-6 w-6 text-red-500" />,
  },
  {
    id: 296136,
    sku: "EWS1200D-10T",
    name: "WY360 - Dell - PowerEdge 1950 Backplane Power Cable",
    price: 1000,
    visible: <Check className="h-8 w-8 text-green-500" />,
    featured: <IoMdClose className="h-6 w-6 text-red-500" />,
  },
  {
    id: 296136,
    sku: "EWS1200D-10T",
    name: "WY360 - Dell - PowerEdge 1950 Backplane Power Cable",
    price: 1000,
    visible: <Check className="h-8 w-8 text-green-500" />,
    featured: <IoMdClose className="h-6 w-6 text-red-500" />,
  },
  {
    id: 296136,
    sku: "EWS1200D-10T",
    name: "WY360 - Dell - PowerEdge 1950 Backplane Power Cable",
    price: 1000,
    visible: <Check className="h-8 w-8 text-green-500" />,
    featured: <IoMdClose className="h-6 w-6 text-red-500" />,
  },
  {
    id: 296136,
    sku: "EWS1200D-10T",
    name: "WY360 - Dell - PowerEdge 1950 Backplane Power Cable",
    price: 1000,
    visible: <Check className="h-8 w-8 text-green-500" />,
    featured: <IoMdClose className="h-6 w-6 text-red-500" />,
  },
  {
    id: 296136,
    sku: "EWS1200D-10T",
    name: "WY360 - Dell - PowerEdge 1950 Backplane Power Cable",
    price: 1000,
    visible: <Check className="h-8 w-8 text-green-500 " />,
    featured: <IoMdClose className="h-6 w-6 text-red-500" />,
  },
  {
    id: 296136,
    sku: "EWS1200D-10T",
    name: "WY360 - Dell - PowerEdge 1950 Backplane Power Cable",
    price: 1000,
    visible: <Check className="h-8 w-8 text-green-500" />,
    featured: <IoMdClose className="h-6 w-6 text-red-500" />,
  },
];

export default function ExportPreview() {
  const [currentPage, setCurrentPage] = useState(1);
  const totalItems = 200;
  const totalPages = Math.ceil(totalItems / 10);
  const [perPage, setPerPage] = useState("20");

  return (
    <div>
      <p className=" text-muted-foreground">
        The <strong>{totalItems.toLocaleString()}</strong> products shown below
        will be exported when you click the continue button.
      </p>
      <div className="bg-white p-6 rounded-md border shadow-sm space-y-4">
        <div className="flex justify-end my-2">
          {/* Pagination */}
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            perPage={perPage}
            onPerPageChange={setPerPage}
          />
        </div>
        <div className="overflow-auto border rounded">
          <Table>
            <TableHeader className="bg-gray-100">
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>SKU</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Visible</TableHead>
                <TableHead>Featured</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {previewData.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>{item.id}</TableCell>
                  <TableCell>{item.sku}</TableCell>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.price}</TableCell>
                  <TableCell>{item.visible}</TableCell>
                  <TableCell>{item.featured}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="flex justify-end my-6">
          {/* Pagination */}
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            perPage={perPage}
            onPerPageChange={setPerPage}
          />
        </div>
      </div>
    </div>
  );
}

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
const previewData = [
  {
    sku: "EWS1200D-10T",
    upc: "N/A",
    stock: 1000,
    width: "0.0000",
    height: "0.0000",
    depth: "0.0000",
    freeShipping: "N/A",
    fixedPriceShipping: "0.0000",
    weight: "12.0000",
  },
  {
    sku: "EX3400-48T-AFI",
    upc: "N/A",
    stock: 1000,
    width: "0.0000",
    height: "0.0000",
    depth: "0.0000",
    freeShipping: "N/A",
    fixedPriceShipping: "0.0000",
    weight: "5.0000",
  },
  {
    sku: "EX3400-48T-AFI",
    upc: "N/A",
    stock: 1000,
    width: "0.0000",
    height: "0.0000",
    depth: "0.0000",
    freeShipping: "N/A",
    fixedPriceShipping: "0.0000",
    weight: "5.0000",
  },
  {
    sku: "EX3400-48T-AFI",
    upc: "N/A",
    stock: 1000,
    width: "0.0000",
    height: "0.0000",
    depth: "0.0000",
    freeShipping: "N/A",
    fixedPriceShipping: "0.0000",
    weight: "5.0000",
  },
  {
    sku: "EX3400-48T-AFI",
    upc: "N/A",
    stock: 1000,
    width: "0.0000",
    height: "0.0000",
    depth: "0.0000",
    freeShipping: "N/A",
    fixedPriceShipping: "0.0000",
    weight: "5.0000",
  },
  {
    sku: "EX3400-48T-AFI",
    upc: "N/A",
    stock: 1000,
    width: "0.0000",
    height: "0.0000",
    depth: "0.0000",
    freeShipping: "N/A",
    fixedPriceShipping: "0.0000",
    weight: "5.0000",
  },
  {
    sku: "EX3400-48T-AFI",
    upc: "N/A",
    stock: 1000,
    width: "0.0000",
    height: "0.0000",
    depth: "0.0000",
    freeShipping: "N/A",
    fixedPriceShipping: "0.0000",
    weight: "5.0000",
  },
  {
    sku: "EX3400-48T-AFI",
    upc: "N/A",
    stock: 1000,
    width: "0.0000",
    height: "0.0000",
    depth: "0.0000",
    freeShipping: "N/A",
    fixedPriceShipping: "0.0000",
    weight: "5.0000",
  },
  {
    sku: "EX3400-48T-AFI",
    upc: "N/A",
    stock: 1000,
    width: "0.0000",
    height: "0.0000",
    depth: "0.0000",
    freeShipping: "N/A",
    fixedPriceShipping: "0.0000",
    weight: "5.0000",
  },
  {
    sku: "EX3400-48T-AFI",
    upc: "N/A",
    stock: 1000,
    width: "0.0000",
    height: "0.0000",
    depth: "0.0000",
    freeShipping: "N/A",
    fixedPriceShipping: "0.0000",
    weight: "5.0000",
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
        The <strong>{totalItems.toLocaleString()}</strong> SKUs shown below will
        be exported when you click the continue button.
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
                <TableHead>SKU</TableHead>
                <TableHead>UPC</TableHead>
                <TableHead>Stock level</TableHead>
                <TableHead>Width</TableHead>
                <TableHead>Height</TableHead>
                <TableHead>Depth</TableHead>
                <TableHead>Free shipping</TableHead>
                <TableHead>Fixed price shipping</TableHead>
                <TableHead>Weight</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {previewData.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>{item.sku}</TableCell>
                  <TableCell>{item.upc}</TableCell>
                  <TableCell>{item.stock}</TableCell>
                  <TableCell>{item.width}</TableCell>
                  <TableCell>{item.height}</TableCell>
                  <TableCell>{item.depth}</TableCell>
                  <TableCell>{item.freeShipping}</TableCell>
                  <TableCell>{item.fixedPriceShipping}</TableCell>
                  <TableCell>{item.weight}</TableCell>
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

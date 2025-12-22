"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useState } from "react";
import Pagination from "@/components/ui/pagination";
const previewData = [
  {
    id: 296136,
    customer: "Syed Hassan",
    date: "20-July-2025",
    status: "Awaiting Payment",
    merchant_defined_status: "Awaiting Payment",
    total: "£1,461.00",
  },
  {
    id: 296136,
    customer: "Syed Hassan",
    date: "20-July-2025",
    status: "Awaiting Payment",
    merchant_defined_status: "Awaiting Payment",
    total: "£1,461.00",
  },
  {
    id: 296136,
    customer: "Syed Hassan",
    date: "20-July-2025",
    status: "Awaiting Payment",
    merchant_defined_status: "Awaiting Payment",
    total: "£1,461.00",
  },

  {
    id: 296136,
    customer: "Syed Hassan",
    date: "20-July-2025",
    status: "Awaiting Payment",
    merchant_defined_status: "Awaiting Payment",
    total: "£1,461.00",
  },
  {
    id: 296136,
    customer: "Syed Hassan",
    date: "20-July-2025",
    status: "Awaiting Payment",
    merchant_defined_status: "Awaiting Payment",
    total: "£1,461.00",
  },
  {
    id: 296136,
    customer: "Syed Hassan",
    date: "20-July-2025",
    status: "Awaiting Payment",
    merchant_defined_status: "Awaiting Payment",
    total: "£1,461.00",
  },
  {
    id: 296136,
    customer: "Syed Hassan",
    date: "20-July-2025",
    status: "Awaiting Payment",
    merchant_defined_status: "Awaiting Payment",
    total: "£1,461.00",
  },
];

export default function OrderExportPreview() {
  const [currentPage, setCurrentPage] = useState(1);
  const totalItems = 200;
  const totalPages = Math.ceil(totalItems / 10);
  const [perPage, setPerPage] = useState("20");

  return (
    <div>
      <p className=" text-muted-foreground 2xl:!text-2xl">31 orders ready for export.</p>
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
                <TableHead>Customer</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Merchant-defined status</TableHead>
                <TableHead>Total</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {previewData.map((item, index) => (
                <TableRow key={index}>
                  <TableCell className="2xl:!text-2xl">{item.id}</TableCell>
                  <TableCell className="2xl:!text-2xl">{item.customer}</TableCell>
                  <TableCell className="2xl:!text-2xl">{item.date}</TableCell>
                  <TableCell className="2xl:!text-2xl">{item.status}</TableCell>
                  <TableCell className="2xl:!text-2xl">{item.merchant_defined_status}</TableCell>
                  <TableCell className="2xl:!text-2xl">{item.total}</TableCell>
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

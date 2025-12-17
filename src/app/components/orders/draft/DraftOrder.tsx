"use client";
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Copy, MoreHorizontal, Plus } from "lucide-react";
import OrderActionsDropdown from "../OrderActionsDropdown";
const DraftOrder = () => {
  const data = [
    {
      date: "Tue, Nov 18, 2025",
      customer: "Syed Hassan Asif",
      url: "https://ctspoint.com/cart.php?action=loadSavedQuote&quoteToken=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL2N0c3BvaW50LmNvbSIsImlhdCI6MTc2MzQwNzUxNCwiZXhwIjoxNzY1OTEzMTE0LCJkb21haW4iOnsiY2FydCI6eyJpZCI6IjM3ZThjMWNkLTkwODUtNDRhYy1iODlkLTIwZTI2N2ZmYmY3MSJ9fX0.mXa6WPncYeAa8a_lQHGxXmx0kqAyBRswZv7qlQ1YcEk",
      channel: "ctspoint",
      total: "$1,308.36 USD",
    },
  ];

  const getDropdownActions = (row: any) => [
    {
      label: "Edit",
      onClick: () => console.log("Edit clicked", row),
    },
    {
      label: "Delete",
      onClick: () => console.log("Delete clicked", row),
    },
  ];

  return (
    <div className="p-10 max-w-full ">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="">Draft orders</h1>
        <button className="btn-primary flex items-center  gap-2">
          <Plus className="h-6 w-6" /> Add new
        </button>
      </div>

      {/* Table Section */}
      <div className="rounded-md border bg-white shadow-sm">
        <Table>
          <TableHeader className="h-18">
            <TableRow>
              <TableHead className="">Date</TableHead>
              <TableHead className="">Customer</TableHead>
              <TableHead className="">URL</TableHead>
              <TableHead className=" text-center">Channel</TableHead>
              <TableHead className="">Total</TableHead>
              <TableHead className=" text-right pr-10">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="h-18 ">
            {data.map((row, index) => (
              <TableRow key={index}>
                <TableCell className="">{row.date}</TableCell>
                <TableCell className="">{row.customer}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Input value={row.url} className="h-12 w-[220px]" />
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-9 w-9 border-[#4f6ef7] text-[#4f6ef7]"
                    >
                      <Copy className="!h-5 !w-5" />
                    </Button>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-5 h-5 bg-[#312e81] rounded flex items-center justify-center text-[10px] text-white font-bold">
                      B
                    </div>
                    <span className="text-slate-700">{row.channel}</span>
                  </div>
                </TableCell>
                <TableCell className="">{row.total}</TableCell>
                <TableCell className="text-right pr-10">
                  <OrderActionsDropdown
                    actions={getDropdownActions(row)}
                    trigger={
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-xl cursor-pointer"
                      >
                        <MoreHorizontal className="!h-7 !w-7" />
                      </Button>
                    }
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default DraftOrder;

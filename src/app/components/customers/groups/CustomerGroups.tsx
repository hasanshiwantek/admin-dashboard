"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Search } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Pagination from "@/components/ui/pagination";
const CustomerGroups = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState("50");
  const totalPages = 10;

  return (
    <div className="p-10 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="font-light">Customer groups</h1>
        <div className="flex gap-2">
          <Button variant="outline" className="btn-outline-primary !p-6">
            Manage default customer groups
          </Button>
          <Button className="btn-primary !p-6">+ Create new</Button>
        </div>
      </div>

      {/* Table Card */}
      <div className="bg-white border rounded-md p-4 shadow-sm">
        {/* Search and count */}
        <div className="flex items-center justify-between gap-4 mb-4 ">
          <div className="relative flex items-center w-full ">
            <Search className="absolute left-2 !h-5 !w-5 text-muted-foreground" />
            <Input
              placeholder="Search"
              className="pl-10 !w-full !max-w-full "
              name="search"
              onChange={() => {}}
            />
          </div>
          <div>
            <Button variant="outline" className="btn-outline-primary !p-6">
              Search
            </Button>
          </div>
        </div>

        <div className="flex items-center justify-between border-b h-20">
          <div className="flex items-center gap-2">
            <Checkbox />
            <span>0 groups</span>
          </div>

          <div className="">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
              perPage={perPage}
              onPerPageChange={setPerPage}
            />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="!h-20">
              <TableRow className="text-muted-foreground">
                <TableHead className="py-2 px-4 font-normal">Name</TableHead>
                <TableHead className="py-2 px-4 font-normal">
                  Total discounts
                </TableHead>
                <TableHead className="py-2 px-4 font-normal">
                  Registered customers
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              <TableRow>
                <TableCell
                  colSpan={4}
                  className="py-8 px-4 text-center text-muted-foreground"
                >
                  You currently have no customer groups.
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default CustomerGroups;

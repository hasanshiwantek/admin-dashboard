"use client";

import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MoreHorizontal } from "lucide-react";
import Pagination from "@/components/ui/pagination";
import Link from "next/link";
import { useRouter } from "next/navigation";
interface Script {
  id: string;
  name: string;
  location: string;
  placement: string;
  type: string;
  dateInstalled: string;
}

const scriptsData: Script[] = [
  {
    id: "1",
    name: "Google Customer Reviews",
    location: "All pages",
    placement: "Head",
    type: "User created",
    dateInstalled: "Aug 27, 2024",
  },
  {
    id: "2",
    name: "Google Tag Manager - Updated",
    location: "All pages",
    placement: "Head",
    type: "User created",
    dateInstalled: "Nov 19, 2024",
  },
  {
    id: "3",
    name: "hubspot",
    location: "All pages",
    placement: "Head",
    type: "User created",
    dateInstalled: "Mar 22, 2024",
  },
  {
    id: "4",
    name: "hubspot Chat",
    location: "All pages",
    placement: "Head",
    type: "User created",
    dateInstalled: "Mar 25, 2024",
  },
  {
    id: "5",
    name: "Orgnization",
    location: "Storefront pages",
    placement: "Head",
    type: "User created",
    dateInstalled: "Jun 14, 2024",
  },
];

const ScriptManagerTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState("50");
  const totalCount = 20;
  const totalPages = 20;
  const router = useRouter();

  return (
    <div className=" ">
      {/* Header Section */}
      <div className="px-6 py-6 border-b">
        <h1 className="!font-light 2xl:!text-5xl mb-2">Script Manager</h1>
        <p className="2xl:!text-2xl mt-5">
          Use scripts to automate and enhance the functionality of your
          storefront.{" "}
          <a href="#" className="text-blue-600 hover:underline">
            Learn More
          </a>
        </p>
      </div>

      {/* Table Section */}
      <div className="px-6 py-6">
        <div className="border rounded-sm shadow-sm">
          {/* Table Header with Create Button */}
          <div className="flex items-center justify-between px-6 py-4 border-b bg-gray-50">
            <h2 className="!font-medium ">Installed scripts</h2>
            <Link href={"/manage/storefront/script-manager/add"}>
              <button className="btn-primary">Create a script</button>
            </Link>
          </div>

          {/* Table */}
          <Table className="bg-white ">
            <TableHeader className="h-18 ">
              <TableRow className="bg-white hover:bg-white ">
                <TableHead className="text-left 2xl:!text-[1.6rem]">
                  Name
                </TableHead>
                <TableHead className="text-left 2xl:!text-[1.6rem]">
                  Location
                </TableHead>
                <TableHead className="text-left 2xl:!text-[1.6rem]">
                  Placement
                </TableHead>
                <TableHead className="text-left 2xl:!text-[1.6rem]">
                  Type
                </TableHead>
                <TableHead className="text-left 2xl:!text-[1.6rem]">
                  Date installed
                </TableHead>
                <TableHead className="w-12"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {scriptsData.map((script) => (
                <TableRow
                  key={script.id}
                  className="hover:bg-gray-50 transition-colors h-18"
                >
                  <TableCell>{script.name}</TableCell>
                  <TableCell>{script.location}</TableCell>
                  <TableCell>{script.placement}</TableCell>
                  <TableCell>{script.type}</TableCell>
                  <TableCell>{script.dateInstalled}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          className="h-8 w-8 p-0 hover:bg-gray-100"
                        >
                          <MoreHorizontal className="!h-6 !w-6 text-gray-600" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent
                        align="end"
                        className="w-[150px] space-y-4"
                      >
                        <DropdownMenuItem
                          onClick={() =>
                            router.push(
                              `/manage/storefront/script-manager/edit/${script.id}`
                            )
                          }
                        >
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        {/* Pagination Footer */}
        <div className="flex items-center justify-end px-6 py-4 ">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            perPage={perPage}
            onPerPageChange={setPerPage}
          />
        </div>
        {/* Footer Note */}
        <p className="mt-4">
          Looking for BigCommerce provided Analytics scripts? They can be found
          in the
          <a href="#" className="text-blue-600 hover:underline">
            Advanced Settings &gt; Data Solutions
          </a>
          section.
        </p>
      </div>
    </div>
  );
};

export default ScriptManagerTable;

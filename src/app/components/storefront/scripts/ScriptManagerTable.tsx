"use client";

import React, { useState, useEffect } from "react";
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
import { MoreHorizontal, Plus, AlertCircle } from "lucide-react";
import Pagination from "@/components/ui/pagination";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/hooks/useReduxHooks";
import { fetchScripts, deleteScript } from "@/redux/slices/storefrontSlice";
import Spinner from "../../loader/Spinner";
const ScriptManagerTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState("50");
  const totalCount = 20;
  const totalPages = 20;
  const router = useRouter();
  const dispatch = useAppDispatch();

  const scripts = useAppSelector((state: any) => state.storefront.scriptData);

  const { loading, error } = useAppSelector((state: any) => state.storefront);
  const scriptsData = scripts?.script;

  useEffect(() => {
    dispatch(fetchScripts());
  }, [dispatch]);

  const handleDelete = async (id: any, scriptName: string) => {
    if (window.confirm(`Are you sure you want to delete "${scriptName}"?`)) {
      try {
        const resultAction = await dispatch(deleteScript({ id }));

        if (deleteScript.fulfilled.match(resultAction)) {
          // Refresh the scripts list
          setTimeout(()=>{
            dispatch(fetchScripts());
          },2000)
        } else {
        }
      } catch (error) {
        console.error("Error deleting script:", error);
      }
    }
  };

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
              {/* Loading State */}
              {loading && (
                <TableRow>
                  <TableCell colSpan={6} className="h-64">
                    <div className="flex flex-col items-center justify-center space-y-3">
                      <Spinner />
                      <p className="text-sm text-gray-500">
                        Loading scripts...
                      </p>
                    </div>
                  </TableCell>
                </TableRow>
              )}

              {/* Error State */}
              {!loading && error && (
                <TableRow>
                  <TableCell colSpan={6} className="h-64">
                    <div className="flex flex-col items-center justify-center space-y-4">
                      <AlertCircle className="w-12 h-12 text-red-500" />
                      <div className="text-center">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                          Failed to Load Scripts
                        </h3>
                        <p className="text-gray-600 mb-4">{error}</p>
                        <Button
                          onClick={() => dispatch(fetchScripts())}
                          variant="outline"
                          size="sm"
                        >
                          Try Again
                        </Button>
                      </div>
                    </div>
                  </TableCell>
                </TableRow>
              )}

              {/* Empty State */}
              {!loading && !error && scriptsData?.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} className="h-64">
                    <div className="flex flex-col items-center justify-center space-y-4">
                      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                        <svg
                          className="w-8 h-8 text-gray-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                          />
                        </svg>
                      </div>
                      <div className="text-center max-w-md">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                          No Scripts Found
                        </h3>
                        <p className="text-gray-600 mb-4">
                          Get started by adding your first script to track
                          analytics, conversion pixels, or custom functionality.
                        </p>
                        <Button
                          onClick={() =>
                            router.push("/manage/storefront/script-manager/add")
                          }
                          className="btn-primary"
                          size="sm"
                        >
                          <Plus className="w-4 h-4 mr-2" />
                          Add Your First Script
                        </Button>
                      </div>
                    </div>
                  </TableCell>
                </TableRow>
              )}

              {/* Data Rows */}
              {!loading &&
                !error &&
                scriptsData?.length > 0 &&
                scriptsData.map((script: any) => (
                  <TableRow
                    key={script.id}
                    className="hover:bg-gray-50 transition-colors h-18"
                  >
                    <TableCell className="font-medium">
                      {script.script_name || "Untitled Script"}
                    </TableCell>
                    <TableCell className="capitalize">
                      {script.location?.replace(/([A-Z])/g, " $1").trim() ||
                        "N/A"}
                    </TableCell>
                    <TableCell className="capitalize">
                      {script.placement || "N/A"}
                    </TableCell>
                    <TableCell className="uppercase">
                      {script.script_type || "N/A"}
                    </TableCell>
                    <TableCell>
                      {script.created_at
                        ? new Date(script.created_at).toLocaleDateString(
                            "en-US",
                            {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            }
                          )
                        : "N/A"}
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            className="h-8 w-8 p-0 hover:bg-gray-100"
                          >
                            <MoreHorizontal className="!h-6 !w-6 text-gray-600" />
                            <span className="sr-only">Open menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                          align="end"
                          className="w-[150px] space-y-1"
                        >
                          <DropdownMenuItem
                            onClick={() =>
                              router.push(
                                `/manage/storefront/script-manager/edit/${script.id}`
                              )
                            }
                            className="cursor-pointer"
                          >
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() =>
                              handleDelete(script.id, script.script_name)
                            }
                            className="text-red-600 cursor-pointer focus:text-red-700 focus:bg-red-50"
                          >
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

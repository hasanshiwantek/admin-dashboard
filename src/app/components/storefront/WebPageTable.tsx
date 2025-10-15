"use client";
import React, { useState, useEffect } from "react";
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
import OrderActionsDropdown from "../orders/OrderActionsDropdown";
import { Button } from "@/components/ui/button";
import Pagination from "@/components/ui/pagination";
import Link from "next/link";
import {
  fetchBrands,
  deleteBrand,
  fetchBrandByKeyword,
} from "@/redux/slices/productSlice";
import { useAppDispatch, useAppSelector } from "@/hooks/useReduxHooks";
import { useRouter } from "next/navigation";
import { refetchBrands } from "@/lib/brandUtils";
import Spinner from "../loader/Spinner";

// Example array of pages
const pages = [
  {
    id: 1,
    name: "About Us",
    type: "Content",
    visibility: true,
    actions: ["edit", "delete"],
  },
  {
    id: 2,
    name: "Contact Us",
    type: "Form",
    visibility: true,
    actions: ["edit", "delete"],
  },
  {
    id: 3,
    name: "Blog",
    type: "Content",
    visibility: false,
    actions: ["edit", "delete"],
  },
];

const WebPageTable = () => {
  const router = useRouter();

  const getDropdownActions = (brand: any) => [
    {
      label: "Edit",
      //   onClick: () \=> router.push(`/manage/products/brands/edit/${brand.id}`),
    },
  ];
  const dispatch = useAppDispatch();
  const brands = useAppSelector((state: any) => state.product.brands);
  const loading = useAppSelector((state: any) => state.product.loading);

  const brandData = brands?.data;
  const pagination = brands?.pagination;
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState("50");
  const totalCount = pagination?.totalCount;
  const totalPages = pagination?.totalPages;
  console.log("Pagination", pagination);

  const [selectedIds, setSelectedIds] = useState<any[]>([]);

  const isAllSelected = selectedIds.length === brandData?.length;

  const toggleSelectAll = () => {
    const newSelected = isAllSelected
      ? []
      : brandData.map((brand: any) => brand.id);
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

  // BRAND DELETION LOGIC

  const deleteBrandHandler = async () => {
    if (selectedIds.length === 0) {
      alert("Please select at least one brand before deleting.");
      return; // stop here
    }
    const confirm = window.confirm("Delete Brand?");
    if (!confirm) {
      return;
    } else {
      try {
        const resultAction = await dispatch(deleteBrand({ id: selectedIds }));
        const result = (resultAction as any).payload;

        if ((resultAction as any).meta.requestStatus === "fulfilled") {
          console.log("✅ Brand deleted successfully:", result);
          setSelectedIds([]);
          setTimeout(() => {
            refetchBrands(dispatch);
          }, 700);
        } else {
          console.error("❌ Failed to delete brand:", result);
        }
      } catch (err) {
        console.error("❌ Unexpected error:", err);
      }
    }
  };

  // SEARCH KEYWORD LOGIC

  const [keyword, setKeyword] = useState("");

  const filterHandler = async () => {
    console.log("Keyword: ", keyword);
    try {
      const resultAction = await dispatch(
        fetchBrandByKeyword({
          page: currentPage,
          pageSize: perPage,
          keyword: keyword,
        })
      );
      if (fetchBrandByKeyword.fulfilled.match(resultAction)) {
        console.log(`✅ Fetch Brand Result`);
        // setKeyword("");
      } else {
        console.error("❌ Error fetching Brand");
      }
    } catch (err) {
      console.error("🚨 Unexpected error updating", err);
    }
  };

  useEffect(() => {
    dispatch(fetchBrands({ page: currentPage, pageSize: perPage }));
  }, [dispatch, currentPage, perPage]);

  return (
    <div className="p-5">
      <div className="flex flex-col space-y-5">
        <div className="flex flex-col   gap-6 ">
          <h1 className="!font-light">View Web Pages</h1>
          <p>
            Web pages are used to display content that doesn't change often. For
            example an 'About Us' or a 'Contact Us' page.
          </p>
        </div>
        <div className="flex items-center gap-5 ">
          <Link href={"/manage/storefront/webpages"}>
            <button className="btn-outline-primary">Create a Web Page</button>
          </Link>
          <button className="btn-outline-primary" onClick={deleteBrandHandler}>
            <Trash className="!w-6 !h-6" />
          </button>
        </div>
        <div className="flex justify-end">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            perPage={perPage}
            onPerPageChange={setPerPage}
          />
        </div>
      </div>

      {/* BRANDS Table */}
      <div className="overflow-x-auto rounded-md border bg-white mt-2">
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
              <TableHead className="text-left">Page Name</TableHead>
              <TableHead className="text-left">Page Type</TableHead>
              <TableHead className="text-left">Visible</TableHead>
              <TableHead className="text-left">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={10} className="text-center py-10">
                  <Spinner />
                </TableCell>
              </TableRow>
            ) : pages.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={10}
                  className="text-center py-10 text-gray-500 text-xl"
                >
                  No Pages found.
                </TableCell>
              </TableRow>
            ) : (
              pages.map((page) => (
                <TableRow key={page.id} className="!h-20">
                  <TableCell className="w-1/6">
                    <Checkbox
                      checked={selectedIds.includes(page.id)}
                      onCheckedChange={() => toggleSelectOne(page.id)}
                      aria-label={`Select ${page.name}`}
                    />
                  </TableCell>
                  <TableCell>
                    <Link
                      href={`/manage/storefront/web-pages/edit/${page.id}`}
                      className="text-blue-600 hover:border-b-blue-600 hover:border-b-2"
                    >
                      {page.name}
                    </Link>
                  </TableCell>
                  <TableCell>{page.type}</TableCell>
                  <TableCell>{page.visibility ? "✅" : "❌"}</TableCell>
                  <TableCell>
                    <OrderActionsDropdown
                      actions={getDropdownActions(page?.name)}
                      trigger={
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-xl cursor-pointer"
                        >
                          <Settings className="!w-6 !h-6 text-gray-500" />
                        </Button>
                      }
                    />
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex justify-end my-4">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          perPage={perPage}
          onPerPageChange={setPerPage}
        />
      </div>
    </div>
  );
};

export default WebPageTable;

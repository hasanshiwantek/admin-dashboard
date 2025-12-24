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
import OrderActionsDropdown from "../../orders/OrderActionsDropdown";
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
import Spinner from "../../loader/Spinner";
const BrandTable = () => {
  const router = useRouter();

  const getDropdownActions = (brand: any) => [
    {
      label: "Edit",
      onClick: () => router.push(`/manage/products/brands/edit/${brand.id}`),
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
          <h1 className="!font-light 2xl:!text-5xl">View Brands</h1>
          <p className="2xl:!text-2xl">
            Brands can be associated with products, allowing your customers to
            shop by browsing their favorite brands.
          </p>
        </div>
        <div className="flex items-center gap-5 ">
          <Link href={"/manage/products/brands/add"}>
            <button className="btn-outline-primary 2xl:!text-2xl">Add a Brand...</button>
          </Link>
          <button className="btn-outline-primary" onClick={deleteBrandHandler}>
            <Trash className="!w-6 !h-6 2xl:!h-8" />
          </button>
          <Input
            className="2xl:!text-2xl 2xl:!h-[37.98px]" 
            type="text"
            placeholder="Filter by Keyword"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
          <button
            className="btn-outline-primary 2xl:!text-2xl"
            onClick={filterHandler}
            type="button"
          >
            Filter
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
              <TableHead className="text-left 2xl:!text-[1.6rem]">Brand Name</TableHead>
              <TableHead className="text-left 2xl:!text-[1.6rem]">Products</TableHead>
              <TableHead className="text-left 2xl:!text-[1.6rem]">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={10} className="text-center py-10">
                  <Spinner />
                </TableCell>
              </TableRow>
            ) : brandData?.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={10}
                  className="text-center py-10 text-gray-500 text-xl"
                >
                  No Brands found.
                </TableCell>
              </TableRow>
            ) : (
              brandData?.map((brand: any, index: number) => (
                <TableRow key={index} className="!h-20 ">
                  <TableCell className="w-1/6">
                    <Checkbox
                      checked={selectedIds.includes(brand.brand?.id)}
                      onCheckedChange={() => toggleSelectOne(brand.brand?.id)}
                      aria-label={`Select ${brand.brand?.name}`}
                    />
                  </TableCell>
                  <TableCell>
                    <Link
                      href={`/manage/products/brands/edit/${brand.brand?.id}`}
                      className="text-blue-600 hover:border-b-blue-600 hover:border-b-2 2xl:!text-2xl"
                    >
                      {brand.brand?.name}
                    </Link>
                  </TableCell>
                  <TableCell className="2xl:!text-2xl">{brand?.productsCount}</TableCell>
                  <TableCell>
                    <OrderActionsDropdown
                      actions={getDropdownActions(brand?.brand)}
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

export default BrandTable;

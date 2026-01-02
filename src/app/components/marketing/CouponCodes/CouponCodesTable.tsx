"use client";

import React, { useEffect, useState } from "react";
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
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Spinner from "../../loader/Spinner";
import {
  Check,
  MoreHorizontal,
  Trash2,
  SlidersHorizontal,
  Loader2,
} from "lucide-react";
import { useRouter } from "next/navigation";
import Pagination from "@/components/ui/pagination";
import { IoFilterOutline } from "react-icons/io5";
import Link from "next/link";
import {
  getCouponCodes,
  searchCouponcode,
} from "@/redux/slices/marketingSlice";
import { useAppDispatch, useAppSelector } from "@/hooks/useReduxHooks";

interface Coupon {
  id: string;
  name: string;
  code: string;
  discount: string;
  expiration: string;
  uses: number;
  enabled: boolean;
}

const CouponCodesTable = () => {
  const [selectedCoupons, setSelectedCoupons] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState("10");
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { couponCodes, loading, error } = useAppSelector(
    (state: any) => state.marketingReducer
  );

  const couponsData = couponCodes?.couponcode?.data || [];
  const totalCount = couponCodes?.couponcode?.total || 0;
  const totalPages = couponCodes?.couponcode?.last_page || 1;
  const currentPageFromAPI = couponCodes?.couponcode?.current_page || 1;

  console.log(couponCodes);

  useEffect(() => {
    dispatch(getCouponCodes());
  }, [dispatch, currentPage, perPage]);

  const toggleSelectAll = () => {
    if (selectedCoupons.length === couponsData?.length) {
      setSelectedCoupons([]);
    } else {
      setSelectedCoupons(couponsData?.map((c: any) => c.id));
    }
  };

  const toggleSelectCoupon = (id: string) => {
    if (selectedCoupons.includes(id)) {
      setSelectedCoupons(selectedCoupons.filter((cid) => cid !== id));
    } else {
      setSelectedCoupons([...selectedCoupons, id]);
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    setSelectedCoupons([]); // Clear selections when changing pages
  };

  const handlePerPageChange = (value: string) => {
    setPerPage(value);
    setCurrentPage(1); // Reset to first page when changing items per page
    setSelectedCoupons([]); // Clear selections
  };
  const filterCouponHandler = () => {
    if (searchQuery.trim()) {
      // Dispatch search action
      dispatch(searchCouponcode({ search: searchQuery, per_page: perPage }));
    } else {
      // If search is empty, fetch all coupons
      dispatch(getCouponCodes());
    }
  };

  // Handle Enter key press in search input
  const handleSearchKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      filterCouponHandler();
    }
  };

  // Clear search
  const handleClearSearch = () => {
    setSearchQuery("");
    dispatch(getCouponCodes());
  };

  return (
    <div className="p-10">
      {/* Info Banner */}
      <div className="bg-amber-50 border-l-4 border-yellow-500 px-6 py-4">
        <p className="text-xl text-gray-700">
          Create a greater variety of coupon types including "buy one, get one"
          and "free gift with purchase" using the{" "}
          <a href="#" className="text-blue-600 hover:underline">
            standard promotions editor
          </a>
        </p>
      </div>

      {/* Header */}
      <div className="px-6 py-6">
        <h1 className="!font-light 2xl:!text-5xl mb-2">Coupon codes</h1>
        <p className=" text-gray-600">
          Coupon codes allow you to provide customers with discounts on products
          available for purchase from your store.
        </p>
      </div>

      {/* Main Content */}
      <div className="px-6 pb-6">
        <div className="bg-white border rounded-lg">
          {/* Action Bar */}
          <div className="flex items-center gap-8 px-6 py-4 border-b">
            <Link href={"/manage/marketing/coupon-codes/add"}>
              <button className="btn-outline-primary">
                Create a coupon code
              </button>
            </Link>
            <button
              className="btn-outline-primary"
              disabled={selectedCoupons.length === 0}
            >
              <Trash2 className="h-6 w-6 fill-blue-600" />
            </button>

            <div className="flex items-center border rounded 2xl:h-[37.98px]">
              <Input
                className="border-0 focus:ring-0 2xl:!text-2xl"
                placeholder="Filter by Keyword"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleSearchKeyPress}
              />
              {searchQuery && (
                <button
                  onClick={handleClearSearch}
                  className="px-2 text-gray-400 hover:text-gray-600"
                  type="button"
                >
                  ×
                </button>
              )}
              <button
                className="btn-outline-primary h-full"
                onClick={filterCouponHandler}
                type="button"
              >
                <IoFilterOutline />
              </button>
            </div>
            <div className="flex-1" />
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
              perPage={perPage}
              onPerPageChange={handlePerPageChange}
            />
          </div>

          {/* Table */}
          <Table>
            <TableHeader className="h-18 ">
              <TableRow className="bg-gray-50 hover:bg-gray-50">
                <TableHead className="w-12">
                  <Checkbox
                    checked={
                      selectedCoupons.length === couponsData?.length &&
                      couponsData?.length > 0
                    }
                    onCheckedChange={toggleSelectAll}
                    disabled={loading || couponsData?.length === 0}
                  />
                </TableHead>
                <TableHead className="font-semibold text-gray-700">
                  Coupon name
                </TableHead>
                <TableHead className="font-semibold text-gray-700">
                  Coupon code
                </TableHead>
                <TableHead className="font-semibold text-gray-700">
                  Discount
                </TableHead>
                <TableHead className="font-semibold text-gray-700">
                  Expiration
                </TableHead>
                <TableHead className="font-semibold text-gray-700">
                  Uses
                </TableHead>
                <TableHead className="font-semibold text-gray-700">
                  Enabled
                </TableHead>
                <TableHead className="font-semibold text-gray-700">
                  Action
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {/* Loading State */}
              {loading && (
                <TableRow>
                  <TableCell colSpan={8} className="h-64 text-center">
                    <div className="flex flex-col items-center justify-center gap-3">
                      <Spinner />
                    </div>
                  </TableCell>
                </TableRow>
              )}

              {/* Error State */}
              {!loading && error && (
                <TableRow>
                  <TableCell colSpan={8} className="h-64 text-center">
                    <div className="flex flex-col items-center justify-center gap-3">
                      <div className="rounded-full bg-red-100 p-3">
                        <svg
                          className="h-6 w-6 text-red-600"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </div>
                      <p className="text-gray-900 font-medium">
                        Failed to load coupon codes
                      </p>
                      <p className="text-gray-600 text-sm">
                        {error?.message ||
                          "An error occurred while fetching data"}
                      </p>
                      <Button
                        onClick={() => dispatch(getCouponCodes())}
                        variant="outline"
                        className="mt-2"
                      >
                        Try Again
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              )}

              {/* Empty State */}
              {!loading && !error && couponsData?.length === 0 && (
                <TableRow>
                  <TableCell colSpan={8} className="h-64 text-center">
                    <div className="flex flex-col items-center justify-center gap-3">
                      <div className="rounded-full bg-gray-100 p-3">
                        <svg
                          className="h-6 w-6 text-gray-400"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                          />
                        </svg>
                      </div>
                      <p className="text-gray-900 font-medium">
                        No coupon codes found
                      </p>
                      <p className="text-gray-600 text-sm">
                        Get started by creating your first coupon code
                      </p>
                      <Link href={"/manage/marketing/coupon-codes/add"}>
                        <Button className="mt-2">Create a coupon code</Button>
                      </Link>
                    </div>
                  </TableCell>
                </TableRow>
              )}

              {/* Data Rows */}
              {!loading &&
                !error &&
                couponsData?.length > 0 &&
                couponsData?.map((coupon: any) => (
                  <TableRow
                    key={coupon?.id}
                    className="hover:bg-gray-50 transition-colors h-18"
                  >
                    <TableCell>
                      <Checkbox
                        checked={selectedCoupons.includes(coupon?.id)}
                        onCheckedChange={() => toggleSelectCoupon(coupon?.id)}
                      />
                    </TableCell>
                    <TableCell className="text-blue-600 font-normal">
                      {coupon?.couponName}
                    </TableCell>
                    <TableCell className="text-gray-700">
                      {coupon?.couponCode}
                    </TableCell>
                    <TableCell className="text-gray-700">
                      {coupon?.discountType === "dollarAmountOrder"
                        ? `$${coupon?.discountAmount}`
                        : `${coupon?.discountAmount}%`}
                    </TableCell>
                    <TableCell className="text-gray-700">
                      {coupon?.expiration || "No expiration"}
                    </TableCell>
                    <TableCell className="text-gray-700">
                      {coupon?.uses || 0}
                    </TableCell>
                    <TableCell>
                      {coupon?.enabled === "true" && (
                        <Check className="h-6 w-10 text-green-600" />
                      )}
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 hover:bg-gray-100"
                          >
                            <MoreHorizontal className="!h-6 !w-6 text-gray-600" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                          align="end"
                          className="w-[120px] space-y-4"
                        >
                          <DropdownMenuItem
                            className="cursor-pointer"
                            onClick={() =>
                              router.push(
                                `/manage/marketing/coupon-codes/edit/${coupon?.id}`
                              )
                            }
                          >
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem className="cursor-pointer">
                            Copy to Clipboard
                          </DropdownMenuItem>
                          <DropdownMenuItem className="cursor-pointer">
                            View Orders
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>

          {/* Pagination Footer */}
          <div className="flex items-center justify-end px-6 py-4 border-t">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
              perPage={perPage}
              onPerPageChange={handlePerPageChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CouponCodesTable;

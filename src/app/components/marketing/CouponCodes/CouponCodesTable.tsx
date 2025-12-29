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
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
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
import { Check, MoreHorizontal, Trash2, SlidersHorizontal } from "lucide-react";
import { useRouter } from "next/navigation";
import Pagination from "@/components/ui/pagination";
import { IoFilterOutline } from "react-icons/io5";
import Link from "next/link";

interface Coupon {
  id: string;
  name: string;
  code: string;
  discount: string;
  expiration: string;
  uses: number;
  enabled: boolean;
}

const couponsData: Coupon[] = [
  {
    id: "1",
    name: "10%",
    code: "CTSDISCOUNT10",
    discount: "10.00% off each item",
    expiration: "N/A",
    uses: 2,
    enabled: true,
  },
  {
    id: "2",
    name: "10 DOLLAR",
    code: "CTS10001",
    discount: "$10.00 off the order total",
    expiration: "N/A",
    uses: 0,
    enabled: true,
  },
];

const CouponCodesTable = () => {
  const [coupons, setCoupons] = useState<Coupon[]>(couponsData);
  const [selectedCoupons, setSelectedCoupons] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [itemsPerPage, setItemsPerPage] = useState(20);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState("50");
  const totalCount = 20;
  const totalPages = 20;
  const router = useRouter();
  const toggleSelectAll = () => {
    if (selectedCoupons.length === coupons.length) {
      setSelectedCoupons([]);
    } else {
      setSelectedCoupons(coupons.map((c) => c.id));
    }
  };

  const toggleSelectCoupon = (id: string) => {
    if (selectedCoupons.includes(id)) {
      setSelectedCoupons(selectedCoupons.filter((cid) => cid !== id));
    } else {
      setSelectedCoupons([...selectedCoupons, id]);
    }
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
            <button className="btn-outline-primary ">
              <Trash2 className="h-6 w-6 fill-blue-600" />
            </button>

            <div className="flex items-center border rounded 2xl:h-[37.98px]">
              <Input
                className="border-0 focus:ring-0 2xl:!text-2xl"
                placeholder="Filter by Keyword"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button className="btn-outline-primary h-full">
                <IoFilterOutline />
              </button>
            </div>
            <div className="flex-1" />
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
              perPage={perPage}
              onPerPageChange={setPerPage}
            />
          </div>

          {/* Table */}
          <Table>
            <TableHeader className="h-18 ">
              <TableRow className="bg-gray-50 hover:bg-gray-50">
                <TableHead className="w-12">
                  <Checkbox
                    checked={
                      selectedCoupons.length === coupons.length &&
                      coupons.length > 0
                    }
                    onCheckedChange={toggleSelectAll}
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
              {coupons.map((coupon) => (
                <TableRow
                  key={coupon.id}
                  className="hover:bg-gray-50 transition-colors h-18"
                >
                  <TableCell>
                    <Checkbox
                      checked={selectedCoupons.includes(coupon.id)}
                      onCheckedChange={() => toggleSelectCoupon(coupon.id)}
                    />
                  </TableCell>
                  <TableCell className="text-blue-600 font-normal">
                    {coupon.name}
                  </TableCell>
                  <TableCell className="text-gray-700">{coupon.code}</TableCell>
                  <TableCell className="text-gray-700">
                    {coupon.discount}
                  </TableCell>
                  <TableCell className="text-gray-700">
                    {coupon.expiration}
                  </TableCell>
                  <TableCell className="text-gray-700">{coupon.uses}</TableCell>
                  <TableCell>
                    {coupon.enabled && (
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
              onPageChange={setCurrentPage}
              perPage={perPage}
              onPerPageChange={setPerPage}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CouponCodesTable;

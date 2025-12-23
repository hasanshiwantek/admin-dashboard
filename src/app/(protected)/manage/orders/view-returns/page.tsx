"use client";

import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { HiQuestionMarkCircle } from "react-icons/hi2";
import { advanceReturnOrderSearch } from "@/redux/slices/orderSlice";
import { useAppDispatch } from "@/hooks/useReduxHooks";
import { useRouter } from "next/navigation";

const Page = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [formData, setFormData] = useState({
    keywords: "",
    returnStatus: "",
    returnIdFrom: "",
    returnIdTo: "",
    dateRange: "",
    sortBy: "return-id",
    sortDirection: "asc",
  });

  const handleChange = (key: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Filter out empty values
    const filteredData = Object.entries(formData).reduce(
      (acc, [key, value]) => {
        const isEmptyArray = Array.isArray(value) && value.length === 0;
        const isEmpty =
          value === "" || value === null || value === undefined || isEmptyArray;

        if (!isEmpty) {
          acc[key] = value;
        }
        return acc;
      },
      {} as Record<string, any>
    );

    try {
      const result = await dispatch(advanceReturnOrderSearch ({ data: filteredData }));

      if (advanceReturnOrderSearch .fulfilled.match(result)) {
        // Push filters to URL
        const queryParams = new URLSearchParams();
        Object.entries(filteredData).forEach(([key, value]) => {
          if (Array.isArray(value)) {
            value.forEach((v) => queryParams.append(key, v));
          } else {
            queryParams.set(key, String(value));
          }
        });

        router.push(`/manage/returns?${queryParams.toString()}`);
      } else {
        console.error("❌ Search Failed:", result.error);
      }
    } catch (error) {
      console.error("🔥 Unexpected Error:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="p-10">
        <div className="flex flex-col space-y-5">
          <h1 className="!font-extralight 2xl:!text-5xl">Search Returns</h1>
          <p className="2xl:!text-2xl">
            Search for specific returns using the advanced search options below.
          </p>
        </div>

        <div className="my-10">
          <h1 className="my-5 2xl:!text-[2.4rem]">Advanced Search</h1>
          <div className="bg-white shadow-md p-10 space-y-10">
            {/* Search Keywords */}
            <div className="flex items-center gap-4">
              <Label
                htmlFor="searchKeywords"
                className="w-[140px] text-right 2xl:!text-2xl"
              >
                Search Keywords:
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <span className="text-gray-400 cursor-pointer ml-2">
                        <HiQuestionMarkCircle className="w-6 h-6" />
                      </span>
                    </TooltipTrigger>
                    <TooltipContent>
                      <strong>Search Keywords</strong>
                      <br />
                      The search keywords you type into this box will be used to
                      search the following fields for all returns: customer name,
                      order number, return reason.
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </Label>
              <Input
                id="searchKeywords"
                value={formData.keywords}
                onChange={(e) => handleChange("keywords", e.target.value)}
                placeholder="Enter search keywords..."
              />
            </div>

            {/* Return Status Dropdown */}
            <div className="flex items-center gap-4">
              <Label
                htmlFor="return-status"
                className="w-[140px] text-right 2xl:!text-2xl"
              >
                Return Status:
              </Label>
              <Select
                value={formData.returnStatus}
                onValueChange={(val) => handleChange("returnStatus", val)}
              >
                <SelectTrigger id="return-status">
                  <SelectValue placeholder="--Choose return status--" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="received">Received</SelectItem>
                  <SelectItem value="return-authorized">
                    Return Authorized
                  </SelectItem>
                  <SelectItem value="items-repaired">Item(s) Repaired</SelectItem>
                  <SelectItem value="items-refunded">Item(s) Refunded</SelectItem>
                  <SelectItem value="request-rejected">
                    Request Rejected
                  </SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* SEARCH BY RANGE */}
          <div className="my-10">
            <h1 className="my-5 2xl:!text-[2.4rem]">Search by Range</h1>
            <div className="bg-white shadow-md p-10 space-y-10">
              <div className="flex items-center gap-4">
                <Label
                  htmlFor="returnIdFrom"
                  className="w-[100px] text-right 2xl:!text-2xl"
                >
                  Return Id:
                </Label>
                <span className="text-sm text-gray-600 2xl:!text-2xl">From</span>
                <Input
                  id="returnIdFrom"
                  type="number"
                  className="w-[100px]"
                  value={formData.returnIdFrom}
                  onChange={(e) => handleChange("returnIdFrom", e.target.value)}
                  placeholder="Min"
                />
                <span className="text-sm text-gray-600 2xl:!text-2xl">to</span>
                <Input
                  id="returnIdTo"
                  type="number"
                  className="w-[100px]"
                  value={formData.returnIdTo}
                  onChange={(e) => handleChange("returnIdTo", e.target.value)}
                  placeholder="Max"
                />
              </div>
            </div>
          </div>

          {/* SEARCH BY DATE */}
          <div>
            <h1 className="my-5 2xl:!text-[2.4rem]">Search by date</h1>
            <div className="bg-white shadow-md p-10 space-y-10">
              <div className="space-y-2">
                <Label className="2xl:!text-2xl" htmlFor="date-range">
                  Date range
                </Label>
                <Select
                  value={formData.dateRange}
                  onValueChange={(val) => handleChange("dateRange", val)}
                >
                  <SelectTrigger id="date-range" className="w-full">
                    <SelectValue placeholder="-- Choose a date range --" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="today">Today</SelectItem>
                    <SelectItem value="yesterday">Yesterday</SelectItem>
                    <SelectItem value="last-24-hours">Last 24 hours</SelectItem>
                    <SelectItem value="last-7-days">Last 7 days</SelectItem>
                    <SelectItem value="last-30-days">Last 30 days</SelectItem>
                    <SelectItem value="this-month">This month</SelectItem>
                    <SelectItem value="this-year">This year</SelectItem>
                    <SelectItem value="custom-period">Custom period</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* SORT ORDER */}
          <div className="my-10">
            <h1 className="my-5 2xl:!text-[2.4rem]">Sort Order</h1>
            <div className="bg-white shadow-md p-10 space-y-10">
              <div className="flex items-center gap-4">
                <Label
                  htmlFor="sortBy"
                  className="w-[140px] text-right 2xl:!text-2xl"
                >
                  Sort Order:
                </Label>
                <Select
                  value={formData.sortBy}
                  onValueChange={(val) => handleChange("sortBy", val)}
                >
                  <SelectTrigger id="sortBy">
                    <SelectValue placeholder="Return ID" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="return-id">Return ID</SelectItem>
                    <SelectItem value="customer">Customer</SelectItem>
                    <SelectItem value="date">Date</SelectItem>
                    <SelectItem value="status">Status</SelectItem>
                  </SelectContent>
                </Select>

                <Select
                  value={formData.sortDirection}
                  onValueChange={(val) => handleChange("sortDirection", val)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Ascending Order" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="asc">Ascending Order</SelectItem>
                    <SelectItem value="desc">Descending Order</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SUBMIT BUTTON */}
      <div className="sticky bottom-0 w-full border-t p-6 bg-white flex justify-end gap-4">
        <button
          className="btn-outline-primary"
          type="button"
          onClick={() => router.back()}
        >
          Cancel
        </button>
        <button className="btn-primary" type="submit">
          Search
        </button>
      </div>
    </form>
  );
};

export default Page;
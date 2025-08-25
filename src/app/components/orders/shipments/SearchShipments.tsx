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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import LayoutWrapper from "../../layout/LayoutWrapper";
import { useRouter } from "next/navigation";
import { advanceShipmentSearch } from "@/redux/slices/orderSlice";
import { useAppDispatch } from "@/hooks/useReduxHooks";
import Link from "next/link";
const SearchShipments = () => {
  const [formData, setFormData] = useState({
    keywords: "",
    // status: "",
    // paymentMethod: "",
    // shippingProvider: "",
    // shippingMethod: "",
    // fulfillmentSource: "",
    // coupon: "",
    // guest: false,
    // preorderNo: true,
    // preorderYes: true,
    // deletedOrder: "ignore",
    orderIdFrom: "",
    orderIdTo: "",
    shipmentIdFrom: "",
    shipmentIdTo: "",
    dateRange: "",
    sortBy: "id",
    sortDirection: "asc",
  });
  const router = useRouter();
  const dispatch = useAppDispatch();

  const handleChange = (key: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitted Data:", formData);
    const filteredData = Object.entries(formData).reduce(
      (acc, [key, value]) => {
        const isEmptyArray = Array.isArray(value) && value.length === 0;
        const isEmpty =
          value === "" || value === null || value === undefined || isEmptyArray;

        const alwaysInclude = ["page", "pageSize"];
        if (!isEmpty || alwaysInclude.includes(key)) {
          acc[key] = value;
        }
        return acc;
      },
      {} as Record<string, any>
    );

    try {
      const result = await dispatch(
        advanceShipmentSearch({ data: filteredData })
      );

      if (advanceShipmentSearch.fulfilled.match(result)) {
        // ✅ Push ALL filters to URL — not just page & limit
        const queryParams = new URLSearchParams();
        Object.entries(filteredData).forEach(([key, value]) => {
          if (Array.isArray(value)) {
            value.forEach((v) => queryParams.append(key, v));
          } else {
            queryParams.set(key, String(value));
          }
        });

        router.push(`/manage/orders/shipments?${queryParams.toString()}`);
      } else {
        console.error("❌ Search Failed:", result.error);
      }
    } catch (error) {
      console.error("🔥 Unexpected Error:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="">
        <div className="my-5">
          <div className="my-5">
            <h1 className="!text-5xl !font-extralight !text-gray-600 !my-10">
              Search shipments
            </h1>
            <p>
              Search for specific shipments using the advanced search options
              below.
            </p>
          </div>
          <div className="my-10">
            <h1 className="my-5">Advance Search</h1>
            <div className="bg-white shadow-md p-10 space-y-10">
              <div className="flex items-center gap-4">
                <Label htmlFor="" className="w-[140px] text-right">
                  Search Keywords
                </Label>
                <Input
                  placeholder="0"
                  value={formData.keywords}
                  onChange={(e) => handleChange("keywords", e.target.value)}
                />
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <HiQuestionMarkCircle className="h-6 w-6 -ml-2" />
                      {/* <HiMiniQuestionMarkCircle /> */}
                    </TooltipTrigger>
                    <TooltipContent>
                      The search keywords that you enter in this box will be
                      used to search the following fields for all shipments:
                      shipment ID, tracking number, billing name, shipping name,
                      shipping method, shipping comments and shipping country.
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </div>
          </div>

          {/* SEARCH BY RANGE */}
          <div className="my-10">
            <h1 className="my-5">Search by Range</h1>
            <div className="bg-white shadow-md p-10 space-y-10">
              <div className="flex items-center gap-4">
                <Label htmlFor="shipmentIdFrom" className="w-[90px] text-right">
                  Shipment ID:
                </Label>
                <span className="text-sm text-gray-600">From </span>
                <Input
                  id="shipmentIdFrom"
                  type="number"
                  className="w-[100px]"
                  value={formData.shipmentIdFrom}
                  onChange={(e) =>
                    handleChange("shipmentIdFrom", e.target.value)
                  }
                />
                <span className="text-sm text-gray-600">to </span>
                <Input
                  id="shipmentIdTo"
                  type="number"
                  className="w-[100px]"
                  value={formData.shipmentIdTo}
                  onChange={(e) => handleChange("shipmentIdTo", e.target.value)}
                />
              </div>

              <div className="flex items-center gap-4">
                <Label htmlFor="orderIdFrom" className="w-[80px] text-right">
                  Order ID:
                </Label>
                <span className="text-sm text-gray-600">From$</span>
                <Input
                  id="orderIdFrom"
                  type="number"
                  className="w-[100px]"
                  value={formData.orderIdFrom}
                  onChange={(e) => handleChange("orderIdFrom", e.target.value)}
                />
                <span className="text-sm text-gray-600 ml-4">to$</span>
                <Input
                  id="orderIdTo"
                  type="number"
                  className="w-[100px]"
                  value={formData.orderIdTo}
                  onChange={(e) => handleChange("orderIdTo", e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* SEARCH BY DATE */}
          <div>
            <h1 className="my-5">Search by date</h1>
            <div className="bg-white shadow-md  p-10 space-y-10">
              <div className="space-y-2 flex items-center gap-4">
                <Label htmlFor="shippingDate" className="w-[140px] text-right">
                  Shipping Date
                </Label>
                <Select
                  onValueChange={(val) => handleChange("shippingDate", val)}
                >
                  <SelectTrigger id="shippingDate" className="w-full">
                    <SelectValue placeholder="-- Choose a shipping date --" />
                  </SelectTrigger>
                  <SelectContent>
                    {[
                      "Today",
                      "Yesterday",
                      "Last 24 hours",
                      "Last 7 days",
                      "Last 30 days",
                      "This month",
                      "This year",
                      "Custom period",
                    ].map((opt) => (
                      <SelectItem key={opt} value={opt}>
                        {opt}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2 flex items-center gap-4">
                <Label htmlFor="orderDate" className="w-[140px] text-right">
                  Order Date
                </Label>
                <Select onValueChange={(val) => handleChange("orderDate", val)}>
                  <SelectTrigger id="orderDate" className="w-full">
                    <SelectValue placeholder="-- Choose an order date --" />
                  </SelectTrigger>
                  <SelectContent>
                    {[
                      "Today",
                      "Yesterday",
                      "Last 24 hours",
                      "Last 7 days",
                      "Last 30 days",
                      "This month",
                      "This year",
                      "Custom period",
                    ].map((opt) => (
                      <SelectItem key={opt} value={opt}>
                        {opt}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* SORT ORDER */}
          <div className="my-10">
            <h1 className="my-5">Sort Order</h1>
            <div className="bg-white shadow-md p-10 space-y-10">
              <div className="flex items-center gap-4">
                <Label htmlFor="sortBy" className="w-[140px] text-right">
                  Sort Order:
                </Label>
                <Select onValueChange={(val) => handleChange("sortBy", val)}>
                  <SelectTrigger>
                    <SelectValue placeholder="ID" />
                  </SelectTrigger>
                  <SelectContent>
                    {[
                      "id",
                      "customer",
                      "date",
                      "status",
                      "messages",
                      "total",
                    ].map((opt) => (
                      <SelectItem key={opt} className="capitalize" value={opt}>
                        {opt}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select
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
        <Link href="/manage/orders/shipments">
        <button type="button" className="btn-outline-primary">
          Cancel
        </button>
        </Link>
        <button className="btn-primary" type="submit">
          Search
        </button>
      </div>
    </form>
  );
};

export default SearchShipments;

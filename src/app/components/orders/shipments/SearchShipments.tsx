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

type SearchShipmentsProps = { onClose: () => void };

const SearchShipments = ({onClose}: SearchShipmentsProps) => {
  const [formData, setFormData] = useState({
    keywords: "",
    status: "",
    paymentMethod: "",
    shippingProvider: "",
    shippingMethod: "",
    fulfillmentSource: "",
    coupon: "",
    guest: false,
    preorderNo: true,
    preorderYes: true,
    deletedOrder: "ignore",
    orderIdFrom: "",
    orderIdTo: "",
    orderTotalFrom: "",
    orderTotalTo: "",
    dateRange: "",
    dateType: "order-date",
    sortBy: "id",
    sortDirection: "asc",
  });

  const handleChange = (key: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitted Data:", formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="">

        <div className="my-5">

          <div className="my-10">
            <h1 className="my-5">Advance Search</h1>
            <div className="bg-white shadow-md p-10 space-y-10">
              <div className="flex items-center gap-4">
                <Label htmlFor="" className="w-[140px] text-right">Search Keywords </Label>
                <Input  placeholder="0"  /> 
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <HiQuestionMarkCircle className="h-6 w-6 -ml-2"/>
                                {/* <HiMiniQuestionMarkCircle /> */}
                            </TooltipTrigger>
                            <TooltipContent>
                                The search keywords that you enter in this box will be used to search the following fields for all shipments: shipment ID, tracking number, billing name, shipping name, shipping method, shipping comments and shipping country.
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
                <Label htmlFor="orderIdFrom" className="w-[90px] text-right">
                  Shipment ID:
                </Label>
                <span className="text-sm text-gray-600">From </span>
                <Input
                  id="orderIdFrom"
                  type="number"
                  className="w-[100px]"
                  value={formData.orderIdFrom}
                  onChange={(e) => handleChange("orderIdFrom", e.target.value)}
                />
                <span className="text-sm text-gray-600">to </span>
                <Input
                  id="orderIdTo"
                  type="number"
                  className="w-[100px]"
                  value={formData.orderIdTo}
                  onChange={(e) => handleChange("orderIdTo", e.target.value)}
                />
              </div>

              <div className="flex items-center gap-4">
                <Label htmlFor="orderTotalFrom" className="w-[80px] text-right">
                  Order ID:
                </Label>
                <span className="text-sm text-gray-600">From$</span>
                <Input
                  id="orderTotalFrom"
                  type="number"
                  className="w-[100px]"
                  value={formData.orderTotalFrom}
                  onChange={(e) =>
                    handleChange("orderTotalFrom", e.target.value)
                  }
                />
                <span className="text-sm text-gray-600 ml-4">to$</span>
                <Input
                  id="orderTotalTo"
                  type="number"
                  className="w-[100px]"
                  value={formData.orderTotalTo}
                  onChange={(e) => handleChange("orderTotalTo", e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* SEARCH BY DATE */}
          <div>
            <h1 className="my-5">Search by date</h1>
            <div className="bg-white shadow-md  p-10 space-y-10">
              <div className="space-y-2 flex items-center gap-4">
                <Label htmlFor="date-range" className="w-[140px] text-right">Shipping Date</Label>
                <Select onValueChange={(val) => handleChange("dateRange", val)}>
                  <SelectTrigger id="date-range" className="w-full">
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
                <Label htmlFor="date-range" className="w-[140px] text-right">Order Date</Label>
                <Select onValueChange={(val) => handleChange("dateRange", val)}>
                  <SelectTrigger id="date-range" className="w-full">
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
        <button 
        type="button"
        className="btn-outline-primary"
        onClick={onClose}
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

export default SearchShipments;

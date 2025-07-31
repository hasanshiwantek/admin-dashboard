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

const OrderSearch = () => {
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
      <div className="p-10">
        <div className="flex flex-col space-y-5">
          <h1 className="!font-extralight">Search Products</h1>
          <p>
            Search for specific products using the advanced search options
            below.
          </p>
        </div>

        <div className="my-10">
          <h1 className="my-5">Advanced Search</h1>
          <div className="bg-white shadow-md p-10 space-y-10">
            {/* Search Keywords */}
            <div className="flex items-center gap-4">
              <Label htmlFor="searchKeywords" className="w-[120px] text-right">
                Search Keywords:
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <span className="text-gray-400 cursor-pointer">
                        <HiQuestionMarkCircle className="w-6 h-6" />
                      </span>
                    </TooltipTrigger>
                    <TooltipContent>
                      <strong>Search Keywords</strong>
                      <br />
                      The search keywords you type into this box will be used to
                      search the following fields for all orders: name.
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </Label>
              <Input
                value={formData.keywords}
                onChange={(e) => handleChange("keywords", e.target.value)}
              />
            </div>

            {/* Select Dropdowns */}
            {[
              {
                id: "status",
                label: "Status",
                options: [
                  "Awaiting Payment",
                  "Pending",
                  "Awaiting Fulfillment",
                  "Awaiting Shipment",
                  "Awaiting Pickup",
                  "Partially Shipped",
                  "Completed",
                  "Shipped",
                  "Cancelled",
                  "Declined",
                  "Refunded",
                  "Disputed",
                  "Manual Verification Required",
                  "Partially Refunded",
                ],
              },
              {
                id: "paymentMethod",
                label: "Payment Method",
                options: ["Google pay", "Stripe","Credit Card"],
              },
              {
                id: "shippingProvider",
                label: "Shipping provider",
                options: ["USPS", "Fed Ex"],
              },
              {
                id: "shippingMethod",
                label: "Shipping Method",
                options: ["Standard", "Flat Rate"],
              },
              {
                id: "fulfillmentSource",
                label: "Fulfillment source",
                options: ["FBA"],
              },
            ].map(({ id, label, options }) => (
              <div key={id} className="flex items-center gap-4">
                <Label htmlFor={id} className="w-[120px] text-right">
                  {label}:
                </Label>
                <Select onValueChange={(val) => handleChange(id, val)}>
                  <SelectTrigger>
                    <SelectValue
                      placeholder={`--Choose ${label.toLowerCase()}--`}
                    />
                  </SelectTrigger>
                  <SelectContent>
                    {options.map((opt) => (
                      <SelectItem key={opt} value={opt}>
                        {opt}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            ))}

            {/* Coupon code with tooltip */}
            <div className="flex items-center gap-4">
              <Label htmlFor="coupon" className="w-[120px]">
                Coupon code
              </Label>
              <Input
                id="coupon"
                value={formData.coupon}
                onChange={(e) => handleChange("coupon", e.target.value)}
              />
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <span className="w-4 h-4">
                      <HiQuestionMarkCircle />
                    </span>
                  </TooltipTrigger>
                  <TooltipContent>
                    Enter a valid coupon code to filter orders
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>

            {/* Guest checkbox */}
            <div className="flex items-center space-x-2">
              <Checkbox
                id="guest"
                checked={formData.guest}
                onCheckedChange={(val) => handleChange("guest", val)}
              />
              <Label htmlFor="guest">
                Guest orders which match emails of registered accounts
              </Label>
            </div>

            {/* Pre-orders checkboxes */}
            <div className="space-y-2">
              <Label>Pre-orders</Label>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="no-preorder"
                  checked={formData.preorderNo}
                  onCheckedChange={(val) => handleChange("preorderNo", val)}
                />
                <Label htmlFor="no-preorder">
                  Include orders that do not contain pre-order products
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="with-preorder"
                  checked={formData.preorderYes}
                  onCheckedChange={(val) => handleChange("preorderYes", val)}
                />
                <Label htmlFor="with-preorder">
                  Include orders that contain pre-order products
                </Label>
              </div>
            </div>

            {/* Deleted orders */}
            <div className="space-y-2">
              <Label>Deleted orders</Label>
              <RadioGroup
                defaultValue={formData.deletedOrder}
                onValueChange={(val) => handleChange("deletedOrder", val)}
              >
                {[
                  { value: "ignore", label: "Do not search deleted orders" },
                  {
                    value: "include",
                    label: "Include deleted orders in search results",
                  },
                  { value: "only", label: "Only search for deleted orders" },
                ].map(({ value, label }) => (
                  <div key={value} className="flex items-center space-x-2">
                    <RadioGroupItem value={value} id={value} />
                    <Label htmlFor={value}>{label}</Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          </div>

          {/* SEARCH BY RANGE */}
          <div className="my-10">
            <h1 className="my-5">Search by Range</h1>
            <div className="bg-white shadow-md p-10 space-y-10">
              <div className="flex items-center gap-4">
                <Label htmlFor="orderIdFrom" className="w-[90px] text-right">
                  Order Id:
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
                  Order total:
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
            <div className="bg-white shadow-md p-10 space-y-10">
              <div className="space-y-2">
                <Label htmlFor="date-range">Date range</Label>
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

              <div className="space-y-2">
                <Label>Date type</Label>
                <RadioGroup
                  defaultValue={formData.dateType}
                  onValueChange={(val) => handleChange("dateType", val)}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="order-date" id="order-date" />
                    <Label htmlFor="order-date">Order date</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="delivery-date" id="delivery-date" />
                    <Label htmlFor="delivery-date">Delivery/Event date</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="both" id="both" />
                    <Label htmlFor="both">Order and delivery/event date</Label>
                  </div>
                </RadioGroup>
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
        <button className="btn-outline-primary" type="button">
          Cancel
        </button>
        <button className="btn-primary" type="submit">
          Search
        </button>
      </div>
    </form>
  );
};

export default OrderSearch;

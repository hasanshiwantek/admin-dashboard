"use client";
import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import Pagination from "@/components/ui/pagination";
const AllOrders = () => {
  const tabs = [
    "All orders",
    "Awaiting Payment",
    "Awaiting Fulfillment",
    "Awaiting Shipment",
    "High Risk",
    "Pre-orders",
    "More",
    "Custom views",
  ];

  const statusOptions = [
    { label: "Shipped", value: "shipped", color: "bg-lime-400" },
    { label: "Cancelled", value: "cancelled", color: "bg-black" },
    {
      label: "Awaiting Fulfillment",
      value: "awaiting-fulfillment",
      color: "bg-blue-200",
    },
    { label: "Refunded", value: "refunded", color: "bg-yellow-400" },
  ];

  const orders = [
    {
      date: "Mar 06, 2024",
      id: "310002",
      name: "Jeremy Frost (Guest)",
      status: "shipped",
      total: "$263.32",
    },
    {
      date: "Mar 13, 2024",
      id: "310003",
      name: "Charles L. Cattell, Jr.",
      status: "shipped",
      total: "$552.49",
    },
    {
      date: "Mar 15, 2024",
      id: "310004",
      name: "Dana Tyler",
      status: "cancelled",
      total: "$320.00",
    },
    {
      date: "Mar 15, 2024",
      id: "310005",
      name: "Dana Tyler",
      status: "awaiting-fulfillment",
      total: "$320.00",
    },
    {
      date: "Mar 15, 2024",
      id: "310006",
      name: "Dana Tyler",
      status: "awaiting-fulfillment",
      total: "$320.00",
    },
    {
      date: "Mar 15, 2024",
      id: "310007",
      name: "Dana Tyler",
      status: "cancelled",
      total: "$320.00",
    },
    {
      date: "Mar 15, 2024",
      id: "310008",
      name: "Dana Tyler",
      status: "awaiting-fulfillment",
      total: "$320.00",
    },
    {
      date: "Mar 15, 2024",
      id: "310009",
      name: "Dana Tyler",
      status: "refunded",
      total: "$320.00",
    },
        {
      date: "Mar 15, 2024",
      id: "310005",
      name: "Dana Tyler",
      status: "awaiting-fulfillment",
      total: "$320.00",
    },
    {
      date: "Mar 15, 2024",
      id: "310006",
      name: "Dana Tyler",
      status: "awaiting-fulfillment",
      total: "$320.00",
    },
    {
      date: "Mar 15, 2024",
      id: "310007",
      name: "Dana Tyler",
      status: "cancelled",
      total: "$320.00",
    },
    {
      date: "Mar 15, 2024",
      id: "310008",
      name: "Dana Tyler",
      status: "awaiting-fulfillment",
      total: "$320.00",
    },
    {
      date: "Mar 15, 2024",
      id: "310009",
      name: "Dana Tyler",
      status: "refunded",
      total: "$320.00",
    },
  ];
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState("20");

  // Assuming you fetched totalPages from backend
  const totalPages = 21;

  return (
    <div className=" bg-[var(--store-bg)] min-h-screen mt-20">
      {/* Tabs */}
      <div className="flex space-x-5 border-b pb-2 mb-4 overflow-x-auto">
        {tabs.map((tab, index) => (
          <button
            key={index}
            className={`!text-2xl pb-1 border-b-2 whitespace-nowrap ${
              index === 0
                ? "border-blue-600 text-blue-600 font-semibold"
                : "border-transparent text-gray-500 hover:text-black"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Top Actions */}
      <div className="bg-white p-4 shadow-sm">
        <div className="flex flex-wrap gap-3 items-center mb-1">
          <button className="btn-primary">Add</button>
          <button className="btn-primary">Export all</button>

          <Select>
            <SelectTrigger className="w-[200px] p-6 ">
              <SelectValue placeholder="Choose an action" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="cancel">Cancel Orders</SelectItem>
              <SelectItem value="mark">Mark as Fulfilled</SelectItem>
            </SelectContent>
          </Select>

          <button className="btn-primary">Confirm</button>

          <Input
            placeholder="Filter by keyword"
            className="w-[200px] border-2 !text-xl"
          />
          <button className="btn-primary">Search</button>
        </div>
        {/* Pagination */}
        <div className="flex items-center justify-end ">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            perPage={perPage}
            onPerPageChange={setPerPage}
          />
        </div>

        {/* Table */}
        <div className="overflow-x-auto  rounded-md shadow">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[50px]">
                  <input type="checkbox" />
                </TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Order ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {orders.map((order, idx) => (
                <TableRow key={idx}>
                  <TableCell>
                    <input type="checkbox" />
                  </TableCell>
                  <TableCell>{order.date}</TableCell>
                  <TableCell className="text-blue-600">{order.id}</TableCell>
                  <TableCell>{order.name}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {(() => {
                        const currentStatus = statusOptions.find(
                          (option) => option.value === order.status
                        );

                        return (
                          <>
                            <span
                              className={`w-6 h-6 inline-block rounded-sm ${
                                currentStatus?.color || "bg-gray-300"
                              }`}
                            />
                            <Select defaultValue={order.status}>
                              <SelectTrigger className="w-[160px] h-8 p-6">
                                <SelectValue placeholder="Status" />
                              </SelectTrigger>
                              <SelectContent>
                                {statusOptions.map((option) => (
                                  <SelectItem
                                    key={option.value}
                                    value={option.value}
                                  >
                                    {option.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </>
                        );
                      })()}
                    </div>
                  </TableCell>

                  <TableCell>{order.total}</TableCell>
                  <TableCell>
                    <Button variant="ghost" size="icon">
                      •••
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-end text-sm bg-[#fbfbfc]">
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
  );
};

export default AllOrders;

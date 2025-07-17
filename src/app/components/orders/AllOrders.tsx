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
import OrderActionsDropdown from "./OrderActionsDropdown";
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
      <div className="flex space-x-7 border-b pb-2 mb-4 overflow-x-auto">
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
          <button className="btn-outline-primary">Add</button>
          <button className="btn-outline-primary">Export all</button>

          <Select>
            <SelectTrigger className="w-fit p-6">
              <SelectValue placeholder="Choose an action" />
            </SelectTrigger>

            <SelectContent>
              {/* Static actions */}
              <SelectItem
                value="printMultiOrderInvoices"
                data-action="print_invoice"
              >
                Print invoices for selected
              </SelectItem>
              <SelectItem
                value="printOrderPackingSlips"
                data-action="print_packing_slip"
              >
                Print packing slips for selected
              </SelectItem>
              <SelectItem
                value="resendOrderInvoices"
                data-action="send_invoice"
              >
                Resend invoices for selected
              </SelectItem>
              <SelectItem value="bulkCapture" data-action="capture_funds">
                Capture funds for selected
              </SelectItem>
              <SelectItem value="startExport" data-action="export">
                Export selected
              </SelectItem>
              <SelectItem value="deleteOrders" data-action="archive">
                Archive selected
              </SelectItem>

              {/* Divider for optgroup */}
              <div className="px-2 pt-2 pb-1 my-3 text-2xl font-semibold text-muted-foreground">
                Update status for selected to:
              </div>

              {/* Status update options */}
              <SelectItem value="updateMultiOrderStatus:1" data-status-id="1">
                Pending
              </SelectItem>
              <SelectItem value="updateMultiOrderStatus:7" data-status-id="7">
                Awaiting Payment
              </SelectItem>
              <SelectItem value="updateMultiOrderStatus:11" data-status-id="11">
                Awaiting Fulfillment
              </SelectItem>
              <SelectItem value="updateMultiOrderStatus:9" data-status-id="9">
                Awaiting Shipment
              </SelectItem>
              <SelectItem value="updateMultiOrderStatus:8" data-status-id="8">
                Awaiting Pickup
              </SelectItem>
              <SelectItem value="updateMultiOrderStatus:3" data-status-id="3">
                Partially Shipped
              </SelectItem>
              <SelectItem value="updateMultiOrderStatus:10" data-status-id="10">
                Completed
              </SelectItem>
              <SelectItem value="updateMultiOrderStatus:2" data-status-id="2">
                Shipped
              </SelectItem>
              <SelectItem value="updateMultiOrderStatus:5" data-status-id="5">
                Cancelled
              </SelectItem>
              <SelectItem value="updateMultiOrderStatus:6" data-status-id="6">
                Declined
              </SelectItem>
              <SelectItem value="updateMultiOrderStatus:4" data-status-id="4">
                Refunded
              </SelectItem>
              <SelectItem value="updateMultiOrderStatus:13" data-status-id="13">
                Disputed
              </SelectItem>
              <SelectItem value="updateMultiOrderStatus:12" data-status-id="12">
                Manual Verification Required
              </SelectItem>
              <SelectItem value="updateMultiOrderStatus:14" data-status-id="14">
                Partially Refunded
              </SelectItem>
            </SelectContent>
          </Select>

          <button className="btn-outline-primary">Confirm</button>

          <Input
            placeholder="Filter by keyword"
            className="w-[150px] border-2 border-blue-500 !text-xl p-6"
          />
          <button className="btn-outline-primary">Search</button>
        </div>
        {/* Pagination */}
        <div className="flex items-center justify-end my-2">
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
                              className={`w-7 h-7 inline-block rounded-sm ${
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
                    <OrderActionsDropdown />
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

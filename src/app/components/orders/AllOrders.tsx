"use client";
import { useEffect, useState } from "react";
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
import { Checkbox } from "@/components/ui/checkbox";
import { useAppDispatch, useAppSelector } from "@/hooks/useReduxHooks";
import {
  fetchAllOrders,
  updateOrderStatus,
  fetchOrderByKeyword,
} from "@/redux/slices/orderSlice";
import { refetchOrders } from "@/lib/orderUtils";
import { FaCirclePlus, FaCircleMinus } from "react-icons/fa6";
import {
  Globe,
  Phone,
  Mail,
  Clock,
  Calendar,
  LocationEdit,
  DollarSign,
} from "lucide-react";

import Spinner from "../loader/Spinner";
import Link from "next/link";
const AllOrders = () => {
  const dispatch = useAppDispatch();
  const orders = useAppSelector((state: any) => state.order.orders);
  const pagination = orders?.pagination;
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState("50");
  const total = pagination?.total;
  const totalPages = pagination?.totalPages;
  const [expandedRow, setExpandedRow] = useState<number | null>(null);

  const toggleRow = (id: number) => {
    setExpandedRow((prev) => (prev === id ? null : id));
  };

  console.log("Orders Pagination: ", pagination);

  const { loading, error } = useAppSelector((state) => state.order);
  console.log("Orders data from frontend: ", orders);

  const [activeTab, setActiveTab] = useState("All orders");

  const filteredOrders = orders?.data?.filter((order: any) => {
    if (activeTab === "All orders") return true;
    return order.status === activeTab;
  });
  console.log("Filtered Orders: ", filteredOrders);
  const tabs = [
    "All orders",
    "Awaiting Payment",
    "Awaiting Fulfillment",
    "Awaiting Shipment",
    "High Risk",
    "Pre-orders",
    "Refunded",
    "Shipped",
    "Incomplete",
    "Archived",
    "Custom views",
  ];

  const [selectedOrderIds, setSelectedOrderIds] = useState<number[]>([]);

  // Handle single row checkbox change
  const handleOrderCheckboxChange = (order: any, checked: boolean) => {
    if (checked) {
      setSelectedOrderIds((prev) => [...prev, order.id]);
      console.log("Selected Order:", order);
    } else {
      setSelectedOrderIds((prev) => prev.filter((id) => id !== order.id));
      console.log("Unselected Order ID:", order.id);
    }
  };

  // Handle "Select All" checkbox
  const handleSelectAllChange = (checked: boolean, orders: any[]) => {
    if (checked) {
      const allOrders = orders.map((order) => order);
      setSelectedOrderIds(allOrders);
      console.log("Selected All Orders", allOrders);
    } else {
      setSelectedOrderIds([]);
      console.log("Deselected All");
    }
  };

  const statusOptions = [
    { label: "Pending", value: "Pending", color: "bg-gray-400" },
    {
      label: "Awaiting Payment",
      value: "Awaiting Payment",
      color: "bg-orange-400",
    },
    {
      label: "Awaiting Fulfillment",
      value: "Awaiting Fulfillment",
      color: "bg-blue-300",
    },
    {
      label: "Awaiting Shipment",
      value: "Awaiting Shipment",
      color: "bg-blue-500",
    },
    {
      label: "Awaiting Pickup",
      value: "Awaiting Pickup",
      color: "bg-blue-600",
    },
    {
      label: "Partially Shipped",
      value: "Partially Shipped",
      color: "bg-teal-400",
    },
    { label: "Completed", value: "Completed", color: "bg-green-600" },
    { label: "Shipped", value: "Shipped", color: "bg-lime-500" },
    { label: "Cancelled", value: "Cancelled", color: "bg-black" },
    { label: "Declined", value: "Declined", color: "bg-red-600" },
    { label: "Refunded", value: "Refunded", color: "bg-yellow-400" },
    { label: "Disputed", value: "Disputed", color: "bg-pink-600" },
    {
      label: "Manual Verification Required",
      value: "Manual Verification Required",
      color: "bg-purple-400",
    },
    {
      label: "Partially Refunded",
      value: "Partially Refunded",
      color: "bg-yellow-300",
    },
  ];

  const handlePrintInvoice = () => {
    console.log("Printing invoice...");
  };

  const handleRefund = () => {
    console.log("Processing refund...");
  };

  const orderActions = [
    { label: "Edit order", onClick: () => console.log("Edit order clicked") },
    { label: "Print invoice", onClick: handlePrintInvoice },
    { label: "Print packing slip" },
    { label: "Resend invoice" },
    { label: "View notes" },
    { label: "View shipments" },
    { label: "Refund", onClick: handleRefund },
    { label: "View order timeline" },
  ];

  const copyBilling = () => {
    console.log("Copied");
  };

  // SEARCH ORDER LOGIC

  const [keyword, setKeyword] = useState("");

  const filterHandler = async () => {
    console.log("Keyword: ", keyword);
    try {
      const resultAction = await dispatch(
        fetchOrderByKeyword({
          page: currentPage,
          perPage: perPage,
          keyword: keyword,
        })
      );
      if (fetchOrderByKeyword.fulfilled.match(resultAction)) {
        console.log(`✅ Fetch Order Result`);
        // setKeyword("");
      } else {
        console.error("❌ Error fetching Order");
      }
    } catch (err) {
      console.error("🚨 Unexpected error updating", err);
    }
  };

  useEffect(() => {
    dispatch(fetchAllOrders({ page: currentPage, perPage }));
  }, [dispatch, currentPage, perPage]);


    if (error) {
    return (
      <div className="text-center py-10 text-red-500 text-lg">
        Error: {error}
      </div>
    );
  }
  return (
    <div className=" bg-[var(--store-bg)] min-h-screen mt-20">
      {/* Tabs */}
      <div className="flex space-x-6 border-b pb-2 mb-4 overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={`!text-2xl pb-1 border-b-2 whitespace-nowrap ${
              activeTab === tab
                ? "border-blue-600 text-blue-600 font-semibold"
                : "border-transparent text-gray-500 hover:text-black"
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Top Actions */}
      <div className="bg-white p-4 shadow-sm">
        <div className="flex flex-wrap gap-3 items-center mb-1">
          <Link href={"/manage/orders/add"}>
            <button className="btn-outline-primary">Add</button>
          </Link>
          <Link href={"/manage/orders/export"}>
            <button className="btn-outline-primary">Export all</button>
          </Link>

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
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
          <button className="btn-outline-primary" onClick={filterHandler}>
            Search
          </button>
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
                  <Checkbox
                    checked={
                      filteredOrders?.length > 0 &&
                      filteredOrders?.every((order: any) =>
                        selectedOrderIds.includes(order.id)
                      )
                    }
                    onCheckedChange={(checked) =>
                      handleSelectAllChange(checked as boolean, filteredOrders)
                    }
                  />
                </TableHead>
                <TableHead></TableHead>

                <TableHead>Date</TableHead>
                <TableHead>Order ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={10} className="text-center py-10">
                    <Spinner />
                  </TableCell>
                </TableRow>
              ) : filteredOrders?.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={10}
                    className="text-center py-10 text-gray-500 text-xl"
                  >
                    No orders found.
                  </TableCell>
                </TableRow>
              ) : (
                filteredOrders?.map((order: any, idx: number) => (
                  <>
                    <TableRow key={idx}>
                      <TableCell>
                        <Checkbox
                          checked={selectedOrderIds.includes(order.id)}
                          onCheckedChange={(checked) =>
                            handleOrderCheckboxChange(order, checked as boolean)
                          }
                        />
                      </TableCell>

                      <TableCell>
                        <button onClick={() => toggleRow(order.id)}>
                          {expandedRow === order.id ? (
                            <FaCircleMinus className="h-7 w-7 fill-gray-600" />
                          ) : (
                            <FaCirclePlus className="h-7 w-7 fill-gray-600" />
                          )}
                        </button>
                      </TableCell>

                      <TableCell>
                        {new Date(order.createdAt).toLocaleDateString("en-GB", {
                          day: "2-digit",
                          month: "short", // or "long" for full month name
                          year: "numeric",
                        })}
                      </TableCell>

                      <TableCell className="text-blue-600">
                        {order.id}
                      </TableCell>
                      <TableCell>{order.name}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {(() => {
                            const normalizedStatus = order.status;

                            const currentStatus = statusOptions.find(
                              (option) => option.value === normalizedStatus
                            );

                            return (
                              <>
                                <span
                                  className={`w-7 h-9 inline-block rounded-sm ${
                                    currentStatus?.color || "bg-gray-300"
                                  }`}
                                />
                                <Select
                                  defaultValue={normalizedStatus}
                                  onValueChange={(newStatus) => {
                                    dispatch(
                                      updateOrderStatus({
                                        id: order.id,
                                        status: newStatus,
                                      })
                                    );
                                    setTimeout(() => {
                                      refetchOrders(dispatch);
                                    }, 700);
                                  }}
                                >
                                  <SelectTrigger className="w-[200px] h-8 p-6">
                                    <SelectValue>
                                      {currentStatus?.label || "Status"}
                                    </SelectValue>
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

                      <TableCell>
                        {new Intl.NumberFormat("en-US", {
                          style: "currency",
                          currency: "USD",
                        }).format(Number(order.totalAmount))}
                      </TableCell>

                      <TableCell>
                        <OrderActionsDropdown
                          actions={orderActions}
                          trigger={
                            <Button
                              variant="ghost"
                              size="icon"
                              className="text-xl cursor-pointer"
                            >
                              •••
                            </Button>
                          }
                        />
                      </TableCell>
                    </TableRow>

                    {expandedRow === order.id && (
                      <TableRow>
                        <TableCell colSpan={11}>
                          <div className="grid grid-cols-3 gap-4 bg-gray-50 p-4 ">
                            <div className="flex">
                              <div className="flex flex-col border-r pr-3 mr-3 space-y-1">
                                <h4 className="font-semibold">Billing</h4>
                                <button
                                  className="!px-2 !py-1 text-blue-500 border-blue-400 border text-base"
                                  onClick={copyBilling}
                                >
                                  Copy
                                </button>
                                <div className="flex flex-col gap-3">
                                  <span className="ml-4">
                                    <Globe className="w-6 h-6 text-gray-500" />
                                  </span>
                                  <span>
                                    <Phone className="w-6 h-6 text-gray-500 ml-4" />
                                  </span>
                                  <span>
                                    <Mail className="w-6 h-6 text-gray-500 ml-4" />
                                  </span>
                                  <span>
                                    <Clock className="w-6 h-6 text-gray-500 ml-4" />
                                  </span>
                                </div>
                              </div>

                              <div className="flex flex-col space-y-1">
                                <p>
                                  {order.name}
                                  <br />
                                  {order.address}
                                </p>
                                <p>{order?.country || "N/A"}</p>
                                <p>{order?.phone || "N/A"}</p>
                                <p>{order.email || "N/A"}</p>
                                <p>{order.updatedAt}</p>
                              </div>
                            </div>

                            <div className="flex">
                              <div className="flex flex-col border-r pr-3 mr-3 space-y-1">
                                <h4 className="font-semibold">Shipping</h4>
                                <button
                                  className="!px-2 !py-1 text-blue-500 border-blue-400 border text-base"
                                  onClick={copyBilling}
                                >
                                  Copy
                                </button>
                                <h4 className="font-semibold">Method</h4>
                                <div className="flex flex-col gap-2.5 ">
                                  <span className="ml-4">
                                    <LocationEdit className="w-6 h-6 text-gray-500 " />
                                  </span>
                                  <span>
                                    <DollarSign className="w-6 h-6 text-gray-500 ml-4" />
                                  </span>

                                  <span>
                                    <Mail className="w-6 h-6 text-gray-500 ml-4" />
                                  </span>
                                  <span>
                                    <Calendar className="w-6 h-6 text-gray-500 ml-4" />
                                  </span>

                                  <h4 className="font-semibold">Contact</h4>
                                  <span>
                                    <Phone className="w-6 h-6 text-gray-500 ml-4" />
                                  </span>
                                  <span>
                                    <Mail className="w-6 h-6 text-gray-500 ml-4" />
                                  </span>
                                </div>
                              </div>

                              <div className="flex flex-col space-y-1">
                                <p>
                                  {order.name}
                                  <br />
                                  {order.address}
                                </p>
                                <p>{order?.shippingMethod || "N/A"}</p>
                                <p>{"Default location"}</p>
                                <p>{order.shippingCost || "N/A"}</p>
                                <p>{"N/A"}</p>
                                <p>{order.updatedAt}</p>

                                <p>{order.name}</p>
                                <p>{order.phone}</p>
                                <p>{order.email}</p>
                              </div>
                            </div>
                            <div className="flex flex-wrap max-w-full ">
                              {/* Left - Item count */}
                              <div className="flex flex-col border-r pr-3 mr-3 min-w-[100px]">
                                <h4 className="whitespace-nowrap">
                                  {order.items.length} items
                                </h4>
                              </div>

                              {/* Right - Details */}
                              <div className="flex flex-col flex-1 min-w-0">
                                {/* Product list */}
                                <div className="p-4 border-b space-y-4">
                                  {order.items.map(
                                    (item: any, index: number) => (
                                      <div
                                        key={index}
                                        className="flex justify-between gap-4 flex-wrap"
                                      >
                                        <div className="text-base leading-5 break-words  min-w-0 overflow-hidden">
                                          <p className="font-semibold">
                                            {item.quantity} x{" "}
                                            <span className="text-blue-600 hover:underline whitespace-normal break-words leading-snug max-w-[300px]">
                                              {item.product?.name}
                                            </span>
                                          </p>
                                          <p className="text-xs text-gray-500">
                                            {item.product?.optionSet?.title}
                                          </p>
                                          <p className="text-sm mt-1">
                                            <strong>Model:</strong>{" "}
                                            {item.product?.sku}
                                            <br />
                                            <strong>Brand:</strong>{" "}
                                            {item.product?.brand || "N/A"}
                                          </p>
                                        </div>

                                        {/* <div className="text-sm font-medium whitespace-nowrap">
                                          £
                                          {(item.price * item.quantity).toFixed(
                                            2
                                          )}
                                        </div> */}
                                      </div>
                                    )
                                  )}

                                  <button className="flex items-center mt-4 px-3 py-1.5 text-base font-semibold border border-blue-500 text-blue-600 hover:bg-blue-50 rounded w-fit">
                                    <svg
                                      className="w-4 h-4 mr-2"
                                      fill="none"
                                      stroke="currentColor"
                                      strokeWidth="2"
                                      viewBox="0 0 24 24"
                                    >
                                      <path d="M3 3h2l.4 2M7 13h14l-1.5 8H6L4.5 5H20"></path>
                                    </svg>
                                    Ship Items
                                  </button>
                                </div>

                                {/* Totals */}
                                <div className="bg-gray-100 p-4 text-sm space-y-2">
                                  <div className="flex justify-between">
                                    <span>Subtotal</span>
                                    <span>
                                      £
                                      {order.items
                                        .reduce(
                                          (acc: number, item: any) =>
                                            acc + item.price * item.quantity,
                                          0
                                        )
                                        .toFixed(2)}
                                    </span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span>Shipping</span>
                                    <span>
                                      £
                                      {Number(order.shippingCost || 0).toFixed(
                                        2
                                      )}
                                    </span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span>VAT / TAX</span>
                                    <span>
                                      £{Number(order.tax || 0).toFixed(2)}
                                    </span>
                                  </div>
                                  <div className="flex justify-between font-semibold text-base pt-2 border-t">
                                    <span>GRAND TOTAL</span>
                                    <span>
                                      £{Number(order.totalAmount).toFixed(2)}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </TableCell>
                      </TableRow>
                    )}
                  </>
                ))
              )}
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

"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { IoSearchOutline } from "react-icons/io5";
import { Plus, Filter, ListFilter, Pencil, Trash2 } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MdDelete } from "react-icons/md";
import { FaCircleMinus, FaCirclePlus } from "react-icons/fa6";
import { useAppSelector, useAppDispatch } from "@/hooks/useReduxHooks";
import { getReturnOrders } from "@/redux/slices/orderSlice";
import Spinner from "../../loader/Spinner";
const ManageOrders = () => {
  const [selectedTab, setSelectedTab] = useState("All returns");
  const [searchTerm, setSearchTerm] = useState("");
  const [isAllSelected, setIsAllSelected] = useState(false);
  const [expandedRow, setExpandedRow] = useState<number | null>(null);
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [staffNotes, setStaffNotes] = useState<{ [key: number]: string }>({});

  const { returnOrders, returnLoader } = useAppSelector(
    (state: any) => state.order
  );
  console.log("Return Orders: ", returnOrders);

  const filterTabs = ["All returns",
    
  ];
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getReturnOrders());
  }, [dispatch]);

  // Filter returns based on search term
  const filteredReturns =
    returnOrders?.data?.filter((ret: any) => {
      const searchLower = searchTerm.toLowerCase();
      const productNames = ret.product
        ?.map((p: any) => p.name?.toLowerCase())
        .join(" ");
      return (
        ret.orderNumber?.toLowerCase().includes(searchLower) ||
        ret.customerName?.toLowerCase().includes(searchLower) ||
        ret.reason?.toLowerCase().includes(searchLower) ||
        ret.status?.toLowerCase().includes(searchLower) ||
        productNames?.includes(searchLower)
      );
    }) || [];

  const toggleRow = (id: number) => {
    setExpandedRow(expandedRow === id ? null : id);
  };

  // Handle individual checkbox
  const handleRowSelect = (id: number) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]
    );
  };

  // Handle select all
  const handleSelectAll = () => {
    if (isAllSelected) {
      setSelectedRows([]);
      setIsAllSelected(false);
    } else {
      setSelectedRows(filteredReturns.map((ret: any) => ret.id));
      setIsAllSelected(true);
    }
  };

  // Update select all state when filtered returns change
  useEffect(() => {
    if (selectedRows.length === filteredReturns.length && filteredReturns.length > 0) {
      setIsAllSelected(true);
    } else {
      setIsAllSelected(false);
    }
  }, [selectedRows, filteredReturns]);

  // Handle status change
  const handleStatusChange = (id: number, newStatus: string) => {
    // TODO: Dispatch action to update status in backend
    console.log(`Updating return ${id} to status: ${newStatus}`);
    // dispatch(updateReturnStatus({ id, status: newStatus }));
  };

  // Handle delete selected
  const handleDeleteSelected = () => {
    if (selectedRows.length === 0) {
      alert("Please select at least one return to delete");
      return;
    }
    const confirmDelete = window.confirm(
      `Are you sure you want to delete ${selectedRows.length} return(s)?`
    );
    if (confirmDelete) {
      console.log("Deleting returns:", selectedRows);
      // TODO: Dispatch action to delete selected returns
      // dispatch(deleteReturnOrders(selectedRows));
      setSelectedRows([]);
    }
  };

  // Handle staff notes update
  const handleUpdateStaffNote = (returnId: number) => {
    const note = staffNotes[returnId] || "";
    console.log(`Updating staff note for return ${returnId}:`, note);
    // TODO: Dispatch action to update staff note
    // dispatch(updateStaffNote({ returnId, note }));
  };

  // Format date
  const formatDate = (dateString: string) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  };

  // Get product names with quantities
  const getProductNames = (products: any[]) => {
    if (!products || products.length === 0) return "No products";
    return products
      .map((product, index) => `${products.length > 1 ? `${index + 1} x ` : ""}${product.name}`)
      .join(", ");
  };

  // Get short product name for display
  const getShortProductName = (products: any[]) => {
    if (!products || products.length === 0) return "No products";
    if (products.length === 1) {
      return `1 x ${products[0].name}`;
    }
    return `${products.length} items`;
  };

  if (returnLoader) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="!text-5xl !font-extralight !text-gray-600 !my-5">
          View Return Requests
        </h1>
      </div>

      <div className="bg-white p-4 shadow-md">
        {/* Tabs */}
        <div className="flex gap-5 mb-4 border-b border-gray-300">
          {filterTabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setSelectedTab(tab)}
              className={`!text-2xl px-5 py-2 -mb-1 transition ${
                selectedTab === tab
                  ? "border-b-4 border-blue-600"
                  : "text-gray-600"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Top controls */}
        <div className="flex justify-start gap-10 items-center mb-5 w-full">
          <div className="flex justify-start gap-10 items-center">
            {/* Delete icon */}
            <div
              onClick={handleDeleteSelected}
              className="
                cursor-pointer 
                p-2 
                rounded-md 
                bg-white 
                border border-[#6F8DFD]
                transition 
                hover:bg-[#6F8DFD]/10
                flex items-center justify-center
              "
            >
              <MdDelete className="h-7 w-7" color="#6F8DFD" />
            </div>

            {/* Filter input with icon + Filter text button */}
            <div className="flex items-center bg-white border border-gray-200 rounded-md max-w-full focus-within:ring-3 focus-within:ring-blue-200 focus-within:border-blue-200">
              <input
                type="text"
                placeholder="Filter by Keyword"
                className="flex-1 bg-transparent !text-2xl !font-medium outline-none placeholder:text-gray-400 px-4 py-3"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />

              <button
                type="button"
                className="flex items-center gap-1 border border-[#6F8DFD] px-4 py-2 !h-[34.98px] text-[#6F8DFD] text-xl font-medium cursor-pointer"
              >
                <ListFilter size={20} color="#6F8DFD" />
                Filter
              </button>
            </div>
          </div>

          {/* Advance Search button */}
          <Link href={"/manage/orders/view-returns"}>
            <button className="btn-outline-primary flex justify-start gap-1 items-center !text-xl">
              Advance Search
            </button>
          </Link>
        </div>

        {/* Show message if no returns */}
        {!returnOrders?.data || returnOrders.data.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-gray-500 text-xl">No return requests found</p>
          </div>
        ) : filteredReturns.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-gray-500 text-xl">
              No returns match your search
            </p>
          </div>
        ) : (
          <Table>
            <TableHeader className="h-18">
              <TableRow>
                <TableHead className="w-[50px]">
                  <Checkbox
                    checked={isAllSelected}
                    onCheckedChange={handleSelectAll}
                  />
                </TableHead>
                <TableHead> </TableHead>
                <TableHead>Return ID</TableHead>
                <TableHead>Returned Item</TableHead>
                <TableHead>Order #</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredReturns.map((ret: any) => (
                <React.Fragment key={ret.id}>
                  {/* Main Row */}
                  <TableRow>
                    <TableCell>
                      <Checkbox
                        checked={selectedRows.includes(ret.id)}
                        onCheckedChange={() => handleRowSelect(ret.id)}
                      />
                    </TableCell>
                    <TableCell>
                      <button onClick={() => toggleRow(ret.id)}>
                        {expandedRow === ret.id ? (
                          <FaCircleMinus className="h-7 w-7 fill-gray-600" />
                        ) : (
                          <FaCirclePlus className="h-7 w-7 fill-gray-600" />
                        )}
                      </button>
                    </TableCell>
                    <TableCell className="2xl:!text-2xl">
                      RET-{ret.id.toString().padStart(3, "0")}
                    </TableCell>
                    <TableCell className="text-[#6F8DFD] 2xl:!text-2xl">
                      {getShortProductName(ret.product)}
                    </TableCell>
                    <TableCell className="text-[#6F8DFD] 2xl:!text-2xl">
                      {ret.orderNumber || "N/A"}
                    </TableCell>
                    <TableCell className="text-[#6F8DFD] 2xl:!text-2xl">
                      {ret.customerName || "Guest"}
                    </TableCell>
                    <TableCell className="2xl:!text-2xl">
                      {formatDate(ret.createdAt)}
                    </TableCell>
                    <TableCell>
                      <Select
                        value={ret.status}
                        onValueChange={(value) =>
                          handleStatusChange(ret.id, value)
                        }
                      >
                        <SelectTrigger className="w-[120px] !h-10 2xl:!text-2xl">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Pending">Pending</SelectItem>
                          <SelectItem value="Approved">Approved</SelectItem>
                          <SelectItem value="Rejected">Rejected</SelectItem>
                          <SelectItem value="Received">Received</SelectItem>
                          <SelectItem value="Refunded">Refunded</SelectItem>
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell>
                      {/* <Button variant="ghost" size="icon">
                        <Pencil className="!w-6 !h-6" />
                      </Button> */}
                    </TableCell>
                  </TableRow>

                  {/* Expanded Row Below */}
                  {expandedRow === ret.id && (
                    <TableRow>
                      <TableCell colSpan={9} className="bg-gray-50 p-6">
                        <div className="flex justify-between gap-10">
                          {/* Left Column - Return Details */}
                          <div className="flex-1 space-y-4">
                            <h2 className="!text-3xl font-semibold text-black mb-4">
                              Return Details
                            </h2>

                            <div className="flex items-center gap-2 w-2/4">
                              <label className="!text-xl text-black w-1/3">
                                Return Reason
                              </label>
                              <input
                                type="text"
                                value={ret.reason || "N/A"}
                                className="flex-1 border border-gray-300 rounded px-3 py-2 text-sm text-gray-700 bg-white"
                                disabled
                              />
                            </div>

                            <div className="flex items-center gap-2 w-2/4">
                              <label className="!text-xl text-black w-1/3">
                                Return Action
                              </label>
                              <input
                                type="text"
                                value={ret.returnAction || "N/A"}
                                className="flex-1 border border-gray-300 rounded px-3 py-2 text-sm text-gray-700 bg-white"
                                disabled
                              />
                            </div>

                            <div className="flex flex-col items-start gap-2 w-2/4">
                              <label className="!text-xl text-black w-1/4">
                                Customer Comments
                              </label>
                              <textarea
                                className="flex-1 border border-gray-300 rounded px-3 py-2 text-sm text-gray-700 bg-white resize-none"
                                rows={6}
                                disabled
                                value={
                                  ret.comments || "No comments provided"
                                }
                              />
                            </div>

                            {/* Product Details */}
                            <div className="mt-6">
                              <h3 className="!text-2xl font-semibold text-black mb-3">
                                Returned Products
                              </h3>
                              <div className="space-y-2">
                                {ret.product?.map((product: any, index: number) => (
                                  <div
                                    key={product.id}
                                    className="flex items-start gap-3 p-3 border border-gray-200 rounded"
                                  >
                                    {product?.image && product?.image[0] && (
                                      <Image
                                        src={product?.image[0].path || "/placeholder.png"}
                                        alt={product?.name}
                                        width={60}
                                        height={60}
                                        className="rounded object-cover"
                                      />
                                    )}
                                    <div className="flex-1">
                                      <p className="font-medium text-base ">
                                        {product.name.slice(0,60)}...
                                      </p>
                                      <p className="text-sm text-gray-600">
                                        SKU: {product.sku}
                                      </p>
                                      <p className="text-sm text-gray-600">
                                        Price: ${product.price}
                                      </p>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>

                          {/* Right Column - Staff Note */}
                          <div className="flex-1 space-y-4">
                            <h2 className="!text-3xl font-semibold text-black mb-6">
                              Staff Note
                            </h2>

                            <div className="w-[80%] flex flex-col space-y-2 items-start">
                              <textarea
                                className="w-full border border-gray-300 rounded px-3 py-2 text-sm text-gray-700 bg-white resize-none"
                                rows={8}
                                placeholder="Add staff notes here..."
                                value={staffNotes[ret.id] || ""}
                                onChange={(e) =>
                                  setStaffNotes({
                                    ...staffNotes,
                                    [ret.id]: e.target.value,
                                  })
                                }
                              />
                              <button
                                onClick={() => handleUpdateStaffNote(ret.id)}
                                className="px-4 py-2 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors self-end"
                              >
                                Update Notes
                              </button>
                            </div>
                          </div>
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                </React.Fragment>
              ))}
            </TableBody>
          </Table>
        )}
      </div>
    </div>
  );
};

export default ManageOrders;
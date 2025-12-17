"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { IoSearchOutline } from "react-icons/io5";
import { Plus, Filter,ListFilter , Pencil, Trash2 } from "lucide-react";
import Pagination from "@/components/ui/pagination";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MdDelete } from "react-icons/md";
import { FaCircleMinus, FaCirclePlus } from "react-icons/fa6";

const ManageOrders = () => {
  const [selectedTab, setSelectedTab] = useState("All returns");
  const [searchTerm, setSearchTerm] = useState("");
  const [isAllSelected, setIsAllSelected] = useState(false);
  const [expandedRow, setExpandedRow] = useState<number | null>(null);

  const filterTabs = ["All returns", "Custom view"];

  const staticReturns = [
    {
      id: 1,
      returnId: "RET-001",
      returnedItem: "1 x L18D3PG1 - Lenovo - 11.25V 41WH 3635 mAh Chromebook Battery",
      orderNumber: "Order #311084",
      customer: "Wahaj",
      date: "2025-12-17",
      status: "Pending",
    },
    {
      id: 2,
      returnId: "RET-002",
      returnedItem: "2 x Samsung SSD 1TB",
      orderNumber: "Order #311085",
      customer: "Ali",
      date: "2025-12-16",
      status: "Approved",
    },
    {
      id: 3,
      returnId: "RET-003",
      returnedItem: "1 x Apple MacBook Pro 14\"",
      orderNumber: "Order #311086",
      customer: "Sara",
      date: "2025-12-15",
      status: "Rejected",
    },
  ];

  const toggleRow = (id: number) => {
    setExpandedRow(expandedRow === id ? null : id);
  };


  return (
    <div className="p-6">
      {/* Header + Add button */}
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

        {/* Top controls: Delete icon, Filter input, Advance Search button */}

<div className="flex justify-start gap-10 items-center mb-5 w-full">

  {/* Delete icon instead of checkbox */}
  <div
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
  <div className="flex items-center bg-white border border-gray-200 rounded-md w-[20%] focus-within:ring-3 focus-within:ring-blue-200 focus-within:border-blue-200">
    <input
      type="text"
      placeholder="Filter by Keyword"
      className="flex-1 bg-transparent !text-2xl !font-medium outline-none placeholder:text-gray-400 px-4 py-3"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
    />

    {/* Icon + Filter text button */}
    <button
      type="button"
      className="flex items-center gap-1 border border-[#6F8DFD] px-4 py-2 !h-[34.98px] text-[#6F8DFD] text-xl font-medium cursor-pointer"
    >
      <ListFilter size={20} color="#6F8DFD" />
      Filter
    </button>
  </div>

  {/* Advance Search button */}
  <button className="btn-outline-primary flex justify-start gap-1 items-center !text-xl">
    Advance Search
  </button>

</div>


        <Table>
          <TableHeader className="h-18">
            <TableRow>
              <TableHead className="w-[50px]"><Checkbox checked={false} onCheckedChange={() => {}} /></TableHead>
                <TableHead> </TableHead>
              <TableHead className="">Return ID</TableHead>
              <TableHead>Returned Item</TableHead>
              <TableHead>Order #</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
     <TableBody>
  {staticReturns.map((ret) => (
    <React.Fragment key={ret.id}>
      {/* Main Row */}
      <TableRow>
        <TableCell>
          <Checkbox checked={false} onCheckedChange={() => {}} />
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
        <TableCell>{ret.returnId}</TableCell>
        <TableCell className="text-[#6F8DFD]">{ret.returnedItem}</TableCell>
        <TableCell className="text-[#6F8DFD]">{ret.orderNumber}</TableCell>
        <TableCell className="text-[#6F8DFD]">{ret.customer}</TableCell>
        <TableCell>{ret.date}</TableCell>
        <TableCell>
          <Select defaultValue={ret.status}>
            <SelectTrigger className="w-[120px] !h-10">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Pending">Pending</SelectItem>
              <SelectItem value="Approved">Approved</SelectItem>
              <SelectItem value="Rejected">Rejected</SelectItem>
            </SelectContent>
          </Select>
        </TableCell>
        <TableCell>
          <Button variant="ghost" size="icon">
            <Pencil className="!w-6 !h-6" />
          </Button>
        </TableCell>
      </TableRow>

      {/* Expanded Row Below */}
      {expandedRow === ret.id && (
                <TableRow>
                 <TableCell colSpan={9} className="bg-gray-50 p-6">
  <div className="flex justify-between gap-10">
    {/* Left Column - Return Details */}
   <div className="flex-1 space-y-4">
  <h2 className="!text-3xl font-semibold text-black mb-4">Return Details</h2>

  <div className="flex items-center gap-2 w-2/4">
    <label className="!text-xl text-black w-1/3">Return Reason</label>
    <input
      type="text"
      value="Received wrong product"
      className="flex-1 border border-gray-300 rounded px-3 py-2 text-sm text-gray-700 bg-white"
      disabled
    />
  </div>

  <div className="flex items-center gap-2 w-2/4">
    <label className="!text-xl text-black w-1/3">Return Action</label>
    <input
      type="text"
      value="Replacement"
      className="flex-1 border border-gray-300 rounded px-3 py-2 text-sm text-gray-700 bg-white"
      disabled
    />
  </div>

  <div className="flex items-start gap-2 w-2/4">
    <label className="!text-xl text-black w-1/3">Customer Comments</label>
    <textarea
      className="flex-1 border border-gray-300 rounded px-3 py-2 text-sm text-gray-700 bg-white resize-none"
      rows={6}
      disabled
      value={`Specifically researched for the battery shown in your advertisement. There are two versions of this battery on the market. The one in your picture is the version I was expecting. I received the more common version which is "mirrored". It can't "be flipped over" due that has different mounting points and contacts on power connection designed for metal down. Do you have the right version? I can provide a side by side picture.`}
    />
  </div>
</div>


    {/* Right Column - Staff Note */}
  <div className="flex-1 space-y-4">
  <h2 className="!text-3xl font-semibold text-black mb-6">Staff Note</h2>

  <div className="w-[80%] flex flex-col space-y-2 items-start">
    <textarea
      className="w-full border border-gray-300 rounded px-3 py-2 text-sm text-gray-700 bg-white resize-none"
      rows={8}
      placeholder="Add staff notes here..."
    />
    <button className="px-4 py-2 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors self-end">
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

        {/* Pagination */}
        {/* <div className="flex justify-end my-6">
          <Pagination
            currentPage={1}
            totalPages={1}
            onPageChange={() => {}}
            perPage={10}
            onPerPageChange={() => {}}
          />
        </div> */}
      </div>
    </div>
  );
};

export default ManageOrders;

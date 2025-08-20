"use client";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { PlusIcon, DownloadIcon, SearchIcon, Trash } from "lucide-react";
import React, { useState, useEffect } from "react";
import OrderActionsDropdown from "../../orders/OrderActionsDropdown";
import Pagination from "@/components/ui/pagination";
import { fetchCustomers } from "@/redux/slices/customerSlice";
import { useAppDispatch, useAppSelector } from "@/hooks/useReduxHooks";
const AllCustomers = () => {
  const dispatch = useAppDispatch();
  const { customers } = useAppSelector((state: any) => state.customer);

  console.log("AllCustomers From Frontend: ", customers);

  const pagination = customers.pagination;

  useEffect(() => {
    dispatch(fetchCustomers());
  }, [dispatch]);

  // const customers = [
  //   {
  //     name: "Stacy Clark",
  //     email: "stacy.clark@xylem.com",
  //     phone: "12244960842",
  //     joinDate: "19 hours ago",
  //   },
  //   {
  //     name: "jane malaise",
  //     email: "janembears68@yahoo.com",
  //     phone: "9795743063",
  //     joinDate: "21 hours ago",
  //   },
  //   {
  //     name: "Kathleen OMara",
  //     email: "katieomara63@gmail.com",
  //     phone: "6462390919",
  //     joinDate: "22 hours ago",
  //   },
  //   {
  //     name: "David Lebov",
  //     email: "davidl@sourcecode.com",
  //     phone: "781-367-9802",
  //     joinDate: "Tuesday at 04:28pm",
  //   },
  //   {
  //     name: "Tierney Becho",
  //     email: "tierney.becho@pnnl.gov",
  //     phone: "509-372-5920",
  //     joinDate: "Monday at 02:22pm",
  //   },
  //   {
  //     name: "Rena Prato",
  //     email: "dannyfr22@yahoo.com",
  //     phone: "2672962223",
  //     joinDate: "Jul 25th, 2025",
  //   },
  //   {
  //     name: "Elisabeth Koponick",
  //     email: "elisabeth.koponick@churchofjes...",
  //     phone: "484-653-9454",
  //     joinDate: "Jul 24th, 2025",
  //   },
  // ];

  const getDropdownActions = (customer: any) => [
    {
      label: "Edit",
      onClick: () => console.log("Edit clicked", customer),
    },
    {
      label: "View Orders",
      onClick: () => console.log("View Orders clicked", customer),
    },
    {
      label: "View Notes",
      onClick: () => console.log("View Notes", customer),
    },
    {
      label: "Login",
      onClick: () => console.log("Login clicked", customer),
    },
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState("50");
  const totalPages = 10;

  return (
    <div className="p-10">
      {/* Header */}
      <div className="mb-6">
        <h1 className=" !font-light">View customers</h1>
      </div>

      {/* Tabs */}
      <div className="flex gap-6 border-b mb-6">
        <button className="pb-2 text-xl font-medium border-b-2 border-blue-500">
          All customers
        </button>
        <button className="pb-2 text-xl font-medium text-gray-500">
          Custom views
        </button>
      </div>

      {/* Actions */}
      <div className="flex flex-wrap  gap-4 mb-6 items-center">
        <Button
          variant="outline"
          className="flex items-center gap-2 !p-6 btn-outline-primary"
        >
          <PlusIcon className="!w-5 !h-5" /> Add
        </Button>
        <Button
          variant="outline"
          className="flex items-center gap-2 !p-6 btn-outline-primary"
        >
          <Trash className="!w-5 !h-5" />
        </Button>
        <Button
          variant="outline"
          className="flex items-center gap-2 !p-6 btn-outline-primary"
        >
          <DownloadIcon className="!w-5 !h-5" /> Export all customers
        </Button>
        <Input placeholder="Filter by keyword" />
        <Button
          variant="default"
          className="flex items-center gap-2 !p-6 btn-outline-primary"
        >
          <SearchIcon className="!w-5 !h-5" /> Search
        </Button>
      </div>
      <div className="flex justify-end my-4">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          perPage={perPage}
          onPerPageChange={setPerPage}
        />
      </div>
      {/* Table */}
      <div className="bg-white shadow-md rounded-sm ">
        <Table>
          <TableHeader className="!bg-gray-50 ">
            <TableRow className="h-18">
              <TableHead>
                <Checkbox />
              </TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Group</TableHead>
              <TableHead>Store credit</TableHead>
              <TableHead>Orders</TableHead>
              <TableHead>Join date</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {customers?.data?.map((customer: any, index: number) => (
              <TableRow key={index} className="h-26 ">
                <TableCell>
                  <Checkbox />
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2 text-blue-600 cursor-pointer">
                    <PlusIcon className="!w-6 !h-6 !bg-blue-500  !rounded-full border !text-white" />
                    {customer.name}
                  </div>
                </TableCell>
                <TableCell className="text-blue-500">
                  {customer.email}
                </TableCell>
                <TableCell>{customer.phone}</TableCell>
                <TableCell>
                  <Select
                    value={customer.customer_group || "none"} // fallback to "none" if undefined
                    // onValueChange={(value) =>
                    //   updateField("customer_group", value)
                    // } // optional if editable
                  >
                    <SelectTrigger className="w-[120px]">
                      <SelectValue placeholder="No Group" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">-- No Group --</SelectItem>
                      <SelectItem value="vip">VIP</SelectItem>
                      <SelectItem value="retail">Retail</SelectItem>
                      <SelectItem value="wholesale">Wholesale</SelectItem>
                    </SelectContent>
                  </Select>
                </TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <span className="mr-1">$</span>
                    <Input
                      defaultValue="0.00"
                      value={customer?.store_credit}
                      className="w-20"
                    />
                    <Button className="ml-2 !h-12 !px-4  btn-primary">
                      Save
                    </Button>
                  </div>
                </TableCell>
                <TableCell>1</TableCell>
                <TableCell>{customer.created_at}</TableCell>
                <TableCell>
                  <OrderActionsDropdown
                    actions={getDropdownActions(customer)}
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
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="flex justify-end my-4">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          perPage={perPage}
          onPerPageChange={setPerPage}
        />
      </div>
    </div>
  );
};

export default AllCustomers;

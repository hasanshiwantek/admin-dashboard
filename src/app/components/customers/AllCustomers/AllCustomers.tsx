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
import { FaCirclePlus, FaCircleMinus } from "react-icons/fa6";
import {
  fetchCustomers,
  deleteCustomer,
  updateCustomer,
  fetchCustomerByKeyword,
} from "@/redux/slices/customerSlice";
import { useAppDispatch, useAppSelector } from "@/hooks/useReduxHooks";
import { refetchCustomers } from "@/lib/customerUtils";
import Link from "next/link";
import Spinner from "../../loader/Spinner";
import { useRouter } from "next/navigation";
const AllCustomers = () => {
  const dispatch = useAppDispatch();
  const { customers } = useAppSelector((state: any) => state.customer);
  const { loading, error } = useAppSelector((state: any) => state.customer);
  const router = useRouter();
  console.log("AllCustomers From Frontend: ", customers);
  const pagination = customers.pagination;
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState("50");
  const total = pagination?.total;
  const totalPages = Math.ceil(total / pagination?.pageSize);
  const [selectedCustomers, setSelectedCustomers] = useState<any[]>([]);
  const [storeCredits, setStoreCredits] = useState<{ [id: number]: string }>(
    {}
  );

  const getDropdownActions = (customer: any) => [
    {
      label: "Edit",
      onClick: () => router.push(`/manage/customers/edit/${customer.id}`),
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

  const handleSelectAll = () => {
    if (selectedCustomers.length === customers?.data?.length) {
      setSelectedCustomers([]);
      console.log("Deselected all");
    } else {
      setSelectedCustomers(customers?.data);
      console.log("Selected all customers:", customers?.data);
    }
  };

  const handleSelectOne = (customer: any) => {
    const isAlreadySelected = selectedCustomers.some(
      (c) => c.id === customer.id
    );

    const updated = isAlreadySelected
      ? selectedCustomers.filter((c) => c.id !== customer.id)
      : [...selectedCustomers, customer];

    setSelectedCustomers(updated);
    console.log("Updated selected customers:", updated);
  };

  const deleteCustomerHandler = async () => {
    if (!selectedCustomers || selectedCustomers.length === 0) {
      alert("No customers selected for deletion.");
      return;
    }
    const id = selectedCustomers?.map((c) => c?.id);
    const payload = { ids: id };
    console.log(payload);

    try {
      const result = await dispatch(deleteCustomer({ data: payload }));

      if (deleteCustomer.fulfilled.match(result)) {
        console.log("Customers deleted successfully");
        setSelectedCustomers([]);
        // optionally: refresh list or reset selection
      } else {
        console.error("Failed to delete customers:", result.payload);
      }
    } catch (err) {
      console.error("Error deleting customers:", err);
    }
  };

  const [expandedRow, setExpandedRow] = useState<number | null>(null);

  const toggleRow = (id: number) => {
    setExpandedRow((prev) => (prev === id ? null : id));
  };
  const copyBilling = () => {
    console.log("Copied");
  };

  // CUSTOMER UPDATION LOGIC
  const updateCustomerGroupStatus = async (
    customerId: number | string,
    group: string
  ) => {
    const payload = {
      customer_group: group === "none" ? null : group,
    };

    try {
      const result = await dispatch(
        updateCustomer({ id: customerId, data: payload })
      );

      if (updateCustomer.fulfilled.match(result)) {
        console.log(`✅ Customer #${customerId} group updated to "${group}"`);
        // Optionally show toast or refetch
        setTimeout(() => {
          refetchCustomers(dispatch);
        }, 800);
      } else {
        console.error("❌ Update failed:", result.payload);
      }
    } catch (error) {
      console.error("🚨 Unexpected error:", error);
    }
  };

  const updateCustomerStoreCredit = async (customerId: number) => {
    const value = storeCredits[customerId];

    if (!value || isNaN(Number(value))) {
      alert("Please enter a valid number for store credit");
      return;
    }

    const payload = {
      store_credit: value,
    };

    try {
      const result = await dispatch(
        updateCustomer({ id: customerId, data: payload })
      );

      if (updateCustomer.fulfilled.match(result)) {
        console.log(`✅ Store credit updated for customer #${customerId}`);
        // Optionally refetch or toast
        setTimeout(() => {
          refetchCustomers(dispatch);
        }, 800);
      } else {
        console.error("❌ Store credit update failed:", result.payload);
      }
    } catch (err) {
      console.error("🚨 Unexpected error updating store credit:", err);
    }
  };

  // SEARCH CUSTOMER LOGIC

  const [keyword, setKeyword] = useState("");

  const filterHandler = async () => {
    console.log("Keyword: ", keyword);
    try {
      const resultAction = await dispatch(
        fetchCustomerByKeyword({
          page: currentPage,
          pageSize: perPage,
          search: keyword,
        })
      );
      if (fetchCustomerByKeyword.fulfilled.match(resultAction)) {
        console.log(`✅ Fetch Search Customer Result`);
        // setKeyword("");
      } else {
        console.error("❌ Error fetching Customer");
      }
    } catch (err) {
      console.error("🚨 Unexpected error updating", err);
    }
  };

  useEffect(() => {
    dispatch(fetchCustomers({ page: currentPage, pageSize: perPage }));
  }, [dispatch, currentPage, perPage]);

  if (error) {
    return (
      <div className="text-center py-10 text-red-500 text-lg">
        Error: {error}
      </div>
    );
  }
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
        <Link href={"/manage/customers/add"}>
          <Button
            variant="outline"
            className="flex items-center gap-2 !p-6 btn-outline-primary"
          >
            <PlusIcon className="!w-5 !h-5" /> Add
          </Button>
        </Link>
        <Button
          variant="outline"
          className="flex items-center gap-2 !p-6 btn-outline-primary"
          onClick={deleteCustomerHandler}
        >
          <Trash className="!w-5 !h-5" />
        </Button>
        <Link href={"/manage/customers/export"}>
          <Button
            variant="outline"
            className="flex items-center gap-2 !p-6 btn-outline-primary"
          >
            <DownloadIcon className="!w-5 !h-5" /> Export all customers
          </Button>
        </Link>
        <Input
          placeholder="Filter by keyword"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
        <Button
          variant="default"
          className="flex items-center gap-2 !p-6 btn-outline-primary"
          onClick={filterHandler}
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
                <Checkbox
                  checked={selectedCustomers.length === customers?.data?.length}
                  onCheckedChange={handleSelectAll}
                />
              </TableHead>
              <TableHead></TableHead>
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
            {loading ? (
              <TableRow>
                <TableCell colSpan={10} className="text-center py-10">
                  <Spinner />
                </TableCell>
              </TableRow>
            ) : customers?.data?.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={10}
                  className="text-center py-10 text-gray-500 text-xl"
                >
                  No customers found.
                </TableCell>
              </TableRow>
            ) : (
              customers?.data?.map((customer: any, index: number) => (
                <>
                  <TableRow key={index} className="h-26 ">
                    <TableCell>
                      <Checkbox
                        checked={selectedCustomers.some(
                          (c) => c.id === customer.id
                        )}
                        onCheckedChange={() => handleSelectOne(customer)}
                      />
                    </TableCell>
                    <TableCell>
                      <button
                        onClick={() => toggleRow(customer.id)}
                        className="mt-3"
                      >
                        {expandedRow === customer.id ? (
                          <FaCircleMinus className="h-7 w-7 fill-blue-500" />
                        ) : (
                          <FaCirclePlus className="h-7 w-7 fill-blue-500" />
                        )}
                      </button>
                    </TableCell>
                    <TableCell>
                      <div className=" text-blue-600 cursor-pointer hover:underline">
                        <Link href={`/manage/customers/edit/${customer.id}`}>
                          {customer.firstName} {customer.lastName}
                        </Link>
                      </div>
                    </TableCell>

                    <TableCell className="text-blue-500">
                      {customer.email}
                    </TableCell>
                    <TableCell>{customer.phone}</TableCell>

                    <TableCell>
                      <Select
                        value={customer.customerGroup || "none"}
                        onValueChange={(value) =>
                          updateCustomerGroupStatus(customer.id, value)
                        }
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
                          className="w-25"
                          value={
                            storeCredits[customer.id] ??
                            customer.storeCredit ??
                            "0.00"
                          }
                          onChange={(e) =>
                            setStoreCredits((prev) => ({
                              ...prev,
                              [customer.id]: e.target.value,
                            }))
                          }
                        />
                        <Button
                          className="ml-2 !h-12 !px-4 btn-primary"
                          onClick={() => updateCustomerStoreCredit(customer.id)}
                        >
                          Save
                        </Button>
                      </div>
                    </TableCell>

                    <TableCell>1</TableCell>
                    <TableCell>{customer.createdAt}</TableCell>
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

                  {expandedRow === customer.id && (
                    <TableRow>
                      <TableCell colSpan={11}>
                        <div className="grid grid-cols-3 gap-2 bg-gray-50 p-4 ">
                          <div className="flex">
                            <div className="flex flex-col border-r pr-3 mr-3 space-y-1">
                              <h4 className="font-semibold">Current Orders</h4>
                            </div>
                          </div>

                          <div className="flex">
                            <div className="flex flex-col border-r pr-3 mr-3 space-y-1">
                              <h4 className="font-semibold">Order#500041</h4>
                              <div className="flex flex-col gap-2.5 ">
                                <span className="ml-4">Status</span>
                                <span>Order total</span>

                                <span>Date orderd</span>
                                <span>Notes</span>
                              </div>
                            </div>

                            <div className="flex flex-col space-y-1">
                              <p>.</p>
                              <p>Awaiting Payment</p>
                              <p>£1,461.00</p>
                              <p>Jul 17th, 2025</p>
                              <p>View Notes</p>
                            </div>
                          </div>

                          <div className="flex">
                            <div className="flex flex-col border-r pr-3 mr-3 space-y-1">
                              <div className="flex flex-col gap-2.5 ">
                                <h4 className="font-semibold">Past Orders</h4>
                              </div>
                            </div>

                            <div className="flex flex-col space-y-1">
                              <p>No past orders</p>
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

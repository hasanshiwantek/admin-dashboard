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
import React, { useState, useEffect, Fragment } from "react";
import OrderActionsDropdown from "../../orders/OrderActionsDropdown";
import Pagination from "@/components/ui/pagination";
import { FaCirclePlus, FaCircleMinus } from "react-icons/fa6";
import { useSearchParams } from "next/navigation";
import * as XLSX from "xlsx";
import {
  fetchCustomers,
  deleteCustomer,
  updateCustomer,
  fetchCustomerByKeyword,
  advanceCustomerSearch,
  loginAsCustomer,
} from "@/redux/slices/customerSlice";
import { useAppDispatch, useAppSelector } from "@/hooks/useReduxHooks";
import { refetchCustomers } from "@/lib/customerUtils";
import Link from "next/link";
import Spinner from "../../loader/Spinner";
import { useRouter } from "next/navigation";
import CustomerNotesModal from "../edit/CustomerNotesModal";
import { toast } from "react-toastify";

const AllCustomers = () => {
  const dispatch = useAppDispatch();
  const { customers } = useAppSelector((state: any) => state.customer);
  const { loading, error } = useAppSelector((state: any) => state.customer);
  const router = useRouter();
  const pagination = customers.pagination;
  // const [currentPage, setCurrentPage] = useState(1);
  // const [perPage, setPerPage] = useState("50");
  const total = pagination?.total;
  const totalPages = Math.ceil(total / pagination?.pageSize);
  const [selectedCustomers, setSelectedCustomers] = useState<any[]>([]);
  const [storeCredits, setStoreCredits] = useState<{ [id: number]: string }>(
    {}
  );
  const [showCustomerNotes, setShowCustomerNotes] = useState(false);
  const [selectedCustomerId, setSelectedCustomerId] = useState<number | null>(
    null
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
      onClick: () => {
        const customerId = customer?.id;
        setSelectedCustomerId(customerId);
        setShowCustomerNotes(true);
      },
    },
    {
      label: "Login",
      onClick: async () => {
        const customerId = customer?.id;
        const availableStores = JSON.parse(localStorage.getItem("availableStores") || "[]");
        const selectedStoreId = Number(localStorage.getItem("storeId"));
        const selectedStore = availableStores.find((s: any) => s.id === selectedStoreId);

        if (!selectedStore?.baseUrl) {
          toast.error("Store not found");
          return;
        }
        try {
          const res = await dispatch(loginAsCustomer({ customerId })).unwrap();

          const token = res?.token || res?.data?.token;


          console.log(token, selectedStore);

          if (token && selectedStore.baseUrl) {
            window.open(`${selectedStore.baseUrl}/?token=${token}`, "_blank");
          }
        } catch (err) {
          toast.error("Failed to login as customer");
        }
      }
    },
  ];

  const handleSelectAll = () => {
    if (selectedCustomers.length === customers?.data?.length) {
      setSelectedCustomers([]);
    } else {
      setSelectedCustomers(customers?.data);
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
  };

  const deleteCustomerHandler = async () => {
    if (!selectedCustomers || selectedCustomers.length === 0) {
      alert("No customers selected for deletion.");
      return;
    }
    const id = selectedCustomers?.map((c) => c?.id);
    const payload = { ids: id };
    const confirm = window.confirm("Delete Selected Customer");
    if (!confirm) {
      return;
    } else {
      try {
        const result = await dispatch(deleteCustomer({ data: payload }));

        if (deleteCustomer.fulfilled.match(result)) {
          setSelectedCustomers([]);
          // optionally: refresh list or reset selection
        } else {
          console.error("Failed to delete customers:", result.payload);
        }
      } catch (err) {
        console.error("Error deleting customers:", err);
      }
    }
  };

  const [expandedRow, setExpandedRow] = useState<number | null>(null);

  const toggleRow = (id: number) => {
    setExpandedRow((prev) => (prev === id ? null : id));
  };
  const copyBilling = () => {
  };

  // CUSTOMER UPDATION LOGIC
  const updateCustomerGroupStatus = async (
    customerId: number | string,
    group: string
  ) => {
    const payload = {
      customerGroup: group === "none" ? null : group,
    };

    try {
      const result = await dispatch(
        updateCustomer({ id: customerId, data: payload })
      );

      if (updateCustomer.fulfilled.match(result)) {
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
      storeCredit: value,
    };

    try {
      const result = await dispatch(
        updateCustomer({ id: customerId, data: payload })
      );

      if (updateCustomer.fulfilled.match(result)) {
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
    try {
      const resultAction = await dispatch(
        fetchCustomerByKeyword({
          page: currentPage,
          pageSize: perPage,
          search: keyword,
        })
      );
      if (fetchCustomerByKeyword.fulfilled.match(resultAction)) {
        // setKeyword("");
      } else {
        console.error("❌ Error fetching Customer");
      }
    } catch (err) {
      console.error("🚨 Unexpected error updating", err);
    }
  };

  // FETCH CUSTOMER LOGIC

  const searchParams = useSearchParams();

  const queryObject: Record<string, any> = {};
  searchParams.forEach((value, key) => {
    if (queryObject[key]) {
      queryObject[key] = [...queryObject[key], value];
    } else {
      queryObject[key] = value;
    }
  });

  const currentPage = Number(queryObject.page || 1);
  const perPage = Number(queryObject.limit || queryObject.pageSize || 50);
  useEffect(() => {
    const filterKeys = Object.keys(queryObject).filter(
      (key) => !["page", "limit", "pageSize"].includes(key)
    );

    if (filterKeys.length > 0) {
      dispatch(
        advanceCustomerSearch({
          data: {
            ...queryObject,
            page: currentPage,
            pageSize: perPage,
          },
        })
      );
    } else {
      dispatch(fetchCustomers({ page: currentPage, pageSize: perPage }));
    }
  }, [searchParams]);


  const handleExport = () => {
    if (!selectedCustomers.length) return
    const selectedCustomer = customers?.data?.filter((item: any) =>
      selectedCustomers?.some((selected: any) =>
        Number(selected?.id || selected) === Number(item?.id)
      )
    );
    const exportData = selectedCustomer.map((item: any) => ({
      ID: item?.id,
      "First Name": item?.firstName,
      "Last Name": item?.lastName,
      "Email": item?.email,
      "Phone": item?.phone,
      "Address": item?.addresses,
      "Company Name": item?.companyName,
      "Customer Group": item?.customerGroup,
      "Store Credit": item?.storeCredit,
      "Country": item?.country,
      "State": item?.state,
      "Tax Exempt Code": item?.taxExemptCode,
      "Force Password Reset": item?.forcePasswordReset ? 1 : "",
      "Receive Review Emails": item?.receiveReviewEmails ? 1 : "",
      "Created At": item?.createdAt,
      "Updated At": item?.updatedAt,
    }));

    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Products");
    XLSX.writeFile(workbook, "customer_export.xlsx");
  };
  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", page.toString());
    router.push(`?${params.toString()}`);
  };

  const handlePerPageChange = (limit: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", "1"); // Reset page on limit change
    params.set("limit", limit);
    router.push(`?${params.toString()}`);
  };

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
        <h1 className=" !font-light 2xl:!text-5xl">View customers</h1>
      </div>

      {/* Tabs */}
      <div className="flex gap-6 border-b mb-6">
        <button className="pb-2 text-xl font-medium border-b-2 border-blue-500 2xl:!text-2xl">
          All customers
        </button>
        <button className="pb-2 text-xl font-medium text-gray-500 hover:text-gray-700 2xl:!text-2xl">
          Custom views
        </button>
      </div>

      {/* Actions */}
      <div className="flex flex-wrap  gap-4 mb-6 items-center">
        <Link href={"/manage/customers/add"}>
          <Button
            variant="outline"
            className="flex items-center gap-2 !p-6 btn-outline-primary 2xl:!text-2xl"
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
        <Button
          onClick={handleExport}
          variant="outline"
          className="flex items-center gap-2 !p-6 btn-outline-primary 2xl:!text-2xl"
        >
          <DownloadIcon className="!w-5 !h-5" /> Export selected customers
        </Button>
        <Input
          placeholder="Filter by keyword"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
        <Button
          variant="default"
          className="flex items-center gap-2 !p-6 btn-outline-primary 2xl:!text-2xl"
          onClick={filterHandler}
        >
          <SearchIcon className="!w-5 !h-5" /> Search
        </Button>
      </div>
      <div className="flex justify-end my-4">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          perPage={perPage.toString()}
          onPerPageChange={handlePerPageChange}
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
              <TableHead className="2xl:!text-[1.6rem]">Name</TableHead>
              <TableHead className="2xl:!text-[1.6rem]">Email</TableHead>
              <TableHead className="2xl:!text-[1.6rem]">Phone</TableHead>
              <TableHead className="2xl:!text-[1.6rem]">Group</TableHead>
              <TableHead className="2xl:!text-[1.6rem]">Store credit</TableHead>
              <TableHead className="2xl:!text-[1.6rem]">Orders</TableHead>
              <TableHead className="2xl:!text-[1.6rem]">Join date</TableHead>
              <TableHead className="2xl:!text-[1.6rem]">Action</TableHead>
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
                <Fragment key={customer?.id}>
                  <TableRow key={customer?.id} className="h-26 ">
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
                        <Link className="2xl:!text-2xl" href={`/manage/customers/edit/${customer.id}`}>
                          {customer.firstName} {customer.lastName}
                        </Link>
                      </div>
                    </TableCell>

                    <TableCell className="text-blue-500 2xl:!text-2xl">
                      {customer.email}
                    </TableCell>
                    <TableCell className="2xl:!text-2xl">{customer.phone}</TableCell>

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
                        <span className="mr-1 2xl:!text-2xl">$</span>
                        <Input
                          className="w-25 2xl:!text-[1.6rem]"
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
                          className="ml-2 !h-12 !px-4 btn-primary 2xl:!text-2xl"
                          onClick={() => updateCustomerStoreCredit(customer.id)}
                        >
                          Save
                        </Button>
                      </div>
                    </TableCell>

                    <TableCell className="2xl:!text-2xl">{customer?.totalOrders}</TableCell>
                    <TableCell className="2xl:!text-2xl">
                      {new Date(customer?.joinDate).toLocaleString("en-US", {
                        dateStyle: "medium",
                        timeStyle: "short",
                      })}
                    </TableCell>

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
                        <div className="grid grid-cols-3 bg-gray-50 p-4">

                          {/* Current Orders Title */}
                          <div className="border-r pr-4">
                            <h4 className="font-semibold text-lg">
                              Current Orders
                            </h4>
                          </div>

                          {/* Current Order Details */}
                          <div className="border-r px-4">
                            {customer?.currentOrders?.length > 0 ? (
                              customer.currentOrders.map((order: any) => (
                                <div key={order.id} className="mb-4">
                                  <h4 className="font-semibold text-blue-600">
                                    Order #{order.orderNumber}
                                  </h4>

                                  <div className="grid grid-cols-[120px_1fr] gap-y-2 mt-2">
                                    <span>Status</span>
                                    <span>{order.status}</span>

                                    <span>Order total</span>
                                    <span>${order.totalAmount}</span>

                                    <span>Date ordered</span>
                                    <span>
                                      {new Date(order.createdAt).toLocaleDateString()}
                                    </span>

                                    <span>Notes</span>
                                    <span onClick={() => {
                                      setSelectedCustomerId(customer?.id);
                                      setShowCustomerNotes(true);
                                    }} className="text-blue-600 cursor-pointer">
                                      View Notes
                                    </span>
                                  </div>
                                </div>
                              ))
                            ) : (
                              <p>No current orders</p>
                            )}
                          </div>

                          {/* Past Orders */}
                          <div className="px-4">
                            <h4 className="font-semibold text-lg mb-3">
                              Past Orders
                            </h4>

                            {customer?.pastOrders?.length > 0 ? (
                              customer.pastOrders.map((order: any) => (
                                <div key={order.id} className="mb-2">
                                  <div className="flex items-center gap-2">
                                    <span className="text-blue-600">
                                      Order #{order.orderNumber}
                                    </span>

                                    <span onClick={() => {
                                      setSelectedCustomerId(customer?.id);
                                      setShowCustomerNotes(true);
                                    }} className="text-blue-600 cursor-pointer">
                                      View Notes
                                    </span>
                                  </div>
                                </div>
                              ))
                            ) : (
                              <p>No past orders</p>
                            )}
                          </div>
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                </Fragment>
              ))
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex justify-end my-4">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          perPage={perPage.toString()}
          onPerPageChange={handlePerPageChange}
        />
      </div>

      <CustomerNotesModal
        open={showCustomerNotes}
        onClose={() => setShowCustomerNotes(false)}
        customerId={selectedCustomerId}
      />
    </div>
  );
};

export default AllCustomers;

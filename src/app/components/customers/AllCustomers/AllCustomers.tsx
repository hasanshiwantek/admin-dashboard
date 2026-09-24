"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Table from "@/components/ui/Table/Table";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useMemo } from "react";
import {
  DownloadIcon,
  PlusIcon,
  SearchIcon,
  StickyNote,
  Trash,
} from "lucide-react";
import { FaCircleMinus, FaCirclePlus } from "react-icons/fa6";
import CustomerNotesModal from "../edit/CustomerNotesModal";
import useAllCustomersContainer, {
  CustomerTabs,
} from "./AllCustomersContainer";
import TableTabs from "@/components/ui/Table/TableTabs";

const AllCustomers = () => {
  const router = useRouter();
  const {
    table,
    customerList,
    total,
    totalPages,
    currentPage,
    perPage,
    activeTab,
    loading,
    error,
    selectedCustomers,
    keyword,
    setKeyword,
    expandedRow,
    showCustomerNotes,
    setShowCustomerNotes,
    selectedOrderId,
    setSelectedOrderId,
    getDropdownActions,
    handleSelectAll,
    handleSelectOne,
    deleteCustomerHandler,
    toggleRow,
    filterHandler,
    handleExport,
  } = useAllCustomersContainer();

  const customerColumns = useMemo(
    () => [
      {
        key: "expand",
        header: "",
        className: "w-12",
        render: (customer: any) => (
          <button
            type="button"
            onClick={() => toggleRow(customer.id)}
            className="mt-3"
          >
            {expandedRow === customer.id ? (
              <FaCircleMinus className="h-7 w-7 fill-blue-500" />
            ) : (
              <FaCirclePlus className="h-7 w-7 fill-blue-500" />
            )}
          </button>
        ),
      },
      {
        key: "name",
        header: "Name",
        headClassName: "2xl:!text-[1.6rem]",
        render: (customer: any) => (
          <div className="text-blue-600 cursor-pointer hover:underline">
            <Link
              className="2xl:!text-2xl"
              href={`/manage/customers/edit/${customer.id}`}
            >
              {customer.firstName} {customer.lastName}
            </Link>
          </div>
        ),
      },
      {
        key: "email",
        header: "Email",
        headClassName: "2xl:!text-[1.6rem]",
        className: "text-blue-500 2xl:!text-2xl",
        render: (customer: any) => (
          <Link
            href={`mailto:${customer?.email}`}
            className="!text-[15px] hover:underline"
          >
            {customer?.email || "N/A"}
          </Link>
        ),
      },
      {
        key: "phone",
        header: "Phone",
        headClassName: "2xl:!text-[1.6rem]",
        className: "2xl:!text-2xl",
        render: (customer: any) => customer.phone,
      },
      {
        key: "totalOrders",
        header: "Orders",
        headClassName: "2xl:!text-[1.6rem]",
        className: "2xl:!text-2xl",
        render: (customer: any) => customer?.totalOrders,
      },
      {
        key: "joinDate",
        header: "Join date",
        headClassName: "2xl:!text-[1.6rem]",
        className: "2xl:!text-2xl",
        render: (customer: any) =>
          new Date(customer?.joinDate).toLocaleString("en-US", {
            dateStyle: "medium",
            timeStyle: "short",
          }),
      },
    ],
    [expandedRow, toggleRow],
  );

  const renderExpandedRow = (customer: any) => (
    <div className="grid grid-cols-[15%_40%_45%] bg-gray-50 p-4">
      <div className="border-r pr-4 !text-right">
        <h4 className="font-semibold text-[16px]">Current Orders</h4>
      </div>

      <div className="px-4">
        {customer?.currentOrders?.length > 0 ? (
          customer.currentOrders.map((order: any) => (
            <div key={order.id} className="mb-8">
              <Link
                href={`/manage/orders?orderIdFrom=${order?.id}&orderIdTo=${order?.id}d}&expand=${order?.id}`}
              >
                <h4 className="text-[15px] relative left-[85px] font-medium text-gray-900 mb-3 cursor-pointer">
                  Order{" "}
                  <span className="!text-blue-600 !text-[15px] hover:underline">
                    #{order.orderNumber}
                  </span>
                </h4>
              </Link>

              <div className="grid grid-cols-[120px_1fr] gap-y-2">
                <span className="text-right pr-4 font-medium text-gray-600">
                  Status
                </span>
                <span className="border-l-4 border-cyan-400 pl-2 font-medium text-gray-600">
                  {order.status}
                </span>

                <span className="text-right pr-4 font-medium text-gray-600">
                  Order total
                </span>
                <span className="font-medium text-gray-600">
                  ${order.totalAmount}
                </span>

                <span className="text-right pr-4 font-medium text-gray-600">
                  Date ordered
                </span>
                <span className="font-medium text-gray-600">
                  {new Date(order.createdAt).toLocaleDateString()}
                </span>

                <span className="flex items-center justify-end pr-4 text-gray-600">
                  <StickyNote size={16} strokeWidth={1.5} />
                </span>
                <span
                  onClick={() => {
                    setSelectedOrderId(order?.id);
                    setShowCustomerNotes(true);
                  }}
                  className="!text-blue-600 font-medium cursor-pointer hover:underline"
                >
                  View Notes
                </span>
              </div>
            </div>
          ))
        ) : (
          <p>No current orders</p>
        )}
      </div>

      <div className="px-4">
        <div className="flex items-stretch">
          <h4 className="font-semibold text-[12px] whitespace-nowrap pr-3">
            Past Orders
          </h4>

          <div className="border-l border-gray-200 pl-3">
            {customer?.pastOrders?.length > 0 ? (
              customer.pastOrders.map((order: any) => (
                <div key={order.id} className="flex items-center h-8">
                  <Link
                    href={`/manage/orders?orderIdFrom=${order?.id}&orderIdTo=${order?.id}&expand=${order?.id}`}
                  >
                    <span className="whitespace-nowrap pr-2 cursor-pointer">
                      Order{" "}
                      <span className="!text-blue-600 hover:underline">
                        #{order.orderNumber}
                      </span>
                    </span>
                  </Link>

                  <button
                    type="button"
                    onClick={() => {
                      setSelectedOrderId(order?.id);
                      setShowCustomerNotes(true);
                    }}
                    className="flex items-center gap-2 !text-blue-600 cursor-pointer whitespace-nowrap"
                  >
                    <StickyNote
                      size={18}
                      strokeWidth={1.5}
                      className="text-gray-500"
                    />
                    <span className="!text-blue-600">View Notes</span>
                  </button>
                </div>
              ))
            ) : (
              <p>No past orders</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  if (error) {
    return (
      <div className="text-center py-10 text-red-500 text-lg">
        Error: {error}
      </div>
    );
  }

  return (
    <div className="p-10">
      <div className="mb-6">
        <h1 className="!font-light 2xl:!text-5xl">View customers</h1>
      </div>
<TableTabs
  tabs={table.tabs}
  activeTab={activeTab}
  onTabChange={table.setTab}
  maxVisibleTabs={7}
  variant="underline"
/>
      <div className="flex flex-wrap gap-4 mb-6 items-center">
        <Link href="/manage/customers/add">
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

      <div className="bg-white shadow-md rounded-sm">
        <Table<any>
          bare
          data={customerList}
          columns={customerColumns}
          getRowId={(customer) => customer.id}
          loading={loading}
          error={error}
          emptyMessage="No customers found."
          selectAllInHeader
          showRecordCount={false}
          selectedIds={selectedCustomers.map((customer) => customer.id)}
          onToggleRow={(id, checked) => {
            const customer = customerList.find(
              (item) => Number(item.id) === Number(id),
            );

            if (customer) {
              handleSelectOne(customer, checked);
            }
          }}
          onToggleAll={(checked) => handleSelectAll(checked)}
          rowActions={getDropdownActions}
          renderExpandedRow={renderExpandedRow}
          isRowExpanded={(customer) => expandedRow === customer?.id}
          pagination={{
            currentPage,
            totalPages,
            perPage,
            total,
            onPageChange: table.setPage,
            onPerPageChange: table.setPerPage,
          }}
        />
      </div>

      <CustomerNotesModal
        open={showCustomerNotes}
        onClose={() => setShowCustomerNotes(false)}
        orderId={selectedOrderId}
      />
    </div>
  );
};

export default AllCustomers;

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
  Trash,
} from "lucide-react";
import CustomerNotesModal from "../edit/CustomerNotesModal";
import useAllCustomersContainer, {
  CustomerTabs,
} from "./AllCustomersContainer";
import TableTabs from "@/components/ui/Table/TableTabs";
import { getCustomerColumns } from "./AllCustomersColumn";
import { renderExpandedRow } from "./CustomerDetailRow";

const AllCustomers = () => {
  
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
  () => getCustomerColumns(expandedRow, toggleRow),
  [expandedRow, toggleRow],
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
          renderExpandedRow={(customer) =>
  renderExpandedRow(
    customer,
    setSelectedOrderId,
    setShowCustomerNotes,
  )
}
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

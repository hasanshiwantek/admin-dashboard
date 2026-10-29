"use client";

import ConfirmationModal from "@/app/(protected)/manage/user-settings/additional-authentication/helpers/ConfirmationModal";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/input";
import Table from "@/components/ui/Table/Table";
import TableTabs from "@/components/ui/Table/TableTabs";
import { DownloadIcon, PlusIcon, SearchIcon, Trash } from "lucide-react";
import CustomerNotesModal from "@/app/components/customers/edit/CustomerNotesModal";
import useAllCustomersContainer from "./container";
import { renderExpandedRow } from "./_components/CustomerDetailRow";
import PageTitle from "@/components/ui/PageTitle";

// Shared height so toolbar buttons and input line up
const TOOLBAR_CONTROL = "!h-13 !py-0 !my-0";

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

    // Delete confirmation
    showDeleteModal,
    setShowDeleteModal,
    confirmDeleteCustomers,

    getDropdownActions,
    handleSelectAll,
    deleteCustomerHandler,
    filterHandler,
    handleExport,
    router,
    Alert,
    columns,
    handleToggleRow,
    paginationConfig,
  } = useAllCustomersContainer();

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
        <PageTitle title="View customers" hideActionButton />
      </div>
      <TableTabs
        tabs={table.tabs}
        activeTab={activeTab}
        onTabChange={table.setTab}
        maxVisibleTabs={7}
        variant="underline"
      />
      <div className="flex flex-wrap gap-4 mb-6 items-center">
        <Button
          variant="outline"
          className={`flex items-center gap-2 px-6! 2xl:text-2xl ${TOOLBAR_CONTROL}`}
          onClick={() => router.push("/manage/customers/add")}
          permission="add_customer"
        >
          <PlusIcon className="w-5 h-5" /> Add
        </Button>

        <Button
          variant="outline"
          className={`flex items-center gap-2 px-6 ${TOOLBAR_CONTROL}`}
          onClick={deleteCustomerHandler}
        >
          <Trash className="w-5 h-5" />
        </Button>

        <Button
          onClick={handleExport}
          variant="outline"
          className={`flex items-center gap-2 px-6 2xl:text-2xl ${TOOLBAR_CONTROL}`}
          permission="export_customers"
        >
          <DownloadIcon className="w-5 h-5" /> Export selected customers
        </Button>

        <Input
          className={TOOLBAR_CONTROL}
          placeholder="Filter by keyword"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />

        <Button
          variant="outline"
          className={`flex items-center gap-2 px-6 2xl:text-2xl ${TOOLBAR_CONTROL}`}
          onClick={filterHandler}
        >
          <SearchIcon className="w-5 h-5" /> Search
        </Button>
      </div>

      <div className="bg-white shadow-md rounded-sm">
        <Table<any>
          bare
          data={customerList}
          columns={columns}
          getRowId={(customer) => customer.id}
          loading={loading}
          error={error}
          emptyMessage="No customers found."
          selectAllInHeader
          hideRecordCount
          sort={table.sort}
          onSortChange={table.setSort}
          selectedIds={selectedCustomers?.map((customer) => customer?.id)}
          onToggleRow={handleToggleRow}
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
          pagination={paginationConfig}
        />
      </div>

      <CustomerNotesModal
        open={showCustomerNotes}
        onClose={() => setShowCustomerNotes(false)}
        orderId={selectedOrderId}
      />
      <ConfirmationModal
        open={showDeleteModal}
        onOpenChange={setShowDeleteModal}
        variant="warning"
        title="Delete Selected Customers?"
        description="Are you sure you want to delete the selected customer(s)?"
        onConfirm={confirmDeleteCustomers}
      />
      <Alert />
    </div>
  );
};

export default AllCustomers;

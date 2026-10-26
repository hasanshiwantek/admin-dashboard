"use client";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/input";
import SelectField from "@/components/form/fields/SelectField";
import Table from "@/components/ui/Table/Table";
import TableTabs from "@/components/ui/Table/TableTabs";
import { X } from "lucide-react";
import { IoFilterOutline } from "react-icons/io5";
import useAllOrdersContainer from "./AllOrdersContainer";
import { ORDER_ACTION_OPTIONS } from "./constant";
import ConfirmationModal from "./edit/CaptuedPaymentModal";
import OrderNotesModal from "./edit/OrderNotesModal";
import { ShipmentModal } from "./edit/ShipmentModal";
import ShipmentModalForId from "./edit/ShipmentModalForId";
import ShipmentsTableModal from "./edit/ShipmentsTableModal";

// Shared height so toolbar buttons, select and input line up
const TOOLBAR_CONTROL = "h-14! py-4! my-0!";

const AllOrders = () => {
  const {
    table,
    columns,
    filteredOrders,
    loading,
    error,
    pagination,
    totalPages,
    currentPage,
    perPage,
    activeTab,
    filterLabels,

    rowActions,
    isRowExpanded,
    renderExpandedRow,

    selectedOrders,
    selectedAction,
    setSelectedAction,
    handleConfirmClick,
    handleExport,

    showNotes,
    handleCloseNotes,
    selectedOrderId,
    showConfirm,
    setShowConfirm,
    onConfirmCapture,
    showVoidConfirm,
    setShowVoidConfirm,
    onConfirmVoid,
    showShipmentTable,
    setShowShipmentTable,
    showShipmentIdTable,
    setShowShipmentIdTable,
    showShipmentModal,
    setShowShipmentModal,
    selectedOrder,
    onSubmitShipment,
    singleShipmentByOrder,
    selectedOrderDetails,
    counrtyBilling,
    counrtyShipping,

    router,
  } = useAllOrdersContainer();

  const topActions = (
    <div className="flex flex-wrap gap-3 items-center mb-2">
      <Button
        className={`2xl:!text-2xl ${TOOLBAR_CONTROL}`}
        onClick={() => router.push("/manage/orders/add")}
        variant="outline"
        size="xl"
        permission="add_order"
      >
        Add
      </Button>
      {selectedOrders.length !== 0 && (
        <Button
          className={`2xl:!text-2xl ${TOOLBAR_CONTROL}`}
          onClick={handleExport}
          variant="outline"
          size="xl"
        >
          Export
        </Button>
      )}

      <SelectField
        options={ORDER_ACTION_OPTIONS}
        value={selectedAction}
        onChange={setSelectedAction}
        getOptionGroup={(option) => option.group}
        placeholder="Choose an action"
        className="w-[30rem] [&_input]:h-14"
      />

      <Button
        className={`2xl:!text-2xl ${TOOLBAR_CONTROL}`}
        onClick={handleConfirmClick}
        variant="outline"
        size="xl"
      >
        Confirm
      </Button>

      <div className="flex items-center gap-0">
        <div className="relative">
          <Input
            className={`${TOOLBAR_CONTROL} pr-10 rounded-r-none`}
            placeholder="Filter by keyword"
            value={table.search}
            onChange={(e) => table.setSearch(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") table.submitSearch();
            }}
          />

          {table.search && (
            <button
              type="button"
              onClick={() => table.clearSearch()}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition"
            >
              <X size={18} />
            </button>
          )}
        </div>

        <Button
          variant="outline"
          size="md"
          type="button"
          className={`${TOOLBAR_CONTROL} rounded-l-none`}
          onClick={() => table.submitSearch()}
        >
          <IoFilterOutline />
        </Button>
      </div>
      <Button
        className={`2xl:!text-2xl ${TOOLBAR_CONTROL}`}
        onClick={() => router.push("/manage/orders/search")}
        variant="outline"
        size="xl"
      >
        Search
      </Button>
      <Button
        className={`2xl:!text-2xl ${TOOLBAR_CONTROL}`}
        onClick={table.clearSearch}
        variant="outline"
        size="xl"
      >
        Clear
      </Button>
    </div>
  );

  return (
    <div className="bg-store-bg min-h-screen mt-20">
      {/* Tabs */}
      <TableTabs
        tabs={table.tabs}
        activeTab={activeTab}
        onTabChange={table.setTab}
        maxVisibleTabs={7}
        variant="underline"
      />

      <div className="bg-white p-4 shadow-sm">
        {/* Top actions */}
        {topActions}
        <Table<any>
          error={error}
          bare
          data={filteredOrders}
          columns={columns}
          getRowId={(order) => order.id}
          loading={loading}
          emptyMessage="No orders found."
          selectAllInHeader
          hideRecordCount
          appliedFilters={table.appliedFilters}
          filterLabels={filterLabels}
          formatFilterValue={table.formatFilterValue}
          onRemoveFilter={table.removeFilter}
          onClearFilters={table.resetFilters}
          selectedIds={table.selectedIds}
          onToggleRow={(id, checked) => table.toggleSelect(Number(id), checked)}
          onToggleAll={(checked, allIds) =>
            table.setSelectedIds(checked ? allIds.map(Number) : [])
          }
          rowActions={rowActions}
          renderExpandedRow={renderExpandedRow}
          isRowExpanded={isRowExpanded}
          sort={table.sort}
          onSortChange={table.setSort}
          pagination={{
            currentPage,
            totalPages,
            perPage,
            total: pagination?.total,
            onPageChange: table.setPage,
            onPerPageChange: table.setPerPage,
          }}
        />
      </div>

      {/* Modals */}
      {showNotes && selectedOrderId && (
        <OrderNotesModal
          open={showNotes}
          onClose={handleCloseNotes}
          orderId={selectedOrderId}
        />
      )}
      {showConfirm && selectedOrderId && (
        <ConfirmationModal
          open={showConfirm}
          onClose={() => setShowConfirm(false)}
          onConfirm={onConfirmCapture}
          message="Are you sure you want to capture funds for this order?"
        />
      )}
      {showVoidConfirm && selectedOrderId && (
        <ConfirmationModal
          open={showVoidConfirm}
          onClose={() => setShowVoidConfirm(false)}
          onConfirm={onConfirmVoid}
          message="Are you sure you want to void for this order?"
        />
      )}
      {showShipmentTable && selectedOrderId && singleShipmentByOrder && (
        <ShipmentsTableModal
          open={showShipmentTable}
          onClose={() => setShowShipmentTable(false)}
          onConfirm={() => setShowShipmentTable(false)}
          shipments={singleShipmentByOrder ? [singleShipmentByOrder] : []}
          orderDetails={selectedOrderDetails}
          counrtyShipping={counrtyShipping}
          counrtyBilling={counrtyBilling}
        />
      )}
      {showShipmentIdTable && selectedOrderId && singleShipmentByOrder && (
        <ShipmentModalForId
          open={showShipmentIdTable}
          onClose={() => setShowShipmentIdTable(false)}
          onConfirm={() => setShowShipmentIdTable(false)}
          shipments={singleShipmentByOrder ? [singleShipmentByOrder] : []}
          orderDetails={selectedOrderDetails}
          counrtyShipping={counrtyShipping}
          counrtyBilling={counrtyBilling}
        />
      )}
      {showShipmentModal && selectedOrder && (
        <ShipmentModal
          open={showShipmentModal}
          order={selectedOrder}
          onClose={() => setShowShipmentModal(false)}
          onSubmit={onSubmitShipment}
        />
      )}
    </div>
  );
};

export default AllOrders;

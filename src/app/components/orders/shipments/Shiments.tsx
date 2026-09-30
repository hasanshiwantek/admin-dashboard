"use client";

import Link from "next/link";
import { MdDelete } from "react-icons/md";
import { IoFilterOutline } from "react-icons/io5";

import { Input } from "@/components/ui/input";

import Table from "@/components/ui/Table/Table";

import ExportShipmentsDialog from "./ExportShipmentsDialog";
import ConfirmationModal from "@/app/(protected)/manage/user-settings/additional-authentication/helpers/ConfirmationModal";

import useAllShipmentContainer from "./AllShipmentContainer";
import TableTabs from "@/components/ui/Table/TableTabs";

const Shipments = () => {
  const {
    table,
    columns,
    filteredShipments,
    loading,
    error,
    pagination,
    totalPages,
    currentPage,
    perPage,
    activeTab,
    rowActions,
    isRowExpanded,
    renderExpandedRow,
    handleExport,
    handleShipmentDelete,
    handleConfirmDelete,
    showDeleteModal,
    setShowDeleteModal,
    selectedIds,
    Alert,
  } = useAllShipmentContainer();



  if (error) {
    return (
      <div className="text-center py-10 text-red-500 text-lg">
        Error: {error}
      </div>
    );
  }

  return (
    <>
      <div className="bg-[var(--store-bg)]">
 

        <div className="my-5">
          <h1 className="!text-5xl !font-extralight !text-gray-600 !my-10">
            View Shipments
          </h1>

          <p className="2xl:!text-2xl">
            Shipments created from your orders are shown below. Click the plus
            icon next to a shipment to see its complete details.
          </p>
        </div>

      

        <TableTabs
          tabs={table.tabs}
          activeTab={activeTab}
          onTabChange={table.setTab}
          maxVisibleTabs={7}
          variant="underline"
        />

    

        <div className="bg-white p-4 shadow-sm">
          <div className="flex flex-wrap gap-3 items-center mb-1">
           

            <button
              type="button"
              className="btn-outline-primary"
              onClick={handleShipmentDelete}
            >
              <MdDelete className="w-7 h-7 2xl:h-9 2xl:w-10" />
            </button>


            <ExportShipmentsDialog
              trigger={
                <button
                  type="button"
                  className="btn-outline-primary 2xl:!text-2xl"
                >
                  Export all
                </button>
              }
              onConfirm={(format) => handleExport(format)}
            />

          

            <div className="flex items-center border rounded 2xl:h-[37.98px]">
              <Input
                placeholder="Filter by keyword"
                className="border-0 focus:ring-0 2xl:!text-2xl"
                value={table.search}
                onChange={(e) => table.setSearch(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    table.submitSearch();
                  }
                }}
              />

              <button
                type="button"
                className="btn-outline-primary h-full"
                onClick={() => table.submitSearch()}
              >
                <IoFilterOutline />
              </button>
            </div>

        

            <Link href="/manage/orders/shipments/search-shipments">
              <button
                type="button"
                className="btn-outline-primary 2xl:!text-2xl"
              >
                Search
              </button>
            </Link>
          </div>
        </div>

    

        <div className="mt-4">
          <Table<any>
            bare
            data={filteredShipments}
            columns={columns}
            getRowId={(shipment) => shipment.id}
            loading={loading}
            emptyMessage="No Shipment Found."
            selectAllInHeader
            hideRecordCount
            selectedIds={table.selectedIds}
            onToggleRow={(id, checked) =>
              table.toggleSelect(Number(id), checked)
            }
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

  

        <ConfirmationModal
          open={showDeleteModal}
          onOpenChange={setShowDeleteModal}
          variant="warning"
          title="Delete shipments?"
          description="Are you sure you want to delete the selected shipment?"
          onConfirm={handleConfirmDelete}
        />
      </div>

      <Alert />
    </>
  );
};

export default Shipments;

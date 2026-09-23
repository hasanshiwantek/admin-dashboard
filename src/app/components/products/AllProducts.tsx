"use client";
import PageTile from "@/components/ui/PageTile";
import Table from "@/components/ui/Table/Table";
import ConfirmationModal from "../orders/edit/CaptuedPaymentModal";
import AddToCategories from "./AddToCategories";
import useAllProductsContainer from "./AllProductsContainer";
import { FILTER_LABELS } from "./constant";

export default function AllProducts() {
  const {
    columns,
    productList,
    loading,
    error,
    selectedTab,
    table,
    selectedProductIds,
    setSelectedIds,
    getRowActions,
    currentPage,
    totalPages,
    perPage,
    pagination,
    categoryModalOpen,
    setCategoryModalOpen,
    categoryModalDefaults,
    handleApplyCategories,
    bulkActions,
    showCategoryDeleteConfirm,
    categoryDeleteMessage,
    confirmCategoryDelete,
    closeCategoryDeleteConfirm,
  } = useAllProductsContainer();

  return (
    <>
        <PageTile title="All Products" />
        <Table<any>
          data={productList}
          columns={columns}
          getRowId={(product) => product.id}
          loading={loading}
          error={error ? `Error: ${error}` : null}
          emptyMessage="No products yet."
          recordLabel="Products"
          tabs={table.tabs}
          activeTab={selectedTab}
          onTabChange={table.setTab}
          searchable
          searchValue={table.search}
          onSearchChange={table.setSearch}
          onSearchSubmit={table.submitSearch}
          onSearchClear={table.clearSearch}
          searchPlaceholder=" Search products"
          showFilterChips
          appliedFilters={table.appliedFilters}
          filterLabels={FILTER_LABELS}
          formatFilterValue={table.formatFilterValue}
          onRemoveFilter={table.removeFilter}
          onClearFilters={table.resetFilters}
          selectedIds={selectedProductIds}
          onToggleRow={(id, checked) => table.toggleSelect(Number(id), checked)}
          onToggleAll={(checked, allIds) =>
            setSelectedIds(checked ? allIds.map(Number) : [])
          }
          rowActions={(product) => getRowActions(product)}
          bulkActions={bulkActions}
          pagination={{
            currentPage,
            totalPages,
            perPage,
            total: pagination?.total,
            onPageChange: table.setPage,
            onPerPageChange: table.setPerPage,
          }}
        />

      <AddToCategories
        open={categoryModalOpen}
        onClose={() => setCategoryModalOpen(false)}
        defaultSelectedIds={categoryModalDefaults}
        onApply={handleApplyCategories}
      />

      <ConfirmationModal
        open={showCategoryDeleteConfirm}
        onClose={closeCategoryDeleteConfirm}
        onConfirm={confirmCategoryDelete}
        title="Remove Categories"
        message={categoryDeleteMessage}
        confirmText="Continue"
        cancelText="Cancel"
      />
    </>
  );
}

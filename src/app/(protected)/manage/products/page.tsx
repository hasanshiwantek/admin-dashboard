"use client";

import ActionButton from "@/components/ActionButton/ActionButton";
import { Button } from "@/components/ui/Button";
import PageLayout from "@/components/ui/PageLayout";
import Table from "@/components/ui/Table/Table";
import DeleteProductModal from "@/Modals/ProductModals/DeleteProductModal/DeleteProductModal";
import ProductCategoriesModal from "@/Modals/ProductModals/ProductCategoriesModal/ProductCategoriesModal";
import { Plus } from "lucide-react";
import Link from "next/link";
import {
  ADD_PRODUCT_ROUTE,
  PRODUCT_BULK_ACTIONS,
  PRODUCT_FILTER_LABELS,
} from "./constant";
import useProductsPageContainer from "./container";

const ProductsPage = () => {
  const {
    table,
    rows,
    loading,
    error,
    pagination,
    columns,
    selectedIds,
    setSelectedIds,
    handleBulkAction,
    handleEditInventory,
    handleBulkEdit,
    handleExport,
    categoriesModal,
    setCategoriesModalOpen,
    deleteTargets,
    deleteOpen,
    setDeleteOpen,
    handleSaved,
  } = useProductsPageContainer();

  return (
    <PageLayout
      title="All Products"
      titleProps={{
        action: (
          <Button asChild variant="outline" size="xl" permission="add_product">
            <Link href={ADD_PRODUCT_ROUTE}>
              <Plus className="size-6!" />
              Add product
            </Link>
          </Button>
        ),
      }}
    >
      <Table
        data={rows}
        columns={columns}
        getRowId={(product) => product.id}
        loading={loading}
        error={error ? `Error: ${error}` : null}
        emptyMessage="No products yet."
        recordLabel="Products"
        tabs={table.tabs}
        activeTab={table.tab}
        onTabChange={table.setTab}
        searchable
        searchValue={table.search}
        onSearchChange={table.setSearch}
        onSearchSubmit={table.submitSearch}
        onSearchClear={table.clearSearch}
        searchPlaceholder="Search products"
        showFilterChips
        sort={table.sort}
        onSortChange={table.setSort}
        appliedFilters={table.appliedFilters}
        filterLabels={PRODUCT_FILTER_LABELS}
        formatFilterValue={table.formatFilterValue}
        onRemoveFilter={table.removeFilter}
        onClearFilters={table.resetFilters}
        selectedIds={selectedIds}
        onToggleRow={(id, checked) => table.toggleSelect(Number(id), checked)}
        onToggleAll={(checked, allIds) =>
          setSelectedIds(checked ? allIds.map(Number) : [])
        }
        bulkActions={
          <>
            <Button type="button" variant="outline" size="md" onClick={handleExport}>
              Export
            </Button>
            <Button type="button" variant="outline" size="md" onClick={handleBulkEdit}>
              Bulk edit
            </Button>
            <Button
              type="button"
              variant="outline"
              size="md"
              onClick={handleEditInventory}
            >
              Edit Inventory
            </Button>
            <ActionButton
              data={selectedIds}
              actions={PRODUCT_BULK_ACTIONS}
              onAction={handleBulkAction}
              label="More actions for selected products"
              align="start"
              triggerProps={{ variant: "outline", size: "md", className: "text-xl" }}
            />
          </>
        }
        pagination={{
          currentPage: table.page,
          totalPages: pagination?.lastPage ?? 1,
          perPage: table.perPage,
          total: pagination?.total,
          onPageChange: table.setPage,
          onPerPageChange: table.setPerPage,
        }}
      />

      <ProductCategoriesModal
        open={categoriesModal.open}
        onOpenChange={setCategoriesModalOpen}
        mode={categoriesModal.mode}
        productIds={categoriesModal.productIds}
        defaultCategoryIds={categoriesModal.defaultCategoryIds}
        onSaved={handleSaved}
      />
      <DeleteProductModal
        products={deleteTargets}
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        onDeleted={handleSaved}
      />
    </PageLayout>
  );
};

export default ProductsPage;

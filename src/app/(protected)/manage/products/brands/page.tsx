"use client";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/input";
import PageLayout from "@/components/ui/PageLayout";
import Pagination from "@/components/ui/Pagination";
import Table from "@/components/ui/Table/Table";
import DeleteBrandsModal from "@/Modals/BrandModals/DeleteBrandsModal/DeleteBrandsModal";
import { Trash } from "lucide-react";
import Link from "next/link";
import { ADD_BRAND_ROUTE } from "./constant";
import useBrandsPageContainer from "./container";

const BrandsPage = () => {
  const {
    table,
    rows,
    loading,
    pagination,
    columns,
    selectedIds,
    setSelectedIds,
    handleDeleteSelected,
    deleteTargets,
    deleteOpen,
    setDeleteOpen,
    handleDeleted,
  } = useBrandsPageContainer();

  const pager = (
    <div className="flex justify-end">
      <Pagination
        currentPage={table.page}
        totalPages={pagination?.totalPages ?? 1}
        onPageChange={table.setPage}
        perPage={table.perPage}
        onPerPageChange={table.setPerPage}
      />
    </div>
  );

  return (
    <PageLayout
      title="View Brands"
      titleProps={{
        description:
          "Brands can be associated with products, allowing your customers to shop by browsing their favorite brands.",
        titleClassName: "font-light! 2xl:text-5xl!",
        descriptionClassName: "2xl:text-2xl!",
      }}
    >
      <div className="flex items-center gap-5">
        <Button asChild variant="outline" size="md" className="2xl:text-2xl!">
          <Link href={ADD_BRAND_ROUTE}>Add a Brand...</Link>
        </Button>
        <Button
          type="button"
          variant="outline"
          size="md"
          aria-label="Delete selected brands"
          onClick={handleDeleteSelected}
        >
          <Trash className="size-6! 2xl:h-8!" />
        </Button>
        <Input
          type="text"
          placeholder="Filter by Keyword"
          value={table.search}
          onChange={(event) => table.setSearch(event.target.value)}
          onKeyDown={(event) => event.key === "Enter" && table.submitSearch()}
          className="2xl:h-[3.8rem]! 2xl:text-2xl!"
        />
        <Button
          type="button"
          variant="outline"
          size="md"
          className="2xl:text-2xl!"
          onClick={table.submitSearch}
        >
          Filter
        </Button>
        <Button
          type="button"
          variant="outline"
          size="md"
          className="2xl:text-2xl!"
          disabled={!table.search}
          onClick={table.clearSearch}
        >
          Clear
        </Button>
      </div>

      {pager}

      <Table
        data={rows}
        columns={columns}
        getRowId={(brand) => brand.id}
        loading={loading}
        emptyMessage="No Brands found."
        hideRecordCount
        selectedIds={selectedIds}
        onToggleRow={(id, checked) => table.toggleSelect(Number(id), checked)}
        onToggleAll={(checked, allIds) =>
          setSelectedIds(checked ? allIds.map(Number) : [])
        }
        selectAllInHeader
      />

      {pager}

      <DeleteBrandsModal
        brands={deleteTargets}
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        onDeleted={handleDeleted}
      />
    </PageLayout>
  );
};

export default BrandsPage;

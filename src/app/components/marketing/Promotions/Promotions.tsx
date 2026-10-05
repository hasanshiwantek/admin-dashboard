"use client";

import ConfirmationModal from "@/app/components/orders/edit/CaptuedPaymentModal";
import AppTabs from "@/components/ui/AppTabs/AppTabs";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import PageLayout from "@/components/ui/PageLayout";
import PageTitle from "@/components/ui/PageTitle";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectOption,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Table from "@/components/ui/Table/Table";
import TableTabs from "@/components/ui/Table/TableTabs";
import { ChevronDown, Plus, X } from "lucide-react";
import { IoSearchOutline } from "react-icons/io5";
import {
  CREATE_OPTIONS,
  CURRENCY_OPTIONS,
  DISPLAY_TABS,
  PROMOTION_TYPE_OPTIONS,
  PROMOTIONS_BASE_PATH,
} from "./constant";
import usePromotionsContainer from "./PromotionsContainer";

const CONTROL = "h-14! text-xl! 2xl:text-[1.6rem]!";
const ALL = "all";

/** Dropdown filter bound to a URL query param; "all" clears it. */
const FilterSelect = ({
  value,
  placeholder,
  allLabel,
  options,
  onChange,
}: {
  value?: string;
  placeholder: string;
  allLabel: string;
  options: SelectOption[];
  onChange: (value: string | null) => void;
}) => (
  <Select
    value={value ?? ""}
    onValueChange={(v) => onChange(v === ALL ? null : v)}
  >
    <SelectTrigger className={`w-full bg-white ${CONTROL}`}>
      <SelectValue placeholder={placeholder} />
    </SelectTrigger>
    <SelectContent>
      <SelectItem value={ALL}>{allLabel}</SelectItem>
      {options.map((option) => (
        <SelectItem key={option.value} value={option.value}>
          {option.label}
        </SelectItem>
      ))}
    </SelectContent>
  </Select>
);

const Promotions = () => {
  const {
    display,
    displayConfig,
    table,
    columns,
    promotionList,
    loading,
    error,
    pagination,
    totalPages,
    currentPage,
    perPage,
    activeTab,
    selectedIds,
    rowActions,
    pendingDeleteIds,
    closeDeleteConfirm,
    confirmDelete,
    createPath,
    router,
    total,
    bulkActions,
  } = usePromotionsContainer();

  return (
    <PageLayout>
      <PageTitle
        title="Promotions"
        titleClassName="font-light! 2xl:text-5xl!"
        hideActionButton
      />
      <AppTabs
        tabs={DISPLAY_TABS}
        activeTab={display}
        onTabChange={(key) =>
          router.push(`${PROMOTIONS_BASE_PATH}?display=${key}`)
        }
        variant="underline"
      />

      <div className="bg-white shadow-sm rounded-sm p-10 pt-12">
        {/* Card header */}
        <div className="flex justify-between items-start gap-6 mb-6">
          <div className="flex flex-col gap-5">
            <h2 className="text-3xl! 2xl:text-[2.4rem]! font-normal text-gray-800">
              {displayConfig.title}
            </h2>
            <p className="text-xl! 2xl:text-[1.6rem]! text-gray-700">
              {displayConfig.description}
            </p>
          </div>
          <div className="flex items-center gap-6 shrink-0">
            {displayConfig.showManagePriority && (
              <button
                type="button"
                onClick={() =>
                  router.push(`${PROMOTIONS_BASE_PATH}/manage-priority`)
                }
                className="text-blue-600 hover:underline text-xl! 2xl:text-[1.6rem]! cursor-pointer"
              >
                Manage priority
              </button>
            )}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  size="xl"
                  className="bg-blue-600 hover:bg-blue-700 text-xl! 2xl:text-[1.6rem]!"
                >
                  <Plus className="w-6! h-6!" />
                  Create
                  <ChevronDown className="w-5! h-5!" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="min-w-[220px]">
                {CREATE_OPTIONS.map((option) => (
                  <DropdownMenuItem
                    key={option.path}
                    className="cursor-pointer text-lg"
                    onClick={() =>
                      router.push(createPath(`${display}/${option.path}`))
                    }
                  >
                    {option.label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Status tabs */}
        <TableTabs
          tabs={table.tabs}
          activeTab={activeTab}
          onTabChange={table.setTab}
          variant="pills"
          className="mb-6 gap-8"
          tabClassName="rounded-full"
        />

        {/* Filters */}
        <div className="flex items-center gap-5 mb-4">
          <FilterSelect
            value={table.query.currency as string | undefined}
            placeholder="Choose currency"
            allLabel="All currencies"
            options={CURRENCY_OPTIONS}
            onChange={(v) => table.setFilter("currency", v)}
          />
          <FilterSelect
            value={table.query.type as string | undefined}
            placeholder="Choose type"
            allLabel="All types"
            options={PROMOTION_TYPE_OPTIONS}
            onChange={(v) => table.setFilter("type", v)}
          />
          <div className="flex flex-1 items-center gap-3 px-4 h-14 bg-white border border-gray-200 rounded-md">
            <IoSearchOutline
              size={20}
              className="text-gray-600 cursor-pointer shrink-0"
              onClick={table.submitSearch}
            />
            <input
              type="text"
              placeholder={displayConfig.searchPlaceholder}
              className="flex-1 bg-transparent outline-none text-xl! 2xl:text-[1.6rem]! placeholder:text-gray-400"
              value={table.search}
              onChange={(e) => table.setSearch(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") table.submitSearch();
              }}
            />
            {table.search && (
              <button
                type="button"
                onClick={table.clearSearch}
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={18} />
              </button>
            )}
          </div>
        </div>

        <Table<any>
          bare
          data={promotionList}
          columns={columns}
          getRowId={(promotion) => promotion.id}
          loading={loading}
          error={error ? `Error: ${error}` : null}
          emptyMessage="No promotions found."
          recordLabel={total === 1 ? "Promotion" : "Promotions"}
          selectionHeaderClassName="border-t-0 p-0!"
          selectedIds={selectedIds}
          onToggleRow={(id, checked) => table.toggleSelect(Number(id), checked)}
          onToggleAll={(checked, allIds) =>
            table.setSelectedIds(checked ? allIds.map(Number) : [])
          }
          rowActions={rowActions}
          bulkActions={bulkActions}
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
          bottomPaginationClassName="hidden"
          selectionInfoClassName="px-0!"
        />

        <ConfirmationModal
          open={pendingDeleteIds.length > 0}
          onClose={closeDeleteConfirm}
          onConfirm={confirmDelete}
          title="Delete promotion"
          message={
            pendingDeleteIds.length === 1
              ? "Are you sure you want to delete this promotion? This can't be undone."
              : `Are you sure you want to delete ${pendingDeleteIds.length} promotions? This can't be undone.`
          }
          confirmText="Delete"
          cancelText="Cancel"
        />
      </div>
    </PageLayout>
  );
};

export default Promotions;

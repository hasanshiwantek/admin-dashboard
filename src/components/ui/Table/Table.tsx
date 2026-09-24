"use client";

import Spinner from "@/app/components/loader/Spinner";
import OrderActionsDropdown from "@/app/components/orders/OrderActionsDropdown";
import ChipList, { type ChipItem } from "@/components/Chips/ChipList";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import Pagination from "@/components/ui/pagination";
import {
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Table as UITable,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import {
  ChevronDown,
  ChevronsUpDown,
  ChevronUp,
  Ellipsis,
  X,
} from "lucide-react";
import { Fragment, ReactNode } from "react";
import { IoSearchOutline } from "react-icons/io5";
import TableTabs from "./TableTabs";
import { ColumnDef, TableProps } from "./types";

const sortKeyOf = (col: ColumnDef<any>) => col.sortKey ?? col.key;

export default function Table<T>({
  data,
  columns,
  getRowId,
  loading = false,
  error = null,
  emptyMessage = "No records found.",
  recordLabel = "records",
  tabs,
  activeTab,
  onTabChange,
  maxVisibleTabs,
  tabsVariant = "pills",
  searchable = false,
  searchValue = "",
  onSearchChange,
  onSearchSubmit,
  onSearchClear,
  searchPlaceholder = "Search",
  showFilterChips = false,
  appliedFilters,
  filterLabels,
  formatFilterValue,
  onRemoveFilter,
  onClearFilters,
  selectable = true,
  selectedIds = [],
  onToggleRow,
  onToggleAll,
  selectAllInHeader = false,
  showRecordCount = true,
  rowActions,
  bulkActions,
  renderExpandedRow,
  isRowExpanded,
  selectColumnWidth = "50px",
  actionsColumnWidth = "90px",
  sort = null,
  onSortChange,
  pagination,
  toolbar,
  className,
  bare = false,
}: TableProps<T>) {
  const rowIds = data.map(getRowId);
  const isAllSelected =
    rowIds.length > 0 && rowIds.every((id) => selectedIds.includes(id));

  const colSpan = columns.length + (selectable ? 1 : 0) + (rowActions ? 1 : 0);
  const fixedLayout = columns.some((col) => col.width);

  const toggleSort = (col: ColumnDef<T>) => {
    const key = sortKeyOf(col);
    onSortChange?.(
      sort?.key !== key
        ? { key, direction: "asc" }
        : sort.direction === "asc"
          ? { key, direction: "desc" }
          : null,
    );
  };
  const filterChips: ChipItem[] =
    showFilterChips && appliedFilters
      ? Object.entries(appliedFilters).map(([key, val]) => {
          const values = (Array.isArray(val) ? val : [val]).map(String);
          const label = filterLabels?.[key] ?? key;
          const display = values
            .map((v) => (formatFilterValue ? formatFilterValue(key, v) : v))
            .reduce<
              ReactNode[]
            >((acc, part, i) => (i === 0 ? [part] : [...acc, ", ", part]), []);
          return {
            id: key,
            label: (
              <>
                {label} is {display}
              </>
            ),
            onRemove: onRemoveFilter ? () => onRemoveFilter(key) : undefined,
          };
        })
      : [];

  return (
    <div className={cn(!bare && "bg-white p-4 shadow-md", className)}>
      {/* Tabs */}
      {tabs && tabs.length > 0 && (
        <TableTabs
          tabs={tabs}
          activeTab={activeTab}
          onTabChange={onTabChange}
          maxVisibleTabs={maxVisibleTabs}
          variant={tabsVariant}
        />
      )}

      {/* Search + toolbar */}
      {(searchable || toolbar) && (
        <div className="flex justify-between gap-4 items-center mb-5">
          {searchable ? (
            <div
              className="flex justify-start items-center bg-white text-center !px-4 !py-4 rounded-md
             focus-within:ring-3 focus-within:ring-blue-200 focus-within:border-blue-200 border border-gray-200 transition hover:border-blue-200 flex-1"
            >
              <i onClick={() => onSearchSubmit?.()}>
                <IoSearchOutline
                  size={20}
                  color="gray"
                  className="cursor-pointer"
                />
              </i>
              <input
                type="text"
                placeholder={searchPlaceholder}
                className="!ml-3 bg-transparent !text-xl 2xl:!text-[1.6rem] !font-medium outline-none placeholder:text-gray-400 w-[80%]"
                value={searchValue}
                onChange={(e) => onSearchChange?.(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") onSearchSubmit?.();
                }}
              />
              {searchValue && (
                <button
                  type="button"
                  onClick={() => onSearchClear?.()}
                  className="text-gray-400 hover:text-gray-600 transition ml-auto"
                >
                  <X size={18} />
                </button>
              )}
            </div>
          ) : (
            <div className="flex-1" />
          )}

          {toolbar}

          <button
            onClick={() => onSearchSubmit?.()}
            className="btn-outline-primary flex justify-start gap-1 items-center 2xl:!text-[1.6rem]"
          >
            <IoSearchOutline
              size={20}
              color="gray"
              className="cursor-pointer text-inherit!"
            />
            Search
          </button>
        </div>
      )}

      {/* Applied-filter chips */}
      <ChipList chips={filterChips} onClearAll={onClearFilters} />

      {/* Selection header + pagination */}
      {((selectable && showRecordCount) || pagination || bulkActions) && (
        <div className="flex items-center justify-between border-t border-b border-gray-200 px-4 py-2 bg-white text-sm">
          <div className="flex items-center space-x-10">
            {selectable && showRecordCount && (
              <div className="flex justify-start items-center gap-2">
                <Checkbox
                  checked={isAllSelected}
                  onCheckedChange={(checked: boolean) =>
                    onToggleAll?.(checked, rowIds)
                  }
                />
                <span className="text-gray-700 !text-xl 2xl:!text-[1.6rem]">
                  {data.length}
                  {pagination?.total != null
                    ? ` of ${pagination.total}`
                    : ""}{" "}
                  {recordLabel}
                </span>
              </div>
            )}

            {selectedIds.length > 0 && bulkActions && (
              <div className="flex items-center gap-2">{bulkActions}</div>
            )}
          </div>

          {pagination && (
            <div className="flex items-center space-x-10 text-gray-700">
              <div className="p-6">
                <Pagination
                  currentPage={pagination.currentPage}
                  totalPages={pagination.totalPages}
                  onPageChange={pagination.onPageChange}
                  perPage={pagination.perPage}
                  onPerPageChange={pagination.onPerPageChange}
                />
              </div>
            </div>
          )}
        </div>
      )}

      {/* Table */}
      <div>
        <UITable className={cn(fixedLayout && "table-fixed")}>
          {fixedLayout && (
            <colgroup>
              {selectable && <col style={{ width: selectColumnWidth }} />}
              {columns.map((col) => (
                <col key={col.key} style={{ width: col.width }} />
              ))}
              {rowActions && <col style={{ width: actionsColumnWidth }} />}
            </colgroup>
          )}
          <TableHeader className="h-18">
            <TableRow>
              {selectable && (
                <TableHead className="w-12">
                  {selectAllInHeader && (
                    <Checkbox
                      checked={isAllSelected}
                      onCheckedChange={(checked: boolean) =>
                        onToggleAll?.(checked, rowIds)
                      }
                    />
                  )}
                </TableHead>
              )}
              {columns.map((col) => (
                <TableHead
                  key={col.key}
                  className={cn("2xl:!text-[1.6rem]", col.headClassName)}
                >
                  {col.sortable && onSortChange ? (
                    <button
                      type="button"
                      onClick={() => toggleSort(col)}
                      className="inline-flex items-center gap-2 cursor-pointer hover:text-blue-500"
                    >
                      {col.header}
                      {sort?.key !== sortKeyOf(col) ? (
                        <ChevronsUpDown className="h-6 w-6 shrink-0 text-gray-400" />
                      ) : sort.direction === "asc" ? (
                        <ChevronUp className="h-6 w-6 shrink-0" />
                      ) : (
                        <ChevronDown className="h-6 w-6 shrink-0" />
                      )}
                    </button>
                  ) : (
                    col.header
                  )}
                </TableHead>
              ))}
              {rowActions && <TableHead className="2xl:!text-[1.6rem]" />}
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={colSpan} className="text-center py-10">
                  <Spinner />
                </TableCell>
              </TableRow>
            ) : error ? (
              <TableRow>
                <TableCell
                  colSpan={colSpan}
                  className="text-center py-10 text-red-500 text-xl"
                >
                  {error}
                </TableCell>
              </TableRow>
            ) : data.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={colSpan}
                  className="text-center py-10 text-gray-500 text-xl"
                >
                  {emptyMessage}
                </TableCell>
              </TableRow>
            ) : (
              data.map((row, index) => {
                const id = getRowId(row);
                const expanded = !!renderExpandedRow && !!isRowExpanded?.(row);
                return (
                  <Fragment key={id}>
                    <TableRow>
                      {selectable && (
                        <TableCell>
                          <Checkbox
                            checked={selectedIds.includes(id)}
                            onCheckedChange={(checked: boolean) =>
                              onToggleRow?.(id, checked)
                            }
                          />
                        </TableCell>
                      )}
                      {columns.map((col) => (
                        <TableCell key={col.key} className={col.className}>
                          {col.render
                            ? col.render(row, index)
                            : ((row as Record<string, unknown>)[
                                col.key
                              ] as ReactNode)}
                        </TableCell>
                      ))}
                      {rowActions && (
                        <TableCell>
                          <OrderActionsDropdown
                            actions={rowActions(row).map((action) => ({
                              label: action.label,
                              onClick: () => action.onClick(row),
                            }))}
                            trigger={
                              <Button
                                variant="ghost"
                                size="icon"
                                className="text-xl cursor-pointer"
                              >
                                <Ellipsis className="!w-7 !h-7" />
                              </Button>
                            }
                          />
                        </TableCell>
                      )}
                    </TableRow>
                    {expanded && (
                      <TableRow>
                        <TableCell
                          colSpan={colSpan}
                          className="whitespace-normal"
                        >
                          {/* w-0 + min-w-full keeps the expanded content from
                              widening the table and reflowing the columns. */}
                          <div className="w-0 min-w-full">
                            {renderExpandedRow!(row)}
                          </div>
                        </TableCell>
                      </TableRow>
                    )}
                  </Fragment>
                );
              })
            )}
          </TableBody>
        </UITable>
      </div>

      {/* Footer pagination */}
      {pagination && (
        <div className="flex justify-end my-6">
          <Pagination
            currentPage={pagination.currentPage}
            totalPages={pagination.totalPages}
            onPageChange={pagination.onPageChange}
            perPage={pagination.perPage}
            onPerPageChange={pagination.onPerPageChange}
          />
        </div>
      )}
    </div>
  );
}

import type { FilterValueFormatterConfig } from "@/hooks/useFilterValueFormatter";
import { ReactNode } from "react";

// Table Props

export interface ColumnDef<T> {
  key: string;
  header?: ReactNode;
  render?: (row: T, index: number) => ReactNode;
  className?: string;
  headClassName?: string;
  /** Fixed column width (e.g. "135px"). Setting it on any column switches
   *  the table to a fixed layout. */
  width?: string;
  /** Show a sort toggle on this column's header. */
  sortable?: boolean;
  /** Value sent to the API as the sort field. Takes priority over `key`. */
  sortKey?: string;
}

export type SortDirection = "asc" | "desc";

export interface TableSort {
  /** The column's `sortKey`, or its `key` when no `sortKey` is set. */
  key: string;
  direction: SortDirection;
}

export interface RowAction<T> {
  label: string;
  onClick: (row: T) => void;
}

export interface TableChip {
  id: string;
  label: ReactNode;
  onRemove: () => void;
}

export interface TablePaginationProps {
  currentPage: number;
  totalPages: number;
  perPage: string;
  total?: number;
  onPageChange: (page: number) => void;
  onPerPageChange: (value: string) => void;
}

export interface TableProps<T> {
  data: T[];
  columns: ColumnDef<T>[];
  getRowId: (row: T) => number | string;

  loading?: boolean;
  error?: string | null;
  emptyMessage?: string;
  recordLabel?: string;

  tabs?: TableTab[];
  activeTab?: string;
  onTabChange?: (tabKey: string) => void;
  maxVisibleTabs?: number;
  tabsVariant?: "pills" | "underline";

  searchable?: boolean;
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  onSearchSubmit?: () => void;
  onSearchClear?: () => void;
  searchPlaceholder?: string;

  showFilterChips?: boolean;
  appliedFilters?: Record<string, string | string[]>;
  filterLabels?: Record<string, string>;
  formatFilterValue?: (key: string, value: string) => ReactNode;
  onRemoveFilter?: (key: string, value?: string) => void;
  onClearFilters?: () => void;

  selectable?: boolean;
  selectedIds?: (number | string)[];
  onToggleRow?: (id: number | string, checked: boolean) => void;
  onToggleAll?: (checked: boolean, allIds: (number | string)[]) => void;
  selectAllInHeader?: boolean;
  showRecordCount?: boolean;

  rowActions?: (row: T) => RowAction<T>[];
  bulkActions?: ReactNode;

  renderExpandedRow?: (row: T) => ReactNode;
  isRowExpanded?: (row: T) => boolean;

  /** Widths of the checkbox and row-actions columns in a fixed layout. */
  selectColumnWidth?: string;
  actionsColumnWidth?: string;

  /** Active sort, shown on the headers. Sorting is done by the API: the
   *  table only reports header clicks through `onSortChange`. */
  sort?: TableSort | null;
  onSortChange?: (sort: TableSort | null) => void;

  pagination?: TablePaginationProps;
  toolbar?: ReactNode;
  className?: string;
  bare?: boolean;
}

// Table Container Props

export interface TableTab {
  key: string;
  label: string;
  filters?: Record<string, any>;
}

export interface TableFetchState {
  tab: string;
  search: string;
  page: number;
  pageSize: number;
  filters: Record<string, string | string[]>;
  sort: TableSort | null;
  isReset: boolean;
}

export interface UseTableContainerOptions {
  defaultTab?: string;
  defaultPerPage?: string;
  searchParam?: string;
  pageParam?: string;
  perPageParam?: string;
  /** Query params the sort field / direction are sent as. */
  sortByParam?: string;
  sortDirectionParam?: string;
  reservedKeys?: string[];
  tabs?: TableTab[];
  resetParam?: string;
  onFetch?: (state: TableFetchState) => void;
  fetcher?: (params: Record<string, any>) => void;
  filterFormat?: FilterValueFormatterConfig;
}

export interface UseTableContainerReturn<TId = number> {
  tab: string;
  page: number;
  perPage: string;
  committedSearch: string;
  filters: Record<string, string | string[]>;
  appliedFilters: Record<string, string | string[]>;
  query: Record<string, string | string[]>;
  tabs: TableTab[];
  search: string;
  formatFilterValue: (key: string, value: string) => ReactNode;
  sort: TableSort | null;

  setSearch: (value: string) => void;
  submitSearch: () => void;
  clearSearch: () => void;
  setTab: (tab: string) => void;
  setPage: (page: number) => void;
  setPerPage: (value: string) => void;
  setSort: (sort: TableSort | null) => void;
  setFilter: (key: string, value?: string | string[] | null) => void;
  setFilters: (next: Record<string, string | string[]>) => void;
  removeFilter: (key: string, value?: string) => void;
  resetFilters: () => void;

  refetch: () => void;

  selectedIds: TId[];
  setSelectedIds: (ids: TId[]) => void;
  toggleSelect: (id: TId, checked: boolean) => void;
  toggleSelectAll: (checked: boolean, allIds: TId[]) => void;
  isAllSelected: (allIds: TId[]) => boolean;
  clearSelection: () => void;
}

export interface TableTabsProps {
  tabs: TableTab[];
  activeTab?: string;
  onTabChange?: (key: string) => void;
  maxVisibleTabs?: number;
  /** Rounded pills (default) or an underline bar. */
  variant?: "pills" | "underline";
}

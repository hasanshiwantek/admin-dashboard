import type { FilterValueFormatterConfig } from "@/hooks/useFilterValueFormatter";
import { ReactNode } from "react";

// Table Props

export interface ColumnDef<T> {
  key: string;
  header?: ReactNode;
  render?: (row: T, index: number) => ReactNode;
  className?: string;
  headClassName?: string;
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
  filtersHref?: string;

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
  isReset: boolean;
}

export interface UseTableContainerOptions {
  defaultTab?: string;
  defaultPerPage?: string;
  searchParam?: string;
  pageParam?: string;
  perPageParam?: string;
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

  setSearch: (value: string) => void;
  submitSearch: () => void;
  clearSearch: () => void;
  setTab: (tab: string) => void;
  setPage: (page: number) => void;
  setPerPage: (value: string) => void;
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

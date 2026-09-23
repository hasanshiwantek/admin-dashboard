"use client";

import { useFilterValueFormatter } from "@/hooks/useFilterValueFormatter";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  TableFetchState,
  TableTab,
  UseTableContainerOptions,
  UseTableContainerReturn,
} from "./types";

const RESERVED_DEFAULTS = ["pageSize"];

/** The filters a tab contributes: its explicit `filters`, or `{ [key]: true }`. */
function tabFiltersOf(tab: TableTab): Record<string, any> {
  return tab.filters ?? { [tab.key]: "1" };
}

export function useTableContainer<TId = number>(
  options: UseTableContainerOptions = {},
): UseTableContainerReturn<TId> {
  const {
    defaultTab = "All",
    defaultPerPage = "20",
    searchParam = "search",
    pageParam = "page",
    perPageParam = "pageSize",
    reservedKeys = [],
    tabs = [],
    resetParam = "t",
    onFetch,
    fetcher,
    filterFormat,
  } = options;

  // Chip value formatter (booleans → enabled/disabled, brand/category names).
  // Only fetches brands/categories when `filterFormat` is provided.
  const formatFilterValue = useFilterValueFormatter(filterFormat ?? {}, {
    enabled: !!filterFormat,
  });

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const reserved = useMemo(
    () =>
      new Set([
        searchParam,
        pageParam,
        perPageParam,
        resetParam,
        ...RESERVED_DEFAULTS,
        ...reservedKeys,
      ]),
    [searchParam, pageParam, perPageParam, resetParam, reservedKeys],
  );

  // Every query-string key any tab writes (so we can tell tab params apart from
  // both reserved params and advanced /search filters).
  const tabOwnedKeys = useMemo(() => {
    const keys = new Set<string>();
    tabs.forEach((t) =>
      Object.keys(tabFiltersOf(t)).forEach((k) => keys.add(k)),
    );
    return keys;
  }, [tabs]);

  // Parse the current URL into a plain object (arrays for repeated keys).
  const query = useMemo(() => {
    const obj: Record<string, string | string[]> = {};
    searchParams.forEach((value, key) => {
      const existing = obj[key];
      if (existing === undefined) {
        obj[key] = value;
      } else if (Array.isArray(existing)) {
        obj[key] = [...existing, value];
      } else {
        obj[key] = [existing, value];
      }
    });
    return obj;
  }, [searchParams]);

  // Advanced filters = anything that is neither reserved nor owned by a tab.
  const filters = useMemo(() => {
    const out: Record<string, string | string[]> = {};
    Object.entries(query).forEach(([key, value]) => {
      if (!reserved.has(key) && !tabOwnedKeys.has(key)) out[key] = value;
    });
    return out;
  }, [query, reserved, tabOwnedKeys]);

  // Applied filters (for the chip bar) = every non-reserved param, tab-owned
  // ones included; only search & pagination are left out.
  const appliedFilters = useMemo(() => {
    const out: Record<string, string | string[]> = {};
    Object.entries(query).forEach(([key, value]) => {
      if (!reserved.has(key)) out[key] = value;
    });
    return out;
  }, [query, reserved]);

  // Derive the active tab by matching the URL against each tab's filters.
  const activeTab = useMemo(() => {
    const match = tabs.find((t) => {
      const f = tabFiltersOf(t);
      const keys = Object.keys(f);
      if (keys.length === 0) return false; // handle the "no filter" tab below
      return keys.every(
        (k) => query[k] !== undefined && String(query[k]) === String(f[k]),
      );
    });
    if (match) return match;
    // Fall back to the filter-less tab (e.g. "All").
    return tabs.find((t) => Object.keys(tabFiltersOf(t)).length === 0);
  }, [tabs, query]);

  const tab = activeTab?.key ?? defaultTab;
  const committedSearch = (query[searchParam] as string) || "";
  const page = Number(query[pageParam] || 1) || 1;
  const perPage = (query[perPageParam] as string) || defaultPerPage;

  // Local, immediate draft for the search input; stays in sync with the URL.
  const [search, setSearch] = useState(committedSearch);
  useEffect(() => {
    setSearch(committedSearch);
  }, [committedSearch]);

  // Selection lives in local state (not the URL — ids are transient).
  const [selectedIds, setSelectedIds] = useState<TId[]>([]);

  /** Push a partial change onto the existing query string. */
  const pushParams = useCallback(
    (mutate: (params: URLSearchParams) => void) => {
      const params = new URLSearchParams(searchParams.toString());
      mutate(params);
      // Keep the URL minimal: drop defaults (page 1, default page size).
      if (params.get(pageParam) === "1") params.delete(pageParam);
      if (params.get(perPageParam) === defaultPerPage)
        params.delete(perPageParam);
      const qs = params.toString();

      router.push(qs ? `${pathname}?${qs}` : pathname);
    },
    [router, pathname, searchParams, pageParam, perPageParam, defaultPerPage],
  );

  const setTab = useCallback(
    (next: string) => {
      const target = tabs.find((t) => t.key === next);
      const nextFilters = target ? tabFiltersOf(target) : {};
      setSelectedIds([]);
      pushParams((params) => {
        // Clear whatever the previous tab wrote, then apply the new tab.
        tabOwnedKeys.forEach((k) => params.delete(k));
        Object.entries(nextFilters).forEach(([k, v]) =>
          params.set(k, String(v)),
        );
        params.delete(pageParam); // back to page 1
      });
    },
    [pushParams, tabs, tabOwnedKeys, pageParam],
  );

  const setPage = useCallback(
    (next: number) => {
      pushParams((params) => params.set(pageParam, String(next)));
    },
    [pushParams, pageParam],
  );

  const setPerPage = useCallback(
    (value: string) => {
      pushParams((params) => {
        params.set(perPageParam, value);
        params.set(pageParam, "1");
      });
    },
    [pushParams, perPageParam, pageParam],
  );

  const submitSearch = useCallback(() => {
    pushParams((params) => {
      const trimmed = search.trim();
      if (trimmed) params.set(searchParam, trimmed);
      else params.delete(searchParam);
      params.set(pageParam, "1");
    });
  }, [pushParams, search, searchParam, pageParam]);

  const clearSearch = useCallback(() => {
    setSearch("");
    pushParams((params) => {
      params.delete(searchParam);
      params.set(pageParam, "1");
    });
  }, [pushParams, searchParam, pageParam]);

  const setFilter = useCallback(
    (key: string, value?: string | string[] | null) => {
      pushParams((params) => {
        params.delete(key);
        if (value != null && value !== "") {
          const values = Array.isArray(value) ? value : [value];
          values.filter(Boolean).forEach((v) => params.append(key, v));
        }
        params.set(pageParam, "1");
      });
    },
    [pushParams, pageParam],
  );

  const setFilters = useCallback(
    (next: Record<string, string | string[]>) => {
      pushParams((params) => {
        // Drop existing (non-reserved) filters, then apply the new set.
        [...params.keys()].forEach((key) => {
          if (!reserved.has(key)) params.delete(key);
        });
        Object.entries(next).forEach(([key, value]) => {
          const values = Array.isArray(value) ? value : [value];
          values
            .filter((v) => v != null && v !== "")
            .forEach((v) => params.append(key, String(v)));
        });
        params.set(pageParam, "1");
      });
    },
    [pushParams, reserved, pageParam],
  );

  const removeFilter = useCallback(
    (key: string, value?: string) => {
      pushParams((params) => {
        if (value === undefined) {
          params.delete(key);
        } else {
          const remaining = params.getAll(key).filter((v) => v !== value);
          params.delete(key);
          remaining.forEach((v) => params.append(key, v));
        }
        params.set(pageParam, "1");
      });
    },
    [pushParams, pageParam],
  );

  const resetFilters = useCallback(() => {
    pushParams((params) => {
      [...params.keys()].forEach((key) => {
        if (!reserved.has(key)) params.delete(key);
      });
      params.set(pageParam, "1");
    });
  }, [pushParams, reserved, pageParam]);

  // ----- selection helpers -----
  const toggleSelect = useCallback((id: TId, checked: boolean) => {
    setSelectedIds((prev) =>
      checked ? [...prev, id] : prev.filter((pid) => pid !== id),
    );
  }, []);

  const toggleSelectAll = useCallback((checked: boolean, allIds: TId[]) => {
    setSelectedIds(checked ? [...allIds] : []);
  }, []);

  const isAllSelected = useCallback(
    (allIds: TId[]) =>
      allIds.length > 0 && allIds.every((id) => selectedIds.includes(id)),
    [selectedIds],
  );

  const clearSelection = useCallback(() => setSelectedIds([]), []);

  // ----- data fetching -----
  // Keep the latest callbacks in refs so the effect re-runs on state change
  // only, not on every parent re-render / new callback identity.
  // The current request params / state (non-reset), rebuilt each render.
  const currentParams: Record<string, any> = {
    [pageParam]: page,
    [perPageParam]: Number(perPage),
    ...(committedSearch && { [searchParam]: committedSearch }),
    ...appliedFilters,
  };
  const currentState: TableFetchState = {
    tab,
    search: committedSearch,
    page,
    pageSize: Number(perPage),
    filters: appliedFilters,
    isReset: false,
  };

  const onFetchRef = useRef(onFetch);
  const fetcherRef = useRef(fetcher);
  const paramsRef = useRef(currentParams);
  const stateRef = useRef(currentState);
  useEffect(() => {
    onFetchRef.current = onFetch;
    fetcherRef.current = fetcher;
    paramsRef.current = currentParams;
    stateRef.current = currentState;
  });

  /**
   * Re-run the current fetch (same page / search / filters) without changing the
   * URL — e.g. after a mutation so the list reloads with the active filters.
   */
  const refetch = useCallback(() => {
    if (fetcherRef.current) fetcherRef.current(paramsRef.current);
    else onFetchRef.current?.(stateRef.current);
  }, []);

  useEffect(() => {
    if (!onFetchRef.current && !fetcherRef.current) return;

    const isReset = resetParam ? Boolean(searchParams.get(resetParam)) : false;

    if (isReset) {
      setSelectedIds([]);
      setSearch("");
    }

    // High-level: assemble request params and hand them to the API call.
    if (fetcherRef.current) {
      fetcherRef.current(
        isReset
          ? { [pageParam]: 1, [perPageParam]: Number(defaultPerPage) }
          : currentParams,
      );
      return;
    }

    // Low-level: full control.
    onFetchRef.current!(
      isReset ? { ...currentState, isReset: true } : currentState,
    );
    // currentParams / currentState derive from the deps listed below.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tab, committedSearch, page, perPage, searchParams]);

  return {
    tab,
    page,
    perPage,
    committedSearch,
    filters,
    appliedFilters,
    formatFilterValue,
    query,
    tabs,
    search,
    setSearch,
    submitSearch,
    clearSearch,
    setTab,
    setPage,
    setPerPage,
    setFilter,
    setFilters,
    removeFilter,
    resetFilters,
    refetch,
    selectedIds,
    setSelectedIds,
    toggleSelect,
    toggleSelectAll,
    isAllSelected,
    clearSelection,
  };
}

export default useTableContainer;

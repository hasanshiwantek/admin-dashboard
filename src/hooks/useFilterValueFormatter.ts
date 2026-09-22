"use client";

import { useAppDispatch, useAppSelector } from "@/hooks/useReduxHooks";
import { fetchCategories } from "@/redux/slices/categorySlice";
import { fetchBrands } from "@/redux/slices/productSlice";
import { useCallback, useEffect, useMemo } from "react";

// `enabled = false` skips the fetch entirely, so these are cheap to call
// unconditionally (e.g. from a generic container that may have no such filters).
export function useBrandNameMap(enabled = true): Record<string, string> {
  const dispatch = useAppDispatch();
  const brands = useAppSelector((state: any) => state.product.brands);

  useEffect(() => {
    if (enabled && !brands?.data?.length)
      dispatch(fetchBrands({ page: 1, pageSize: 100 }));
  }, [dispatch, enabled, brands?.data?.length]);

  return useMemo(() => {
    const map: Record<string, string> = {};
    if (!enabled) return map;
    brands?.data?.forEach((b: any) => {
      if (b?.brand?.id != null) map[String(b.brand.id)] = b.brand.name;
    });
    return map;
  }, [brands, enabled]);
}

export function useCategoryNameMap(enabled = true): Record<string, string> {
  const dispatch = useAppDispatch();
  const categoryState = useAppSelector(
    (state: any) => state.category?.categories,
  );

  useEffect(() => {
    if (enabled && !categoryState?.data?.length) dispatch(fetchCategories());
  }, [dispatch, enabled, categoryState?.data?.length]);

  return useMemo(() => {
    const map: Record<string, string> = {};
    if (!enabled) return map;
    const walk = (nodes: any[]) =>
      nodes?.forEach((n: any) => {
        if (n?.id != null) map[String(n.id)] = n.name;
        if (n?.children) walk(n.children);
        if (n?.subCategories) walk(n.subCategories);
      });
    walk(categoryState?.data || []);
    return map;
  }, [categoryState, enabled]);
}

export interface FilterValueFormatterConfig {
  booleanKeys?: Set<string> | string[];
  brandKeys?: string[];
  categoryKeys?: string[];
}

export interface FilterValueFormatterOptions {
  enabled?: boolean;
}

export function useFilterValueFormatter(
  config: FilterValueFormatterConfig = {},
  options: FilterValueFormatterOptions = {},
) {
  const {
    booleanKeys = [],
    brandKeys = ["brandId"],
    categoryKeys = ["categoryIds"],
  } = config;

  /** When false, no fetching happens and the formatter is a passthrough. */
  const enabled = options.enabled ?? true;

  const brandNameById = useBrandNameMap(enabled && brandKeys.length > 0);
  const categoryNameById = useCategoryNameMap(
    enabled && categoryKeys.length > 0,
  );

  const booleanSet = useMemo(
    () => (booleanKeys instanceof Set ? booleanKeys : new Set(booleanKeys)),
    [booleanKeys],
  );
  const brandSet = useMemo(() => new Set(brandKeys), [brandKeys]);
  const categorySet = useMemo(() => new Set(categoryKeys), [categoryKeys]);

  return useCallback(
    (key: string, value: string) => {
      if (!enabled) return value;
      if (booleanSet.has(key))
        return value === "1" || value === "true" ? "enabled" : "disabled";
      if (brandSet.has(key)) return brandNameById[value] || value;
      if (categorySet.has(key)) return categoryNameById[value] || value;
      return value;
    },
    [
      enabled,
      booleanSet,
      brandSet,
      categorySet,
      brandNameById,
      categoryNameById,
    ],
  );
}

"use client";

import { useEffect, useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/useReduxHooks";
import { getReturnOrders } from "@/redux/slices/orderSlice";
import { getReturnsColumns } from "./ReturnsColumns";

export default function useReturnsContainer() {
  const dispatch = useAppDispatch();
  const { returnOrders, returnLoader } = useAppSelector(
    (state: any) => state.order,
  );

  const [keyword, setKeyword] = useState("");
  const [expandedRow, setExpandedRow] = useState<number | null>(null);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  useEffect(() => {
    dispatch(getReturnOrders());
  }, [dispatch]);

  const allReturns = returnOrders?.data || [];

  const data = allReturns.filter((ret: any) => {
    if (!keyword) return true;
    const s = keyword.toLowerCase();
    const productNames =
      ret.product?.map((p: any) => p.name?.toLowerCase()).join(" ") || "";
    return (
      ret.orderNumber?.toLowerCase().includes(s) ||
      ret.customerName?.toLowerCase().includes(s) ||
      ret.reason?.toLowerCase().includes(s) ||
      ret.status?.toLowerCase().includes(s) ||
      productNames.includes(s)
    );
  });

  const toggleRow = (id: number) =>
    setExpandedRow((prev) => (prev === id ? null : id));

  const handleSelectOne = (id: number, checked: boolean) =>
    setSelectedIds((prev) =>
      checked ? [...prev, id] : prev.filter((x) => x !== id),
    );

  const handleSelectAll = (checked: boolean) =>
    setSelectedIds(checked ? data.map((r: any) => r.id) : []);

  const columns = useMemo(
    () => getReturnsColumns(expandedRow, toggleRow),
    [expandedRow, toggleRow],
  );
  return {
    data,
    loading: returnLoader,
    keyword,
    setKeyword,
    expandedRow,
    toggleRow,
    selectedIds,
    handleSelectOne,
    handleSelectAll,
    columns,
  };
}

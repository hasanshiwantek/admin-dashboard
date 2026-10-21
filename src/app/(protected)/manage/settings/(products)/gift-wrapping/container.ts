import { RowAction } from "@/components/ui/Table/types";
import { useAppDispatch, useAppSelector } from "@/hooks/useReduxHooks";
import { fetchGiftWrappings } from "@/redux/slices/productSettingsSlice";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { editGiftWrappingRoute } from "./constant";
import { GiftWrapping } from "./type";

const useGiftWrappingContainer = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const { giftWrappings, giftWrappingsLoading } = useAppSelector(
    (state) => state.productSettings,
  );

  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [rowDeleteId, setRowDeleteId] = useState<number | null>(null);

  useEffect(() => {
    dispatch(fetchGiftWrappings());
  }, [dispatch]);

  const handleToggleRow = (id: number | string, checked: boolean) =>
    setSelectedIds((ids) =>
      checked ? [...ids, Number(id)] : ids.filter((i) => i !== Number(id)),
    );

  const handleToggleAll = (checked: boolean, allIds: (number | string)[]) =>
    setSelectedIds(checked ? allIds.map(Number) : []);

  const rowActions = (): RowAction<GiftWrapping>[] => [
    {
      label: "Edit",
      onClick: (row) => router.push(editGiftWrappingRoute(row.id)),
    },
    { label: "Delete", onClick: (row) => setRowDeleteId(row.id) },
  ];

  const handleDeleted = () => {
    setSelectedIds([]);
    setRowDeleteId(null);
    dispatch(fetchGiftWrappings());
  };

  return {
    giftWrappings,
    loading: giftWrappingsLoading && !giftWrappings.length,
    isEmpty: !giftWrappingsLoading && !giftWrappings.length,
    selectedIds,
    rowDeleteId,
    rowActions,
    handleToggleRow,
    handleToggleAll,
    handleDeleted,
    closeRowDelete: () => setRowDeleteId(null),
  };
};

export default useGiftWrappingContainer;

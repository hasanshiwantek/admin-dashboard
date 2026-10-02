"use client";

import useTableContainer from "@/components/ui/Table/TableContainer";
import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "@/hooks/useReduxHooks";
import {
  deletePromotions,
  fetchPromotions,
  updatePromotionStatus,
} from "@/redux/slices/marketingSlice";
import { useRouter, useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import PromotionsColumn from "./PromotionsColumn";
import {
  DISPLAY_CONFIG,
  PROMOTIONS_BASE_PATH,
  PromotionDisplay,
  PromotionStatus,
  PromotionStatusTabs,
} from "./constant";
import { DiscountStatus, DiscountToggleStatus, Promotion } from "./types";

const usePromotionsContainer = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const dispatch = useAppDispatch();

  const display =
    searchParams.get("display") === PromotionDisplay.Coupon
      ? PromotionDisplay.Coupon
      : PromotionDisplay.Automatic;

  const displayConfig = DISPLAY_CONFIG[display];

  const { promotions, promotionsLoading, promotionsError } = useAppSelector(
    (state) => state.marketingReducer,
  );
  const promotionList: Promotion[] = useMemo(
    () => promotions?.data?.items || [],
    [promotions?.data],
  );
  const pagination = promotions?.pagination;
  const totalPages = pagination?.totalPages ?? pagination?.lastPage ?? 1;

  // Ids waiting on the delete confirmation modal.
  const [pendingDeleteIds, setPendingDeleteIds] = useState<number[]>([]);

  const table = useTableContainer<number>({
    defaultTab: "All",
    defaultPerPage: "20",
    perPageParam: "perPage",
    tabs: PromotionStatusTabs,
    fetcher: (params) => {
      const query: Record<string, any> = {
        kind: display,
        status: "all",
        ...params,
      };
      delete query.display;
      dispatch(fetchPromotions(query));
    },
  });

  const { tab: activeTab, page: currentPage, perPage, selectedIds } = table;

  const isArchivedTab = activeTab === "Archived";
  const total = pagination?.total ?? promotionList.length;

  const editPath = (id: number) => `${PROMOTIONS_BASE_PATH}/${id}`;

  const createPath = (path: string) => `${PROMOTIONS_BASE_PATH}/${path}`;

  const afterMutation = () => {
    table.clearSelection();
    table.refetch();
  };

  // Optimistic: the slice flips the row and rolls back to `previousStatus`
  // if the request fails, so no refetch is needed.
  const onToggleActive = (promotion: Promotion, status: DiscountToggleStatus) =>
    dispatch(
      updatePromotionStatus({
        ids: [promotion.id],
        status,
        previousStatus: promotion.status,
      }),
    );

  const updateStatus = async (ids: number[], status: DiscountStatus) => {
    const result = await dispatch(updatePromotionStatus({ ids, status }));
    if (updatePromotionStatus.fulfilled.match(result)) afterMutation();
  };

  const archive = (ids: number[]) =>
    updateStatus(ids, PromotionStatus.Archived);
  
  // Restored promotions come back inactive.
  const restore = (ids: number[]) =>
    updateStatus(ids, PromotionStatus.Inactive);

  const confirmDelete = async () => {
    const result = await dispatch(deletePromotions({ ids: pendingDeleteIds }));
    setPendingDeleteIds([]);
    if (deletePromotions.fulfilled.match(result)) afterMutation();
  };

  const rowActions = (promotion: Promotion) => [
    { label: "Edit", onClick: () => router.push(editPath(promotion.id)) },
    {
      label: "Copy",
      onClick: () => router.push(createPath(`automatic/${promotion.id}/copy`)),
    },
    promotion.status === "archived"
      ? {
          label: "Restore",
          onClick: () => restore([promotion.id]),
        }
      : {
          label: "Archive",
          onClick: () => archive([promotion.id]),
        },
    { label: "Delete", onClick: () => setPendingDeleteIds([promotion.id]) },
  ];

  const bulkActions = (
    <>
      <Button
        variant="outline"
        size="lg"
        onClick={() =>
          isArchivedTab ? restore(selectedIds) : archive(selectedIds)
        }
      >
        {isArchivedTab ? "Restore Selected" : "Archive"}
      </Button>
      <Button
        variant="outline"
        size="lg"
        onClick={() => setPendingDeleteIds(selectedIds)}
      >
        Delete
      </Button>
    </>
  );

  const columns = PromotionsColumn({
    display,
    usesHeader: displayConfig.usesHeader,
    onEdit: editPath,
    onToggleActive,
  });

  return {
    display,
    displayConfig,
    table,
    columns,
    promotionList,
    loading: promotionsLoading,
    error: promotionsError,
    pagination,
    totalPages,
    currentPage,
    perPage,
    activeTab,
    selectedIds,
    rowActions,
    pendingDeleteIds,
    closeDeleteConfirm: () => setPendingDeleteIds([]),
    confirmDelete,
    createPath,
    router,
    total,
    bulkActions,
  };
};

export default usePromotionsContainer;

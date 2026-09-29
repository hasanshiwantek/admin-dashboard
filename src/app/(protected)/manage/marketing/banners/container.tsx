"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useTableContainer from "@/components/ui/Table/TableContainer";
import { useAppDispatch, useAppSelector } from "@/hooks/useReduxHooks";
import { cn } from "@/lib/utils";
import {
  deleteBanner,
  fetchBanners,
  updateBanner,
} from "@/redux/slices/marketingSlice";
import { ListFilter, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";
import BannersColumn from "./columns";

const TOOLBAR_CONTROL = "h-14! py-4! my-0!";

const useBannerListingPageContainer = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { banners, bannersLoading, deleteLoading } = useAppSelector(
    (state: any) => state.marketingReducer,
  );
  const table = useTableContainer<number>({
    fetcher: (params) => dispatch(fetchBanners(params)),
  });

  const {
    page: currentPage,
    perPage,
    refetch,
    selectedIds,
    clearSelection,
  } = table;

  const [pendingDeleteIds, setPendingDeleteIds] = useState<number[]>([]);

  const requestDelete = (ids: number[]) => {
    if (!ids.length) {
      toast.error("Select at least one banner to delete");
      return;
    }
    setPendingDeleteIds(ids);
  };

  const closeDeleteConfirm = () => setPendingDeleteIds([]);

  // The API deletes one banner per request, so bulk delete fans out.
  const confirmDelete = async () => {
    const results = await Promise.all(
      pendingDeleteIds.map((id) => dispatch(deleteBanner({ id }))),
    );
    const failed = results.filter((r) => deleteBanner.rejected.match(r));
    if (failed.length) {
      toast.error((failed[0].payload as string) || "Failed to delete banner");
    } else {
      toast.success(
        pendingDeleteIds.length > 1 ? "Banners deleted" : "Banner deleted",
      );
    }
    setPendingDeleteIds([]);
    clearSelection();
    refetch();
  };

  const toggleVisible = async (banner: any) => {
    const result = await dispatch(
      updateBanner({ id: banner.id, data: { visible: !banner.visible } }),
    );
    if (updateBanner.rejected.match(result)) {
      toast.error((result.payload as string) || "Failed to update banner");
      return;
    }
    refetch();
  };

  const getRowActions = (banner: any) => [
    {
      label: "Edit",
      onClick: () =>
        router.push(`/manage/marketing/banners/${banner?.id}/edit`),
    },
  ];

  const bannerList: Array<any> = banners?.data ?? [];
  const columns = BannersColumn({
    dispatch,
    refetch,
    router,
    toggleEnable: toggleVisible,
  });
  const pagination = banners?.pagination;
  const totalPages = pagination?.lastPage;

  const bulkActions = (
    <>
      <div
        className={cn(
          "flex items-center gap-2 2xl:!text-2xl pl-4",
          TOOLBAR_CONTROL,
        )}
      >
        <Button
          variant="outline"
          size="xl"
          className={cn("2xl:!text-2xl", TOOLBAR_CONTROL)}
          onClick={() => router.push("/manage/marketing/banners/create")}
        >
          Create a banner
        </Button>
        <Button
          variant="outline"
          size="xl"
          className={cn("2xl:!text-2xl px-2!", TOOLBAR_CONTROL)}
          onClick={() => requestDelete(selectedIds)}
        >
          <Trash className="h-9! w-9!" />
        </Button>
      </div>
      <div className="h-22 border-r border-gray-300 mx-1" />
      <div className={cn("flex items-center 2xl:!text-2xl", TOOLBAR_CONTROL)}>
        <Input
          placeholder="Filter by keyword"
          value={table.search}
          onChange={(e) => table.setSearch(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") table.submitSearch();
          }}
          className={cn("2xl:!text-2xl", TOOLBAR_CONTROL)}
        />
        <Button
          onClick={table.submitSearch}
          variant="outline"
          size="xl"
          className={cn("2xl:!text-2xl", TOOLBAR_CONTROL)}
        >
          <ListFilter
            className="h-9! w-9!"
            stroke="var(--primary-color)"
            fill="var(--primary-color)"
          />
          Filter
        </Button>
      </div>
      <div className="h-22 border-r border-gray-300 mx-1" />
    </>
  );

  return {
    table,
    getRowActions,
    bannerList,
    loading: bannersLoading,
    deleteLoading,
    showDeleteConfirm: pendingDeleteIds.length > 0,
    deleteMessage:
      pendingDeleteIds.length > 1
        ? `Are you sure you want to delete ${pendingDeleteIds.length} banners?`
        : "Are you sure you want to delete this banner?",
    closeDeleteConfirm,
    confirmDelete,
    columns,
    bulkActions,
    pagination: {
      currentPage,
      totalPages,
      perPage,
      total: pagination?.total,
      onPageChange: table.setPage,
      onPerPageChange: table.setPerPage,
    },
  };
};

export default useBannerListingPageContainer;

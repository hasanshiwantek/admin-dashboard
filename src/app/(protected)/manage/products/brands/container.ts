import useTableContainer from "@/components/ui/Table/TableContainer";
import { ActionEnums } from "@/const/appConstants";
import { useAppDispatch, useAppSelector } from "@/hooks/useReduxHooks";
import { fetchBrandByKeyword, fetchBrands } from "@/redux/slices/productSlice";
import { infoMessage } from "@/utils/message";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { getBrandColumns } from "./columns";
import { DEFAULT_BRANDS_PAGE_SIZE, editBrandRoute } from "./constant";
import type { BrandListResponse, BrandRow } from "./type";
import { toBrandRows } from "./utils";

const useBrandsPageContainer = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const { brands, brandsLoading } = useAppSelector((state) => state.product) as {
    brands: BrandListResponse | null;
    brandsLoading: boolean;
  };
  const rows = toBrandRows(brands?.data ?? []);

  const table = useTableContainer<number>({
    defaultPerPage: DEFAULT_BRANDS_PAGE_SIZE,
    fetcher: ({ page, pageSize, search }) =>
      dispatch(
        search
          ? fetchBrandByKeyword({ page, pageSize, keyword: search })
          : fetchBrands({ page, pageSize }),
      ),
  });
  const { selectedIds, setSelectedIds, clearSelection, refetch } = table;

  const [deleteTargets, setDeleteTargets] = useState<BrandRow[]>([]);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const confirmDelete = (targets: BrandRow[]) => {
    setDeleteTargets(targets);
    setDeleteOpen(true);
  };

  const handleBrandAction = (brand: BrandRow) => (action: ActionEnums) => {
    switch (action) {
      case ActionEnums.EDIT:
        return router.push(editBrandRoute(brand.id));
    }
  };

  return {
    table,
    rows,
    loading: brandsLoading && !rows.length,
    pagination: {
      currentPage: table.page,
      totalPages: brands?.pagination?.totalPages ?? 1,
      perPage: table.perPage,
      total: brands?.pagination?.totalCount,
      onPageChange: table.setPage,
      onPerPageChange: table.setPerPage,
    },
    columns: getBrandColumns({ onAction: handleBrandAction }),
    selectedIds,
    setSelectedIds,
    handleDeleteSelected: () => {
      if (!selectedIds.length) {
        return infoMessage("Please select at least one brand before deleting.");
      }
      confirmDelete(rows.filter(({ id }) => selectedIds.includes(id)));
    },
    deleteTargets,
    deleteOpen,
    setDeleteOpen,
    handleDeleted: () => {
      refetch();
      clearSelection();
    },
  };
};

export default useBrandsPageContainer;

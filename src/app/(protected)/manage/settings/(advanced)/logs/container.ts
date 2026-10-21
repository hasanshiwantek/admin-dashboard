import useTableContainer from "@/components/ui/Table/TableContainer";
import { useAppDispatch, useAppSelector } from "@/hooks/useReduxHooks";
import { fetchStaffLogs } from "@/redux/slices/storeLogsSlice";
import { DEFAULT_LOGS_PER_PAGE } from "./constant";
import { StaffLog } from "./type";

const useStoreLogsContainer = () => {
  const dispatch = useAppDispatch();
  const { staffLogs, meta, loading, error } = useAppSelector(
    (state) => state.storeLogs,
  );

  // Page / per-page live in the URL; the table re-fetches when they change
  const table = useTableContainer<number>({
    defaultPerPage: DEFAULT_LOGS_PER_PAGE,
    fetcher: (params) => dispatch(fetchStaffLogs(params)),
  });

  return {
    logs: staffLogs as StaffLog[],
    loading,
    error,
    pagination: {
      currentPage: table.page,
      totalPages: meta?.last_page ?? 1,
      perPage: table.perPage,
      total: meta?.total,
      onPageChange: table.setPage,
      onPerPageChange: table.setPerPage,
    },
  };
};

export default useStoreLogsContainer;

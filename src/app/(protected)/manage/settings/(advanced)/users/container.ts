import { useAppDispatch, useAppSelector } from "@/hooks/useReduxHooks";
import { fetchAdminUsers } from "@/redux/slices/userPermission";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { ADD_USER_ROUTE } from "../constant";
import { getUserColumns } from "./columns";
import { AdminUserRow } from "./type";

const useUsersPageContainer = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { adminUsers, loading } = useAppSelector(
    (state) => state.userPermission,
  );

  const refreshUsers = () => dispatch(fetchAdminUsers());

  useEffect(() => {
    dispatch(fetchAdminUsers());
  }, [dispatch]);

  return {
    users: (adminUsers ?? []) as AdminUserRow[],
    // Loading state only on first load: a refresh keeps rows mounted, so a
    // delete modal open inside a row isn't torn down mid-use
    loading: loading && !adminUsers?.length,
    columns: getUserColumns({ onUserDeleted: refreshUsers }),
    handleAddUser: () => router.push(ADD_USER_ROUTE),
  };
};

export default useUsersPageContainer;

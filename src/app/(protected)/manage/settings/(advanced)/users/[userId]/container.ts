import { useAppDispatch, useAppSelector } from "@/hooks/useReduxHooks";
import {
  fetchAdminUserById,
  fetchPermissions,
  updateAdminUser,
} from "@/redux/slices/userPermission";
import { AdminUserSchema } from "@/validations/formValidations";
import { yupResolver } from "@hookform/resolvers/yup";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { USERS_ROUTE } from "../../constant";
import { userDefaults } from "../constant";
import { UserFormValues } from "../type";
import { transformGetUser, transformPostUpdatedUser } from "../utils";

const useEditUserContainer = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { userId } = useParams<{ userId: string }>();
  const id = Number(userId);

  const {
    permissionGroups,
    permissionsLoading,
    selectedAdminUser,
    selectedAdminPermissions,
    loading,
  } = useAppSelector((state) => state.userPermission);

  const form = useForm<UserFormValues>({
    resolver: yupResolver(AdminUserSchema),
    defaultValues: userDefaults,
  });
  const { reset } = form;

  useEffect(() => {
    dispatch(fetchPermissions());
    if (id) dispatch(fetchAdminUserById({ id }));
  }, [dispatch, id]);

  // Ignore a user left in the store from a previously opened page
  const user = selectedAdminUser?.id === id ? selectedAdminUser : null;

  useEffect(() => {
    if (user) reset(transformGetUser(user, selectedAdminPermissions));
  }, [user, selectedAdminPermissions, reset]);

  const onSubmit = async (values: UserFormValues) => {
    const result = await dispatch(
      updateAdminUser(transformPostUpdatedUser(id, values)),
    );
    if (updateAdminUser.rejected.match(result)) {
      toast.error((result.payload as string) || "Failed to update user");
      return;
    }
    toast.success("User updated");
    router.push(USERS_ROUTE);
  };

  return {
    form,
    permissionGroups: permissionGroups ?? [],
    loading: (permissionsLoading && !permissionGroups?.length) || (loading && !user),
    onSubmit,
    handleCancel: () => router.push(USERS_ROUTE),
  };
};

export default useEditUserContainer;

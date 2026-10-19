import { useAppDispatch, useAppSelector } from "@/hooks/useReduxHooks";
import { registerUser } from "@/redux/slices/authSlice";
import { fetchPermissions } from "@/redux/slices/userPermission";
import { adminUserSchema } from "@/validations/formValidations";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { USERS_ROUTE } from "../../constant";
import { userDefaults } from "../constant";
import { UserFormValues } from "../type";
import { transformPostNewUser } from "../utils";

const useAddUserContainer = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { permissionGroups, permissionsLoading } = useAppSelector(
    (state) => state.userPermission,
  );

  const form = useForm<UserFormValues>({
    resolver: yupResolver(adminUserSchema),
    defaultValues: userDefaults,
  });

  useEffect(() => {
    dispatch(fetchPermissions());
  }, [dispatch]);

  const onSubmit = async (values: UserFormValues) => {
    const result = await dispatch(registerUser(transformPostNewUser(values)));
    if (registerUser.rejected.match(result)) {
      toast.error((result.payload as string) || "Failed to create user");
      return;
    }
    toast.success("User created");
    router.push(USERS_ROUTE);
  };

  return {
    form,
    permissionGroups: permissionGroups ?? [],
    loading: permissionsLoading && !permissionGroups?.length,
    onSubmit,
    handleCancel: () => router.push(USERS_ROUTE),
  };
};

export default useAddUserContainer;

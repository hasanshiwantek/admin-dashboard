import { useAppDispatch } from "@/hooks/useReduxHooks";
import { deleteAdminUser } from "@/redux/slices/userPermission";
import { toast } from "react-toastify";
import { DeleteUserModalProps } from "./type";

const useDeleteUserModalContainer = ({
  user,
  onDeleted,
}: Pick<DeleteUserModalProps, "user" | "onDeleted">) => {
  const dispatch = useAppDispatch();

  // Returns false on failure so the modal stays open
  const handleDelete = async () => {
    const result = await dispatch(deleteAdminUser({ id: user.id }));
    if (deleteAdminUser.rejected.match(result)) {
      toast.error((result.payload as string) || "Failed to delete user");
      return false;
    }
    toast.success("User deleted");
    onDeleted?.();
    return true;
  };

  return { handleDelete };
};

export default useDeleteUserModalContainer;

import { useAppDispatch, useAppSelector } from "@/hooks/useReduxHooks";
import { deleteGiftWrappings } from "@/redux/slices/productSettingsSlice";
import { toast } from "react-toastify";
import { DeleteGiftWrappingModalProps } from "./type";

const useDeleteGiftWrappingContainer = ({
  ids,
  onDeleted,
}: Pick<DeleteGiftWrappingModalProps, "ids" | "onDeleted">) => {
  const dispatch = useAppDispatch();
  const { giftWrappingDeleting } = useAppSelector(
    (state) => state.productSettings,
  );

  // Returns false on failure so the modal stays open
  const handleDelete = async () => {
    const result = await dispatch(deleteGiftWrappings(ids));
    if (deleteGiftWrappings.rejected.match(result)) {
      toast.error(result.payload as string);
      return false;
    }
    toast.success(
      ids.length > 1
        ? "Gift wrapping options deleted"
        : "Gift wrapping option deleted",
    );
    onDeleted?.();
    return true;
  };

  return { handleDelete, deleting: giftWrappingDeleting };
};

export default useDeleteGiftWrappingContainer;

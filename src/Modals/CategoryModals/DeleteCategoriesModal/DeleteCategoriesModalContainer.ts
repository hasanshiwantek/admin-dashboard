import { useAppDispatch } from "@/hooks/useReduxHooks";
import { deleteCategory } from "@/redux/slices/categorySlice";
import { errorMessage, successMessage } from "@/utils/message";
import { DeleteCategoriesModalProps } from "./type";

const useDeleteCategoriesModalContainer = ({
  categories,
  onDeleted,
}: Pick<DeleteCategoriesModalProps, "categories" | "onDeleted">) => {
  const dispatch = useAppDispatch();

  const handleDelete = async () => {
    const result = await dispatch(
      deleteCategory({ data: { ids: categories.map(({ id }) => id) } }),
    );
    if (deleteCategory.rejected.match(result)) {
      errorMessage(result.payload as string);
      return false;
    }
    successMessage(
      categories.length === 1 ? "Category deleted" : "Categories deleted",
    );
    onDeleted?.();
  };

  return { handleDelete };
};

export default useDeleteCategoriesModalContainer;

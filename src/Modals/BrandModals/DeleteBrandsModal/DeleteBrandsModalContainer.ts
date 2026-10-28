import { useAppDispatch } from "@/hooks/useReduxHooks";
import { deleteBrand } from "@/redux/slices/productSlice";
import { errorMessage, successMessage } from "@/utils/message";
import { DeleteBrandsModalProps } from "./type";

const useDeleteBrandsModalContainer = ({
  brands,
  onDeleted,
}: Pick<DeleteBrandsModalProps, "brands" | "onDeleted">) => {
  const dispatch = useAppDispatch();

  const handleDelete = async () => {
    const result = await dispatch(
      deleteBrand({ id: brands.map(({ id }) => id) }),
    );
    if (deleteBrand.rejected.match(result)) {
      errorMessage(result.payload as string);
      return false;
    }
    successMessage(brands.length === 1 ? "Brand deleted" : "Brands deleted");
    onDeleted?.();
  };

  return { handleDelete };
};

export default useDeleteBrandsModalContainer;

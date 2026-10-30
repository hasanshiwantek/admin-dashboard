import { useAppDispatch } from "@/hooks/useReduxHooks";
import { deleteProduct } from "@/redux/slices/productSlice";
import { errorMessage, successMessage } from "@/utils/message";
import { DeleteProductModalProps } from "./type";

const useDeleteProductModalContainer = ({
  products,
  onDeleted,
}: Pick<DeleteProductModalProps, "products" | "onDeleted">) => {
  const dispatch = useAppDispatch();

  const handleDelete = async () => {
    const result = await dispatch(
      deleteProduct({ ids: products.map(({ id }) => id) }),
    );
    if (deleteProduct.rejected.match(result)) {
      errorMessage(result.payload as string);
      return false;
    }
    successMessage(products.length === 1 ? "Product deleted" : "Products deleted");
    onDeleted?.();
  };

  return { handleDelete };
};

export default useDeleteProductModalContainer;

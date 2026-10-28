import { useAppDispatch } from "@/hooks/useReduxHooks";
import { updateProduct } from "@/redux/slices/productSlice";
import { errorMessage, successMessage } from "@/utils/message";
import { EditProductStockSchema } from "@/validations/formValidations";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { editProductStockDefaults } from "./constant";
import type {
  EditProductStockFormValues,
  EditProductStockSheetProps,
} from "./type";
import { transformGetProductStock, transformPostProductStock } from "./utils";

const useEditProductStockContainer = ({
  open,
  product,
  onSaved,
}: Pick<EditProductStockSheetProps, "product" | "onSaved"> & {
  open: boolean;
}) => {
  const dispatch = useAppDispatch();

  const form = useForm<EditProductStockFormValues>({
    resolver: yupResolver(EditProductStockSchema),
    defaultValues: editProductStockDefaults,
  });
  const { reset } = form;

  useEffect(() => {
    if (open) reset(transformGetProductStock(product));
  }, [open, product, reset]);

  const onSubmit = async (values: EditProductStockFormValues) => {
    const result = await dispatch(
      updateProduct({
        body: {
          products: [
            { id: [product.id], fields: transformPostProductStock(values) },
          ],
        },
      }),
    );
    if (updateProduct.rejected.match(result)) {
      errorMessage(result.payload as string);
      return false;
    }
    successMessage("Inventory updated");
    reset(values);
    onSaved?.();
    return true;
  };

  return { form, onSubmit };
};

export default useEditProductStockContainer;

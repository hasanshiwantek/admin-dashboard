import { getDecimalPlaces } from "@/app/(protected)/manage/products/utils";
import { useAppDispatch } from "@/hooks/useReduxHooks";
import { updateProduct } from "@/redux/slices/productSlice";
import { errorMessage, successMessage } from "@/utils/message";
import { EditProductPricesSchema } from "@/validations/formValidations";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { getPriceColumns } from "./columns";
import { editProductPricesDefaults } from "./constant";
import type {
  EditProductPricesFormValues,
  EditProductPricesSheetProps,
} from "./type";
import {
  transformGetProductPrices,
  transformPostProductPrices,
} from "./utils";

const useEditProductPricesContainer = ({
  open,
  product,
  currency,
  onSaved,
}: Pick<EditProductPricesSheetProps, "product" | "currency" | "onSaved"> & {
  open: boolean;
}) => {
  const dispatch = useAppDispatch();

  const validationContext = useRef({ decimalPlaces: 2 });
  validationContext.current.decimalPlaces = getDecimalPlaces(currency);

  const form = useForm<EditProductPricesFormValues>({
    resolver: yupResolver(EditProductPricesSchema),
    defaultValues: editProductPricesDefaults,
    context: validationContext.current,
  });
  const { reset } = form;

  useEffect(() => {
    if (open) reset(transformGetProductPrices(product));
  }, [open, product, reset]);

  const onSubmit = async (values: EditProductPricesFormValues) => {
    const result = await dispatch(
      updateProduct({
        body: {
          products: [
            {
              id: [product.id],
              fields: transformPostProductPrices(values, currency),
            },
          ],
        },
      }),
    );
    if (updateProduct.rejected.match(result)) {
      errorMessage(result.payload as string);
      return false;
    }
    successMessage("Prices updated");
    reset(values);
    onSaved?.();
    return true;
  };

  return {
    form,
    columns: getPriceColumns(currency),
    onSubmit,
  };
};

export default useEditProductPricesContainer;

import { useAppDispatch } from "@/hooks/useReduxHooks";
import { deleteCurrency } from "@/redux/slices/currencySlice";
import { errorMessage } from "@/utils/message";
import { useState } from "react";
import { DeleteCurrencyModalProps } from "./type";

const useDeleteCurrencyContainer = ({
  currency,
  onDeleted,
}: Pick<DeleteCurrencyModalProps, "currency" | "onDeleted">) => {
  const dispatch = useAppDispatch();
  const [deleting, setDeleting] = useState(false);

  // Returns false on failure so the modal stays open
  const handleDelete = async () => {
    setDeleting(true);
    const result = await dispatch(deleteCurrency(currency.id));
    setDeleting(false);
    if (deleteCurrency.rejected.match(result)) {
      errorMessage(result.payload as string);
      return false;
    }
    onDeleted?.();
    return true;
  };

  return { deleting, handleDelete };
};

export default useDeleteCurrencyContainer;

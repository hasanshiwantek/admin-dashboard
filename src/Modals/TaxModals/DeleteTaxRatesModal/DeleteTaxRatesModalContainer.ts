import { DeleteTaxRatesModalProps } from "./type";

const useDeleteTaxRatesModalContainer = ({
  onDeleted,
}: Pick<DeleteTaxRatesModalProps, "rates" | "onDeleted">) => {
  // No tax API yet: wire the delete request here, returning false on failure
  // so the modal stays open
  const handleDelete = async () => {
    onDeleted?.();
    return true;
  };

  return { handleDelete };
};

export default useDeleteTaxRatesModalContainer;

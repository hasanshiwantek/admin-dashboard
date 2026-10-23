import { DeleteTaxZonesModalProps } from "./type";

const useDeleteTaxZonesModalContainer = ({
  onDeleted,
}: Pick<DeleteTaxZonesModalProps, "zones" | "onDeleted">) => {
  // No tax API yet: wire the delete request here, returning false on failure
  // so the modal stays open
  const handleDelete = async () => {
    onDeleted?.();
    return true;
  };

  return { handleDelete };
};

export default useDeleteTaxZonesModalContainer;

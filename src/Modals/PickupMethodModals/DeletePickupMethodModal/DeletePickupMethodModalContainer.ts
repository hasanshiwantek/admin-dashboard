import { DeletePickupMethodModalProps } from "./type";

const useDeletePickupMethodModalContainer = ({
  onDeleted,
}: Pick<DeletePickupMethodModalProps, "pickupMethod" | "onDeleted">) => {
  // No pickup methods API yet: wire the delete request here, returning false
  // on failure so the modal stays open
  const handleDelete = async () => {
    onDeleted?.();
    return true;
  };

  return { handleDelete };
};

export default useDeletePickupMethodModalContainer;

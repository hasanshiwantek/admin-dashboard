import { DeleteLocationModalProps } from "./type";

const useDeleteLocationModalContainer = ({
  onDeleted,
}: Pick<DeleteLocationModalProps, "location" | "onDeleted">) => {
  // No locations API yet: wire the delete request here, returning false on
  // failure so the modal stays open
  const handleDelete = async () => {
    onDeleted?.();
    return true;
  };

  return { handleDelete };
};

export default useDeleteLocationModalContainer;

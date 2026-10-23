import { RemoveTaxClassModalProps } from "./type";

const useRemoveTaxClassModalContainer = ({
  onRemove,
}: Pick<RemoveTaxClassModalProps, "onRemove">) => {
  // Only drops the row; the change is sent with the form's Save
  const handleRemove = () => {
    onRemove();
    return true;
  };

  return { handleRemove };
};

export default useRemoveTaxClassModalContainer;

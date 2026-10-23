import { ResetBasicTaxModalProps } from "./type";

const useResetBasicTaxModalContainer = ({
  onReset,
}: Pick<ResetBasicTaxModalProps, "onReset">) => {
  // No tax API yet: wire the reset request here, returning false on failure
  // so the modal stays open
  const handleReset = async () => {
    onReset?.();
    return true;
  };

  return { handleReset };
};

export default useResetBasicTaxModalContainer;

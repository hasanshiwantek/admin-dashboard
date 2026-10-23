import { BasicTaxTab } from "../constant";
import useBasicTaxShellContainer from "../sharedContainer";

const useBasicTaxGeneralPageContainer = () => {
  const shell = useBasicTaxShellContainer(BasicTaxTab.General);

  return {
    shell,
    // Reload the configuration here once the tax API exists
    handleReset: () => undefined,
  };
};

export default useBasicTaxGeneralPageContainer;

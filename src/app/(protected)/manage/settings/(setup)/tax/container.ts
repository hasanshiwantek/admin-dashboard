import { defaultTaxOverview } from "./constant";
import { getBasicTaxStats, getStoreTaxSettings } from "./utils";

const useTaxPageContainer = () => {
  // Placeholder data until the tax API is available
  const overview = defaultTaxOverview;

  return {
    basicTaxEnabled: overview.basicTaxEnabled,
    basicTaxStats: getBasicTaxStats(overview),
    storeTaxSettings: getStoreTaxSettings(overview),
  };
};

export default useTaxPageContainer;

import { useRouter } from "next/navigation";
import { BasicTaxTab, basicTaxTabRoute, basicTaxTabs } from "./constant";

// Header and tabs shared by every Basic Tax tab route
const useBasicTaxShellContainer = (activeTab: BasicTaxTab) => {
  const router = useRouter();

  // Each tab has its own form, so a router navigation loses nothing
  const handleTabChange = (key: string) =>
    router.push(basicTaxTabRoute(key as BasicTaxTab));

  return { tabs: basicTaxTabs, activeTab, handleTabChange };
};

export default useBasicTaxShellContainer;

import { useParams, useRouter } from "next/navigation";
import { defaultTaxZones, editTaxZoneRoute } from "../constant";
import { NEW_TAX_ZONE_ID, TaxZoneTab, taxZoneRatesRoute, taxZoneTabs } from "./constant";

// Header and tabs shared by the zone settings and tax rates routes
const useTaxZoneShellContainer = (activeTab: TaxZoneTab) => {
  const router = useRouter();
  const { zoneId: zoneIdParam } = useParams<{ zoneId: string }>();

  const isNew = zoneIdParam === NEW_TAX_ZONE_ID;
  const zoneId = isNew ? null : Number(zoneIdParam);

  // Placeholder lookup until the tax API is available. A zone created in this
  // session has no placeholder record, so it falls back to a generic title.
  const zone = zoneId
    ? (defaultTaxZones.find((item) => item.id === zoneId) ?? null)
    : null;

  const handleTabChange = (key: string) => {
    if (!zoneId) return;
    router.push(
      key === TaxZoneTab.Rates
        ? taxZoneRatesRoute(zoneId)
        : editTaxZoneRoute(zoneId),
    );
  };

  return {
    zoneId,
    zone,
    isNew,
    title: isNew ? "Add a tax zone" : `Edit ${zone?.name ?? "tax zone"}`,
    // Rates belong to a saved zone, so a new zone has no tabs yet
    tabs: isNew ? [] : taxZoneTabs,
    activeTab,
    handleTabChange,
  };
};

export default useTaxZoneShellContainer;

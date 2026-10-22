import { ActionEnums } from "@/const/appConstants";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { BasicTaxTab, defaultTaxZones, editTaxZoneRoute } from "../constant";
import useBasicTaxShellContainer from "../sharedContainer";
import { TaxZone } from "../type";
import { getTaxZoneColumns } from "./columns";

const useTaxZonesPageContainer = () => {
  const router = useRouter();
  const shell = useBasicTaxShellContainer(BasicTaxTab.Zones);

  // Placeholder data until the tax API is available
  const zones = defaultTaxZones;

  const [selectedIds, setSelectedIds] = useState<(number | string)[]>([]);
  const [deleteTarget, setDeleteTarget] = useState<TaxZone | null>(null);

  const handleToggleRow = (id: number | string, checked: boolean) =>
    setSelectedIds((ids) =>
      checked ? [...ids, id] : ids.filter((selected) => selected !== id),
    );

  const handleToggleAll = (checked: boolean, allIds: (number | string)[]) =>
    setSelectedIds(checked ? allIds : []);

  const handleZoneAction = (zone: TaxZone) => (action: ActionEnums) => {
    switch (action) {
      case ActionEnums.EDIT:
        return router.push(editTaxZoneRoute(zone.id));
      case ActionEnums.DELETE:
        return setDeleteTarget(zone);
    }
  };

  return {
    shell,
    zones,
    loading: false,
    columns: getTaxZoneColumns({ onAction: handleZoneAction }),
    isZoneSelectable: (zone: TaxZone) => !zone.isDefault,
    selectedIds,
    selectedZones: zones.filter((zone) => selectedIds.includes(zone.id)),
    handleToggleRow,
    handleToggleAll,
    deleteTarget,
    handleDeleteOpenChange: (open: boolean) => !open && setDeleteTarget(null),
    handleDeleted: () => {
      setDeleteTarget(null);
      setSelectedIds([]);
    },
  };
};

export default useTaxZonesPageContainer;

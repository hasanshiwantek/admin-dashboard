import { ActionEnums } from "@/const/appConstants";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { defaultTaxClasses } from "../../../constant";
import {
  addTaxRateRoute,
  defaultTaxRates,
  editTaxRateRoute,
  TaxZoneTab,
} from "../../constant";
import { TaxRateRow } from "../../type";
import { toTaxRateRows } from "../../utils";
import useTaxZoneShellContainer from "../../zoneShellContainer";
import { getTaxRateColumns } from "./columns";

const useTaxRatesPageContainer = () => {
  const router = useRouter();
  const shell = useTaxZoneShellContainer(TaxZoneTab.Rates);
  const zoneId = shell.zoneId ?? 0;

  // Placeholder data until the tax API is available
  const rates = toTaxRateRows(
    defaultTaxRates.filter((rate) => rate.zoneId === zoneId),
    defaultTaxClasses,
  );

  const [selectedIds, setSelectedIds] = useState<(number | string)[]>([]);
  const [deleteTarget, setDeleteTarget] = useState<TaxRateRow | null>(null);

  const handleToggleRow = (id: number | string, checked: boolean) =>
    setSelectedIds((ids) =>
      checked ? [...ids, id] : ids.filter((selected) => selected !== id),
    );

  const handleToggleAll = (checked: boolean, allIds: (number | string)[]) =>
    setSelectedIds(checked ? allIds : []);

  const handleRateAction = (rate: TaxRateRow) => (action: ActionEnums) => {
    switch (action) {
      case ActionEnums.EDIT:
        return router.push(editTaxRateRoute(zoneId, rate.id));
      case ActionEnums.DELETE:
        return setDeleteTarget(rate);
    }
  };

  return {
    shell,
    rates,
    loading: false,
    addRateRoute: addTaxRateRoute(zoneId),
    columns: getTaxRateColumns({ onAction: handleRateAction }),
    selectedIds,
    selectedRates: rates.filter((rate) => selectedIds.includes(rate.id)),
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

export default useTaxRatesPageContainer;

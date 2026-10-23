import { TableSort } from "@/components/ui/Table/types";
import { ActionEnums } from "@/const/appConstants";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { defaultLocations } from "../locations/constant";
import { getPickupMethodColumns } from "./columns";
import {
  DEFAULT_PICKUP_METHOD_SORT,
  defaultPickupMethods,
  editPickupMethodRoute,
} from "./constant";
import { PickupMethodRow } from "./type";
import { sortPickupMethodRows, toPickupMethodRows } from "./utils";

const usePickupMethodsPageContainer = () => {
  const router = useRouter();
  const [sort, setSort] = useState<TableSort | null>(
    DEFAULT_PICKUP_METHOD_SORT,
  );
  const [deleteTarget, setDeleteTarget] = useState<PickupMethodRow | null>(
    null,
  );

  // Placeholder data until the pickup methods and locations APIs exist
  const rows = sortPickupMethodRows(
    toPickupMethodRows(defaultPickupMethods, defaultLocations),
    sort,
  );

  const handlePickupMethodAction =
    (method: PickupMethodRow) => (action: ActionEnums) => {
      switch (action) {
        case ActionEnums.EDIT:
          return router.push(editPickupMethodRoute(method.id));
        case ActionEnums.DELETE:
          return setDeleteTarget(method);
      }
    };

  return {
    rows,
    loading: false,
    columns: getPickupMethodColumns({ onAction: handlePickupMethodAction }),
    sort,
    setSort,
    deleteTarget,
    handleDeleteOpenChange: (open: boolean) => !open && setDeleteTarget(null),
    handleDeleted: () => setDeleteTarget(null),
  };
};

export default usePickupMethodsPageContainer;

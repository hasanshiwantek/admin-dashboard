import { useAppDispatch, useAppSelector } from "@/hooks/useReduxHooks";
import {
  fetchFedexServices,
  fetchShippingMethods,
  fetchShippingZone,
  toggleShippingMethod,
} from "@/redux/slices/shippingSlice";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import { ShippingMethod } from "../type";
import { getZoneName, splitMethodsByType } from "./utils";

const useShippingZonePageContainer = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams<{ id: string }>();
  const zoneId = Number(id);

  const { shippingMethods, methodsLoader, selectedZone } =
    useAppSelector((state) => state.shippingZone);

  useEffect(() => {
    dispatch(fetchFedexServices());
    if (zoneId) {
      dispatch(fetchShippingZone({ zone_id: zoneId }));
      dispatch(fetchShippingMethods({ zone_id: zoneId }));
    }
  }, [dispatch, zoneId]);

  const refreshMethods = () =>
    dispatch(fetchShippingMethods({ zone_id: zoneId }));

  const handleToggleMethod = (method: ShippingMethod) =>
    dispatch(toggleShippingMethod({ method_id: method.id })).finally(
      refreshMethods,
    );

  const { staticMethods, realtimeMethods } =
    splitMethodsByType(shippingMethods);

  return {
    zoneName: getZoneName(selectedZone, zoneId),
    staticMethods,
    realtimeMethods,
    // Both lists come from shippingMethods, so they share one loading flag
    methodsLoader,
    handleToggleMethod,
    // Edit modals open from each row and call this after saving
    handleMethodSaved: () => {
      refreshMethods();
    },
  };
};

export default useShippingZonePageContainer;

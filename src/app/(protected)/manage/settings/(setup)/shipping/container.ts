import { useAppDispatch, useAppSelector } from "@/hooks/useReduxHooks";
import {
  deleteShippingZone,
  fetchAddress,
  fetchShippingZones,
  updateShippingZone,
} from "@/redux/slices/shippingSlice";
import { useEffect } from "react";
import { ShippingZone } from "./type";

const useShippingPageContainer = () => {
  const dispatch = useAppDispatch();
  const { zones, loading, sourceAddress } = useAppSelector(
    (state) => state.shippingZone,
  );

  useEffect(() => {
    dispatch(fetchShippingZones());
    dispatch(fetchAddress());
  }, [dispatch]);

  const refreshZones = () => dispatch(fetchShippingZones());

  const handleToggleZone = (zone: ShippingZone) =>
    dispatch(
      updateShippingZone({
        zone_id: zone.id,
        data: { name: zone.name, is_active: !zone.is_active },
      }),
    ).finally(refreshZones);

  const handleDeleteZone = (zone: ShippingZone) =>
    dispatch(deleteShippingZone({ zone_id: zone.id })).finally(refreshZones);

  return {
    zones,
    loading,
    sourceAddress,
    handleToggleZone,
    handleDeleteZone,
  };
};

export default useShippingPageContainer;

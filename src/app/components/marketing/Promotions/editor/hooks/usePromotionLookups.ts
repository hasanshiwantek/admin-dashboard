"use client";

import { SelectOption } from "@/components/ui/select";
import {
  useBrandNameMap,
  useCategoryNameMap,
} from "@/hooks/useFilterValueFormatter";
import { useAppDispatch, useAppSelector } from "@/hooks/useReduxHooks";
import { toOptions } from "@/lib/utils";
import { fetchShippingZones } from "@/redux/slices/shippingSlice";
import { useEffect, useMemo } from "react";

/** Option sources for the rule builder's category, brand and shipping pickers. */
const usePromotionLookups = () => {
  const dispatch = useAppDispatch();
  const zones: any[] | undefined = useAppSelector(
    (state: any) => state.shippingZone.zones,
  );

  const categoryOptions = toOptions(useCategoryNameMap());
  const brandOptions = toOptions(useBrandNameMap());

  useEffect(() => {
    if (!zones?.length) dispatch(fetchShippingZones());
  }, [dispatch, zones?.length]);

  const zoneOptions = useMemo<SelectOption[]>(
    () =>
      (zones ?? []).map((zone) => ({
        value: String(zone.id),
        label: zone.name,
      })),
    [zones],
  );

  const methodOptions = useMemo<SelectOption[]>(
    () =>
      (zones ?? []).flatMap((zone) =>
        (zone.shipping_methods ?? []).map((method: any) => ({
          value: String(method.id),
          label: `${method.display_name ?? method.name} (${zone.name})`,
        })),
      ),
    [zones],
  );

  return {
    categoryOptions,
    brandOptions,
    zoneOptions,
    methodOptions,
  };
};

export type PromotionLookups = ReturnType<typeof usePromotionLookups>;

export default usePromotionLookups;

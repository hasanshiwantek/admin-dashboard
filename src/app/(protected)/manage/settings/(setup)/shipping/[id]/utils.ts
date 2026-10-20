import { ShippingMethod } from "../type";
import { ShippingMethodType } from "./constant";

// Static quotes (flat rate, free shipping...) vs real-time carrier quotes (FedEx)
export const splitMethodsByType = (methods: ShippingMethod[] = []) => ({
  staticMethods: methods.filter(
    (m) => m.method_type !== ShippingMethodType.FedexRealtime,
  ),
  realtimeMethods: methods.filter(
    (m) => m.method_type === ShippingMethodType.FedexRealtime,
  ),
});

// The store may still hold a zone from a previously opened page; only use it
// when it matches the zone in the URL.
export const getZoneName = (
  zone: { id?: number; name?: string } | null | undefined,
  zoneId: number,
) => (zone?.id === zoneId ? zone?.name : undefined);

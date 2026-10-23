import type { TableSort } from "@/components/ui/Table/types";
import type { PickupMethod, PickupMethodFormValues } from "./type";

export const PICKUP_METHODS_ROUTE = "/manage/settings/pickup-methods";
export const NEW_PICKUP_METHOD_ID = "add";
export const ADD_PICKUP_METHOD_ROUTE = `${PICKUP_METHODS_ROUTE}/${NEW_PICKUP_METHOD_ID}`;
export const editPickupMethodRoute = (id: number | string) =>
  `${PICKUP_METHODS_ROUTE}/${id}`;

export const DEFAULT_PICKUP_METHOD_SORT: TableSort = {
  key: "name",
  direction: "asc",
};

export enum PickupMethodFormNames {
  Name = "name",
  LocationId = "locationId",
  EstimatedReadyTime = "estimatedReadyTime",
  Instructions = "instructions",
}

export const pickupMethodDefaults: PickupMethodFormValues = {
  [PickupMethodFormNames.Name]: "",
  [PickupMethodFormNames.LocationId]: "",
  [PickupMethodFormNames.EstimatedReadyTime]: "",
  [PickupMethodFormNames.Instructions]: "",
};

// Placeholder until the pickup methods API is available
export const defaultPickupMethods: PickupMethod[] = [
  {
    id: 1,
    name: "Audio-Video Devices",
    locationId: 1,
    estimatedReadyTime: "",
    instructions: "",
  },
];

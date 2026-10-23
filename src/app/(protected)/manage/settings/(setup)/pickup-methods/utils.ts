import type { TableSort } from "@/components/ui/Table/types";
import type { Location } from "../locations/type";
import type {
  PickupMethod,
  PickupMethodFormValues,
  PickupMethodPayload,
  PickupMethodRow,
} from "./type";

export const toPickupMethodRows = (
  methods: PickupMethod[],
  locations: Location[],
): PickupMethodRow[] =>
  methods.map((method) => ({
    ...method,
    locationName:
      locations.find((location) => location.id === method.locationId)?.name ??
      "-",
  }));

export const sortPickupMethodRows = (
  rows: PickupMethodRow[],
  sort: TableSort | null,
) => {
  if (!sort) return rows;
  const key = sort.key as keyof PickupMethodRow;
  const direction = sort.direction === "asc" ? 1 : -1;
  return [...rows].sort(
    (a, b) => String(a[key]).localeCompare(String(b[key])) * direction,
  );
};

export const transformGetPickupMethod = (
  method: PickupMethod,
): PickupMethodFormValues => ({
  name: method.name,
  locationId: String(method.locationId),
  estimatedReadyTime: method.estimatedReadyTime,
  instructions: method.instructions,
});

export const transformPostPickupMethod = (
  values: PickupMethodFormValues,
): PickupMethodPayload => ({
  name: values.name,
  locationId: Number(values.locationId),
  estimatedReadyTime: values.estimatedReadyTime,
  instructions: values.instructions,
});

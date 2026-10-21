import { defaultOrderStatuses, OrderStatusesFormNames } from "./constant";
import {
  OrderStatus,
  OrderStatusesFormValues,
  OrderStatusesPayload,
  OrderStatusRow,
} from "./type";

// Form path of a row's name input, e.g. "statuses.3.name"
export const statusNamePath = (
  index: number,
): `statuses.${number}.name` =>
  `${OrderStatusesFormNames.Statuses}.${index}.${OrderStatusesFormNames.Name}`;

export const transformGetOrderStatuses = (
  statuses: OrderStatus[] | null,
): OrderStatusRow[] =>
  defaultOrderStatuses.map((status) => {
    const saved = statuses?.find((s) => String(s.id) === status.id);
    return {
      id: status.id,
      name: saved?.name || status.name,
      defaultName: saved?.defaultName || status.defaultName,
      description: saved?.description || status.description,
    };
  });

export const restoreStatusName = (
  statuses: OrderStatusesFormValues[OrderStatusesFormNames.Statuses],
  status: OrderStatusRow,
) =>
  statuses.map((row) =>
    row[OrderStatusesFormNames.Id] === status.id
      ? { ...row, [OrderStatusesFormNames.Name]: status.defaultName }
      : row,
  );

export const toOrderStatusesFormValues = (
  rows: OrderStatusRow[],
): OrderStatusesFormValues => ({
  [OrderStatusesFormNames.Statuses]: rows.map(({ id, name }) => ({
    [OrderStatusesFormNames.Id]: id,
    [OrderStatusesFormNames.Name]: name,
  })),
});

export const transformPostOrderStatuses = (
  values: OrderStatusesFormValues,
): OrderStatusesPayload => ({
  statuses: values[OrderStatusesFormNames.Statuses].map((status) => ({
    id: status[OrderStatusesFormNames.Id],
    name: status[OrderStatusesFormNames.Name],
  })),
});

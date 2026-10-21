import {
  BackorderMessageFormNames,
  defaultBackorderMessages,
  InventoryFormNames,
  inventorySettingsDefaults,
  OptionUnavailableAction,
  StockLevelDisplay,
  UpdateStockLevels,
} from "./constant";
import {
  BackorderMessage,
  BackorderMessageFormValues,
  InventorySettings,
  InventorySettingsFormValues,
  InventorySettingsPayload,
} from "./type";

// Form path of one backorder message field, e.g. "backorderMessages.1.name"
export const backorderMessagePath = (
  index: number,
  field: BackorderMessageFormNames,
) => `${InventoryFormNames.BackorderMessages}.${index}.${field}`;

// ─── Conditional fields ───────────────────────────────────────

export const isOptionMarkedOutOfStock = (action?: string) =>
  action === OptionUnavailableAction.MarkOutOfStock;

// Backordering only works when stock updates as the order is placed
export const isStockUpdatedOnCompletion = (value?: string) =>
  value === UpdateStockLevels.OrderCompletedOrShipped;

export const isStockLevelShown = (value?: string) =>
  value === StockLevelDisplay.Show || value === StockLevelDisplay.ShowWhenLow;

// Only one message can be the default
export const setDefaultMessage = (
  messages: BackorderMessageFormValues[],
  index: number,
) =>
  messages.map((message, i) => ({
    ...message,
    [BackorderMessageFormNames.IsDefault]: i === index,
  }));

const transformGetBackorderMessages = (
  messages?: BackorderMessage[] | null,
): BackorderMessageFormValues[] =>
  messages?.length
    ? messages.map((message) => ({
        [BackorderMessageFormNames.MessageId]: String(message.id ?? ""),
        [BackorderMessageFormNames.Name]: message.name ?? "",
        [BackorderMessageFormNames.Message]: message.message ?? "",
        [BackorderMessageFormNames.IsDefault]: !!message.isDefault,
      }))
    : defaultBackorderMessages;

export const transformGetInventorySettings = (
  settings: InventorySettings | null,
): InventorySettingsFormValues => {
  const merged = Object.fromEntries(
    Object.entries(inventorySettingsDefaults).map(([field, fallback]) => [
      field,
      settings?.[field as keyof InventorySettings] ?? fallback,
    ]),
  ) as InventorySettingsFormValues;

  return {
    ...merged,
    [InventoryFormNames.BackorderMessages]: transformGetBackorderMessages(
      settings?.backorderMessages,
    ),
  };
};

export const transformPostInventorySettings = (
  values: InventorySettingsFormValues,
): InventorySettingsPayload => ({
  ...values,
  backorderMessages: values[InventoryFormNames.BackorderMessages].map(
    (message) => ({
      id: message[BackorderMessageFormNames.MessageId] || null,
      name: message[BackorderMessageFormNames.Name],
      message: message[BackorderMessageFormNames.Message],
      isDefault: message[BackorderMessageFormNames.IsDefault],
    }),
  ),
});

import type { SelectOption } from "@/components/ui/select";
import type {
  BackorderMessageFormValues,
  InventoryCheckboxConfig,
  InventoryEmailFieldConfig,
  InventorySettingsFormValues,
} from "./type";

export const BACKORDERS_LEARN_MORE_URL =
  "https://support.bigcommerce.com/s/article/Backorders";

// Label above the field, control capped at the width in the design
export const FIELD_LABEL_CLASS =
  "font-semibold text-gray-800 2xl:text-[1.5rem]!";
export const FIELD_CONTROL_CLASS = "max-w-[42rem]";
// Fills the control width; long option labels end in "…" instead of overflowing
export const SELECT_CLASS =
  "max-w-none font-normal [&>[data-slot=select-value]]:block [&>[data-slot=select-value]]:min-w-0 [&>[data-slot=select-value]]:truncate [&>[data-slot=select-value]]:text-[1.4rem]";

// ─── Field names ──────────────────────────────────────────────

export enum InventoryFormNames {
  ProductUnavailableAction = "productUnavailableAction",
  OptionUnavailableAction = "optionUnavailableAction",
  HideOutOfStockInFiltering = "hideOutOfStockInFiltering",
  UpdateStockLevels = "updateStockLevels",
  AutoAdjustStockLevels = "autoAdjustStockLevels",
  StockLevelDisplay = "stockLevelDisplay",
  ShowPreOrderInventory = "showPreOrderInventory",
  OutOfStockMessage = "outOfStockMessage",
  ShowOutOfStockOnListing = "showOutOfStockOnListing",
  ShowQuantityOnBackorder = "showQuantityOnBackorder",
  ShowBackorderMessage = "showBackorderMessage",
  BackorderMessages = "backorderMessages",
  ShowQuantityOnHand = "showQuantityOnHand",
  ShowBackorderPrompt = "showBackorderPrompt",
  BackorderPromptText = "backorderPromptText",
  ShowShippingExpectation = "showShippingExpectation",
  ShippingExpectationText = "shippingExpectationText",
  LowStockEmail = "lowStockEmail",
  OutOfStockEmail = "outOfStockEmail",
}

// One row of the backorder messages table
export enum BackorderMessageFormNames {
  MessageId = "messageId",
  Name = "name",
  Message = "message",
  IsDefault = "isDefault",
}

// ─── Select options ───────────────────────────────────────────

export enum ProductUnavailableAction {
  Hide = "hide",
  HideKeepPageAccessible = "hide-keep-page-accessible",
  RedirectToCategory = "redirect-to-category",
  DoNothing = "do-nothing",
}
export const productUnavailableOptions: SelectOption[] = [
  { value: ProductUnavailableAction.Hide, label: "Hide the product" },
  {
    value: ProductUnavailableAction.HideKeepPageAccessible,
    label: "Hide the product, but leave the product page accessible",
  },
  {
    value: ProductUnavailableAction.RedirectToCategory,
    label: "Redirect to category page",
  },
  { value: ProductUnavailableAction.DoNothing, label: "Do nothing" },
];

export enum OptionUnavailableAction {
  Hide = "hide",
  MarkOutOfStock = "mark-out-of-stock",
  DoNothing = "do-nothing",
}
export const optionUnavailableOptions: SelectOption[] = [
  { value: OptionUnavailableAction.Hide, label: "Hide the option" },
  {
    value: OptionUnavailableAction.MarkOutOfStock,
    label: "Mark the option as out of stock",
  },
  { value: OptionUnavailableAction.DoNothing, label: "Do nothing" },
];

export enum UpdateStockLevels {
  OrderPlaced = "order-placed",
  OrderCompletedOrShipped = "order-completed-or-shipped",
}
export const updateStockLevelsOptions: SelectOption[] = [
  { value: UpdateStockLevels.OrderPlaced, label: "When an order is placed" },
  {
    value: UpdateStockLevels.OrderCompletedOrShipped,
    label: 'When order status is changed to "completed" or "shipped"',
  },
];

export enum StockLevelDisplay {
  Show = "show",
  ShowWhenLow = "show-when-low",
  DontShow = "dont-show",
}
export const stockLevelDisplayOptions: SelectOption[] = [
  { value: StockLevelDisplay.Show, label: "Show stock levels" },
  {
    value: StockLevelDisplay.ShowWhenLow,
    label: "Only show stock levels when stock is low",
  },
  { value: StockLevelDisplay.DontShow, label: "Don’t show stock levels" },
];

// ─── Checkbox groups ──────────────────────────────────────────

export const backorderDisplayCheckboxes: InventoryCheckboxConfig[] = [
  {
    name: InventoryFormNames.ShowQuantityOnBackorder,
    label: "Quantity on backorder",
    description:
      "Display “X will be backordered” when the shopper’s purchase quantity exceeds the available on-hand stock.",
  },
  {
    name: InventoryFormNames.ShowBackorderMessage,
    label: "Backorder message",
    description:
      "Pre-define the message below and select them in Edit Product > Edit Inventory. Changes apply to all products using that message.",
  },
];

export const advancedDisplayCheckboxes: InventoryCheckboxConfig[] = [
  {
    name: InventoryFormNames.ShowQuantityOnHand,
    label: "Quantity on hand",
    description:
      'From Cart and Checkout onward, display "X ready to ship" when the shopper\'s purchase quantity exceeds the available on-hand stock.',
  },
  {
    name: InventoryFormNames.ShowBackorderPrompt,
    label: "Backorder availability prompt",
    description:
      "Display on the Product Detail page to reassure shoppers of backorder availability.",
    inputName: InventoryFormNames.BackorderPromptText,
  },
  {
    name: InventoryFormNames.ShowShippingExpectation,
    label: "Shipping expectation message",
    description:
      "Display from cart and checkout onward to clarify backorder delivery.",
    inputName: InventoryFormNames.ShippingExpectationText,
  },
];

export const emailNotificationFields: InventoryEmailFieldConfig[] = [
  { name: InventoryFormNames.LowStockEmail, label: "Low stock level reached" },
  { name: InventoryFormNames.OutOfStockEmail, label: "Out of stock reached" },
];

// ─── Defaults ─────────────────────────────────────────────────

export const newBackorderMessage: BackorderMessageFormValues = {
  [BackorderMessageFormNames.MessageId]: "",
  [BackorderMessageFormNames.Name]: "",
  [BackorderMessageFormNames.Message]: "",
  [BackorderMessageFormNames.IsDefault]: false,
};

export const defaultBackorderMessages: BackorderMessageFormValues[] = [
  {
    [BackorderMessageFormNames.MessageId]: "1",
    [BackorderMessageFormNames.Name]: "Blank message",
    [BackorderMessageFormNames.Message]: "",
    [BackorderMessageFormNames.IsDefault]: true,
  },
];

export const inventorySettingsDefaults: InventorySettingsFormValues = {
  [InventoryFormNames.ProductUnavailableAction]:
    ProductUnavailableAction.DoNothing,
  [InventoryFormNames.OptionUnavailableAction]: OptionUnavailableAction.DoNothing,
  [InventoryFormNames.HideOutOfStockInFiltering]: false,
  [InventoryFormNames.UpdateStockLevels]: UpdateStockLevels.OrderPlaced,
  [InventoryFormNames.AutoAdjustStockLevels]: false,
  [InventoryFormNames.StockLevelDisplay]: StockLevelDisplay.DontShow,
  [InventoryFormNames.ShowPreOrderInventory]: false,
  [InventoryFormNames.OutOfStockMessage]: "Out of stock",
  [InventoryFormNames.ShowOutOfStockOnListing]: false,
  [InventoryFormNames.ShowQuantityOnBackorder]: false,
  [InventoryFormNames.ShowBackorderMessage]: false,
  [InventoryFormNames.BackorderMessages]: defaultBackorderMessages,
  [InventoryFormNames.ShowQuantityOnHand]: false,
  [InventoryFormNames.ShowBackorderPrompt]: false,
  [InventoryFormNames.BackorderPromptText]: "More available for backorder",
  [InventoryFormNames.ShowShippingExpectation]: false,
  [InventoryFormNames.ShippingExpectationText]:
    "We ship available items right away, and backordered items as soon as they're in stock.",
  [InventoryFormNames.LowStockEmail]: "",
  [InventoryFormNames.OutOfStockEmail]: "",
};

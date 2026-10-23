import type { InventorySettingsSchema } from "@/validations/formValidations";
import type { FieldArrayWithId } from "react-hook-form";
import * as yup from "yup";
import type { InventoryFormNames } from "./constant";

export type InventorySettingsFormValues = yup.InferType<
  typeof InventorySettingsSchema
>;

export type BackorderMessageFormValues =
  InventorySettingsFormValues[InventoryFormNames.BackorderMessages][number];

// A backorder messages table row (useFieldArray adds `fieldKey`)
export type BackorderMessageRow = FieldArrayWithId<
  InventorySettingsFormValues,
  InventoryFormNames.BackorderMessages,
  "fieldKey"
>;

// A checkbox with a description line, optionally followed by a text input
export interface InventoryCheckboxConfig {
  name: InventoryFormNames;
  label: string;
  description: string;
  inputName?: InventoryFormNames;
}

export interface InventoryEmailFieldConfig {
  name: InventoryFormNames;
  label: string;
}

export interface BackorderMessage {
  id?: string | number | null;
  name?: string | null;
  message?: string | null;
  isDefault?: boolean | null;
}

// Inventory settings as the API stores them
export interface InventorySettings {
  productUnavailableAction?: string | null;
  optionUnavailableAction?: string | null;
  hideOutOfStockInFiltering?: boolean | null;
  updateStockLevels?: string | null;
  autoAdjustStockLevels?: boolean | null;
  stockLevelDisplay?: string | null;
  showPreOrderInventory?: boolean | null;
  outOfStockMessage?: string | null;
  showOutOfStockOnListing?: boolean | null;
  showQuantityOnBackorder?: boolean | null;
  showBackorderMessage?: boolean | null;
  backorderMessages?: BackorderMessage[] | null;
  showQuantityOnHand?: boolean | null;
  showBackorderPrompt?: boolean | null;
  backorderPromptText?: string | null;
  showShippingExpectation?: boolean | null;
  shippingExpectationText?: string | null;
  lowStockEmail?: string | null;
  outOfStockEmail?: string | null;
}

export interface BackorderMessagePayload {
  id: string | null;
  name: string;
  message: string;
  isDefault: boolean;
}

export interface InventorySettingsPayload {
  productUnavailableAction: string;
  optionUnavailableAction: string;
  hideOutOfStockInFiltering: boolean;
  updateStockLevels: string;
  autoAdjustStockLevels: boolean;
  stockLevelDisplay: string;
  showPreOrderInventory: boolean;
  outOfStockMessage: string;
  showOutOfStockOnListing: boolean;
  showQuantityOnBackorder: boolean;
  showBackorderMessage: boolean;
  backorderMessages: BackorderMessagePayload[];
  showQuantityOnHand: boolean;
  showBackorderPrompt: boolean;
  backorderPromptText: string;
  showShippingExpectation: boolean;
  shippingExpectationText: string;
  lowStockEmail: string;
  outOfStockEmail: string;
}

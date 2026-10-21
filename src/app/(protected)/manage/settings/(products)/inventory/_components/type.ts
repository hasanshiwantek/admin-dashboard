import type { ColumnDef } from "@/components/ui/Table/types";
import type { BackorderMessageRow, InventoryCheckboxConfig } from "../type";

export interface GeneralSectionProps {
  /** "Mark the option as out of stock" is selected */
  showHideInFiltering: boolean;
  /** Stock updates on completed/shipped, which breaks backordering */
  showBackorderNotice: boolean;
}

export interface StockLevelSectionProps {
  /** Stock levels are shown (always or when low) */
  showPreOrderInventory: boolean;
}

export interface InventoryCheckboxProps {
  option: InventoryCheckboxConfig;
}

export interface BackorderDisplaySectionProps {
  messages: BackorderMessageRow[];
  columns: ColumnDef<BackorderMessageRow>[];
  hasMessageErrors: boolean;
  onAddMessage: () => void;
}

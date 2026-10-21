import { ReactNode } from "react";
import { ChargeShippingType } from "./constant";

// Shared by every shipping modal: the caller only passes what opens it.
// The modal owns its own open/close state.
export interface ShippingModalProps {
  /** Element that opens the modal, e.g. an "Edit" button */
  trigger: ReactNode;
  /** Called after a successful save, e.g. to refresh a list */
  onSaved?: () => void;
}

// Modals that edit one shipping method
export interface ShippingMethodModalProps extends ShippingModalProps {
  methodId?: number | string;
}

// API response shape (from get-method/{id})
export interface MethodApiRange {
  from: number;
  up_to: number;
  cost: number;
}

export interface ShippingMethodApiData {
  id: number;
  charge_shipping_by: ChargeShippingType;
  display_name: string;
  is_active: boolean;
  default_shipping_cost: string | null;
  rate_display_type: string | null;
  custom_description: string | null;
  ranges: MethodApiRange[] | null;
}

// Payload for updateShippingMethod
export interface ShippingMethodUpdatePayload {
  display_name: string;
  is_active: boolean;
  charge_shipping_by: ChargeShippingType;
  default_shipping_cost: number | null;
  rate_display_type: string;
  custom_description: string;
  ranges: MethodApiRange[];
}


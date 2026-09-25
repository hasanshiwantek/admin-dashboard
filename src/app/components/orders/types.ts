import { AppDispatch } from "@/redux/store";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { ReactNode } from "react";

export interface RiskInfo {
  icon: ReactNode;
  label: string;
  extendLabel: string;
}

export interface StatusOption {
  label: string;
  value: string;
  color: string;
}

export interface OrderDetailRowProps {
  order: any;
  onCaptureFunds: (paymentIntentId: string) => void;
  onViewShipmentId: (orderId: number | string) => void;
  onShipItems: (order: any) => void;
}

export interface OrderColumnsProps {
  router: AppRouterInstance;
  dispatch: AppDispatch;
  refetch: () => void;
  clearSelection: () => void;
  isExpanded: (order: any) => boolean;
  onToggleExpand: (orderId: number) => void;
  isAllExpanded: boolean;
  onToggleExpandAll: () => void;
  onCaptureFunds: (paymentIntentId: string) => void;
  onViewNotes: (orderId: number) => void;
}

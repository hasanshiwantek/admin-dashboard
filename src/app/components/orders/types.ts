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

export interface OrderActionOption {
  label: string;
  value: string;
  group?: string;
}

export interface OrderProduct {
  name: string;
  sku?: string;
  price: number;
  quantity: number;
  productUrl?: string;
  optionSet?: { title?: string };
  brand?: { name?: string };
}

export interface OrderTotalRow {
  label: string;
  value: string;
}

export interface OrderInfoItem {
  key: string;
  label: ReactNode;
  content: ReactNode;
  rowClassName?: string;
}

export interface OrderInfoListProps {
  items: (OrderInfoItem | false | null | undefined)[];
}

export interface OrderSectionHeaderProps {
  title: string;
  onCopy?: () => void;
}

export interface OrderBillingDetailsProps {
  order: any;
  onCaptureFunds: (paymentIntentId: string) => void;
}

export interface OrderShippingDetailsProps {
  order: any;
}

export interface OrderItemsSummaryProps {
  order: any;
  onViewShipmentId: (orderId: number | string) => void;
  onShipItems: (order: any) => void;
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

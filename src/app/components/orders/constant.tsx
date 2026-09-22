import { SelectOption } from "@/components/ui/select";
import { TableTab } from "@/components/ui/Table/types";
import { BadgeCheck, BadgeX, TriangleAlert } from "lucide-react";
import { RiskInfo, StatusOption } from "./types";

export const COMPLETED = "completed";
export const AUTHORIZED = "authorized";

export const OrderTabs: TableTab[] = [
  { key: "All orders", label: "All orders", filters: {} },
  {
    key: "Awaiting Payment",
    label: "Awaiting Payment",
    filters: { status: "Awaiting Payment" },
  },
  {
    key: "Awaiting Fulfillment",
    label: "Awaiting Fulfillment",
    filters: { status: "Awaiting Fulfillment" },
  },
  {
    key: "Awaiting Shipment",
    label: "Awaiting Shipment",
    filters: { status: "Awaiting Shipment" },
  },
  { key: "High Risk", label: "High Risk", filters: { status: "High Risk" } },
  { key: "Refunded", label: "Refunded", filters: { status: "Refunded" } },
  { key: "Shipped", label: "Shipped", filters: { status: "Shipped" } },
  {
    key: "Incomplete",
    label: "Incomplete",
    filters: { status: "Incomplete" },
  },
];

export const statusOptions: StatusOption[] = [
  { label: "Pending", value: "Pending", color: "bg-[#879193]" },
  {
    label: "Awaiting Payment",
    value: "Awaiting Payment",
    color: "bg-[#ff9000]",
  },
  {
    label: "Awaiting Fulfillment",
    value: "Awaiting Fulfillment",
    color: "bg-[#72cdfa]",
  },
  {
    label: "Awaiting Shipment",
    value: "Awaiting Shipment",
    color: "bg-[#cd3101]",
  },
  { label: "Awaiting Pickup", value: "Awaiting Pickup", color: "bg-[#c979f2]" },
  {
    label: "Partially Shipped",
    value: "Partially Shipped",
    color: "bg-[#4a6fb3]",
  },
  { label: "Completed", value: "Completed", color: "bg-[#BDDF57]" },
  { label: "Shipped", value: "Shipped", color: "bg-[#BDDF57]" },
  { label: "Cancelled", value: "Cancelled", color: "bg-[#000000]" },
  { label: "Declined", value: "Declined", color: "bg-[#7F5F3C]" },
  { label: "Refunded", value: "Refunded", color: "bg-[#FCCB05]" },
  { label: "Disputed", value: "Disputed", color: "bg-[#9966FF]" },
  {
    label: "Manual Verification Required",
    value: "Manual Verification Required",
    color: "bg-[#E7A0AE]",
  },
  {
    label: "Partially Refunded",
    value: "Partially Refunded",
    color: "bg-[#FCCB05]",
  },
];

export enum BulkStatusAction {
  Pending = "1",
  Shipped = "2",
  PartiallyShipped = "3",
  Refunded = "4",
  Cancelled = "5",
  Declined = "6",
  AwaitingPayment = "7",
  AwaitingShipment = "9",
  AwaitingPickup = "8",
  Completed = "10",
  AwaitingFulfillment = "11",
  ManualVerificationRequired = "12",
  Disputed = "13",
  PartiallyRefunded = "14",
}

export const STATUS_MAP: Record<string, string> = {
  [BulkStatusAction.Pending]: "Pending",
  [BulkStatusAction.AwaitingPayment]: "Awaiting Payment",
  [BulkStatusAction.AwaitingFulfillment]: "Awaiting Fulfillment",
  [BulkStatusAction.AwaitingShipment]: "Awaiting Shipment",
  [BulkStatusAction.AwaitingPickup]: "Awaiting Pickup",
  [BulkStatusAction.PartiallyShipped]: "Partially Shipped",
  [BulkStatusAction.Completed]: "Completed",
  [BulkStatusAction.Shipped]: "Shipped",
  [BulkStatusAction.Declined]: "Declined",
  [BulkStatusAction.Refunded]: "Refunded",
  [BulkStatusAction.Cancelled]: "Cancelled",
  [BulkStatusAction.Disputed]: "Disputed",
  [BulkStatusAction.ManualVerificationRequired]: "Manual Verification Required",
  [BulkStatusAction.PartiallyRefunded]: "Partially Refunded",
};

export const BULK_STATUS_ACTIONS: SelectOption[] = [
  { label: "Pending", value: BulkStatusAction.Pending },
  { label: "Awaiting Payment", value: BulkStatusAction.AwaitingPayment },
  {
    label: "Awaiting Fulfillment",
    value: BulkStatusAction.AwaitingFulfillment,
  },
  { label: "Awaiting Shipment", value: BulkStatusAction.AwaitingShipment },
  { label: "Awaiting Pickup", value: BulkStatusAction.AwaitingPickup },
  { label: "Partially Shipped", value: BulkStatusAction.PartiallyShipped },
  { label: "Completed", value: BulkStatusAction.Completed },
  { label: "Shipped", value: BulkStatusAction.Shipped },
  { label: "Cancelled", value: BulkStatusAction.Cancelled },
  { label: "Declined", value: BulkStatusAction.Declined },
  { label: "Refunded", value: BulkStatusAction.Refunded },
  { label: "Disputed", value: BulkStatusAction.Disputed },
  {
    label: "Manual Verification Required",
    value: BulkStatusAction.ManualVerificationRequired,
  },
  {
    label: "Partially Refunded",
    value: BulkStatusAction.PartiallyRefunded,
  },
];

export enum BulkOrderAction {
  PrintMultiOrderInvoices = "printMultiOrderInvoices",
  PrintOrderPackingSlips = "printOrderPackingSlips",
  ResendOrderInvoices = "resendOrderInvoices",
  BulkCapture = "bulkCapture",
}

export const BULK_ORDER_ACTIONS: SelectOption[] = [
  {
    label: "Print invoices for selected",
    value: BulkOrderAction.PrintMultiOrderInvoices,
  },
  {
    label: "Print packing slips for selected",
    value: BulkOrderAction.PrintOrderPackingSlips,
  },
  {
    label: "Resend invoices for selected",
    value: BulkOrderAction.ResendOrderInvoices,
  },
  {
    label: "Capture funds for selected",
    value: BulkOrderAction.BulkCapture,
  },
];

export const riskConfig: Record<string, RiskInfo> = {
  normal: {
    icon: <BadgeCheck className="w-6 h-6 text-white fill-green-500" />,
    label: "Fraudulent Check Approved",
    extendLabel: "Approved",
  },
  elevated: {
    icon: <TriangleAlert className="w-6 h-6 text-white fill-yellow-500" />,
    label:
      "Manual Verification Required — Please check the transaction details in your Payment Provider's control panel for why this order has been flagged for review.",
    extendLabel: "Verification required",
  },
  highest: {
    icon: <BadgeX className="w-6 h-6 text-white fill-red-500" />,
    label: "Fraudulent Order Rejected",
    extendLabel: "Rejected",
  },
};

export const ORDER_FILTER_LABELS: Record<string, string> = {
  status: "Status",
  keyword: "Keyword",
  keywords: "Keyword",
  paymentMethod: "Payment method",
  shippingProvider: "Shipping provider",
  shippingMethod: "Shipping method",
  coupon: "Coupon",
  orderIdFrom: "Order ID from",
  orderIdTo: "Order ID to",
  orderTotalFrom: "Total from",
  orderTotalTo: "Total to",
  dateRange: "Date range",
  dateType: "Date type",
  sortBy: "Sort by",
  sortDirection: "Order",
  productId: "Product",
};

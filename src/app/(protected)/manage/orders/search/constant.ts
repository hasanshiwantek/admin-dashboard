import { OrderSearchFormValues } from "./type";

export enum OrderSearchField {
  Keywords = "keywords",
  Status = "status",
  PaymentMethod = "paymentMethod",
  Coupon = "coupon",
  OrderIdFrom = "orderIdFrom",
  OrderIdTo = "orderIdTo",
  OrderTotalFrom = "orderTotalFrom",
  OrderTotalTo = "orderTotalTo",
  DateRange = "dateRange",
  SortBy = "sortBy",
  SortDirection = "sortDirection",
}

export enum OrderStatus {
  AwaitingPayment = "Awaiting Payment",
  Pending = "Pending",
  AwaitingFulfillment = "Awaiting Fulfillment",
  AwaitingShipment = "Awaiting Shipment",
  AwaitingPickup = "Awaiting Pickup",
  PartiallyShipped = "Partially Shipped",
  Completed = "Completed",
  Shipped = "Shipped",
  Cancelled = "Cancelled",
  Declined = "Declined",
  Refunded = "Refunded",
  Disputed = "Disputed",
  ManualVerificationRequired = "Manual Verification Required",
  PartiallyRefunded = "Partially Refunded",
}

export const orderStatusOptions = [
  { label: "Awaiting Payment", value: OrderStatus.AwaitingPayment },
  { label: "Pending", value: OrderStatus.Pending },
  { label: "Awaiting Fulfillment", value: OrderStatus.AwaitingFulfillment },
  { label: "Awaiting Shipment", value: OrderStatus.AwaitingShipment },
  { label: "Awaiting Pickup", value: OrderStatus.AwaitingPickup },
  { label: "Partially Shipped", value: OrderStatus.PartiallyShipped },
  { label: "Completed", value: OrderStatus.Completed },
  { label: "Shipped", value: OrderStatus.Shipped },
  { label: "Cancelled", value: OrderStatus.Cancelled },
  { label: "Declined", value: OrderStatus.Declined },
  { label: "Refunded", value: OrderStatus.Refunded },
  { label: "Disputed", value: OrderStatus.Disputed },
  {
    label: "Manual Verification Required",
    value: OrderStatus.ManualVerificationRequired,
  },
  { label: "Partially Refunded", value: OrderStatus.PartiallyRefunded },
];

export enum PaymentMethod {
  GooglePay = "google_pay",
  Stripe = "stripe",
  CreditCard = "credit_card",
}

export const paymentMethodOptions = [
  { label: "Google pay", value: PaymentMethod.GooglePay },
  { label: "Stripe", value: PaymentMethod.Stripe },
  { label: "Credit Card", value: PaymentMethod.CreditCard },
];
export enum DateRange {
  Today = "Today",
  Yesterday = "Yesterday",
  Last24Hours = "Last24Hours",
  Last7Days = "Last7Days",
  Last30Days = "Last30Days",
  ThisMonth = "ThisMonth",
  ThisYear = "ThisYear",
  CustomPeriod = "CustomPeriod",
}

export const dateRangeOptions = [
  { label: "Today", value: DateRange.Today },
  { label: "Yesterday", value: DateRange.Yesterday },
  { label: "Last 24 hours", value: DateRange.Last24Hours },
  { label: "Last 7 days", value: DateRange.Last7Days },
  { label: "Last 30 days", value: DateRange.Last30Days },
  { label: "This month", value: DateRange.ThisMonth },
  { label: "This year", value: DateRange.ThisYear },
  { label: "Custom period", value: DateRange.CustomPeriod },
];
export enum SortBy {
  Date = "date",
  Id = "id",
  Customer = "customer",
  Status = "status",
  Total = "total",
}

export enum SortDirection {
  Asc = "asc",
  Desc = "desc",
}

export const sortByOptions = [
  { label: "Date", value: SortBy.Date },
  { label: "ID", value: SortBy.Id },
  { label: "Customer", value: SortBy.Customer },
  { label: "Status", value: SortBy.Status },
  { label: "Total", value: SortBy.Total },
];

export const sortDirectionOptions = [
  { label: "Ascending Order", value: SortDirection.Asc },
  { label: "Descending Order", value: SortDirection.Desc },
];
export const ORDER_ROUTES = {
  list: "/manage/orders",
  search: "/manage/orders/search",
} as const;

export const defaultValues: OrderSearchFormValues = {
  [OrderSearchField.Keywords]: "",
  [OrderSearchField.Status]: "",
  [OrderSearchField.PaymentMethod]: "",
  [OrderSearchField.Coupon]: "",
  [OrderSearchField.OrderIdFrom]: "",
  [OrderSearchField.OrderIdTo]: "",
  [OrderSearchField.OrderTotalFrom]: "",
  [OrderSearchField.OrderTotalTo]: "",
  [OrderSearchField.DateRange]: "",
  [OrderSearchField.SortBy]: "id",
  [OrderSearchField.SortDirection]: "asc",
};

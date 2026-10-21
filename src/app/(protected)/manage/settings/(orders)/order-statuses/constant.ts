import type { OrderStatusRow, OrderStatusesFormValues } from "./type";

export const ORDER_STATUSES_LEARN_MORE_URL =
  "https://support.bigcommerce.com/s/article/Order-Statuses";

export const RESTORE_DEFAULT_LABEL = "Restore to default";

export enum OrderStatusesFormNames {
  Statuses = "statuses",
  Id = "id",
  Name = "name",
}

// Ids match the order status ids used across the app; Incomplete is 0
export const defaultOrderStatuses: OrderStatusRow[] = [
  {
    id: "0",
    name: "Incomplete",
    defaultName: "Incomplete",
    description:
      "An incomplete order happens when a shopper reached the payment page, but did not complete the transaction.",
  },
  {
    id: "1",
    name: "Pending",
    defaultName: "Pending",
    description:
      "Customer started the checkout process, but did not complete it.",
  },
  {
    id: "7",
    name: "Awaiting Payment",
    defaultName: "Awaiting Payment",
    description:
      "Customer has completed checkout process, but payment has yet to be confirmed.",
  },
  {
    id: "11",
    name: "Awaiting Fulfillment",
    defaultName: "Awaiting Fulfillment",
    description:
      "Customer has completed the checkout process and payment has been confirmed.",
  },
  {
    id: "9",
    name: "Awaiting Shipment",
    defaultName: "Awaiting Shipment",
    description:
      "Order has been pulled and packaged, and is awaiting collection from a shipping provider.",
  },
  {
    id: "8",
    name: "Awaiting Pickup",
    defaultName: "Awaiting Pickup",
    description:
      "Order has been pulled, and is awaiting customer pickup from a seller-specified location.",
  },
  {
    id: "3",
    name: "Partially Shipped",
    defaultName: "Partially Shipped",
    description:
      "Only some items in the order have been shipped, due to some products being pre-order only or other reasons.",
  },
  {
    id: "10",
    name: "Completed",
    defaultName: "Completed",
    description:
      "Client has paid for their digital product and their file(s) are available for download.",
  },
  {
    id: "2",
    name: "Shipped",
    defaultName: "Shipped",
    description:
      "Order has been shipped, but receipt has not been confirmed; seller has used the Ship Items action.",
  },
  {
    id: "5",
    name: "Cancelled",
    defaultName: "Cancelled",
    description:
      "Seller has cancelled an order, due to a stock inconsistency or other reasons.",
  },
  {
    id: "6",
    name: "Declined",
    defaultName: "Declined",
    description:
      "Seller has marked the order as declined for lack of manual payment, or other reasons.",
  },
  {
    id: "4",
    name: "Refunded",
    defaultName: "Refunded",
    description: "Seller has used the Refund action.",
  },
  {
    id: "13",
    name: "Disputed",
    defaultName: "Disputed",
    description:
      "Customer has initiated a dispute resolution process for the PayPal transaction that paid for the order.",
  },
  {
    id: "12",
    name: "Manual Verification Required",
    defaultName: "Manual Verification Required",
    description:
      "Order on hold while some aspect needs to be manually confirmed.",
  },
  {
    id: "14",
    name: "Partially Refunded",
    defaultName: "Partially Refunded",
    description: "Seller has partially refunded the order.",
  },
];

export const orderStatusesDefaults: OrderStatusesFormValues = {
  [OrderStatusesFormNames.Statuses]: [],
};

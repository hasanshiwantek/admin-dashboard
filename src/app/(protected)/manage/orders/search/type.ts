import { OrderSearchField } from "./constant";

export type OrderSearchFormValues = {
  [OrderSearchField.keywords]: string;
  [OrderSearchField.status]: string;
  [OrderSearchField.paymentMethod]: string;
  [OrderSearchField.coupon]: string;
  [OrderSearchField.orderIdFrom]: string;
  [OrderSearchField.orderIdTo]: string;
  [OrderSearchField.orderTotalFrom]: string;
  [OrderSearchField.orderTotalTo]: string;
  [OrderSearchField.dateRange]: string;
  [OrderSearchField.sortBy]: string;
  [OrderSearchField.sortDirection]: string;
};

export type OrderSearchFieldName =
  (typeof OrderSearchField)[keyof typeof OrderSearchField];

import { OrderSearchField } from "./constant";

export type OrderSearchFormValues = {
  [OrderSearchField.Keywords]: string;
  [OrderSearchField.Status]: string;
  [OrderSearchField.PaymentMethod]: string;
  [OrderSearchField.Coupon]: string;
  [OrderSearchField.OrderIdFrom]: string;
  [OrderSearchField.OrderIdTo]: string;
  [OrderSearchField.OrderTotalFrom]: string;
  [OrderSearchField.OrderTotalTo]: string;
  [OrderSearchField.DateRange]: string;
  [OrderSearchField.SortBy]: string;
  [OrderSearchField.SortDirection]: string;
};
export type OrderSearchFieldName =
  (typeof OrderSearchField)[keyof typeof OrderSearchField];

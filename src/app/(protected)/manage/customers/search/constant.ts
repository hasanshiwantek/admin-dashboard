

import { SearchCustomerValues, SelectOption } from "./type";



export const LIST_PATH = "/manage/customers";

export const searchCustomerDefaultValues: SearchCustomerValues = {
  searchKeywords: "",
  startsWith: "",
  phone: "",
  country: "",
  stateProvince: "",
  customerIdFrom: "",
  customerIdTo: "",
  ordersFrom: "",
  ordersTo: "",
  creditFrom: "",
  creditTo: "",
  dateJoined: "",
  customerGroup: "",
  sortBy: "",
  sortOrder: "",
};
export enum DateFilter {
  Today = "today",
  Yesterday = "yesterday",
  Last24Hours = "last_24_hours",
  Last7Days = "last_7_days",
  Last30Days = "last_30_days",
  ThisMonth = "this_month",
  ThisYear = "this_year",
  Custom = "custom",
}
export const DateOptions: SelectOption[] = [
  { value: DateFilter.Today, label: "Today" },
  { value: DateFilter.Yesterday, label: "Yesterday" },
  { value: DateFilter.Last24Hours, label: "Last 24 hours" },
  { value: DateFilter.Last7Days, label: "Last 7 days" },
  { value: DateFilter.Last30Days, label: "Last 30 days" },
  { value: DateFilter.ThisMonth, label: "This month" },
  { value: DateFilter.ThisYear, label: "This year" },
  { value: DateFilter.Custom, label: "Custom period" },
];

export const SortByOptions: SelectOption[] = [
  { value: "id", label: "ID" },
  { value: "name", label: "Name" },
  { value: "email", label: "Email" },
  { value: "orders", label: "Orders" },
];

export const SortOrderOptions: SelectOption[] = [
  { value: "asc", label: "Ascending order" },
  { value: "desc", label: "Descending order" },
];


export enum SearchCustomerFields {
  SearchKeywords = "searchKeywords",
  StartsWith = "startsWith",
  Phone = "phone",
  Country = "country",
  StateProvince = "stateProvince",
  CustomerIdFrom = "customerIdFrom",
  CustomerIdTo = "customerIdTo",
  OrdersFrom = "ordersFrom",
  OrdersTo = "ordersTo",
  CreditFrom = "creditFrom",
  CreditTo = "creditTo",
  DateJoined = "dateJoined",
  CustomerGroup = "customerGroup",
  SortBy = "sortBy",
  SortOrder = "sortOrder",
}
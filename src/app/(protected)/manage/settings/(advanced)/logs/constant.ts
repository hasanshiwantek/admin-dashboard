export enum StoreLogTab {
  StaffActions = "staff-actions",
}

// Only the staff action log exists so far; more log types become more tabs
export const storeLogTabs = [
  { key: StoreLogTab.StaffActions, label: "Staff action log" },
];

export const STORE_LOGS_DESCRIPTION =
  "When an event occurs in your store, a log entry is created. Logs help troubleshoot issues and track events for the past 365 days.";

export const STAFF_LOG_DESCRIPTION =
  "The staff log keeps track of all events that have taken place in the control panel of your store (the area your employees see).";

export const DEFAULT_LOGS_PER_PAGE = "20";

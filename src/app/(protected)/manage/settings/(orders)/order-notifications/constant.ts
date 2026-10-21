import { BULK_STATUS_ACTIONS } from "@/app/components/orders/constant";
import type { SelectOption } from "@/components/ui/select";
import type { OrderNotificationFormValues } from "./type";

export const SETTINGS_ROUTE = "/manage/settings";

export enum NotificationTab {
  General = "general",
  EmailMessage = "email-message",
}

export const notificationTabs = [
  { key: NotificationTab.General, label: "General Settings" },
  { key: NotificationTab.EmailMessage, label: "Email Message" },
];

export enum NotificationMethod {
  Email = "email",
}

export const notificationMethodOptions: SelectOption[] = [
  { value: NotificationMethod.Email, label: "Email Message" },
];

export const METHOD_TAB: Record<NotificationMethod, NotificationTab> = {
  [NotificationMethod.Email]: NotificationTab.EmailMessage,
};

export enum OrderNotificationFormNames {
  Methods = "methods",
  CustomerEmailStatuses = "customerEmailStatuses",
  EmailAddress = "emailAddress",
}

// Which tab shows each field; used to jump to the tab with an error
export const FIELD_TAB: Record<OrderNotificationFormNames, NotificationTab> = {
  [OrderNotificationFormNames.Methods]: NotificationTab.General,
  [OrderNotificationFormNames.CustomerEmailStatuses]: NotificationTab.General,
  [OrderNotificationFormNames.EmailAddress]: NotificationTab.EmailMessage,
};

// Values are order status ids
export const customerEmailStatusOptions: SelectOption[] =
  BULK_STATUS_ACTIONS.map((status) => ({
    value: status.value,
    label: `Order status changed to ${status.label}`,
  }));

export const orderNotificationDefaults: OrderNotificationFormValues = {
  [OrderNotificationFormNames.Methods]: [],
  [OrderNotificationFormNames.CustomerEmailStatuses]: [],
  [OrderNotificationFormNames.EmailAddress]: "",
};

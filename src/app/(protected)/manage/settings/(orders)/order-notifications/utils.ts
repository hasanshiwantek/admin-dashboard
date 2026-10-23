import { FieldErrors } from "react-hook-form";
import {
  FIELD_TAB,
  METHOD_TAB,
  NotificationMethod,
  NotificationTab,
  notificationTabs,
  OrderNotificationFormNames,
  orderNotificationDefaults,
} from "./constant";
import {
  OrderNotificationFormValues,
  OrderNotificationPayload,
  OrderNotificationSettings,
} from "./type";

export const isEmailEnabled = (methods: string[] = []) =>
  methods.includes(NotificationMethod.Email);

// General Settings, plus a setup tab for each enabled method
export const getVisibleTabs = (methods: string[] = []) => {
  const methodTabs = methods.map(
    (method) => METHOD_TAB[method as NotificationMethod],
  );
  return notificationTabs.filter(
    (tab) =>
      tab.key === NotificationTab.General || methodTabs.includes(tab.key),
  );
};

// The tab holding the first invalid field
export const getTabForErrors = (
  errors: FieldErrors<OrderNotificationFormValues>,
): NotificationTab | undefined => {
  const field = Object.keys(errors)[0] as OrderNotificationFormNames | undefined;
  return field && FIELD_TAB[field];
};

export const transformGetOrderNotifications = (
  settings: OrderNotificationSettings | null,
): OrderNotificationFormValues => ({
  [OrderNotificationFormNames.Methods]:
    settings?.notificationMethods ??
    orderNotificationDefaults[OrderNotificationFormNames.Methods],
  [OrderNotificationFormNames.CustomerEmailStatuses]:
    settings?.customerEmailStatuses?.map(String) ??
    orderNotificationDefaults[OrderNotificationFormNames.CustomerEmailStatuses],
  [OrderNotificationFormNames.EmailAddress]:
    settings?.emailAddress ??
    orderNotificationDefaults[OrderNotificationFormNames.EmailAddress],
});

export const transformPostOrderNotifications = (
  values: OrderNotificationFormValues,
): OrderNotificationPayload => ({
  notificationMethods: values[OrderNotificationFormNames.Methods],
  customerEmailStatuses: values[OrderNotificationFormNames.CustomerEmailStatuses],
  emailAddress: values[OrderNotificationFormNames.EmailAddress],
});

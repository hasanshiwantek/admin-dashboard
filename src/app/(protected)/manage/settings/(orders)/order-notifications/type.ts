import type { OrderNotificationSchema } from "@/validations/formValidations";
import * as yup from "yup";

export type OrderNotificationFormValues = yup.InferType<
  typeof OrderNotificationSchema
>;

export interface OrderNotificationSettings {
  notificationMethods?: string[] | null;
  customerEmailStatuses?: (string | number)[] | null;
  emailAddress?: string | null;
}

export interface OrderNotificationPayload {
  notificationMethods: string[];
  customerEmailStatuses: string[];
  emailAddress: string;
}

export interface TestNotificationPayload {
  method: string;
  emailAddress: string;
}

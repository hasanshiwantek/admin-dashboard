import type { OrderStatusesSchema } from "@/validations/formValidations";
import * as yup from "yup";

export type OrderStatusesFormValues = yup.InferType<
  typeof OrderStatusesSchema
>;

// One table row: the saved name plus the fixed default and description
export interface OrderStatusRow {
  id: string;
  name: string;
  defaultName: string;
  description: string;
}

// An order status as the API stores it
export interface OrderStatus {
  id: string | number;
  name?: string | null;
  defaultName?: string | null;
  description?: string | null;
}

export interface OrderStatusesPayload {
  statuses: { id: string; name: string }[];
}

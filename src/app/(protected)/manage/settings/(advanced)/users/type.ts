import type { AdminUser } from "@/redux/slices/userPermission";
import type { AdminUserSchema } from "@/validations/formValidations";
import * as yup from "yup";

export type UserFormValues = yup.InferType<typeof AdminUserSchema>;

// A row in the users list
export interface AdminUserRow extends AdminUser {
  created_at?: string;
}

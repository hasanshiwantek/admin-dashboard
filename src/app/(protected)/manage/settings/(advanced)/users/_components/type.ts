import type { PermissionGroup } from "@/redux/slices/userPermission";
import type { UseFormReturn } from "react-hook-form";
import type { UserFormValues } from "../type";

export interface UserFormFieldsProps {
  permissionGroups: PermissionGroup[];
  /** Edit mode: email and role can't be changed */
  isEdit?: boolean;
}

// Field component for InputField: one group's permissions as checkboxes.
// value/onChange are the ids of every selected permission (all groups).
export interface PermissionGroupFieldProps {
  group: PermissionGroup;
  value?: number[];
  onChange?: (value: number[]) => void;
  id?: string;
}

export interface UserFormLayoutProps extends UserFormFieldsProps {
  title: string;
  description: string;
  form: UseFormReturn<UserFormValues>;
  onSubmit: (values: UserFormValues) => void | Promise<void>;
  onCancel: () => void;
  loading?: boolean;
}

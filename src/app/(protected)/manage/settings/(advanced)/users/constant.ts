import { RolesOptions, UserRolesEnum } from "@/const/appConstants";
import type { UserFormValues } from "./type";

/** Form field names; use these for `name`, watch/setValue and schema keys. */
export enum UserField {
  FirstName = "firstName",
  LastName = "lastName",
  Email = "email",
  PhoneNumber = "phoneNumber",
  UserRole = "userRole",
  Permissions = "permissions",
}

export const userDefaults: UserFormValues = {
  [UserField.FirstName]: "",
  [UserField.LastName]: "",
  [UserField.Email]: "",
  [UserField.PhoneNumber]: "",
  [UserField.UserRole]: String(UserRolesEnum.SALES_STAFF),
  [UserField.Permissions]: [],
};

// SelectField works with string values; the API wants the numeric role
export const userRoleOptions = RolesOptions.map((option) => ({
  value: String(option.value),
  label: option.label,
}));

// The API requires at least one permission; with none picked, the user gets
// permission 1 (same behaviour as before the revamp)
export const FALLBACK_PERMISSION_IDS = [1];

export const USERS_DESCRIPTION =
  "A user is someone who has access to the administration area of your store. Each user account also has its own customizable access permissions.";
export const ADD_USER_DESCRIPTION =
  "A user is someone who has access to the administration area of your store. Each user account also has its own customizable access permissions, which you can set up below.";
export const EDIT_USER_DESCRIPTION =
  "Update the details of the user below. Assign the permissions this user should have access to, then click Save.";

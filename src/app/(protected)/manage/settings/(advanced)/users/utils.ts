import { UserRolesEnum } from "@/const/appConstants";
import type { PermissionGroup } from "@/redux/slices/userPermission";
import { FALLBACK_PERMISSION_IDS, UserField } from "./constant";
import { UserFormValues } from "./type";

const permissionIdsOrFallback = (ids: number[]) =>
  ids.length ? ids : FALLBACK_PERMISSION_IDS;

// Every permission id the user holds, from their grouped permissions
export const toPermissionIds = (groups: PermissionGroup[] = []) =>
  groups
    .flatMap((group) => group?.permissions ?? [])
    .map((permission) => permission?.id)
    .filter((id): id is number => typeof id === "number");

// Fetched user + their permissions (API) → form values.
// The API returns one `name`, so it's split at the first space.
export const transformGetUser = (
  user: any,
  permissions: PermissionGroup[],
): UserFormValues => {
  const [firstName = "", ...rest] = (user?.name ?? "").split(" ");
  return {
    [UserField.FirstName]: firstName,
    [UserField.LastName]: rest.join(" "),
    [UserField.Email]: user?.email ?? "",
    [UserField.PhoneNumber]: user?.phoneNumber ?? "",
    [UserField.UserRole]: String(user?.userRole ?? UserRolesEnum.SALES_STAFF),
    [UserField.Permissions]: toPermissionIds(permissions),
  };
};

// Form values → registerUser payload
export const transformPostNewUser = (values: UserFormValues) => ({
  ...values,
  userRole: Number(values.userRole),
  permissions: permissionIdsOrFallback(values.permissions),
});

// Form values → updateAdminUser payload (phone isn't updatable)
export const transformPostUpdatedUser = (
  id: number,
  values: UserFormValues,
) => ({
  id,
  firstName: values.firstName,
  lastName: values.lastName,
  email: values.email,
  userRole: Number(values.userRole),
  permissions: permissionIdsOrFallback(values.permissions),
});

// Adds the id when missing, removes it when present
export const togglePermission = (ids: number[], id: number) =>
  ids.includes(id) ? ids.filter((value) => value !== id) : [...ids, id];

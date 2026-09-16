export const BASE62_STRING =
  "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

export enum UrlSettingEnums {
  SEO_OPTIMIZED_SHORT = "seo_optimized_short",
  SEO_OPTIMIZED_LONG = "seo_optimized_long",
  CUSTOM = "custom",
}

export enum ActionEnums {
  CREATE = "create",
  UPDATE = "update",
  DELETE = "delete",
  DUPLICATE = "duplicate",
  SAVE = "save",
  ADD = "add",
}

export enum UserRolesEnum {
  ADMIN = 1,
  USER = 2,
}

export const UserRoles = {
  [UserRolesEnum.ADMIN]: "Admin",
  [UserRolesEnum.USER]: "User",
};

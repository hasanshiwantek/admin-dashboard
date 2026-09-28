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

export enum LocalStorageKeys {
  AvailableStores = "availableStores",
  CurrentStore = "currentStore",
  StoreId = "storeId",
}

export enum DateTimeFormat {
  /** Example: 1st Jan 2024 @ 2:30 PM */
  ORDINAL_DATE_TIME = "Do MMM YYYY [@] h:mm A",
  ORDINAL_DATE = "Do MMM YYYY",
  SHORT_DATE = "MMM DD, YYYY",
  ISO_DATE = "YYYY-MM-DD",
  TIME_12H = "h:mm A",
  TIME_24H = "HH:mm",
}
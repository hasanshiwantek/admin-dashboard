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

  /** Example: Sep 25, 2026, 12:00 AM */
  SHORT_DATE_TIME = "MMM DD, YYYY, h:mm A",

  /** Example: 1st Jan 2024 */
  ORDINAL_DATE = "Do MMM YYYY",

  /** Example: Jan 01, 2024 */
  SHORT_DATE = "MMM DD, YYYY",

  /** Example: 2024-01-01 */
  ISO_DATE = "YYYY-MM-DD",

  /** ISO 8601 with the local offset. Example: 2024-01-01T14:30:00+05:00 */
  ISO_DATE_TIME = "YYYY-MM-DDTHH:mm:ssZ",

  /** Example: 2:30 PM */
  TIME_12H = "h:mm A",

  /** Example: 14:30 */
  TIME_24H = "HH:mm",
}

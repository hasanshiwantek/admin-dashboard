import { StoreObject } from "@/redux/slices/configSlice";
import { getFromStorage } from "@/utils/storage";

export const BASE62_STRING =
  "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

export enum UrlSettingEnums {
  SEO_OPTIMIZED_SHORT = "seo_optimized_short",
  SEO_OPTIMIZED_LONG = "seo_optimized_long",
  CUSTOM = "custom",
}

// Every action a record can offer, e.g. in an ActionButton menu
// How an access check compares the data's value with the check's `value`
export enum CheckTypeEnums {
  EQUAL = "equal",
  NOT_EQUAL = "not-equal",
  // field is one of `value` (an array), or a field array contains `value`
  INCLUDES = "includes",
  NOT_INCLUDES = "not-includes",
  // field is set (not null, undefined or ""); `value` is ignored
  EXISTS = "exists",
  NOT_EXISTS = "not-exists",
  GREATER_THAN = "greater-than",
  LESS_THAN = "less-than",
}

export enum ActionEnums {
  // Create / change
  CREATE = "create",
  ADD = "add",
  UPDATE = "update",
  EDIT = "edit",
  SAVE = "save",
  DUPLICATE = "duplicate",
  COPY = "copy",
  RENAME = "rename",
  MOVE = "move",
  ASSIGN = "assign",
  ADD_TO_CATEGORIES = "add-to-categories",
  REMOVE_FROM_CATEGORIES = "remove-from-categories",
  FEATURE = "feature",
  UNFEATURE = "unfeature",
  SET_DEFAULT = "set-default",
  EDIT_SETTINGS = "edit-settings",
  EDIT_RATES = "edit-rates",

  // Remove
  DELETE = "delete",
  ARCHIVE = "archive",
  RESTORE = "restore",

  // Status
  ENABLE = "enable",
  DISABLE = "disable",
  PUBLISH = "publish",
  UNPUBLISH = "unpublish",
  APPROVE = "approve",
  REJECT = "reject",
  CANCEL = "cancel",
  REFUND = "refund",
  VOID = "void",
  CAPTURE = "capture",
  SHIP = "ship",

  // View / share
  VIEW = "view",
  PREVIEW = "preview",
  VIEW_NOTES = "view-notes",
  VIEW_SHIPMENTS = "view-shipments",
  VIEW_TIMELINE = "view-timeline",
  VIEW_STOREFRONT = "view-storefront",
  VIEW_ORDERS = "view-orders",
  PRINT = "print",
  PRINT_INVOICE = "print-invoice",
  PRINT_PACKING_SLIP = "print-packing-slip",
  DOWNLOAD = "download",
  EXPORT = "export",
  IMPORT = "import",
  SHARE = "share",
  SEND = "send",
  RESEND = "resend",
}

export enum UserRolesEnum {
  ADMIN = 1,
  USER = 2,
  SALES_STAFF = 3,
  SALES_MANAGER = 4,
  STORE_ADMINISTRATOR = 5,
  CUSTOM = 6,
}

export const UserRoles = {
  [UserRolesEnum.ADMIN]: "Admin",
  [UserRolesEnum.USER]: "User",
  [UserRolesEnum.SALES_STAFF]: "Sales Staff",
  [UserRolesEnum.SALES_MANAGER]: "Sales Manager",
  [UserRolesEnum.STORE_ADMINISTRATOR]: "Store Administrator",
  [UserRolesEnum.CUSTOM]: "Custom",
};

export const RolesOptions = Object.entries(UserRoles)
  .map(([value, label]) => ({
    value: Number(value),
    label: String(label),
  }))
  .filter((option) => option.value !== UserRolesEnum.USER);

export enum LocalStorageKeys {
  AvailableStores = "availableStores",
  CurrentStore = "currentStore",
  StoreId = "storeId",
  // Products handed from the products list to the inventory / bulk edit pages
  SelectedProducts = "selectedProducts",
  BulkEditProducts = "bulkEditProducts",
}

export enum DateTimeFormat {
  /** Example: 1st Jan 2024 @ 2:30 PM */
  ORDINAL_DATE_TIME = "Do MMM YYYY [@] h:mm A",

  /** Example: Sep 25, 2026, 12:00 AM */
  SHORT_DATE_TIME = "MMM DD, YYYY, h:mm A",

  /** Example: 01 Jan 2024 14:30:00 */
  DATE_TIME_SECONDS = "DD MMM YYYY HH:mm:ss",

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

export const STOREFRONT_URL = "https://server-blink.vercel.app";

export const currentStore = getFromStorage<StoreObject>(
  LocalStorageKeys.CurrentStore,
);

export const availableStores = getFromStorage<StoreObject[]>(
  LocalStorageKeys.AvailableStores,
);

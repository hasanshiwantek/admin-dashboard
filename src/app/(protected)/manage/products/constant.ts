import { SymbolLocation } from "@/app/(protected)/manage/settings/(setup)/currencies/constant";
import { ActionItem } from "@/components/ActionButton/type";
import { TableTab } from "@/components/ui/Table/types";
import { ActionEnums, CheckTypeEnums } from "@/const/appConstants";
import type { ProductCurrency } from "./type";

export const PRODUCTS_ROUTE = "/manage/products";
export const NEW_PRODUCT_ID = "add";
export const ADD_PRODUCT_ROUTE = `${PRODUCTS_ROUTE}/${NEW_PRODUCT_ID}`;
export const editProductRoute = (id: number | string) =>
  `${PRODUCTS_ROUTE}/${id}`;

export const DUPLICATE_PRODUCT_PARAM = "duplicate";
export const duplicateProductRoute = (id: number | string) =>
  `${ADD_PRODUCT_ROUTE}?${DUPLICATE_PRODUCT_PARAM}=${id}`;

export const productOrdersRoute = (id: number | string) =>
  `/manage/orders?productId=${id}`;

export const PRODUCT_CATEGORIES_ROUTE = `${PRODUCTS_ROUTE}/categories`;

export const PRODUCT_INVENTORY_ROUTE = `${PRODUCTS_ROUTE}/inventory`;
export const PRODUCT_BULK_EDIT_ROUTE = `${PRODUCTS_ROUTE}/bulk-edit`;
export const PRODUCT_EXPORT_ENDPOINT = "dashboard/products/export-csv";
export const DEFAULT_PRODUCT_IMAGE = "/default-product-image.svg";

export const ProductTabs: TableTab[] = [
  { key: "All", label: "All", filters: {} },
  { key: "isFeatured", label: "Featured" },
  { key: "freeShipping", label: "Free shipping" },
  { key: "outOfStock", label: "Out of stock" },
  { key: "inventoryLow", label: "Inventory low" },
  { key: "isVisible", label: "Visible" },
  { key: "notVisible", label: "Not visible", filters: { isVisible: 0 } },
];

export const PRODUCT_FILTER_LABELS: Record<string, string> = {
  isFeatured: "Featured",
  isVisible: "Visible",
  freeShipping: "Free shipping",
  outOfStock: "Out of stock",
  inventoryLow: "Inventory low",
  brandId: "Brand",
  categoryIds: "Category",
  priceMin: "Price from",
  priceMax: "Price to",
  soldMin: "Sold from",
  soldMax: "Sold to",
  inventoryMin: "Inventory from",
  inventoryMax: "Inventory to",
  sortBy: "Sort by",
  sortOrder: "Order",
  searchKeywords: "Keyword",
};

export const PRODUCT_BOOLEAN_FILTERS = new Set([
  "isFeatured",
  "isVisible",
  "freeShipping",
  "outOfStock",
  "inventoryLow",
]);

export const PRODUCT_BULK_ACTIONS: ActionItem[] = [
  { type: ActionEnums.ADD_TO_CATEGORIES, label: "Add to categories" },
  { type: ActionEnums.REMOVE_FROM_CATEGORIES, label: "Remove from categories" },
  { type: ActionEnums.ENABLE, label: "Enable visibility" },
  { type: ActionEnums.DISABLE, label: "Disable visibility" },
  { type: ActionEnums.FEATURE, label: "Make featured" },
  { type: ActionEnums.UNFEATURE, label: "Make not featured" },
  { type: ActionEnums.DELETE, label: "Delete" },
];

const TRUTHY_FLAGS = [1, "1", true];

export const PRODUCT_ROW_ACTIONS: ActionItem[] = [
  { type: ActionEnums.EDIT, label: "Edit" },
  { type: ActionEnums.DUPLICATE, label: "Duplicate" },
  {
    type: ActionEnums.VIEW_STOREFRONT,
    label: "View Storefront",
    checks: [{ key: "productUrl", type: CheckTypeEnums.EXISTS }],
  },
  { type: ActionEnums.ADD_TO_CATEGORIES, label: "Add to categories" },
  { type: ActionEnums.REMOVE_FROM_CATEGORIES, label: "Remove from categories" },
  {
    type: ActionEnums.ENABLE,
    label: "Enable visibility",
    checks: [
      { key: "isVisible", value: TRUTHY_FLAGS, type: CheckTypeEnums.NOT_INCLUDES },
    ],
  },
  {
    type: ActionEnums.DISABLE,
    label: "Disable visibility",
    checks: [
      { key: "isVisible", value: TRUTHY_FLAGS, type: CheckTypeEnums.INCLUDES },
    ],
  },
  {
    type: ActionEnums.FEATURE,
    label: "Make featured",
    checks: [
      { key: "isFeatured", value: TRUTHY_FLAGS, type: CheckTypeEnums.NOT_INCLUDES },
    ],
  },
  {
    type: ActionEnums.UNFEATURE,
    label: "Make not featured",
    checks: [
      { key: "isFeatured", value: TRUTHY_FLAGS, type: CheckTypeEnums.INCLUDES },
    ],
  },
  { type: ActionEnums.DELETE, label: "Delete" },
];

// Used until the store's default currency has loaded
export const FALLBACK_CURRENCY: ProductCurrency = {
  code: "USD",
  symbol: "$",
  symbolLocation: SymbolLocation.Left,
  decimalToken: ".",
  thousandsToken: ",",
  decimalPlaces: 2,
};

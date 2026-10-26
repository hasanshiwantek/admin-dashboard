import { ActionItem } from "@/components/ActionButton/type";
import { TableTab } from "@/components/ui/Table/types";
import { ActionEnums } from "@/const/appConstants";

export const ProductTabs: TableTab[] = [
  { key: "All", label: "All", filters: {} },
  { key: "isFeatured", label: "Featured" },
  { key: "freeShipping", label: "Free shipping" },
  { key: "outOfStock", label: "Out of stock" },
  { key: "inventoryLow", label: "Inventory low" },
  { key: "isVisible", label: "Visible" },
  { key: "notVisible", label: "Not visible", filters: { isVisible: 0 } },
];

export const FILTER_LABELS: Record<string, string> = {
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

export const BOOLEAN_FILTERS = new Set([
  "isFeatured",
  "isVisible",
  "freeShipping",
  "outOfStock",
  "inventoryLow",
]);

export const PRODUCT_ROW_ACTIONS: ActionItem[] = [
  { type: ActionEnums.ADD_TO_CATEGORIES, label: "Add to categories" },
  { type: ActionEnums.REMOVE_FROM_CATEGORIES, label: "Remove from categories" },
  { type: ActionEnums.ENABLE, label: "Enable visibility" },
  { type: ActionEnums.DISABLE, label: "Disable visibility" },
  { type: ActionEnums.FEATURE, label: "Make featured" },
  { type: ActionEnums.UNFEATURE, label: "Make not featured" },
  { type: ActionEnums.DELETE, label: "Delete" },
  { type: ActionEnums.EDIT, label: "Edit" },
  { type: ActionEnums.DUPLICATE, label: "Duplicate" },
  { type: ActionEnums.VIEW_STOREFRONT, label: "View Storefront" },
];

export const PRODUCT_BULK_ACTIONS: ActionItem[] = [
  { type: ActionEnums.ADD_TO_CATEGORIES, label: "Add to categories" },
  { type: ActionEnums.REMOVE_FROM_CATEGORIES, label: "Remove from categories" },
  { type: ActionEnums.ENABLE, label: "Enable visibility" },
  { type: ActionEnums.DISABLE, label: "Disable visibility" },
  { type: ActionEnums.FEATURE, label: "Make featured" },
  { type: ActionEnums.UNFEATURE, label: "Make not featured" },
  { type: ActionEnums.DELETE, label: "Delete" },
];

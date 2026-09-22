import { TableTab } from "@/components/ui/Table/types";

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

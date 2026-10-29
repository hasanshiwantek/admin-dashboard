import { SelectOption } from "@/components/ui/Select";
import type { ProductSearchFormValues } from "./type";

// Values are the products list's filter keys in the URL
export enum ProductSearchFormNames {
  SearchKeywords = "searchKeywords",
  BrandId = "brandId",
  CategoryIds = "categoryIds",
  PriceMin = "priceMin",
  PriceMax = "priceMax",
  SoldMin = "soldMin",
  SoldMax = "soldMax",
  InventoryMin = "inventoryMin",
  InventoryMax = "inventoryMax",
  IsVisible = "isVisible",
  IsFeatured = "isFeatured",
  FreeShipping = "freeShipping",
  SortBy = "sortBy",
  SortOrder = "sortOrder",
}

// The products list opens on its first page, this many rows per page
export const SEARCH_RESULTS_PAGE = 1;
export const SEARCH_RESULTS_PAGE_SIZE = 50;

// Yes/no filters as the products list reads them
export enum ProductFlagFilter {
  Yes = "1",
  No = "0",
}

export enum ProductSortBy {
  Id = "id",
  Name = "name",
  Sku = "sku",
  CurrentStock = "currentStock",
  Price = "price",
  Visible = "visible",
}

export enum SortOrder {
  Ascending = "asc",
  Descending = "desc",
}

export const VisibilityOptions: SelectOption[] = [
  { value: ProductFlagFilter.Yes, label: "Only Visible Products" },
  { value: ProductFlagFilter.No, label: "Only Invisible Products" },
];

export const FeaturedOptions: SelectOption[] = [
  { value: ProductFlagFilter.Yes, label: "Featured" },
  { value: ProductFlagFilter.No, label: "Not Featured" },
];

export const FreeShippingOptions: SelectOption[] = [
  { value: ProductFlagFilter.Yes, label: "Only Free Shipping" },
];

export const SortByOptions: SelectOption[] = [
  { value: ProductSortBy.Id, label: "ID" },
  { value: ProductSortBy.Name, label: "Name" },
  { value: ProductSortBy.Sku, label: "SKU" },
  { value: ProductSortBy.CurrentStock, label: "Current Stock" },
  { value: ProductSortBy.Price, label: "Price" },
  { value: ProductSortBy.Visible, label: "Visibility" },
];

export const SortOrderOptions: SelectOption[] = [
  { value: SortOrder.Ascending, label: "Ascending Order" },
  { value: SortOrder.Descending, label: "Descending Order" },
];

export const productSearchDefaults: ProductSearchFormValues = {
  [ProductSearchFormNames.SearchKeywords]: "",
  [ProductSearchFormNames.BrandId]: "",
  [ProductSearchFormNames.CategoryIds]: [],
  [ProductSearchFormNames.PriceMin]: "",
  [ProductSearchFormNames.PriceMax]: "",
  [ProductSearchFormNames.SoldMin]: "",
  [ProductSearchFormNames.SoldMax]: "",
  [ProductSearchFormNames.InventoryMin]: "",
  [ProductSearchFormNames.InventoryMax]: "",
  [ProductSearchFormNames.IsVisible]: "",
  [ProductSearchFormNames.IsFeatured]: "",
  [ProductSearchFormNames.FreeShipping]: "",
  [ProductSearchFormNames.SortBy]: "",
  [ProductSearchFormNames.SortOrder]: "",
};

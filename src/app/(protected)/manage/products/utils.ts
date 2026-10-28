import { SymbolLocation } from "@/app/(protected)/manage/settings/(setup)/currencies/constant";
import { formatCurrencyPreview } from "@/app/(protected)/manage/settings/(setup)/currencies/utils";
import { money, toMajor } from "@/lib/money";
import {
  normalizeWholeNumberValue,
  restrictDecimalInput,
  restrictDecimalPasteTo,
  restrictDecimalValueTo,
  restrictWholeNumberInput,
  restrictWholeNumberPaste,
} from "@/validations/validations";
import { DEFAULT_PRODUCT_IMAGE } from "./constant";
import type {
  ApiCategory,
  CategoryTreeItem,
  ProductCurrency,
  ProductListItem,
} from "./type";

export const normalizeCategories = (
  categories: ApiCategory[],
): CategoryTreeItem[] =>
  categories.map((category) => ({
    id: Number(category.id),
    name: category.name,
    children: normalizeCategories(category.subcategories ?? []),
  }));

const hasSelectedDescendant = (
  category: CategoryTreeItem,
  selected: number[],
): boolean =>
  category.children.some(
    (child) =>
      selected.includes(child.id) || hasSelectedDescendant(child, selected),
  );

// Categories to open so every selected category is visible
export const getExpandedCategoryIds = (
  categories: CategoryTreeItem[],
  selected: number[],
) => {
  const expanded = new Set<number>();
  const visit = (category: CategoryTreeItem) => {
    if (hasSelectedDescendant(category, selected)) expanded.add(category.id);
    category.children.forEach(visit);
  };
  categories.forEach(visit);
  return expanded;
};

export const isFlagOn = (value: unknown) =>
  value === true || value === 1 || value === "1";

// The product's thumbnail, else its first image
export const getProductThumbnail = (product: ProductListItem) =>
  product.image?.find((image) => isFlagOn(image.isPrimary))?.path ||
  product.image?.[0]?.path ||
  DEFAULT_PRODUCT_IMAGE;

export const getCategoryNames = (product: ProductListItem) =>
  (product.categoryIds ?? [])
    .filter(({ name }) => name !== "Uncategorized")
    .map(({ name }) => name)
    .join(", ") || "-";

export const getDecimalPlaces = (currency: ProductCurrency) =>
  Number(currency.decimalPlaces) || 0;

// Rounds once to the currency's minor unit, half up — the same rule the
// storefront and backend use, so a saved amount is the amount charged.
// (`toFixed` rounds the binary float, e.g. 0.425 → 0.42 instead of 0.43.)
export const roundToCurrency = (amount: number, currency: ProductCurrency) =>
  toMajor(money(amount, currency.code));

export const formatPrice = (amount: number, currency: ProductCurrency) =>
  formatCurrencyPreview(amount, {
    ...currency,
    decimalPlaces: String(getDecimalPlaces(currency)),
  });

// Props that make an InputField a price input in the given currency: its
// symbol on the configured side, and typing limited to its decimal places
export const getPriceInputProps = (currency: ProductCurrency) => {
  const decimals = getDecimalPlaces(currency);
  const symbolOnRight = currency.symbolLocation === SymbolLocation.Right;

  return {
    startIcon: symbolOnRight ? undefined : currency.symbol,
    endIcon: symbolOnRight ? currency.symbol : undefined,
    inputMode: decimals ? ("decimal" as const) : ("numeric" as const),
    placeholder: formatPrice(0, currency).replace(currency.symbol, ""),
    onKeyDown: restrictDecimalInput,
    onPaste: restrictDecimalPasteTo(decimals),
    onInput: restrictDecimalValueTo(decimals),
  };
};

export const wholeNumberInputProps = {
  inputMode: "numeric" as const,
  placeholder: "0",
  onKeyDown: restrictWholeNumberInput,
  onPaste: restrictWholeNumberPaste,
  onInput: normalizeWholeNumberValue,
};

export const getStorefrontProductUrl =(baseUrl: string, productUrl: string) =>
  `${baseUrl}${productUrl.startsWith("/") ? productUrl.slice(1) : productUrl}`;

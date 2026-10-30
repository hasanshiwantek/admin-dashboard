import type { BrandListItem, BrandRow } from "./type";

export const toBrandRows = (items: BrandListItem[]): BrandRow[] =>
  items.flatMap(({ brand, productsCount }) =>
    brand
      ? [{ id: brand.id, name: brand.name, productsCount: productsCount ?? 0 }]
      : [],
  );

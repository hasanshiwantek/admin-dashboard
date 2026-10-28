// A brand as brand/{id} returns it (snake_case comes from the API)
export interface Brand {
  id: number;
  name: string;
  page_title?: string | null;
  meta_keywords?: string | null;
  meta_description?: string | null;
  search_keywords?: string | null;
  logo?: string | null;
  brandURL?: string | null;
  templateLayout?: string | null;
}

// A row of brand-list
export interface BrandListItem {
  brand?: { id: number; name: string } | null;
  productsCount?: number | null;
}

export interface BrandListResponse {
  data?: BrandListItem[];
  pagination?: { totalCount?: number; totalPages?: number };
}

export interface BrandRow {
  id: number;
  name: string;
  productsCount: number;
}

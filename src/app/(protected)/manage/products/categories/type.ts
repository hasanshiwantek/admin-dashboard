type Flag = 0 | 1 | boolean;

// A category in the categories tree
export interface CategoryNode {
  id: number;
  name: string;
  slug?: string | null;
  description?: string | null;
  is_visible?: Flag;
  parent_id: number | null;
  total_products?: number | null;
  in_subcategories?: number | null;
  subcategories?: CategoryNode[];
}

// A category as category/{id} returns it (the API mixes snake and camel case)
export interface Category {
  id: number;
  name: string;
  slug?: string | null;
  description?: string | null;
  is_visible?: Flag;
  parent_id?: number | null;
  templateLayout?: string | null;
  template_layout?: string | null;
  sortOrder?: number | null;
  sort_order?: number | null;
  defaultProductSort?: string | null;
  default_product_sort?: string | null;
  seoHomeTitle?: string | null;
  seoMetakeywords?: string | null;
  seoMetaDescription?: string | null;
  seoSearchKeywords?: string | null;
  image_url?: string | null;
  image?: string | null;
  thumbnail?: string | null;
  media?: { url?: string | null } | null;
}

// A category picked in CategoryDropdown
export interface CategoryPick {
  id: number | null;
  path: string;
}

export type FormVals = {
  name: string;
  slug: string;
  description: string;
  is_visible: boolean;
  parent: { id: number | null; path: string };
  template_layout: string;
  sort_order: number;
  default_product_sort: string;
  seo_home_title: string;
  seo_meta_keywords: string;
  seo_meta_description: string;
  seo_search_keywords: string;
  image?: File | null;
};


export type ApiCategory = {
  id: number;
  name: string;
  slug: string | null;
  description: string | null;
  is_visible: 0 | 1 | boolean;
  parent_id: number | null;
  subcategories?: any[];
};
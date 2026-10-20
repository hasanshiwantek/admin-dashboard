export enum CategoryField {
  Name = "name",
  Slug = "slug",
  Description = "description",
  IsVisible = "is_visible",
  Parent = "parent",
  TemplateLayout = "template_layout",
  SortOrder = "sort_order",
  DefaultProductSort = "default_product_sort",
  SeoHomeTitle = "seo_home_title",
  SeoMetaKeywords = "seo_meta_keywords",
  SeoMetaDescription = "seo_meta_description",
  SeoSearchKeywords = "seo_search_keywords",
  Image = "image",
}

export enum DefaultProductSort {
  StorefrontDefault = "storefront_default",
  PriceAsc = "price_asc",
  PriceDesc = "price_desc",
  NameAsc = "name_asc",
  NameDesc = "name_desc",
  Newest = "newest",
}

export const DefaultProductSortOptions = [
  {
    value: DefaultProductSort.StorefrontDefault,
    label: "Use storefront settings default",
  },
  { value: DefaultProductSort.PriceAsc, label: "Price: Low to High" },
  { value: DefaultProductSort.PriceDesc, label: "Price: High to Low" },
  { value: DefaultProductSort.NameAsc, label: "Name: A → Z" },
  { value: DefaultProductSort.NameDesc, label: "Name: Z → A" },
  { value: DefaultProductSort.Newest, label: "Newest" },
] as const;

export enum TemplateLayout {
  Default = "Default",
}
export const TemplateLayoutOptions = [
  { value: TemplateLayout.Default, label: "Default" },
] as const;

export const CategoryFormDefaults = {
  name: "",
  slug: "",
  description: "",
  is_visible: true,
  parent: { id: null, path: "" },
  template_layout: TemplateLayout.Default,
  sort_order: 0,
  default_product_sort: DefaultProductSort.StorefrontDefault,
  seo_home_title: "",
  seo_meta_keywords: "",
  seo_meta_description: "",
  seo_search_keywords: "",
  image: null,
};
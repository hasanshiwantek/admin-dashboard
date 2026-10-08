export const CATEGORIES_LIST_PATH = "/manage/products/categories";

export const CATEGORY_IMAGE_ACCEPT = ".ico,.jpg,.jpeg,.gif,.png";
export const CATEGORY_IMAGE_MAX_MB = 8;

// Characters that are not allowed in a category URL.
export const INVALID_SLUG_CHARS = /[#$*&@!=+%`'":;<>{}[\]|]/;

export const CATEGORY_DESCRIPTION_TOOLBAR =
  "undo redo | blocks | bold italic forecolor backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | code";

export const TEMPLATE_LAYOUT_OPTIONS = [{ value: "Default", label: "Default" }];

export const DEFAULT_PRODUCT_SORT_OPTIONS = [
  { value: "storefront_default", label: "Use storefront settings default" },
  { value: "price_asc", label: "Price: Low to High" },
  { value: "price_desc", label: "Price: High to Low" },
  { value: "name_asc", label: "Name: A → Z" },
  { value: "name_desc", label: "Name: Z → A" },
  { value: "newest", label: "Newest" },
];

export enum CategoryField {
  Name = "name",
  Slug = "slug",
  Channel = "channel",
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

export type CategoryParent = { id: number | null; path: string };

export type EditCategoryFormValues = {
  [CategoryField.Name]: string;
  [CategoryField.Slug]: string;
  [CategoryField.Channel]: string;
  [CategoryField.Description]: string;
  [CategoryField.IsVisible]: boolean;
  [CategoryField.Parent]: CategoryParent;
  [CategoryField.TemplateLayout]: string;
  [CategoryField.SortOrder]: number;
  [CategoryField.DefaultProductSort]: string;
  [CategoryField.SeoHomeTitle]: string;
  [CategoryField.SeoMetaKeywords]: string;
  [CategoryField.SeoMetaDescription]: string;
  [CategoryField.SeoSearchKeywords]: string;
  // A File when a new image is picked, the existing URL, or null when removed.
  [CategoryField.Image]: File | string | null;
};

export const editCategoryDefaultValues: EditCategoryFormValues = {
  [CategoryField.Name]: "",
  [CategoryField.Slug]: "",
  [CategoryField.Channel]: "",
  [CategoryField.Description]: "",
  [CategoryField.IsVisible]: true,
  [CategoryField.Parent]: { id: null, path: "" },
  [CategoryField.TemplateLayout]: "Default",
  [CategoryField.SortOrder]: 0,
  [CategoryField.DefaultProductSort]: "storefront_default",
  [CategoryField.SeoHomeTitle]: "",
  [CategoryField.SeoMetaKeywords]: "",
  [CategoryField.SeoMetaDescription]: "",
  [CategoryField.SeoSearchKeywords]: "",
  [CategoryField.Image]: null,
};

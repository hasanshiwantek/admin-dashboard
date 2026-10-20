import { FormVals } from "./type";

export function buildCategoryPayload(vals: FormVals): Record<string, any> {
  return {
    name: vals.name,
    slug: vals.slug.replace(/^\/|\/$/g, ""),
    description: vals.description || "",
    isVisible: vals.is_visible ? 1 : 0,
    parentId: vals.parent?.id ?? "",
    templateLayout: vals.template_layout,
    sortOrder: Number(vals.sort_order) || 0,
    defaultProductSort: vals.default_product_sort,
    seoHomeTitle: vals.seo_home_title || "",
    seoMetakeywords: vals.seo_meta_keywords || "",
    seoMetaDescription: vals.seo_meta_description || "",
    seoSearchKeywords: vals.seo_search_keywords || "",
  };
}
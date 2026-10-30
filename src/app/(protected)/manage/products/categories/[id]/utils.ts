import { REGEX } from "@/const/regex";
import type { ClipboardEvent, KeyboardEvent } from "react";
import type { Category } from "../type";
import { trimSlashes } from "../utils";
import { categoryDefaults, CategoryFormNames } from "./constant";
import type { CategoryFormValues } from "./type";

export const getCategoryImageUrl = (category?: Category | null) =>
  category?.image_url ||
  category?.image ||
  category?.thumbnail ||
  category?.media?.url ||
  null;

export const blockInvalidSlugKey = (event: KeyboardEvent<HTMLInputElement>) => {
  if (REGEX.SLUG_BLOCKED_CHARS.test(event.key)) event.preventDefault();
};

export const blockInvalidSlugPaste = (
  event: ClipboardEvent<HTMLInputElement>,
) => {
  if (REGEX.SLUG_BLOCKED_CHARS.test(event.clipboardData.getData("text"))) {
    event.preventDefault();
  }
};

// `parentPath` is filled in later when the categories tree loads after the record
export const transformGetCategory = (
  category: Category,
  parentPath = "",
): CategoryFormValues => ({
  ...categoryDefaults,
  [CategoryFormNames.Name]: category.name ?? "",
  [CategoryFormNames.Slug]: category.slug
    ? `/${trimSlashes(category.slug)}/`
    : "",
  [CategoryFormNames.Description]: category.description ?? "",
  [CategoryFormNames.IsVisible]: Boolean(category.is_visible),
  [CategoryFormNames.Parent]: { id: category.parent_id ?? null, path: parentPath },
  [CategoryFormNames.TemplateLayout]:
    category.templateLayout ||
    category.template_layout ||
    categoryDefaults[CategoryFormNames.TemplateLayout],
  [CategoryFormNames.SortOrder]: Number(
    category.sortOrder ?? category.sort_order ?? 0,
  ),
  [CategoryFormNames.DefaultProductSort]:
    category.defaultProductSort ||
    category.default_product_sort ||
    categoryDefaults[CategoryFormNames.DefaultProductSort],
  [CategoryFormNames.SeoHomeTitle]: category.seoHomeTitle ?? "",
  [CategoryFormNames.SeoMetaKeywords]: category.seoMetakeywords ?? "",
  [CategoryFormNames.SeoMetaDescription]: category.seoMetaDescription ?? "",
  [CategoryFormNames.SeoSearchKeywords]: category.seoSearchKeywords ?? "",
  [CategoryFormNames.Image]: getCategoryImageUrl(category),
});

// add-categories and update-categorySingle take the same fields; a new
// category also sends its channel, an edit flags a removed image
export const transformPostCategory = (
  values: CategoryFormValues,
  { isEdit, hadImage }: { isEdit: boolean; hadImage: boolean },
) => {
  const fields: Record<string, string | number> = {
    name: values.name,
    slug: trimSlashes(values.slug),
    description: values.description,
    isVisible: values.isVisible ? 1 : 0,
    parentId: values.parent.id ?? "",
    templateLayout: values.templateLayout,
    sortOrder: Number(values.sortOrder) || 0,
    defaultProductSort: values.defaultProductSort,
    seoHomeTitle: values.seoHomeTitle,
    seoMetakeywords: values.seoMetaKeywords,
    seoMetaDescription: values.seoMetaDescription,
    seoSearchKeywords: values.seoSearchKeywords,
    ...(!isEdit && { channel: values.channel }),
  };

  const data = new FormData();
  Object.entries(fields).forEach(([key, value]) =>
    data.append(key, String(value)),
  );

  const image = values.image;
  if (image instanceof File) data.append("image", image);
  else if (isEdit && !image && hadImage) data.append("remove_image", "1");

  return data;
};

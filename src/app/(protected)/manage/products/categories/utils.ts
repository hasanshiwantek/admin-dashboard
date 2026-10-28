import { REGEX } from "@/const/regex";
import { findCategoryAncestors } from "@/lib/categoryUtils";
import { generateSlug } from "@/lib/productUtils";
import type { CategoryNode } from "./type";

export const isCategoryVisible = (category: Pick<CategoryNode, "is_visible">) =>
  Boolean(category.is_visible);

export const findCategoryNode = (
  nodes: CategoryNode[],
  id: number,
): CategoryNode | null => {
  for (const node of nodes) {
    if (Number(node.id) === id) return node;
    const found = findCategoryNode(node.subcategories ?? [], id);
    if (found) return found;
  }
  return null;
};

// Ids from the root down to `id`, to expand the tree to it
export const getCategoryTrailIds = (nodes: CategoryNode[], id: number) =>
  (findCategoryAncestors(nodes, id) ?? []).map((node) => Number(node.id));

// The category and everything under it: it can't be dropped into any of these
export const getSubtreeIds = (category: CategoryNode): number[] => [
  Number(category.id),
  ...(category.subcategories ?? []).flatMap(getSubtreeIds),
];

// The parent's id from the tree itself, since nodes may not carry parent_id
export const getParentId = (nodes: CategoryNode[], id: number) => {
  const trail = findCategoryAncestors(nodes, id);
  return trail && trail.length > 1 ? Number(trail[trail.length - 2].id) : null;
};

export const trimSlashes =(value: string) =>
  value.replace(REGEX.PRODUCT_URL_NORMALIZE, "");

// A category URL is always /{display name}, whatever its parent
export const buildCategorySlug = (name: string) =>
  name ? `/${generateSlug(name)}` : "";

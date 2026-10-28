import type { CategoryDropdownNode, CategoryNode } from "./type";

// The category tree in the shape CategoryDropdown expects
export const toDropdownCategories = (
  nodes: CategoryNode[],
  parentId: number | null = null,
): CategoryDropdownNode[] =>
  nodes.map((node) => ({
    id: Number(node.id),
    name: node.name,
    parent_id: parentId,
    subcategories: toDropdownCategories(
      node.subcategories ?? [],
      Number(node.id),
    ),
  }));

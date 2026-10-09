import { AppDispatch } from "@/redux/store";
import { fetchCategories } from "@/redux/slices/categorySlice";
export const refetchCategories = async (dispatch: AppDispatch) => {
  try {
    await dispatch(fetchCategories()).unwrap();
  } catch (err) {
    console.error("❌ Error re-fetching Categories:", err);
  }
};

/** Categories from the root down to `targetId` (inclusive), or null if it's not in the tree. */
export const findCategoryAncestors = (
  nodes: any[],
  targetId: number,
  trail: any[] = [],
): any[] | null => {
  for (const node of nodes) {
    const nextTrail = [...trail, node];
    if (Number(node.id) === Number(targetId)) return nextTrail;
    if (node.subcategories?.length) {
      const found = findCategoryAncestors(node.subcategories, targetId, nextTrail);
      if (found) return found;
    }
  }
  return null;
};

/** Display path of a category, e.g. "Shop All / Audio / Speakers". */
export const findCategoryPath = (
  nodes: any[],
  targetId: number,
): string | null =>
  findCategoryAncestors(nodes, targetId)
    ?.map((node) => node.name)
    .join(" / ") ?? null;

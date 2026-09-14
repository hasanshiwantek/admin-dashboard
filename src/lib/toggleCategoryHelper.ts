// type Category = {
//   id: number;
//   name: string;
//   children?: Category[];
// };

// interface ToggleCategoryParams {
//   selected: number[];
//   id: number;
//   isParent: boolean;
//   parentId?: number;
//   categories: Category[];
// }

// function findAllChildIds(category: Category): number[] {
//   let ids: number[] = [];
//   if (category.children) {
//     for (const child of category.children) {
//       ids.push(child.id, ...findAllChildIds(child));
//     }
//   }
//   return ids;
// }

// function findCategoryById(categories: Category[], id: number): Category | null {
//   for (const category of categories) {
//     if (category.id === id) return category;
//     if (category.children) {
//       const found = findCategoryById(category.children, id);
//       if (found) return found;
//     }
//   }
//   return null;
// }

// function findParentId(categories: Category[], id: number): number | null {
//   for (const category of categories) {
//     if (category.children?.some((child) => child.id === id)) {
//       return category.id;
//     }
//     if (category.children) {
//       const result = findParentId(category.children, id);
//       if (result !== null) return result;
//     }
//   }
//   return null;
// }

// export function toggleCategoryHelper({
//   selected,
//   id,
//   isParent,
//   parentId,
//   categories,
// }: ToggleCategoryParams): number[] {
//   const newSelected = [...selected];

//   // Check if it's already selected
//   const isAlreadyChecked = newSelected.includes(id);

//   // ✅ If checkbox is clicked again, uncheck it
//   if (isAlreadyChecked) {
//     return newSelected.filter((val) => val !== id);
//   }

//   // ✅ If selecting a parent, uncheck all other parents and children
//   if (isParent) {
//     const current = findCategoryById(categories, id);
//     const childrenIds = current ? findAllChildIds(current) : [];
//     return [id, ...childrenIds];
//   }

//   // ✅ If selecting a child or sub-child
//   if (parentId) {
//     const currentParent = findCategoryById(categories, parentId);
//     const childrenIds = currentParent ? findAllChildIds(currentParent) : [];

//     // ✅ If another parent is already selected, clear all
//     const allParentIds = categories.map((cat) => cat.id);
//     const selectedParent = newSelected.find((sid) => allParentIds.includes(sid));
//     if (selectedParent && selectedParent !== parentId) {
//       return [id];
//     }

//     return Array.from(new Set([...newSelected, id, parentId]));
//   }

//   return newSelected;
// }

// Minimal types you can adjust to your actual shapes
export type Category = { id: number; name: string };
export type Product = {
  id: number;
  categories?: Category[];
  categoryIds?: Array<
    | number
    | string
    | { id?: number | string; categoryId?: number | string; name?: string }
  >;
};

export const isRealCategory = (
  c?: Category | { id?: number | string; name?: string },
) =>
  !!c &&
  c.name !== "Uncategorized" &&
  c.id !== undefined &&
  c.id !== null &&
  c.id !== "";

/** Return category IDs (as strings) for a single product, excluding "Uncategorized". */
export const getProductCategoryIds = (p: Product): string[] => {
  const categoryList = p?.categories || p?.categoryIds || [];

  return (categoryList as any[])
    .filter((item) => {
      if (typeof item === "object" && item !== null) {
        const candidateId = item.id ?? item.categoryId ?? item.value;
        return (
          candidateId !== undefined &&
          candidateId !== null &&
          candidateId !== "" &&
          item.name !== "Uncategorized"
        );
      }

      return (
        item !== undefined &&
        item !== null &&
        item !== "" &&
        item !== "Uncategorized"
      );
    })
    .map((item) => {
      if (typeof item === "object" && item !== null) {
        return String(item.id ?? item.categoryId ?? item.value);
      }

      return String(item);
    });
};

/** Intersection of category IDs across products. */
export const getCommonCategoryIds = (products: Product[]): string[] => {
  if (!products.length) return [];
  const arrays = products.map(getProductCategoryIds);
  return arrays.reduce((acc, arr) => acc.filter((id) => arr.includes(id)));
};

/** Union of category IDs across products. */
export const getUnionCategoryIds = (products: Product[]): string[] => {
  const set = new Set<string>();
  products.forEach((p) =>
    getProductCategoryIds(p).forEach((id) => set.add(id)),
  );
  return Array.from(set);
};

// 👉 new: numeric version (handy sometimes)
export const getProductCategoryIdsNum = (p: Product): number[] =>
  (p?.categories || [])
    .filter((c) => c?.name !== "Uncategorized")
    .map((c) => Number(c.id));

// small util
export const unique = <T>(arr: T[]) => Array.from(new Set(arr));

/**
 * Derive defaults for category modal based on selection.
 * - single selection: that product’s categories
 * - multiple selection: intersection (safe/common) by default
 *   (pass mode "union" if you prefer union)
 */
export const deriveDefaultsForSelection = (
  products: Product[],
  mode: "intersection" | "union" = "intersection",
): string[] => {
  if (products.length <= 1)
    return products[0] ? getProductCategoryIds(products[0]) : [];
  return mode === "union"
    ? getUnionCategoryIds(products)
    : getCommonCategoryIds(products);
};

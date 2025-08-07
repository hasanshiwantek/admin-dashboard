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

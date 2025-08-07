// utils/toggleCategoryHelper.ts

type Category = {
  id: number;
  name: string;
  children?: Category[];
};

interface ToggleCategoryParams {
  selected: number[];
  id: number;
  isParent: boolean;
  parentId?: number;
  categories: Category[];
}

export const toggleCategoryHelper = ({
  selected,
  id,
  isParent,
  parentId,
  categories,
}: ToggleCategoryParams): number[] => {
  if (isParent) {
    // When a parent is clicked, only that parent should remain selected
    return [id];
  }

  const allParentIds = categories.map((cat) => cat.id);
  const selectedParent = selected.find((sid) => allParentIds.includes(sid));
  const currentParent = categories.find((cat) => cat.id === parentId);
  const currentSiblings = currentParent?.children?.map((c) => c.id) || [];

  const isOtherParentChildSelected = selected.some(
    (sid) =>
      !currentSiblings.includes(sid) &&
      sid !== parentId &&
      !allParentIds.includes(sid)
  );

  const isOtherParentSelected =
    selectedParent && selectedParent !== parentId;

  if (isOtherParentChildSelected || isOtherParentSelected) {
    // Clear everything and select only this child
    return [id];
  }

  // Toggle child
  const updated = selected.includes(id)
    ? selected.filter((sid) => sid !== id)
    : [...selected, id];

  const hasSiblings = updated.filter((sid) =>
    currentSiblings.includes(sid)
  ).length;

  if (!updated.includes(parentId!) && !selected.includes(id)) {
    updated.push(parentId!);
  }

  if (!hasSiblings) {
    return updated.filter((sid) => sid !== parentId);
  }

  return updated;
};

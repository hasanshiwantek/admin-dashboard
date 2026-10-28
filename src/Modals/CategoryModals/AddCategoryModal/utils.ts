import type { AddCategoryFormValues, AddCategoryPayload } from "./type";

export const transformPostAddCategory = (
  values: AddCategoryFormValues,
): AddCategoryPayload => ({
  name: values.name,
  channel: values.channel,
  parentId: values.parent?.id ?? null,
  isVisible: values.isVisible,
});

// The new category's id, wherever add-categories puts it
export const getCreatedCategoryId = (response: unknown) => {
  const body = response as {
    data?: { id?: number };
    category?: { id?: number };
  } | null;
  return body?.data?.id ?? body?.category?.id ?? null;
};

import type { CategoryNode } from "@/app/(protected)/manage/products/categories/type";
import type { AddCategorySchema } from "@/validations/formValidations";
import { ReactNode } from "react";
import * as yup from "yup";

export type AddCategoryFormValues = yup.InferType<typeof AddCategorySchema>;

export interface AddCategoryModalProps {
  trigger: ReactNode;
  categoryTree: CategoryNode[];
  /** Called after the category is created, e.g. to refresh the list */
  onSaved?: () => void;
}

export interface AddCategoryPayload {
  name: string;
  channel: string;
  parentId: number | null;
  isVisible: boolean;
}

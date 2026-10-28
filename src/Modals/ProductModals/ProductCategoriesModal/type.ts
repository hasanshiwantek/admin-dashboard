import { ActionEnums } from "@/const/appConstants";
import type { ProductCategoriesSchema } from "@/validations/formValidations";
import * as yup from "yup";

export type ProductCategoriesFormValues = yup.InferType<
  typeof ProductCategoriesSchema
>;

export type ProductCategoriesMode = ActionEnums.ADD | ActionEnums.DELETE;

export interface ProductCategoriesModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** Add sets the products' categories; delete removes the picked ones */
  mode: ProductCategoriesMode;
  productIds: number[];
  /** Category ids ticked when the modal opens */
  defaultCategoryIds: string[];
  onSaved?: () => void;
}

export interface CategoryNode {
  id: number | string;
  name: string;
  subcategories?: CategoryNode[] | null;
}

export interface CategoryDropdownNode {
  id: number;
  name: string;
  parent_id: number | null;
  subcategories?: CategoryDropdownNode[];
}

export interface CategoryPick {
  id: number | null;
  path: string;
}

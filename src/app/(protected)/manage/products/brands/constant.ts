import { ActionItem } from "@/components/ActionButton/type";
import { ActionEnums } from "@/const/appConstants";

export const BRANDS_ROUTE = "/manage/products/brands";
export const NEW_BRAND_ID = "add";
export const ADD_BRAND_ROUTE = `${BRANDS_ROUTE}/${NEW_BRAND_ID}`;
export const editBrandRoute = (id: number | string) => `${BRANDS_ROUTE}/${id}`;

export const DEFAULT_BRANDS_PAGE_SIZE = "50";

export const BRAND_ROW_ACTIONS: ActionItem[] = [
  { type: ActionEnums.EDIT, label: "Edit" },
];

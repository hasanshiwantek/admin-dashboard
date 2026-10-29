import { ActionItem } from "@/components/ActionButton/type";
import {
  ActionEnums,
  CheckTypeEnums,
  STOREFRONT_URL,
} from "@/const/appConstants";
import { buildQueryParams } from "@/lib/utils";

export const CATEGORIES_ROUTE = "/manage/products/categories";
export const NEW_CATEGORY_ID = "add";
export const PARENT_CATEGORY_PARAM = "parent";
export const editCategoryRoute = (id: number | string) =>
  `${CATEGORIES_ROUTE}/${id}`;
export const addSubcategoryRoute = (parentId: number | string) =>
  `${CATEGORIES_ROUTE}/${NEW_CATEGORY_ID}?${PARENT_CATEGORY_PARAM}=${parentId}`;
export const categoryProductsRoute = (id: number | string) =>
  `/manage/products${buildQueryParams({ categoryIds: id })}`;
export const categoryStorefrontUrl = (baseUrl: string, slug: string) =>
  `${baseUrl}category/${slug}`;

// Each tree level is indented by this much in the list (px)
export const CATEGORY_INDENT = 28;

// A drag starts once the pointer moves this far, so clicks still work
export const CATEGORY_DRAG_ACTIVATION = { distance: 8 };

// Drop target that moves a category to the top level
export const CATEGORY_ROOT_DROP_ID = "category-root";

// Hovering a collapsed category this long while dragging opens it (ms)
export const CATEGORY_AUTO_EXPAND_DELAY = 600;

const VISIBLE_FLAGS = [1, "1", true];

export const CATEGORY_ROW_ACTIONS: ActionItem[] = [
  { type: ActionEnums.EDIT, label: "Edit" },
  { type: ActionEnums.CREATE, label: "Create sub-category" },
  {
    type: ActionEnums.DISABLE,
    label: "Disable visibility",
    checks: [
      {
        key: "is_visible",
        value: VISIBLE_FLAGS,
        type: CheckTypeEnums.INCLUDES,
      },
    ],
  },
  {
    type: ActionEnums.ENABLE,
    label: "Enable visibility",
    checks: [
      {
        key: "is_visible",
        value: VISIBLE_FLAGS,
        type: CheckTypeEnums.NOT_INCLUDES,
      },
    ],
  },
  { type: ActionEnums.VIEW, label: "View products" },
  {
    type: ActionEnums.VIEW_STOREFRONT,
    label: "View on storefront",
    checks: [{ key: "slug", type: CheckTypeEnums.EXISTS }],
  },
  { type: ActionEnums.DELETE, label: "Delete" },
];

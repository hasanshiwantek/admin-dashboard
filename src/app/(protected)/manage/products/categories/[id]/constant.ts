import { ActionItem } from "@/components/ActionButton/type";
import { SelectOption } from "@/components/ui/Select";
import { ActionEnums, CheckTypeEnums } from "@/const/appConstants";
import type { CategoryFormValues } from "./type";

export enum CategoryFormNames {
  Name = "name",
  Slug = "slug",
  Channel = "channel",
  Description = "description",
  IsVisible = "isVisible",
  Parent = "parent",
  TemplateLayout = "templateLayout",
  SortOrder = "sortOrder",
  DefaultProductSort = "defaultProductSort",
  SeoHomeTitle = "seoHomeTitle",
  SeoMetaKeywords = "seoMetaKeywords",
  SeoMetaDescription = "seoMetaDescription",
  SeoSearchKeywords = "seoSearchKeywords",
  Image = "image",
}

export enum CategoryTemplateLayout {
  Default = "Default",
}

export enum DefaultProductSort {
  StorefrontDefault = "storefront_default",
  PriceAsc = "price_asc",
  PriceDesc = "price_desc",
  NameAsc = "name_asc",
  NameDesc = "name_desc",
  Newest = "newest",
}

export const CategoryTemplateLayoutOptions: SelectOption[] = [
  { value: CategoryTemplateLayout.Default, label: "Default" },
];

export const DefaultProductSortOptions: SelectOption[] = [
  {
    value: DefaultProductSort.StorefrontDefault,
    label: "Use storefront settings default",
  },
  { value: DefaultProductSort.PriceAsc, label: "Price: Low to High" },
  { value: DefaultProductSort.PriceDesc, label: "Price: High to Low" },
  { value: DefaultProductSort.NameAsc, label: "Name: A → Z" },
  { value: DefaultProductSort.NameDesc, label: "Name: Z → A" },
  { value: DefaultProductSort.Newest, label: "Newest" },
];

export const CATEGORY_IMAGE_ACCEPT = ".ico,.jpg,.jpeg,.gif,.png";
export const CATEGORY_IMAGE_MAX_MB = 8;

export const CATEGORY_DESCRIPTION_MENUBAR = "file edit insert view format table";
export const CATEGORY_DESCRIPTION_TOOLBAR =
  "undo redo | blocks | bold italic forecolor backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | code";

export const categoryDefaults: CategoryFormValues = {
  [CategoryFormNames.Name]: "",
  [CategoryFormNames.Slug]: "",
  [CategoryFormNames.Channel]: "",
  [CategoryFormNames.Description]: "",
  [CategoryFormNames.IsVisible]: true,
  [CategoryFormNames.Parent]: { id: null, path: "" },
  [CategoryFormNames.TemplateLayout]: CategoryTemplateLayout.Default,
  [CategoryFormNames.SortOrder]: 0,
  [CategoryFormNames.DefaultProductSort]: DefaultProductSort.StorefrontDefault,
  [CategoryFormNames.SeoHomeTitle]: "",
  [CategoryFormNames.SeoMetaKeywords]: "",
  [CategoryFormNames.SeoMetaDescription]: "",
  [CategoryFormNames.SeoSearchKeywords]: "",
  [CategoryFormNames.Image]: null,
};

const VISIBLE_FLAGS = [1, "1", true];

// The edit page's "…" menu
export const CATEGORY_EDIT_ACTIONS: ActionItem[] = [
  {
    type: ActionEnums.VIEW_STOREFRONT,
    label: "View on storefront",
    checks: [{ key: "slug", type: CheckTypeEnums.EXISTS }],
  },
  { type: ActionEnums.VIEW, label: "View products" },
  {
    type: ActionEnums.DISABLE,
    label: "Disable visibility",
    checks: [
      { key: "is_visible", value: VISIBLE_FLAGS, type: CheckTypeEnums.INCLUDES },
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
  { type: ActionEnums.DELETE, label: "Delete" },
];

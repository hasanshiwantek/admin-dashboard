import type { SelectOption } from "@/components/ui/Select";
import type { CommentSettingsFormValues } from "./type";

export const PRODUCT_REVIEWS_LEARN_MORE_URL =
  "https://support.bigcommerce.com/s/article/Product-Reviews";
export const CUSTOM_REVIEW_FORM_STEPS_URL =
  "https://support.bigcommerce.com/s/article/Product-Reviews#customize";

export enum CommentTab {
  General = "general",
  BuiltIn = "built-in",
}

export const commentTabs = [
  { key: CommentTab.General, label: "General Settings" },
  { key: CommentTab.BuiltIn, label: "Built-in" },
];

export enum CommentSystem {
  BuiltIn = "built-in",
}

export const commentSystemOptions: SelectOption[] = [
  { value: CommentSystem.BuiltIn, label: "Built-in" },
];

// The setup tab shown for each comment system
export const SYSTEM_TAB: Record<CommentSystem, CommentTab> = {
  [CommentSystem.BuiltIn]: CommentTab.BuiltIn,
};

export enum CommentTarget {
  ProductReviews = "product-reviews",
}

export const commentTargetOptions: SelectOption[] = [
  { value: CommentTarget.ProductReviews, label: "Product reviews" },
];

export enum CommentSettingsFormNames {
  CommentSystem = "commentSystem",
  EnabledFor = "enabledFor",
  OnlyPastCustomers = "onlyPastCustomers",
}

export const commentSettingsDefaults: CommentSettingsFormValues = {
  [CommentSettingsFormNames.CommentSystem]: CommentSystem.BuiltIn,
  [CommentSettingsFormNames.EnabledFor]: [CommentTarget.ProductReviews],
  [CommentSettingsFormNames.OnlyPastCustomers]: true,
};

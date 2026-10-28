import type { ProductCategoriesFormValues } from "./type";

export enum ProductCategoriesFormNames {
  Categories = "categories",
}

export const productCategoriesDefaults: ProductCategoriesFormValues = {
  [ProductCategoriesFormNames.Categories]: [],
};

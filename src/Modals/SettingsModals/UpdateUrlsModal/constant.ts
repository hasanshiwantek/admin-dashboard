import type { UrlSettingSection } from "@/app/(protected)/manage/settings/(general)/type";
import type { UpdateUrlsCopy, UpdateUrlsFormValues } from "./type";

export enum UpdateUrlsFormNames {
  Scope = "scope",
  CreateRedirects = "createRedirects",
}

export enum UpdateUrlsScope {
  All = "all",
  NotCustomized = "not-customized",
}

export const updateUrlsScopeOptions = (items: string) => [
  {
    value: UpdateUrlsScope.All,
    label: `Update URLs for all ${items}, including those with URLs I've customized`,
  },
  {
    value: UpdateUrlsScope.NotCustomized,
    label: `Update URLs only for ${items} with URLs that I haven't customized`,
  },
];

export const updateUrlsDefaults: UpdateUrlsFormValues = {
  [UpdateUrlsFormNames.Scope]: UpdateUrlsScope.NotCustomized,
  [UpdateUrlsFormNames.CreateRedirects]: true,
};

export const updateUrlsCopy: Record<UrlSettingSection, UpdateUrlsCopy> = {
  product: {
    title: "Update Product URLs",
    items: "products",
    itemLabel: "product",
  },
  category: {
    title: "Update Category URLs",
    items: "categories",
    itemLabel: "category",
  },
  webpage: {
    title: "Update Page URLs",
    items: "web pages",
    itemLabel: "page",
  },
};

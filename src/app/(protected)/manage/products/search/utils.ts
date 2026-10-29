import { buildQueryParams } from "@/lib/utils";
import {
  ProductSearchFormNames,
  SEARCH_RESULTS_PAGE,
  SEARCH_RESULTS_PAGE_SIZE,
} from "./constant";
import type { ProductSearchFormValues } from "./type";

export const transformPostProductSearch = (values: ProductSearchFormValues) =>
  buildQueryParams({
    page: SEARCH_RESULTS_PAGE,
    pageSize: SEARCH_RESULTS_PAGE_SIZE,
    ...values,
    [ProductSearchFormNames.SearchKeywords]:
      values[ProductSearchFormNames.SearchKeywords]?.trim(),
  });

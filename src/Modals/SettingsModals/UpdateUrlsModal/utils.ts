import { UpdateUrlsScope } from "./constant";
import { UpdateUrlsFormValues } from "./type";

export const transformPostUpdateUrls = (values: UpdateUrlsFormValues) => ({
  updateAll: values.scope === UpdateUrlsScope.All,
  createRedirects: values.createRedirects,
});

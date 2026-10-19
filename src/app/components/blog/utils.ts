import { BlogFormFieldName } from "./constant";
import { BlogFormValues } from "./type";

export const transformBlogFormValues = (blog: BlogFormValues) => ({
  [BlogFormFieldName.Title]: blog?.title ?? "",
  [BlogFormFieldName.Body]: blog?.body ?? "",
  [BlogFormFieldName.Author]: blog?.author ?? "",
  [BlogFormFieldName.Tags]: blog?.tags ?? "",
  [BlogFormFieldName.PostUrl]: blog?.postUrl ?? "",
  [BlogFormFieldName.MetaDescription]: blog?.metaDescription ?? "",
  [BlogFormFieldName.Thumbnail]: null,
});

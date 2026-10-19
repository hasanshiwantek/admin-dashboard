export const BlogFormFieldName = {
  Title: "title",
  Body: "body",
  Author: "author",
  Tags: "tags",
  PostUrl: "postUrl",
  MetaDescription: "metaDescription",
  Thumbnail: "thumbnail",
} as const;

export const blogDefaultValues = {
  [BlogFormFieldName.Title]: "",
  [BlogFormFieldName.Body]: "",
  [BlogFormFieldName.Author]: "",
  [BlogFormFieldName.Tags]: "",
  [BlogFormFieldName.PostUrl]: "",
  [BlogFormFieldName.MetaDescription]: "",
  [BlogFormFieldName.Thumbnail]: null,
};

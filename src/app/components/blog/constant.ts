export const BlogField = {
  Title: "title",
  Body: "body",
  Author: "author",
  Tags: "tags",
  PostUrl: "postUrl",
  MetaDescription: "metaDescription",
  Thumbnail: "thumbnail",
} as const;

export const blogDefaultValues = {
  [BlogField.Title]: "",
  [BlogField.Body]: "",
  [BlogField.Author]: "",
  [BlogField.Tags]: "",
  [BlogField.PostUrl]: "",
  [BlogField.MetaDescription]: "",
  [BlogField.Thumbnail]: null,
};

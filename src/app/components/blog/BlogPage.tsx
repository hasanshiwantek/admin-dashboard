"use client";

import { Upload } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import Form from "@/components/form/Form";
import InputField from "@/components/form/InputField";
import RichTextEditor from "@/components/ui/RichTextEditor";
import { Separator } from "@/components/ui/separator";
import { useAppDispatch } from "@/hooks/useReduxHooks";
import {
  createBlog,
  fetchBlogbyId,
  updateBlog,
} from "@/redux/slices/storefrontSlice";
import { BlogSchema } from "@/validations/formValidations";
import { blogDefaultValues, BlogFormFieldName } from "./constant";
import { BlogFormValues, FieldLabelProps } from "./type";
import PageTitle from "@/components/ui/PageTitle";
import { Button } from "@/components/ui/button";
import { createFormData } from "@/lib/utils";
import { transformBlogFormValues } from "./utils";
const LABEL_CLASS =
  "font-semibold text-gray-800 text-xl 2xl:text-[1.6rem]! my-0";

const FieldLabel = ({ text, optional, description }: FieldLabelProps) => (
  <span className="flex flex-col items-start gap-2">
    <span className="flex items-center gap-2 text-2xl!">
      {text}
      {optional && (
        <span className="text-2xl! font-light! text-gray-500">(Optional)</span>
      )}
    </span>
    {description && (
      <span className="font-light! text-lg text-gray-500">{description}</span>
    )}
  </span>
);

export default function BlogPage() {
  const form = useForm<BlogFormValues>({
    resolver: yupResolver(BlogSchema),
    defaultValues: blogDefaultValues,
  });

  const { control, handleSubmit, watch, setValue, reset } = form;

  const params = useParams();
  const id = params?.id as string | undefined;

  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [isDraft, setIsDraft] = useState(false);

  const router = useRouter();
  const dispatch = useAppDispatch();

  const fileList = watch(BlogFormFieldName.Thumbnail);

  useEffect(() => {
    if (fileList && fileList.length > 0) {
      const file = fileList[0];
      setPreview(URL.createObjectURL(file));
    } else {
      setPreview(null);
    }
  }, [fileList]);

  useEffect(() => {
    if (!id) return;

    dispatch(fetchBlogbyId({ id }))
      .unwrap()
      .then((res) => {
        const blog = res?.data || res?.data?.data;
        const defaultBlogFormValues = transformBlogFormValues(blog);
        reset(defaultBlogFormValues);
        if (blog?.thumbnail) setPreview(blog?.thumbnail);
      })
      .catch(console.error);
  }, [id, dispatch, setValue]);

  const onSubmit = async (data: BlogFormValues) => {
    const formData = createFormData(
      {
        ...data,
        isDraft,
      },
      [BlogFormFieldName.Thumbnail],
    );
    try {
      setLoading(true);

      const resultAction = id
        ? await dispatch(updateBlog({ id, data: formData }))
        : await dispatch(createBlog({ data: formData }));

      const success =
        (id && updateBlog.fulfilled.match(resultAction)) ||
        (!id && createBlog.fulfilled.match(resultAction));

      if (success) {
        router.push("/manage/storefront/blog");
      }
    } catch (err) {
      console.error("Blog save failed:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDraftSave = () => {
    setIsDraft(true);
    handleSubmit(onSubmit)();
  };

  const handlePublish = () => {
    setIsDraft(false);
    handleSubmit(onSubmit)();
  };

  const BLOG_BODY_TOOLBAR =
    "undo redo | blocks | bold italic underline | bullist numlist | link image | alignleft aligncenter alignright | code";

  return (
    <div className="w-full max-w-[100rem] mx-auto px-10 py-14">
      <PageTitle
        title={id ? "Edit Blog Post" : "New Blog Post"}
        hideActionButton
      />

      <Form
        form={form}
        onSubmit={onSubmit}
        bodyClassName="bg-transparent border-0 rounded-none p-0 gap-8"
        footer={{
          submitText: id ? "Update" : "Publish",
          onCancel: () => router.push("/manage/storefront/blog"),
          loading: loading || form.formState.isSubmitting,
          extraActions: (
            <Button
              type="button"
              className="btn-outline-primary"
              disabled={loading}
              onClick={handleDraftSave}
            >
              {loading ? "Saving..." : "Save Draft"}
            </Button>
          ),
        }}
      >
        {/* Content */}
        <section className="flex flex-col gap-8 bg-white rounded-sm shadow-sm border border-gray-100 p-10">
          <PageTitle title="Content" hideActionButton />
          <InputField
            name={BlogFormFieldName.Title}
            label={<FieldLabel text="Title" />}
            layout="vertical"
            labelClassName={LABEL_CLASS}
            control={control}
            placeholder="Enter blog title"
          />

          <InputField
            name={BlogFormFieldName.Body}
            label={<FieldLabel text="Body" />}
            layout="vertical"
            labelClassName={LABEL_CLASS}
            control={control}
            Component={RichTextEditor}
            menubar="file edit insert view format table"
            toolbar={BLOG_BODY_TOOLBAR}
          />

          <InputField
            name={BlogFormFieldName.Author}
            label={<FieldLabel text="Author" />}
            layout="vertical"
            labelClassName={LABEL_CLASS}
            control={control}
            placeholder="Author name"
          />

          <InputField
            name={BlogFormFieldName.Tags}
            label={<FieldLabel text="Tags" />}
            layout="vertical"
            labelClassName={LABEL_CLASS}
            control={control}
            placeholder="Comma separated tags"
          />

          {/* Thumbnail */}
          <div className="flex flex-col gap-3">
            <FieldLabel text="Summary Thumbnail Image" optional />
            <div className="flex items-center gap-4">
              <input
                type="file"
                id="thumbnail"
                accept="image/*"
                className="hidden"
                {...form.register(BlogFormFieldName.Thumbnail)}
              />
              <label
                htmlFor="thumbnail"
                className="cursor-pointer inline-flex items-center gap-2 rounded-md border border-gray-300 bg-gray-50 px-4 py-2 text-xl font-medium text-gray-700 hover:bg-gray-100"
              >
                <Upload className="h-8 w-8" /> Choose File
              </label>

              {preview && (
                <div className="relative">
                  <img
                    src={preview}
                    alt="Preview"
                    className="h-40 w-40 object-cover rounded-xs"
                  />
                  <span
                    onClick={() => {
                      setPreview(null);
                      const input = document.getElementById(
                        BlogFormFieldName.Thumbnail,
                      ) as HTMLInputElement;
                      if (input) input.value = "";
                      form.setValue(BlogFormFieldName.Thumbnail, undefined);
                    }}
                    className="absolute cursor-pointer top-1 right-1 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-full w-8 h-8 flex items-center justify-center text-3xl font-bold"
                  >
                    ×
                  </span>
                </div>
              )}
            </div>
          </div>
        </section>

        <Separator className="my-2" />

        {/* SEO */}
        <section className="flex flex-col gap-8 bg-white rounded-sm shadow-sm border border-gray-100 p-10">
          <h2 className="text-[2.4rem]! font-light! text-gray-800"></h2>
          <PageTitle title={"SEO (optional)"} hideActionButton />
          <InputField
            name={BlogFormFieldName.PostUrl}
            label={<FieldLabel text="Post URL" optional />}
            layout="vertical"
            labelClassName={LABEL_CLASS}
            control={control}
            placeholder="your-post-slug"
          />

          <InputField
            name={BlogFormFieldName.MetaDescription}
            label={<FieldLabel text="Meta description" optional />}
            layout="vertical"
            labelClassName={LABEL_CLASS}
            control={control}
            placeholder="Optional meta description"
          />
        </section>
      </Form>
    </div>
  );
}

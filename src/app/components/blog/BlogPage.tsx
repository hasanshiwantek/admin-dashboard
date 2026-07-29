"use client";
import React, { useMemo } from "react";
import { useForm, Controller } from "react-hook-form";
import { Editor } from "@tinymce/tinymce-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Upload } from "lucide-react";
import { useRef, useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import {
  createBlog,
  fetchBlogbyId,
  updateBlog,
} from "@/redux/slices/storefrontSlice";
import { useAppDispatch, useAppSelector } from "@/hooks/useReduxHooks";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";

export default function BlogPage() {
  type FormValues = {
    title: string;
    body: string;
    author: string;
    tags: string;
    postUrl: string;
    metaDescription: string;
    thumbnail?: FileList;
    isDraft?: boolean;
  };

  const { register, handleSubmit, control, watch, setValue } =
    useForm<FormValues>({
      defaultValues: {
        title: "",
        body: "",
        author: "",
        tags: "",
        postUrl: "",
        metaDescription: "",
        isDraft: false,
      },
    });
  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "color",
    "background",
    "list",
    "bullet",
    "align",
    "link",
    "image",
    "blockquote",
    "code-block",
  ];

  const modules = useMemo(
    () => ({
      toolbar: [
        [{ header: [1, 2, 3, false] }],
        ["bold", "italic", "underline", "strike"],
        [{ color: [] }, { background: [] }],
        [{ list: "ordered" }, { list: "bullet" }],
        [{ align: [] }],
        ["link", "image"],
        ["blockquote", "code-block"],
        ["clean"],
      ],
    }),
    [],
  );

  const params = useParams();
  const id = params?.id; // will be undefined if it's a "create" page

  const editorRef = useRef<any>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const router = useRouter();
  const dispatch = useAppDispatch();
  // Watch file input
  const fileList = watch("thumbnail");
  const [isDraft, setIsDraft] = useState(false); // 👈 state for draft toggle

  useEffect(() => {
    if (fileList && fileList.length > 0) {
      const file = fileList[0];
      const url = URL.createObjectURL(file);
      setPreview(url);
    } else {
      setPreview(null);
    }
  }, [fileList]);

  const onSubmit = async (data: FormValues) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("body", data.body);
    formData.append("author", data.author);
    formData.append("tags", data.tags);
    formData.append("postUrl", data.postUrl);
    formData.append("metaDescription", data.metaDescription);
    formData.append("isDraft", isDraft ? "true" : "false"); // 👈 add draft flag

    if (data.thumbnail && data.thumbnail.length > 0) {
      formData.append("thumbnail", data.thumbnail[0]);
    }

    try {
      const resultAction = id
        ? await dispatch(updateBlog({ id, data: formData }))
        : await dispatch(createBlog({ data: formData }));

      if (
        (id && updateBlog.fulfilled.match(resultAction)) ||
        (!id && createBlog.fulfilled.match(resultAction))
      ) {
        setTimeout(() => {
          router.push("/manage/storefront/blog");
        }, 2000);
      } else {
        console.error("❌ Blog save failed:", resultAction.payload);
      }
    } catch (err) {
      console.error("🔥 Error dispatching:", err);
    }
  };

  useEffect(() => {
    if (id) {
      dispatch(fetchBlogbyId({ id }))
        .unwrap()
        .then((res) => {
          const blog = res?.data || res?.data?.data; // depends on backend response structure
          setValue("title", blog.title);
          setValue("body", blog.body);
          setValue("author", blog.author);
          setValue("tags", blog.tags);
          setValue("postUrl", blog.postUrl);
          setValue("metaDescription", blog.metaDescription);
          if (blog.thumbnail) setPreview(blog.thumbnail);
        })
        .catch((err) => console.error("Failed to load blog:", err));
    }
  }, [id, dispatch, setValue]);

  // 👇 Save draft triggers submit with draft = true
  const handleDraftSave = () => {
    setIsDraft(true);
    handleSubmit(onSubmit)();
  };

  // 👇 Publish triggers submit with draft = false
  const handlePublish = () => {
    setIsDraft(false);
    handleSubmit(onSubmit)();
  };

  return (
    <div className="">
      <h1 className="!font-light my-5 2xl:!text-5xl">
        {id ? "Edit Blog Post" : "New Blog Post"}
      </h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="  bg-white p-10 rounded-sm shadow-md">
          <h1 className="!font-bold mb-5 2xl:!text-[2.4rem]">Content</h1>
          {/* Title */}
          <div className="ml-30 flex flex-col gap-10">
            <div className="flex items-center gap-4">
              <Label htmlFor="title " className="w-[100px] 2xl:!text-2xl">
                Title
              </Label>
              <Input
                placeholder="Enter blog title"
                {...register("title", { required: true })}
              />
            </div>

            {/* TinyMCE Editor integrated with react-hook-form */}
            <div className="flex items-start gap-4">
              <Label className="w-[100px] 2xl:!text-2xl">Body</Label>
              <Controller
                name="body"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <ReactQuill
                    theme="snow"
                    value={field.value || ""}
                    onChange={field.onChange}
                    modules={modules}
                    formats={formats}
                    placeholder="Write your description here..."
                  />
                )}
              />
            </div>

            {/* Author */}
            <div className="flex items-center gap-4">
              <Label htmlFor="author" className="w-[100px] 2xl:!text-2xl">
                Author
              </Label>
              <Input placeholder="Author name" {...register("author")} />
            </div>

            {/* Tags */}
            <div className="flex items-center gap-4">
              <Label htmlFor="tags" className="w-[100px] 2xl:!text-2xl">
                Tags
              </Label>
              <Input
                placeholder="Hit enter to add multiple tags"
                {...register("tags")}
              />
            </div>
            {/* File Upload */}
            <div className="flex items-center gap-4 relative">
              <Label className="w-[160px] 2xl:!text-2xl">
                Summary Thumbnail Image (optional)
              </Label>
              <input
                type="file"
                id="thumbnail"
                className="hidden"
                {...register("thumbnail")}
              />
              <label
                htmlFor="thumbnail"
                className="cursor-pointer inline-flex items-center gap-2 rounded-md border border-gray-300 bg-gray-50 px-4 py-2 text-xl font-medium text-gray-700 hover:bg-gray-100 transition-colors"
              >
                <Upload className="h-8 w-8" /> Choose File
              </label>

              {/* Preview */}
              {preview && (
                <div className="relative">
                  <img
                    src={preview}
                    alt="Preview"
                    className="h-40 w-40 object-cover rounded-xs"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setPreview(null);
                      // Clear the file input manually
                      const input = document.getElementById(
                        "thumbnail",
                      ) as HTMLInputElement;
                      if (input) input.value = "";
                    }}
                    className="absolute top-1 right-1 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-full w-8 h-8 flex items-center justify-center text-3xl font-bold shadow"
                  >
                    ×
                  </button>
                </div>
              )}
            </div>
          </div>

          <Separator className="my-6" />
        </div>

        {/* SEO Section */}
        <div className="mb-30">
          <div className="  bg-white p-10 rounded-sm shadow-md ">
            <h1 className="!font-bold my-5 2xl:!text-[2.4rem]">
              SEO (optional)
            </h1>
            <div className="ml-30 flex flex-col gap-10">
              <div className="flex items-center gap-4">
                <Label
                  htmlFor="Your post URL"
                  className="w-[120px] 2xl:!text-2xl"
                >
                  Post URL
                </Label>
                <Input placeholder="Your post URL" {...register("postUrl")} />
              </div>

              <div className="flex items-center gap-4">
                <Label
                  htmlFor=" Meta description"
                  className="w-[120px] 2xl:!text-2xl"
                >
                  Meta description
                </Label>
                <Input
                  placeholder="Optional"
                  {...register("metaDescription")}
                />
              </div>
            </div>
          </div>
        </div>

        {/* FORM ACTION BUTTONS */}
        <div className="flex justify-end  gap-10 items-center fixed w-full bottom-0 right-0  bg-white/90 z-10 shadow-xs border-t  p-4">
          <button
            type="button"
            className="btn-outline-primary"
            onClick={() => router.push("/manage/storefront/blog/")}
          >
            Cancel
          </button>
          <button
            type="button"
            className="btn-outline-primary"
            onClick={handleDraftSave}
          >
            Save Draft
          </button>
          <button type="button" className="btn-primary" onClick={handlePublish}>
            {id ? "Update" : "Publish"}
          </button>
        </div>
      </form>
    </div>
  );
}

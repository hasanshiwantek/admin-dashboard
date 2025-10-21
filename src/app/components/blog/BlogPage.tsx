"use client";
import React from "react";
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
export default function BlogPage() {
  type FormValues = {
    title: string;
    body: string;
    author: string;
    tags: string;
    postUrl: string;
    metaDescription: string;
    thumbnail?: FileList;
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
      },
    });
  const params = useParams();
  const id = params?.id; // will be undefined if it's a "create" page

  const editorRef = useRef<any>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const router = useRouter();
  const dispatch = useAppDispatch();
  // Watch file input
  const fileList = watch("thumbnail");

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
        console.log("✅ Blog saved successfully:", resultAction.payload);
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

  const handleDraftSave = () => {
    alert("Saved to draft");
  };

  return (
    <div className="">
      <h1 className="!font-light my-5">
        {id ? "Edit Blog Post" : "New Blog Post"}
      </h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="  bg-white p-10 rounded-sm shadow-md">
          <h1 className="!font-bold mb-5">Content</h1>
          {/* Title */}
          <div className="ml-30 flex flex-col gap-10">
            <div className="flex items-center gap-4">
              <Label htmlFor="title " className="w-[100px]">
                Title
              </Label>
              <Input
                placeholder="Enter blog title"
                {...register("title", { required: true })}
              />
            </div>

            {/* TinyMCE Editor integrated with react-hook-form */}
            <div className="flex items-start gap-4">
              <Label className="w-[100px]">Body</Label>
              <Controller
                name="body"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <Editor
                    apiKey="d2z6pu70qtywhkzox051ga0czhas02dp55gl9bxijefs4vxo"
                    onInit={(evt, editor) => (editorRef.current = editor)}
                    value={field.value}
                    onEditorChange={(content) => field.onChange(content)}
                    init={{
                      height: 500,
                      menubar: true,
                      directionality: "ltr",
                      plugins: [
                        "advlist",
                        "autolink",
                        "lists",
                        "link",
                        "image",
                        "charmap",
                        "preview",
                        "anchor",
                        "searchreplace",
                        "visualblocks",
                        "code",
                        "fullscreen",
                        "insertdatetime",
                        "media",
                        "table",
                        "toc",
                        "help",
                        "wordcount",
                        "emoticons",
                        "hr",
                        "pagebreak",
                        "print",
                      ],
                      // Cleaned up toolbar (removed duplicate line)
                      toolbar: `undo redo | blocks fontfamily fontsize | bold italic underline strikethrough forecolor backcolor | 
            alignleft aligncenter alignright alignjustify | outdent indent | numlist bullist |  
            link image media table hr emoticons toc | code fullscreen preview print | removeformat`,

                      branding: false,
                      default_link_target: "_blank",
                      toolbar_mode: "sliding",

                      // TOC configuration (Correct, no change needed)
                      toc_header: "h1,h2,h3",
                      toc_depth: 3,
                      toc_class: "my-toc",

                      // Image upload (Correct, assuming editorRef is a valid React Ref)
                      images_upload_url: "/api/upload",
                      automatic_uploads: true,
                      file_picker_types: "image",
                      file_picker_callback: function (
                        callback: any,
                        value: any,
                        meta: any
                      ) {
                        if (meta.filetype === "image") {
                          const input = document.createElement("input");
                          input.setAttribute("type", "file");
                          input.setAttribute("accept", "image/*");
                          input.onchange = function (ev: Event) {
                            const target = ev.currentTarget as HTMLInputElement;
                            const file = target.files?.[0];
                            if (!file) return;

                            const reader = new FileReader();
                            reader.onload = function () {
                              if (
                                reader.result &&
                                typeof reader.result === "string"
                              ) {
                                // **Crucially relies on editorRef.current being set**
                                const editorInstance = editorRef.current;
                                if (!editorInstance) return;

                                const id = "blobid" + new Date().getTime();
                                const blobCache =
                                  editorInstance.editorUpload.blobCache;
                                const base64 = reader.result.split(",")[1];
                                const blobInfo = blobCache.create(
                                  id,
                                  file,
                                  base64
                                );
                                blobCache.add(blobInfo);
                                callback(blobInfo.blobUri(), {
                                  title: file.name,
                                });
                              } else {
                                console.error(
                                  "FileReader result is null or not a string"
                                );
                              }
                            };
                            reader.readAsDataURL(file);
                          };
                          input.click();
                        }
                      },
                    }}
                  />
                )}
              />
            </div>

            {/* Author */}
            <div className="flex items-center gap-4">
              <Label htmlFor="author" className="w-[100px]">
                Author
              </Label>
              <Input placeholder="Author name" {...register("author")} />
            </div>

            {/* Tags */}
            <div className="flex items-center gap-4">
              <Label htmlFor="tags" className="w-[110px]">
                Tags
              </Label>
              <Textarea
                placeholder="Hit enter to add multiple tags"
                {...register("tags")}
              />
            </div>
            {/* File Upload */}
            <div className="flex items-center gap-4 relative">
              <Label className="w-[100px]">
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
                        "thumbnail"
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
            <h1 className="!font-bold my-5">SEO (optional)</h1>
            <div className="ml-30 flex flex-col gap-10">
              <div className="flex items-center gap-4">
                <Label htmlFor="Your post URL" className="w-[100px]">
                  Post URL
                </Label>
                <Input placeholder="Your post URL" {...register("postUrl")} />
              </div>

              <div className="flex items-center gap-4">
                <Label htmlFor=" Meta description" className="w-[100px]">
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
        <div className="flex justify-end gap-4 items-center fixed w-full bottom-0 right-0 bg-white/90 z-10 shadow-xs border-t p-4 ">
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
          <button type="submit" className="btn-primary">
            {id ? "Update" : "Publish"}
          </button>
        </div>
      </form>
    </div>
  );
}

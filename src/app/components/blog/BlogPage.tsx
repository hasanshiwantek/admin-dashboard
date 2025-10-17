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

  const { register, handleSubmit, control, watch } = useForm<FormValues>({
    defaultValues: {
      title: "",
      body: "",
      author: "",
      tags: "",
      postUrl: "",
      metaDescription: "",
    },
  });

  const editorRef = useRef<any>(null);
  const [preview, setPreview] = useState<string | null>(null);
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

  const onSubmit = (data: FormValues) => {
    console.log("Form Data:", data);
    // You can send data + file to backend here
  };

  return (
    <div className="">
      <h1 className="!font-light my-5">New Blog Post</h1>

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
                      height: 400,
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
                        "code",
                        "help",
                        "wordcount",
                        "emoticons",
                        "hr",
                        "pagebreak",
                        "print",
                      ],
                      toolbar: `undo redo | blocks fontfamily fontsize | bold italic underline strikethrough forecolor backcolor | 
             alignleft aligncenter alignright alignjustify | 
             outdent indent | numlist bullist | link image media table hr emoticons | 
             code fullscreen preview print | removeformat`,
                      branding: false,
                      default_link_target: "_blank",
                      toolbar_mode: "sliding",
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
            <div className="flex items-center gap-4">
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
              {preview && (
                <img
                  src={preview}
                  alt="Preview"
                  className="h-40 w-40 object-cover rounded-md"
                />
              )}
            </div>
          </div>

          <Separator className="my-6" />
        </div>

        {/* SEO Section */}
        <div className="mb-30">
          <div className="  bg-white p-10 rounded-sm shadow-md ">
            <h1 className="!font-light my-5">SEO (optional)</h1>
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
          <button type="button" className="btn-outline-primary">
            Cancel
          </button>
          <button type="submit" className="btn-outline-primary">
            Save Draft
          </button>
          <button type="submit" className="btn-primary">
            Publish
          </button>
        </div>
      </form>
    </div>
  );
}

"use client";

import { useRef, useState,useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { ImageIcon, UploadCloudIcon, PlusIcon } from "lucide-react";
import ImagePreviewList from "./ImagePreviewList";

type PreviewItem = {
  file: File;
  url: string;
  description: string;
  selected: boolean;
  isThumbnail: boolean;
};

export default function ImageVideoUploader() {
  const { register, setValue } = useFormContext();
  const inputRef = useRef<HTMLInputElement>(null);
  const imageRegister = register("images");
  const [previews, setPreviews] = useState<PreviewItem[]>([]);

  const handleUploadClick = () => {
    inputRef.current?.click();
  };

  const fileListFromArray = (files: File[]): FileList => {
    const dt = new DataTransfer();
    files.forEach((file) => dt.items.add(file));
    return dt.files;
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const newFiles = Array.from(files).filter(
      (file) =>
        !previews.some(
          (p) => p.file.name === file.name && p.file.size === file.size
        )
    );

    const newPreviews = newFiles.map((file) => ({
      file,
      url: URL.createObjectURL(file),
      description: "",
      selected: false,
      isThumbnail: false,
    }));

    const updated = [...previews, ...newPreviews];
    setPreviews(updated);
    console.log("Image Previews: ",previews);
    console.log("Image Previews: ",updated);

    
    setValue("images", fileListFromArray(updated.map((p) => p.file)), {
      shouldValidate: true,
    });
  };

  useEffect(() => {
  return () => {
    previews.forEach(p => URL.revokeObjectURL(p.url));
  };
}, []);


  return (
    <div className="p-10 shadow-lg bg-white rounded-md">
      <div className="flex items-center justify-between mb-2">
        <h1 className="my-5 text-xl font-semibold">Images & Videos</h1>
        <div className="flex space-x-4">
          <button
            type="button"
            className="btn-outline-primary flex items-center border border-gray-300 px-4 py-2 rounded-md text-sm"
          >
            <PlusIcon className="w-5 h-5 mr-2" />
            Add from URL
          </button>
          <button
            type="button"
            onClick={handleUploadClick}
            className="btn-outline-primary flex items-center border border-gray-300 px-4 py-2 rounded-md text-sm"
          >
            <UploadCloudIcon className="w-5 h-5 mr-2" />
            Upload Images
          </button>
        </div>
      </div>

      <p className="mb-4 text-sm text-gray-500">
        Add images and videos of your product to engage customers.
      </p>

      <input
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={(e) => {
          handleFileChange(e);
          imageRegister.onChange(e);
        }}
        ref={(el) => {
          imageRegister.ref(el);
          inputRef.current = el;
        }}
      />

      <div
        className="flex flex-col items-center justify-center text-center p-10 border border-dashed border-blue-500 rounded-md cursor-pointer text-muted-foreground hover:bg-blue-50 transition"
        onClick={handleUploadClick}
      >
        <ImageIcon className="w-10 h-40 mb-4 opacity-30" />
        <p className="text-sm">Drag & Drop images here to upload.</p>
        <span className="text-xs mt-1">
          bmp, jpeg, png, wbmp, xbm or webp. Maximum 8 MB.
        </span>
      </div>

      {previews.length > 0 && (
        <ImagePreviewList previews={previews} setPreviews={setPreviews} />
      )}

      <div className="mt-8">
        <h2 className="text-base font-medium mb-2">Videos</h2>
        <p className="text-sm text-muted-foreground">
          No videos have been added yet.
        </p>
      </div>
    </div>
  );
}

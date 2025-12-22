"use client";

import { useRef, useState, useEffect } from "react";
import { useFormContext, UseFormSetValue } from "react-hook-form";
import { ImageIcon, UploadCloudIcon, PlusIcon } from "lucide-react";
import ImagePreviewList from "./ImagePreviewList";
import AddFromUrlModal from "./AddFromUrlModal";
import { PreviewItem } from "@/types/types";
// export type PreviewItem = {
//   file: File ;
//   url: string;
//   description: string;
//   selected: boolean;
//   isThumbnail: boolean;
// };

type Props = {
  initialImages?: any[]; // image[] from backend
};

export default function ImageVideoUploader({ initialImages }: Props) {
  const { register, setValue } = useFormContext();
  const inputRef = useRef<HTMLInputElement>(null);
  // const imageRegister = register("image");
  const [previews, setPreviews] = useState<PreviewItem[]>([]);
  const [urlImages, setUrlImages] = useState<string[]>([]);
  const [isUrlModalOpen, setIsUrlModalOpen] = useState(false);

  useEffect(() => {
    if (initialImages && initialImages.length > 0) {
      const initialPreviews: PreviewItem[] = initialImages.map((img) => ({
        file: null,
        path: img.path, // full image URL
        description: img.altText || img.description || "",
        selected: false,
        isPrimary: img.isPrimary === 1,
        type:
          img.path.includes(".mp4") || img.path.includes("video")
            ? "video"
            : "image",
      }));
      setPreviews(initialPreviews);
      syncFormState(initialPreviews); // ensures react-hook-form gets it too
    }
  }, [initialImages]);

  console.log("Image Previews", previews);

  const handleUploadClick = () => {
    inputRef.current?.click();
  };

  const syncFormState = (updatedPreviews: PreviewItem[]) => {
    setValue("image", updatedPreviews, { shouldValidate: true });
    console.log("🟢 Synced to react-hook-form:");
    console.log("  → image[]:", updatedPreviews);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const newFiles = Array.from(files).filter(
      (file) =>
        !previews.some(
          (p) => p.file?.name === file.name && p.file?.size === file.size
        )
    );

    const newPreviews: PreviewItem[] = newFiles.map((file) => ({
      file,
      path: file, // ✅ FIX: this makes preview work
      description: "",
      selected: false,
      isPrimary: false,
      type: file.type.startsWith("video/") ? "video" : "image",
    }));

    const updated = [...previews, ...newPreviews];
    setPreviews(updated);
    syncFormState(updated); // ✅ call with full objects
  };

  // useEffect(() => {
  //   register("urlImages"); // Register it once
  // }, [register]);

  const addUrlPreview = (item: PreviewItem) => {
    const updated = [...previews, item];
    setPreviews(updated);
    syncFormState(updated);
  };

  useEffect(() => {
    return () => {
      previews.forEach((p: any) => {
        if (p.file) URL.revokeObjectURL(p.path); // ✅ only revoke object URLs
      });
    };
  }, []);

  return (
    <div className="p-10 shadow-lg bg-white rounded-md" id="images">
      <div className="flex items-center justify-between mb-2">
        <h1 className="my-5 text-xl font-semibold 2xl:!text-[2.4rem]">Images & Videos</h1>
        <div className="flex space-x-4">
          <button
            type="button"
            className="btn-outline-primary flex items-center border border-gray-300 px-4 py-2 rounded-md text-sm 2xl:!text-2xl"
            onClick={() => setIsUrlModalOpen(true)}
          >
            <PlusIcon className="w-5 h-5 mr-2" />
            Add from URL
          </button>
          <button
            type="button"
            onClick={handleUploadClick}
            className="btn-outline-primary flex items-center border border-gray-300 px-4 py-2 rounded-md text-sm 2xl:!text-2xl" 
          >
            <UploadCloudIcon className="w-5 h-5 mr-2" />
            Upload Images
          </button>
        </div>
      </div>

      <p className="mb-4 text-sm text-gray-500 2xl:!text-2xl">
        Add images and videos of your product to engage customers.
      </p>

      <input
        type="file"
        accept="image/*,video/*"
        multiple
        className="hidden"
        onChange={handleFileChange}
        ref={inputRef}
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
        <ImagePreviewList
          previews={previews}
          setPreviews={setPreviews}
          setValue={setValue}
        />
      )}

      <div className="mt-8">
        <h2 className="text-base font-medium mb-2 2xl:!text-[2rem]">Videos</h2>
        <p className="text-sm text-muted-foreground 2xl:!text-2xl">
          No videos have been added yet.
        </p>
      </div>
      <AddFromUrlModal
        open={isUrlModalOpen}
        onOpenChange={setIsUrlModalOpen}
        addUrlPreview={addUrlPreview}
      />
    </div>
  );
}

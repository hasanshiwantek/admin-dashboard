"use client";

import { TrashIcon } from "lucide-react";
import { UseFormSetValue } from "react-hook-form";
import { PreviewItem } from "@/types/types";
import Image from "next/image";


type Props = {
  previews: PreviewItem[];
  setPreviews: React.Dispatch<React.SetStateAction<PreviewItem[]>>;
  setValue: UseFormSetValue<any>;
};

export default function ImagePreviewList({
  previews,
  setPreviews,
  setValue,
}: Props) {
  const fileListFromArray = (files: File[]): FileList => {
    const dt = new DataTransfer();
    files.forEach((file) => dt.items.add(file));
    return dt.files;
  };
  // const syncForm = (updated: PreviewItem[]) => {
  //   setValue(
  //     "images",
  //     fileListFromArray(updated.filter((p) => p.file).map((p) => p.file!))
  //   );
  //   setValue(
  //     "urlImages",
  //     updated.filter((p) => !p.file).map((p) => p.url)
  //   );
  //   console.log("🧹 Synced after delete:", updated);
  // };
const syncForm = (updated: PreviewItem[]) => {
  setValue("image", updated, { shouldValidate: true });
  console.log("🧹 Synced after delete:", updated);
};

  const handleDeleteSelected = () => {
    const updated = previews.filter((p) => !p.selected);
    previews.forEach((p) => p.selected && p.file && URL.revokeObjectURL(p.url));
    setPreviews(updated);
    syncForm(updated);
  };

  return (
    <div className="mt-6 border rounded-md p-4 space-y-4">
      <h2>Images</h2>
      <div className="flex items-center justify-between border-b pb-2">
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={previews.every((p) => p.selected)}
            onChange={(e) =>
              setPreviews(
                previews.map((p) => ({ ...p, selected: e.target.checked }))
              )
            }
          />
          <span>
            {previews.filter((p) => p.selected).length} image selected
          </span>
        </div>
        <button
          type="button"
          onClick={handleDeleteSelected}
          className="text-red-600 border border-red-600 px-3 py-1 rounded text-lg cursor-pointer"
        >
          Delete Images
        </button>
      </div>

      <div className="grid grid-cols-12 gap-2 text-base font-semibold text-gray-600">
        <div className="col-span-1" />
        <div className="col-span-2">Image</div>
        <div className="col-span-7">Description (Image alt text)</div>
        <div className="col-span-2">Thumbnail</div>
      </div>

      {previews.map((p, index) => (
        <div
          key={index}
          className="grid grid-cols-12 gap-2 items-center border-t pt-3"
        >
          <div className="col-span-1">
            <input
              type="checkbox"
              checked={p.selected}
              onChange={(e) => {
                const updated = [...previews];
                updated[index].selected = e.target.checked;
                setPreviews(updated);
              }}
            />
          </div>
          <div className="col-span-2">
            {p.type === "video" ? (
              <video src={p.url} controls className="h-22 w-22 rounded border" />
            ) : (
                <Image
                  src={p.url}
                  alt="preview"
                  width={88}
                  height={88}
                  unoptimized
                  className="rounded border object-cover"
                />
            )}
          </div>
          <div className="col-span-7">
            <input
              type="text"
              value={p.description}
              onChange={(e) => {
                const updated = [...previews];
                updated[index].description = e.target.value;
                setPreviews(updated);
              }}
              className="w-full border rounded px-3 py-4 text-lg"
              placeholder="Write a description of this image to improve search engine optimization"
            />
          </div>
          <div className="col-span-2 flex items-center space-x-2">
            <input
              type="radio"
              name="thumbnail"
              checked={p.isThumbnail}
              onChange={() => {
                const updated = previews.map((img, i) => ({
                  ...img,
                  isThumbnail: i === index,
                }));
                setPreviews(updated);
              }}
            />
            <button
              type="button"
              onClick={() => {
                if (p.file) URL.revokeObjectURL(p.url);
                const updated = previews.filter((_, i) => i !== index);
                setPreviews(updated);
                syncForm(updated);
              }}
              className="text-gray-400 hover:text-red-500 cursor-pointer ml-20"
            >
              <TrashIcon className="w-6 h-6" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

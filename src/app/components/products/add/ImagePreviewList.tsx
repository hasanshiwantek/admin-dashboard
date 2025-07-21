"use client";

import { TrashIcon } from "lucide-react";

type PreviewItem = {
  file: File;
  url: string;
  description: string;
  selected: boolean;
  isThumbnail: boolean;
};

type Props = {
  previews: PreviewItem[];
  setPreviews: React.Dispatch<React.SetStateAction<PreviewItem[]>>;
};

export default function ImagePreviewList({ previews, setPreviews }: Props) {
  const handleDeleteSelected = () => {
    const toDelete = previews.filter((p) => p.selected);
    toDelete.forEach((p) => URL.revokeObjectURL(p.url));
    setPreviews(previews.filter((p) => !p.selected));
    console.log("Images after deletion: ",previews);
    
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
          <span>{previews.filter((p) => p.selected).length} image selected</span>
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
        <div className="col-span-7">Description  (Image alt text)</div>
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
            <img
              src={p.url}
              alt={`preview-${index}`}
              className="h-22 w-22 rounded object-cover border"
            />
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
              className="w-full border rounded px-3 py-1 text-sm"
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
                URL.revokeObjectURL(p.url);
                setPreviews(previews.filter((_, i) => i !== index));
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

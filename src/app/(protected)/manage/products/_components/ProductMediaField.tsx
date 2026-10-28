"use client";

import { ListRenderer } from "@/components/ListRenderer.tsx/ListRenderer";
import { Button } from "@/components/ui/Button";
import { Checkbox } from "@/components/ui/Checkbox";
import { Input } from "@/components/ui/input";
import AddMediaFromUrlModal from "@/Modals/ProductModals/AddMediaFromUrlModal/AddMediaFromUrlModal";
import type { PreviewItem } from "@/types/types";
import { ImageIcon, PlusIcon, Trash2, UploadCloudIcon } from "lucide-react";
import Image from "next/image";
import { ChangeEvent, useEffect, useMemo, useRef } from "react";
import { ProductMediaFieldProps, ProductMediaRowProps } from "./type";

const ProductMediaRow = ({
  item,
  src,
  onChange,
  onMakePrimary,
  onRemove,
}: ProductMediaRowProps) => (
  <div className="grid grid-cols-[3rem_10rem_1fr_12rem] items-center gap-4 py-3">
    <Checkbox
      aria-label="Select"
      checked={item.selected}
      onCheckedChange={(checked) => onChange({ selected: checked === true })}
    />
    {item.type === "video" ? (
      <video src={src} controls className="size-22 rounded-sm border" />
    ) : (
      <Image
        src={src}
        alt={item.description || "Product image"}
        width={88}
        height={88}
        unoptimized
        className="size-22 rounded-sm border object-cover"
      />
    )}
    <Input
      value={item.description}
      onChange={(event) => onChange({ description: event.target.value })}
      placeholder="Write a description of this image to improve search engine optimization"
      className="max-w-none"
    />
    <div className="flex items-center gap-4">
      <input
        type="radio"
        aria-label="Use as thumbnail"
        checked={item.isPrimary}
        onChange={onMakePrimary}
        className="size-5"
      />
      <Button
        type="button"
        variant="ghost"
        size="icon"
        aria-label="Remove"
        onClick={onRemove}
        className="text-gray-400 hover:text-danger-red"
      >
        <Trash2 className="size-6!" />
      </Button>
    </div>
  </div>
);

// Product images and videos: uploads, URLs, alt text and the thumbnail pick
const ProductMediaField = ({
  value,
  onChange,
  accept,
}: ProductMediaFieldProps) => {
  const items = useMemo(() => value ?? [], [value]);
  const inputRef = useRef<HTMLInputElement>(null);

  const sources = useMemo(
    () =>
      items.map((item) =>
        item.path instanceof File ? URL.createObjectURL(item.path) : item.path,
      ),
    [items],
  );
  useEffect(
    () => () =>
      items.forEach(
        (item, index) =>
          item.path instanceof File && URL.revokeObjectURL(sources[index]),
      ),
    [items, sources],
  );

  const selectedCount = items.filter((item) => item.selected).length;

  const update = (next: PreviewItem[]) => onChange?.(next);

  const handleFiles = (event: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files ?? []).filter(
      (file) =>
        !items.some(
          (item) =>
            item.file?.name === file.name && item.file?.size === file.size,
        ),
    );
    update([
      ...items,
      ...files.map<PreviewItem>((file) => ({
        file,
        path: file,
        description: "",
        selected: false,
        isPrimary: false,
        type: file.type.startsWith("video/") ? "video" : "image",
      })),
    ]);
    // Lets the same file be picked again after it's removed
    event.target.value = "";
  };

  const handleAddUrl = (url: string) =>
    update([
      ...items,
      {
        file: null,
        path: url,
        description: "",
        selected: false,
        isPrimary: false,
        type: "image",
      },
    ]);

  const patchItem = (index: number, patch: Partial<PreviewItem>) =>
    update(items.map((item, i) => (i === index ? { ...item, ...patch } : item)));

  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-end gap-4">
        <AddMediaFromUrlModal
          onAdd={handleAddUrl}
          trigger={
            <Button type="button" variant="outline" size="md">
              <PlusIcon className="size-5" />
              Add from URL
            </Button>
          }
        />
        <Button
          type="button"
          variant="outline"
          size="md"
          onClick={() => inputRef.current?.click()}
        >
          <UploadCloudIcon className="size-5" />
          Upload Images
        </Button>
      </div>

      <input
        ref={inputRef}
        type="file"
        accept={accept}
        multiple
        hidden
        onChange={handleFiles}
      />

      <Button
        type="button"
        variant="ghost"
        onClick={() => inputRef.current?.click()}
        className="flex h-auto flex-col gap-2 rounded-sm border border-dashed border-blue-500 p-10 text-gray-500 hover:bg-blue-50"
      >
        <ImageIcon className="size-16! opacity-30" />
        <span className="text-[1.4rem]">Click to upload images.</span>
        <span className="text-[1.2rem]">
          bmp, jpeg, png, wbmp, xbm or webp. Maximum 8 MB.
        </span>
      </Button>

      {items.length > 0 && (
        <div className="rounded-sm border border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between border-b border-gray-200 pb-3">
            <label className="flex items-center gap-3 text-[1.4rem] text-gray-600">
              <Checkbox
                checked={selectedCount === items.length}
                onCheckedChange={(checked) =>
                  update(
                    items.map((item) => ({
                      ...item,
                      selected: checked === true,
                    })),
                  )
                }
              />
              {selectedCount} selected
            </label>
            <Button
              type="button"
              variant="outline"
              size="md"
              disabled={!selectedCount}
              onClick={() => update(items.filter((item) => !item.selected))}
              className="border-danger-red text-danger-red"
            >
              Delete Selected
            </Button>
          </div>
          <div className="grid grid-cols-[3rem_10rem_1fr_12rem] gap-4 pt-3 text-[1.3rem] font-semibold text-gray-600">
            <span />
            <span>Image</span>
            <span>Description (Image alt text)</span>
            <span>Thumbnail</span>
          </div>
          <ListRenderer
            data={items}
            keyExtractor={(_, index) => sources[index] ?? index}
            className="space-y-0! divide-y divide-border-light"
            renderItem={(item, index) => (
              <ProductMediaRow
                item={item}
                src={sources[index]}
                onChange={(patch) => patchItem(index, patch)}
                onMakePrimary={() =>
                  update(items.map((m, i) => ({ ...m, isPrimary: i === index })))
                }
                onRemove={() => update(items.filter((_, i) => i !== index))}
              />
            )}
          />
        </div>
      )}
    </div>
  );
};

export default ProductMediaField;

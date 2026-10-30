"use client";

import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { errorMessage } from "@/utils/message";
import { ImagePlus } from "lucide-react";
import { DragEvent, useEffect, useMemo, useRef, useState } from "react";
import { CATEGORY_IMAGE_ACCEPT, CATEGORY_IMAGE_MAX_MB } from "../[id]/constant";
import { CategoryImageFieldProps } from "./type";

const CategoryImageField = ({
  value,
  onChange,
  id,
  className,
  "aria-invalid": invalid,
}: CategoryImageFieldProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);

  const previewUrl = useMemo(
    () => (value instanceof File ? URL.createObjectURL(value) : value || null),
    [value],
  );

  useEffect(() => {
    if (value instanceof File && previewUrl) {
      return () => URL.revokeObjectURL(previewUrl);
    }
  }, [value, previewUrl]);

  const pick = (file?: File | null) => {
    if (!file) return;
    if (file.size > CATEGORY_IMAGE_MAX_MB * 1024 * 1024) {
      errorMessage(`${file.name} is larger than ${CATEGORY_IMAGE_MAX_MB}MB`);
      return;
    }
    onChange?.(file);
  };

  const onDrop = (event: DragEvent<HTMLElement>) => {
    event.preventDefault();
    setDragging(false);
    pick(event.dataTransfer.files?.[0]);
  };

  const openPicker = () => inputRef.current?.click();

  return (
    <div className={cn("w-full max-w-lg", className)}>
      {previewUrl ? (
        <div className="flex items-start gap-6">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={previewUrl}
            alt="Category"
            className="h-28 w-28 rounded-sm border object-cover"
          />
          <div className="flex flex-col items-start gap-2">
            <Button variant="outline" type="button" onClick={openPicker}>
              Choose another file
            </Button>
            <Button
              variant="destructive"
              type="button"
              onClick={() => onChange?.(null)}
            >
              Remove image
            </Button>
          </div>
        </div>
      ) : (
        <Button
          type="button"
          variant="ghost"
          onClick={openPicker}
          onDragOver={(event) => {
            event.preventDefault();
            setDragging(true);
          }}
          onDragLeave={() => setDragging(false)}
          onDrop={onDrop}
          className={cn(
            "flex h-[7.6rem] w-full items-center justify-start gap-4 rounded-sm border border-dashed border-blue-500 bg-white px-8 text-xl font-normal text-gray-600 hover:bg-white",
            dragging && "bg-blue-50 hover:bg-blue-50",
            invalid && "border-destructive",
          )}
        >
          <ImagePlus className="size-10! text-blue-400" strokeWidth={1.25} />
          <span>
            Drag & drop images to upload or{" "}
            <span className="text-blue-600">Choose File</span>
          </span>
        </Button>
      )}

      <input
        ref={inputRef}
        id={id}
        type="file"
        accept={CATEGORY_IMAGE_ACCEPT}
        className="hidden"
        onChange={(event) => {
          pick(event.target.files?.[0]);
          event.target.value = "";
        }}
      />
    </div>
  );
};

export default CategoryImageField;

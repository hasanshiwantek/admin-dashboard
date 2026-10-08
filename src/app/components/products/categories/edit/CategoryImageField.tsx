"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ImagePlus } from "lucide-react";
import { DragEvent, Ref, useEffect, useMemo, useRef, useState } from "react";
import { toast } from "react-toastify";
import { CATEGORY_IMAGE_ACCEPT, CATEGORY_IMAGE_MAX_MB } from "./constant";

type CategoryImageFieldProps = {
  value?: File | string | null;
  onChange?: (value: File | null) => void;
  onBlur?: () => void;
  id?: string;
  className?: string;
  "aria-invalid"?: boolean;
  ref?: Ref<HTMLInputElement>;
};

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
      toast.error(`${file.name} is larger than ${CATEGORY_IMAGE_MAX_MB}MB`);
      return;
    }
    onChange?.(file);
  };

  const onDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(false);
    pick(e.dataTransfer.files?.[0]);
  };

  const openPicker = () => inputRef.current?.click();

  return (
    <div className={cn("w-full max-w-lg", className)}>
      {previewUrl ? (
        <div className="flex items-start gap-6">
          <img
            src={previewUrl}
            alt="Category"
            className="w-28 h-28 object-cover rounded-sm border"
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
        <div
          role="button"
          tabIndex={0}
          onClick={openPicker}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              openPicker();
            }
          }}
          onDragOver={(e) => {
            e.preventDefault();
            setDragging(true);
          }}
          onDragLeave={() => setDragging(false)}
          onDrop={onDrop}
          className={cn(
            "flex items-center gap-4 h-[7.6rem] px-8 rounded-sm border border-dashed border-blue-500 bg-white cursor-pointer text-xl text-gray-600",
            dragging && "bg-blue-50",
            invalid && "border-destructive",
          )}
        >
          <ImagePlus className="size-10 text-blue-400" strokeWidth={1.25} />
          <span>
            Drag & drop images to upload or{" "}
            <span className="text-blue-600">Choose File</span>
          </span>
        </div>
      )}

      <input
        ref={inputRef}
        id={id}
        type="file"
        accept={CATEGORY_IMAGE_ACCEPT}
        className="hidden"
        onChange={(e) => {
          pick(e.target.files?.[0]);
          e.target.value = "";
        }}
      />
    </div>
  );
};

export default CategoryImageField;

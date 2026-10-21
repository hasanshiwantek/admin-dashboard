"use client";

import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { ChangeEvent, Ref, useEffect, useMemo } from "react";
import { toast } from "react-toastify";

type FileFieldProps = {
  /** A picked file, or the URL of the file already saved */
  value?: File | string | null;
  onChange?: (value: File | null) => void;
  onBlur?: () => void;
  /** Allowed media types, e.g. ["image/png", "image/jpeg"] or ["image/*"] */
  accept?: string[];
  /** Largest allowed file, in MB */
  maxSizeMb?: number;
  id?: string;
  name?: string;
  disabled?: boolean;
  className?: string;
  "aria-invalid"?: boolean;
  ref?: Ref<HTMLInputElement>;
};

// "image/*" matches any image; anything else must match exactly
const matchesType = (fileType: string, allowed: string) =>
  allowed.endsWith("/*")
    ? fileType.startsWith(allowed.slice(0, -1))
    : fileType === allowed;

const isImageFile = (file: File) => file.type.startsWith("image/");

// Native file picker. The picker only hints at `accept` (users can choose
// "All files"), so every pick is checked against `accept` and `maxSizeMb`;
// a rejected file shows a toast and is never passed on.
// Plug into <InputField Component={FileField} accept={["image/*"]} maxSizeMb={2}>
export function FileField({
  value,
  onChange,
  onBlur,
  accept,
  maxSizeMb,
  id,
  name,
  disabled,
  className,
  "aria-invalid": invalid,
  ref,
}: FileFieldProps) {
  const acceptsImages = !!accept?.some((type) => type.startsWith("image/"));

  // A saved URL is previewed when the field takes images
  const previewUrl = useMemo(() => {
    if (value instanceof File)
      return isImageFile(value) ? URL.createObjectURL(value) : null;
    return acceptsImages ? value || null : null;
  }, [value, acceptsImages]);

  useEffect(() => {
    if (value instanceof File && previewUrl) {
      return () => URL.revokeObjectURL(previewUrl);
    }
  }, [value, previewUrl]);

  const reject = (event: ChangeEvent<HTMLInputElement>, message: string) => {
    toast.error(message);
    event.target.value = "";
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return onChange?.(null);

    if (accept?.length && !accept.some((type) => matchesType(file.type, type)))
      return reject(
        event,
        `${file.name} isn't an allowed file type. Allowed: ${accept.join(", ")}`,
      );

    if (maxSizeMb && file.size > maxSizeMb * 1024 * 1024)
      return reject(event, `${file.name} is larger than ${maxSizeMb}MB`);

    onChange?.(file);
  };

  return (
    <div className={cn("flex flex-col items-start gap-3", className)}>
      {previewUrl && (
        <img
          src={previewUrl}
          alt="Preview"
          className="size-24 rounded-sm border object-cover"
        />
      )}
      <Input
        ref={ref}
        id={id}
        name={name}
        type="file"
        accept={accept?.join(",")}
        disabled={disabled}
        aria-invalid={invalid}
        onBlur={onBlur}
        onChange={handleChange}
        className="h-auto max-w-[27rem] py-2"
      />
    </div>
  );
}

export default FileField;

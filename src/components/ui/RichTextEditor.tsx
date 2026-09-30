"use client";

import { Editor } from "@tinymce/tinymce-react";
import { toast } from "react-toastify";

type RichTextEditorProps = {
  value?: string;
  onChange?: (content: string) => void;
  onBlur?: () => void;
  height?: number;
  id?: string;
  uploadFile?: (file: File) => Promise<string>;
  maxImageSizeMB?: number;
  maxVideoSizeMB?: number;
};

type FilePickerCallback = (url: string, meta?: Record<string, string>) => void;
type BlobInfo = { blob: () => Blob; filename: () => string };

const readAsDataUrl = (file: Blob) =>
  new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });

/** Opens the native file dialog and resolves with the chosen file. */
const pickFile = (accept: string) =>
  new Promise<File | null>((resolve) => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = accept;
    input.onchange = () => resolve(input.files?.[0] ?? null);
    input.click();
  });

export function RichTextEditor({
  value,
  onChange,
  onBlur,
  height = 340,
  id,
  uploadFile,
  maxImageSizeMB = 5,
  maxVideoSizeMB = 20,
}: RichTextEditorProps) {
  const toUrl = (file: File) =>
    uploadFile ? uploadFile(file) : readAsDataUrl(file);

  return (
    <Editor
      id={id}
      apiKey={
        process.env.NEXT_PUBLIC_TINY_MCE_API_KEY ||
        "bwwo2xyy56xeb4lla418k0p1mt3cm2rwqd3qq8vieee1evqa"
      }
      value={value || ""}
      onEditorChange={onChange}
      onBlur={onBlur}
      init={{
        height,
        menubar: false,
        directionality: "ltr",
        plugins: [
          "advlist",
          "autolink",
          "lists",
          "link",
          "image",
          "media",
          "table",
          "code",
          "fullscreen",
          "wordcount",
        ],
        toolbar: `undo redo | blocks fontfamily fontsize | bold italic underline forecolor backcolor |
          alignleft aligncenter alignright alignjustify | fullscreen |
          cut copy paste pastetext | removeformat | bullist numlist | outdent indent |
          link unlink image media | code | table | hr`,
        branding: false,
        default_link_target: "_blank",
        toolbar_mode: "wrap",

        // "Browse" button in the image and media dialogs opens the native file picker.
        image_title: true,
        file_picker_types: "image media",
        file_picker_callback: async (
          callback: FilePickerCallback,
          _value: string,
          meta: { filetype: "image" | "media" | "file" },
        ) => {
          const isImage = meta.filetype === "image";
          const file = await pickFile(isImage ? "image/*" : "video/*");
          if (!file) return;

          const maxMB = isImage ? maxImageSizeMB : maxVideoSizeMB;
          if (file.size > maxMB * 1024 * 1024) {
            toast.error(`${file.name} is larger than ${maxMB} MB`);
            return;
          }

          try {
            const url = await toUrl(file);
            callback(url, isImage ? { alt: file.name, title: file.name } : {});
          } catch {
            toast.error(`Couldn't add ${file.name}`);
          }
        },

        automatic_uploads: true,
      }}
    />
  );
}

export default RichTextEditor;

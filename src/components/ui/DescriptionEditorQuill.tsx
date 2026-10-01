"use client";

import { useMemo } from "react";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";

type Props = {
  value?: string;
  onChange?: (value: string) => void;
  onBlur?: () => void;
  placeholder?: string;
  height?: number;
};

export default function DescriptionEditorQuill({
  value = "",
  onChange,
  onBlur,
  placeholder = "Write your content here...",
  height = 240,
}: Props) {
  const modules = useMemo(
    () => ({
      toolbar: [
        [{ header: [1, 2, 3, false] }],
        ["bold", "italic", "underline", "strike"],
        [{ color: [] }, { background: [] }],
        [{ list: "ordered" }, { list: "bullet" }],
        [{ align: [] }],
        ["link", "image"],
        ["blockquote", "code-block"],
        ["clean"],
      ],
    }),
    [],
  );

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "color",
    "background",
    "list",
    "bullet",
    "align",
    "link",
    "image",
    "blockquote",
    "code-block",
  ];

  return (
    <div className="bg-white quill-fixed">
      <style>{`
        .quill-fixed .ql-container {
          height: ${height}px;
          font-size: 14px;
        }
        .quill-fixed .ql-editor {
          min-height: ${height}px;
        }
      `}</style>
      <ReactQuill
        theme="snow"
        value={value || ""}
        onChange={(content) => onChange?.(content)}
        onBlur={onBlur}
        modules={modules}
        formats={formats}
        placeholder={placeholder}
      />
    </div>
  );
}

"use client";

import React, { useMemo } from "react";
import { useFormContext } from "react-hook-form";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";

interface DescriptionEditorQuillProps {
    fieldName?: string;
    label?: string;
    height?: number;
    value?: string;
    onChange?: (content: string) => void;
}

export default function DescriptionEditorQuillForCat({
    fieldName = "description",
    label = "Description",
    height = 200,
    value: controlledValue,
    onChange: controlledOnChange,
}: DescriptionEditorQuillProps) {
    // Use props if provided, otherwise fallback to useFormContext
    const formContext = useFormContext();
    const editorValue = controlledValue ?? formContext?.watch(fieldName) ?? "";
    const handleChange = controlledOnChange ?? ((content: string) => {
        formContext?.setValue(fieldName, content, { shouldDirty: true });
    });

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
        []
    );

    const formats = [
        "header", "bold", "italic", "underline", "strike",
        "color", "background", "list", "bullet", "align",
        "link", "image", "blockquote", "code-block",
    ];

    return (
        <div className="p-10 bg-white shadow-lg rounded-sm w-full" id={fieldName}>
            <h1 className="my-5 2xl:!text-[2.4rem]">{label}</h1>
            <div style={{ height: `${height}px` }}>
                <ReactQuill
                    theme="snow"
                    value={editorValue}
                    onChange={handleChange}
                    modules={modules}
                    formats={formats}
                    placeholder="Write your description here..."
                    style={{ height: "80%" }}
                />
            </div>
        </div>
    );
}
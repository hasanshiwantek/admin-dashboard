// "use client";

// import React, { useMemo } from "react";
// import { useFormContext } from "react-hook-form";
// import ReactQuill from "react-quill";
// import "react-quill/dist/quill.snow.css";

// interface DescriptionEditorQuillProps {
//     fieldName?: string;
//     label?: string;
//     height?: number;
// }

// export default function DescriptionEditorQuill({
//     fieldName = "description",
//     label = "Description",
//     height = 400,
// }: DescriptionEditorQuillProps) {
//     const { setValue, watch } = useFormContext();
//     const value = watch(fieldName) || "";

//     const modules = useMemo(
//         () => ({
//             toolbar: [
//                 [{ header: [1, 2, 3, false] }],
//                 ["bold", "italic", "underline", "strike"],
//                 [{ color: [] }, { background: [] }],
//                 [{ list: "ordered" }, { list: "bullet" }],
//                 [{ align: [] }],
//                 ["link", "image"],
//                 ["blockquote", "code-block"],
//                 ["clean"],
//             ],
//         }),
//         []
//     );

//     const formats = [
//         "header",
//         "bold",
//         "italic",
//         "underline",
//         "strike",
//         "color",
//         "background",
//         "list",
//         "bullet",
//         "align",
//         "link",
//         "image",
//         "blockquote",
//         "code-block",
//     ];

//     return (
//         <div className="p-10 bg-white shadow-lg rounded-sm" id={fieldName}>
//             <h1 className="my-5 2xl:!text-[2.4rem]">{label}</h1>

//             <div style={{ height: `${height}px` }}>
//                 <ReactQuill
//                     theme="snow"
//                     value={value}
//                     onChange={(content) => {
//                         setValue(fieldName, content, { shouldDirty: true });
//                     }}
//                     modules={modules}
//                     formats={formats}
//                     placeholder="Write your description here..."
//                     className="h-full"
//                 />
//             </div>
//         </div>
//     );
// }

"use client";

import React, { useMemo } from "react";
import { useFormContext } from "react-hook-form";
import ReactQuill from "react-quill-new";           // ← Changed
import "react-quill-new/dist/quill.snow.css";      // ← Changed

interface DescriptionEditorQuillProps {
    fieldName?: string;
    label?: string;
    height?: number;
}

export default function DescriptionEditorQuill({
    fieldName = "description",
    label = "Description",
    height = 200,
}: DescriptionEditorQuillProps) {
    const { setValue, watch } = useFormContext();
    const value = watch(fieldName) || "";

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
        <div className="p-10 bg-white shadow-lg rounded-sm" id={fieldName}>
            <h1 className="my-5 2xl:!text-[2.4rem]">{label}</h1>

            <div style={{ height: `${height}px` }}>
                <ReactQuill
                    theme="snow"
                    value={value}
                    onChange={(content) => {
                        setValue(fieldName, content, { shouldDirty: true });
                    }}
                    modules={modules}
                    formats={formats}
                    placeholder="Write your description here..."
                    style={{
                        height: "80%",           // Make editor take full height of container
                    }}
                />
            </div>
        </div>
    );
}
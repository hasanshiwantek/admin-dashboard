// "use client";

// import { useEffect } from "react";
// import { useFormContext } from "react-hook-form";
// import dynamic from "next/dynamic";

// const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });

// const DescriptionEditor = () => {
//   const { setValue, watch } = useFormContext();
//   const description = watch("description"); // ✅ Reacts to reset()

//   // ✅ Prevent spacebar scroll
//   useEffect(() => {
//     const handleKeyDown = (e: KeyboardEvent) => {
//       const active = document.activeElement;
//       if (active && active.closest(".jodit-wysiwyg")) {
//         if (e.code === "Space") {
//           e.stopPropagation();
//         }
//       }
//     };

//     document.addEventListener("keydown", handleKeyDown);
//     return () => {
//       document.removeEventListener("keydown", handleKeyDown);
//     };
//   }, []);

//   return (
//     <div id="description" className="p-10 bg-white shadow-lg">
//       <h1 className="my-5">Description</h1>
//       <JoditEditor
//         value={description || ""}
//         config={{
//           readonly: false,
//           height: 400,
//         }}
//         onBlur={(newContent) => {
//           setValue("description", newContent, { shouldDirty: true });
//         }}
//       />
//     </div>
//   );
// };

// export default DescriptionEditor;


"use client";

import { Editor } from "@tinymce/tinymce-react";
import { useFormContext } from "react-hook-form";
import { useRef } from "react";

export default function DescriptionEditor() {
  const { setValue, watch } = useFormContext();
  const description = watch("description");
  const editorRef = useRef(null);

  return (
    <div className="p-10 bg-white shadow-lg">
      <h1 className="my-5">Description</h1>
      <Editor
        apiKey="d2z6pu70qtywhkzox051ga0czhas02dp55gl9bxijefs4vxo"
        onInit={(evt, editor) => (editorRef.current = editor)}
        value={description || ""}
        onEditorChange={(content) => {
          setValue("description", content, { shouldDirty: true });
        }}
        init={{
          height: 400,
          menubar: true,
          directionality: "ltr", // ✅ fix RTL issue
          plugins: [
            "advlist",
            "autolink",
            "lists",
            "link",
            "image",
            "charmap",
            "preview",
            "anchor",
            "searchreplace",
            "visualblocks",
            "code",
            "fullscreen",
            "insertdatetime",
            "media",
            "table",
            "code",
            "help",
            "wordcount",
            "emoticons",
            "hr",
            "pagebreak",
            "print",
          ],
          toolbar: `undo redo | blocks fontfamily fontsize | bold italic underline strikethrough forecolor backcolor | 
             alignleft aligncenter alignright alignjustify | 
             outdent indent | numlist bullist | link image media table hr emoticons | 
             code fullscreen preview print | removeformat`,
          branding: false,
          default_link_target: "_blank",
          toolbar_mode: "sliding",
        }}
      />
    </div>
  );
}

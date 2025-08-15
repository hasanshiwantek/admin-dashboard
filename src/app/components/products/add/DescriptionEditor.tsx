"use client";

import { useEffect } from "react";
import { useFormContext } from "react-hook-form";
import dynamic from "next/dynamic";

const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });

const DescriptionEditor = () => {
  const { setValue, watch } = useFormContext();
  const description = watch("description"); // ✅ Reacts to reset()

  // ✅ Prevent spacebar scroll
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const active = document.activeElement;
      if (active && active.closest(".jodit-wysiwyg")) {
        if (e.code === "Space") {
          e.stopPropagation();
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div id="description" className="p-10 bg-white shadow-lg">
      <h1 className="my-5">Description</h1>
      <JoditEditor
        value={description || ""}
        config={{
          readonly: false,
          height: 400,
        }}
        onBlur={(newContent) => {
          setValue("description", newContent, { shouldDirty: true });
        }}
      />
    </div>
  );
};

export default DescriptionEditor;

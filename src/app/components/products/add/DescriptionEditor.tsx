'use client';

import { useFormContext } from 'react-hook-form';
import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

const JoditEditor = dynamic(() => import('jodit-react'), { ssr: false });

const DescriptionEditor = () => {
  const { setValue, watch } = useFormContext();
  const description = watch('description'); // ✅ watches live value
  const [content, setContent] = useState<string>("");

  // Sync local editor content whenever form value changes (especially after reset)
  useEffect(() => {
    if (description !== undefined) {
      setContent(description);
    }
  }, [description]);

  return (
    <div id="description" className="p-10 bg-white shadow-lg">
      <h1 className="my-5">Description</h1>
      <JoditEditor
        value={content}
        config={{
          readonly: false,
          height: 400,
        }}
        onChange={(newContent) => {
          setValue('description', newContent, { shouldDirty: true });
          setContent(newContent);
        }}
      />
    </div>
  );
};

export default DescriptionEditor;

'use client';

// import JoditEditor from 'jodit-react';
import { useFormContext } from 'react-hook-form';
import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import type { Jodit } from 'jodit';

const JoditEditor = dynamic(() => import('jodit-react'), {
  ssr: false,
});

const DescriptionEditor = () => {

    const { setValue, getValues } = useFormContext();
    const [content, setContent] = useState<string>('');
   
    useEffect(() => {
    // Load initial form value once
    const initial = getValues('description') || '';
    setContent(initial);
  }, [getValues]);

  return (
      <div id="description" className='p-10 bg-white shadow-lg'>
          <h1 className='my-5'>Description</h1>
          <JoditEditor
              value={content}
              config={{
                  readonly: false,
                  height: 400,
              }}
            //   onChange={(newContent: string) => setContent(newContent)}
              onChange={(newContent) => setValue('description', newContent)}
          />
      </div>
  );
};

export default DescriptionEditor;

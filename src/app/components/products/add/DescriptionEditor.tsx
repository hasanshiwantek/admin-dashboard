'use client';

// import JoditEditor from 'jodit-react';
import { useState } from 'react';
import dynamic from 'next/dynamic';
import type { Jodit } from 'jodit';

const JoditEditor = dynamic(() => import('jodit-react'), {
  ssr: false,
});

const DescriptionEditor = () => {
  const [content, setContent] = useState<string>('');

  return (
      <div id="description" className='p-10 bg-white shadow-lg'>
          <h1 className='my-5'>Description</h1>
          <JoditEditor
              value={content}
              config={{
                  readonly: false,
                  height: 400,
              }}
              onChange={(newContent: string) => setContent(newContent)}
          />
      </div>
  );
};

export default DescriptionEditor;

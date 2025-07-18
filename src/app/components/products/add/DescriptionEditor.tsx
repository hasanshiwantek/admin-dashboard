'use client';

import { Editor } from '@tinymce/tinymce-react';
import { useRef } from 'react';


const DescriptionEditor = () => {
  const editorRef = useRef(null);

  return (
      <div id="description" className='p-10 bg-white'>
          <h2>Description</h2>
          <Editor
            //   onInit={(evt, editor) => (editorRef.current = editor)}
            //   initialValue="<p>Start writing...</p>"
               apiKey=''
              init={{
                  height: 500,
                  menubar: true,
                  plugins: [
                      'advlist autolink lists link image charmap preview anchor',
                      'searchreplace visualblocks code fullscreen',
                      'insertdatetime media table code help wordcount'
                  ],
                  toolbar:
                      'undo redo | formatselect | fontselect fontsizeselect | ' +
                      'bold italic underline | alignleft aligncenter ' +
                      'alignright alignjustify | bullist numlist outdent indent | ' +
                      'removeformat | fullscreen | code | help',
                  font_formats:
                      'Arial=arial,helvetica,sans-serif;Courier New=courier new,courier;Verdana=verdana,geneva;',
                  content_style: 'body { font-family:Verdana; font-size:11pt }'
              }}
          />
      </div>
  );
};

export default DescriptionEditor;


// 'use client';

// import { Editor } from '@tinymce/tinymce-react';
// import { useRef, useEffect } from 'react';

// // Import TinyMCE assets
// import 'tinymce/tinymce';
// import 'tinymce/icons/default';
// import 'tinymce/themes/silver';
// import 'tinymce/models/dom';

// // Import plugins
// import 'tinymce/plugins/advlist';
// import 'tinymce/plugins/autolink';
// import 'tinymce/plugins/lists';
// import 'tinymce/plugins/link';
// import 'tinymce/plugins/image';
// import 'tinymce/plugins/charmap';
// import 'tinymce/plugins/preview';
// import 'tinymce/plugins/anchor';
// import 'tinymce/plugins/searchreplace';
// import 'tinymce/plugins/visualblocks';
// import 'tinymce/plugins/code';
// import 'tinymce/plugins/fullscreen';
// import 'tinymce/plugins/insertdatetime';
// import 'tinymce/plugins/media';
// import 'tinymce/plugins/table';
// import 'tinymce/plugins/help';
// import 'tinymce/plugins/wordcount';

// const DescriptionEditor = () => {
//   const editorRef = useRef(null);

//   return (
//     <div className="p-10 bg-white">
//       <h2>Description</h2>
//       <Editor
//         init={{
//           height: 500,
//           menubar: true,
//           plugins: [
//             'advlist autolink lists link image charmap preview anchor',
//             'searchreplace visualblocks code fullscreen',
//             'insertdatetime media table code help wordcount'
//           ],
//           toolbar:
//             'undo redo | formatselect | fontselect fontsizeselect | ' +
//             'bold italic underline | alignleft aligncenter ' +
//             'alignright alignjustify | bullist numlist outdent indent | ' +
//             'removeformat | fullscreen | code | help',
//           font_formats:
//             'Arial=arial,helvetica,sans-serif;Courier New=courier new,courier;Verdana=verdana,geneva;',
//           content_style: 'body { font-family:Verdana; font-size:11pt }'
//         }}
//       />
//     </div>
//   );
// };

// export default DescriptionEditor;

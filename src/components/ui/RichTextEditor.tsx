"use client";

import { Editor } from "@tinymce/tinymce-react";
import { toast } from "react-toastify";
import type { Editor as TinyMCEEditor } from "tinymce";

type RichTextEditorProps = {
  value?: string;
  onChange?: (content: string) => void;
  onBlur?: () => void;
  height?: number;
  minHeight?: number;
  id?: string;
  uploadFile?: (file: File) => Promise<string>;
  maxImageSizeMB?: number;
  maxVideoSizeMB?: number;
  menubar?: boolean | string;
  toolbar?: string;
};

const DEFAULT_TOOLBAR = `undo redo | blocks fontfamily fontsize | bold italic underline forecolor backcolor |
  alignleft aligncenter alignright alignjustify | fullscreen |
  cut copy paste pastetext | removeformat | bullist numlist | outdent indent |
  link unlink image media | code | table | hr`;

type FilePickerCallback = (url: string, meta?: Record<string, string>) => void;

const TAILWIND_BROWSER_CDN = "https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4";
const TAILWIND_INPUT = `@import "tailwindcss/theme.css" layer(theme);
@import "tailwindcss/utilities.css" layer(utilities);`;
const FONT_AWESOME_CSS =
  "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css";

// Elements/attributes TinyMCE would otherwise strip from pasted banner HTML.
// Attributes are listed explicitly (no [*]) so on* handlers never get through.
// SVG camelCase attributes are listed in both spellings, since TinyMCE matches
// them case-sensitively.
const SVG_PAINT =
  "class|style|id|fill|fill-rule|fill-opacity|clip-rule|stroke|stroke-width|" +
  "stroke-linecap|stroke-linejoin|stroke-opacity|stroke-dasharray|opacity|transform";
const GRADIENT_ATTRS =
  "id|gradientUnits|gradientunits|gradientTransform|gradienttransform";
const EXTENDED_VALID_ELEMENTS = [
  // Redefining div drops TinyMCE's "pad empty div with &nbsp;" rule, which
  // otherwise wipes out a div whose only child is an icon.
  "div[class|style|id|title|role|dir|lang|align]",
  // Icon-font tags (Font Awesome, Bootstrap Icons, ...) are empty by design.
  "i[class|style|id|title|role|aria-hidden]",
  "span[class|style|id|title|role|aria-hidden]",
  "link[rel|href|type|media|crossorigin]",
  `svg[${SVG_PAINT}|xmlns|width|height|viewBox|viewbox|preserveAspectRatio|preserveaspectratio|role|aria-hidden|aria-label|focusable]`,
  `g[${SVG_PAINT}]`,
  `path[${SVG_PAINT}|d]`,
  `circle[${SVG_PAINT}|cx|cy|r]`,
  `ellipse[${SVG_PAINT}|cx|cy|rx|ry]`,
  `rect[${SVG_PAINT}|x|y|width|height|rx|ry]`,
  `line[${SVG_PAINT}|x1|y1|x2|y2]`,
  `polyline[${SVG_PAINT}|points]`,
  `polygon[${SVG_PAINT}|points]`,
  "defs[id]",
  `lineargradient[${GRADIENT_ATTRS}|x1|y1|x2|y2]`,
  `radialgradient[${GRADIENT_ATTRS}|cx|cy|r|fx|fy]`,
  "stop[offset|stop-color|stop-opacity|style]",
].join(",");
const VALID_CHILDREN =
  "+body[style|link],+div[style|link|svg],+p[svg|link],+span[svg],+a[svg]," +
  "+button[svg],+li[svg],+h1[svg],+h2[svg],+h3[svg]";

/**
 * TinyMCE only keeps <body> content, so a pasted full HTML page loses its
 * stylesheets. Move <link rel="stylesheet"> and <style> from <head> into the
 * content (head <script>s are intentionally dropped).
 */
const hoistHeadStyles = (html: string) => {
  if (!/<head[\s>]/i.test(html)) return html;
  const doc = new DOMParser().parseFromString(html, "text/html");
  const styles = Array.from(
    doc.head.querySelectorAll('link[rel~="stylesheet"], style'),
    (el) => el.outerHTML,
  );
  return [...styles, doc.body.innerHTML].join("\n");
};

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
  minHeight = 300,
  id,
  uploadFile,
  maxImageSizeMB = 5,
  maxVideoSizeMB = 20,
  menubar = false,
  toolbar = DEFAULT_TOOLBAR,
}: RichTextEditorProps) {
  const toUrl = (file: File) =>
    uploadFile ? uploadFile(file) : readAsDataUrl(file);

  return (
    <Editor
      id={id}
      // Self-hosted from public/tinymce (see scripts/copy-tinymce.mjs) so no
      // Tiny Cloud API key / approved-domain check is needed on Vercel.
      tinymceScriptSrc="/tinymce/tinymce.min.js"
      licenseKey="gpl"
      value={value || ""}
      onEditorChange={onChange}
      onBlur={onBlur}
      init={{
        height,
        min_height: minHeight,
        menubar,
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
        toolbar,
        branding: false,
        promotion: false,
        default_link_target: "_blank",
        toolbar_mode: "wrap",

        // Keep pasted banner HTML intact: <style>/<link> stylesheets, icon-font
        // tags, and inline SVG. Scripts and on* handlers are still stripped.
        extended_valid_elements: EXTENDED_VALID_ELEMENTS,
        valid_children: VALID_CHILDREN,

        // Preview Tailwind classes and Font Awesome icons inside the editor.
        // Any other library works if its <link> is included in the pasted HTML.
        content_css: FONT_AWESOME_CSS,
        setup: (editor: TinyMCEEditor) => {
          // Covers the initial value and the "Source code" dialog's Save.
          editor.on("BeforeSetContent", (e) => {
            e.content = hoistHeadStyles(e.content);
          });

          editor.on("init", () => {
            const doc = editor.getDoc();
            // Same as the storefront (server-blink src/lib/bannerStyles.ts):
            // Tailwind v4 theme + utilities, no preflight, so headings, lists
            // and links keep their normal look in both places.
            const input = doc.createElement("style");
            input.setAttribute("type", "text/tailwindcss");
            input.textContent = TAILWIND_INPUT;
            doc.head.appendChild(input);

            const script = doc.createElement("script");
            script.src = TAILWIND_BROWSER_CDN;
            doc.head.appendChild(script);
          });
        },

        // "Browse" button in the image and media dialogs opens the native file picker.
        image_title: true,
        file_picker_types: "image media",
        file_picker_callback: async (
          callback: FilePickerCallback,
          _value: string,
          meta: Record<string, any>,
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

// Copies the self-hosted TinyMCE build into public/ so the editor loads it
// from our own domain instead of Tiny Cloud (which needs an approved-domain API key).
import { cpSync, rmSync } from "node:fs";
import { dirname, join } from "node:path";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const src = dirname(require.resolve("tinymce/package.json"));
const dest = join(process.cwd(), "public", "tinymce");

rmSync(dest, { recursive: true, force: true });
cpSync(src, dest, { recursive: true });
console.log(`Copied TinyMCE to ${dest}`);

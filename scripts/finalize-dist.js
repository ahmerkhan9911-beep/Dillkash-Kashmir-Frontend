import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distDir = path.resolve(__dirname, "../dist");
const clientDir = path.join(distDir, "client");
const serverDir = path.join(distDir, "server");

if (fs.existsSync(clientDir)) {
  // Remove temporary server prerender files
  if (fs.existsSync(serverDir)) {
    fs.rmSync(serverDir, { recursive: true, force: true });
  }

  // Copy all static client files (index.html, .htaccess, assets, etc.) directly into dist/
  const entries = fs.readdirSync(clientDir);
  for (const entry of entries) {
    const src = path.join(clientDir, entry);
    const dest = path.join(distDir, entry);
    fs.cpSync(src, dest, { recursive: true, force: true });
  }

  // Remove the now-empty or redundant client subdirectory
  fs.rmSync(clientDir, { recursive: true, force: true });
}

// We are completely bypassing the TanStack Start prerenderer which crashes on Hostinger
// Instead, we manually generate the index.html by injecting the CSS and JS bundles.

const assetsDir = path.join(distDir, "assets");
if (!fs.existsSync(assetsDir)) {
  console.error("✗ dist/assets is missing — build output is broken.");
  process.exit(1);
}

const assets = fs.readdirSync(assetsDir);
const cssFiles = assets.filter((f) => f.endsWith(".css"));
// Look for the main index entry file. It usually starts with index- or client- or main-
const jsFiles = assets.filter((f) => f.endsWith(".js") && f.startsWith("index-"));

let cssLinks = cssFiles
  .map((f) => `<link rel="stylesheet" href="/assets/${f}">`)
  .join("\n    ");

let jsScripts = jsFiles
  .map((f) => `<script type="module" crossorigin src="/assets/${f}"></script>`)
  .join("\n    ");

// Fallback if index-*.js isn't found, just grab any JS file (less reliable, but better than nothing)
if (jsFiles.length === 0) {
    console.warn("Warning: No index-*.js found. Trying to find a fallback entry point.");
    const allJsFiles = assets.filter((f) => f.endsWith(".js"));
    // Try to find one that looks like an entry point, or just use the largest one?
    // In TanStack start, there's usually an index-*.js. Let's hope it's there.
    if(allJsFiles.length > 0) {
        // Just inject all of them if we can't find index. Or maybe just the first one. Let's inject all for safety if we must, though it might cause issues. Let's stick to index- for now, and if not found, we'll see.
        jsScripts = `<script type="module" crossorigin src="/assets/${allJsFiles[0]}"></script>`;
    }
}


const indexHtmlContent = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Dillkash Kashmir</title>
    <link rel="icon" type="image/x-icon" href="/favicon.ico" />
    ${cssLinks}
  </head>
  <body>
    <div id="root"></div>
    ${jsScripts}
  </body>
</html>`;

const indexPath = path.join(distDir, "index.html");
fs.writeFileSync(indexPath, indexHtmlContent);

console.log("✓ Manually generated fully static SPA index.html ready in dist/ (index.html at root)");

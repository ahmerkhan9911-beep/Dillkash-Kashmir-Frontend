/**
 * Post-build script: generates a SPA fallback index.html in dist/client/
 *
 * TanStack Start with SSR produces dist/server/ (Node runtime) + dist/client/
 * (static assets only – no HTML). When deployed to static hosting (Hostinger),
 * there is no Node server to render HTML on-the-fly, so the browser gets 403.
 *
 * This script reads the built client assets, finds the entry JS + CSS files,
 * and writes an index.html that bootstraps the client-side React app.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const clientDir = path.resolve(__dirname, "..", "dist", "client");
const assetsDir = path.join(clientDir, "assets");

if (!fs.existsSync(assetsDir)) {
  console.error("❌ dist/client/assets not found. Run `vite build` first.");
  process.exit(1);
}

const files = fs.readdirSync(assetsDir);

// Find the main entry JS — it's the largest .js file, or specifically named index-*.js
const jsFiles = files.filter((f) => f.endsWith(".js"));
const entryJs = jsFiles.find((f) => /^index-[A-Za-z0-9_-]+\.js$/.test(f));

// Find all CSS files (there are typically 2: index-*.css and styles-*.css)
const cssFiles = files.filter((f) => f.endsWith(".css"));

if (!entryJs) {
  console.error("❌ Could not find entry JS file (index-*.js) in dist/client/assets/");
  process.exit(1);
}

console.log(`📦 Entry JS:  ${entryJs}`);
cssFiles.forEach((f) => console.log(`🎨 CSS:       ${f}`));

const cssLinks = cssFiles
  .map((f) => `    <link rel="stylesheet" href="/assets/${f}" />`)
  .join("\n");

const html = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>DillKash Kashmir</title>
    <meta name="description" content="Premium & budget-friendly Kashmir tour packages departing weekly from Lahore. Neelum Valley, Arang Kel, Ratti Gali, Sharda, Taobat & more with all-inclusive pricing." />
    <meta name="author" content="DillKash Kashmir" />
    <meta property="og:title" content="DillKash Kashmir — Kashmir Tours from Lahore" />
    <meta property="og:description" content="Hassle-free weekly departures from Lahore to Neelum Valley, Arang Kel, Ratti Gali & beyond." />
    <meta property="og:type" content="website" />
    <meta name="twitter:card" content="summary_large_image" />
    <link rel="icon" href="/favicon.png" type="image/png" />
    <link rel="icon" href="/favicon-32.png" type="image/png" sizes="32x32" />
    <link rel="apple-touch-icon" href="/favicon-192.png" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&family=Sora:wght@600;700;800&display=swap" />
${cssLinks}
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/assets/${entryJs}"></script>
  </body>
</html>
`;

const outPath = path.join(clientDir, "index.html");
fs.writeFileSync(outPath, html, "utf-8");
console.log(`✅ Generated fallback index.html → ${outPath}`);

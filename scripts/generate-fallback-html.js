/**
 * Post-build script: Generates static HTML pages with full SSR and TanStack Router hydration.
 *
 * When TanStack Start builds with prerender disabled (to prevent build-time network failures
 * on sandboxed hosting like Hostinger), dist/client has no HTML files.
 *
 * This script runs in Node.js directly after `vite build`, imports the compiled `dist/server/server.js`,
 * and renders the HTML for the primary route and all static routes into `dist/client/`.
 *
 * This produces:
 * 1. A valid, fully hydrated `dist/client/index.html` with `window.$_TSR` (preventing "Invariant failed" errors).
 * 2. Static HTML files for common routes (/about, /contact, etc.) for instant load and SEO.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const clientDir = path.resolve(__dirname, "..", "dist", "client");
const serverEntryPath = path.resolve(__dirname, "..", "dist", "server", "server.js");

if (!fs.existsSync(serverEntryPath)) {
  console.error("❌ dist/server/server.js not found. Run `vite build` first.");
  process.exit(1);
}

const routesToPrerender = [
  "/",
  "/about",
  "/contact",
  "/hotels",
  "/packages",
  "/custom-tour",
  "/blogs",
  "/login",
  "/signup",
  "/my-bookings",
];

async function generateHtml() {
  console.log("⚡ Generating static HTML via in-memory SSR server...");

  // Import the compiled server entry dynamically
  const serverModule = await import(pathToFileURL(serverEntryPath).href);
  const server = serverModule.default ?? serverModule;

  if (typeof server?.fetch !== "function") {
    console.error("❌ server.fetch is not a function in dist/server/server.js");
    process.exit(1);
  }

  for (const route of routesToPrerender) {
    try {
      const requestUrl = `http://localhost${route}`;
      const response = await server.fetch(new Request(requestUrl));

      if (!response.ok) {
        console.warn(`⚠️ Warning: Route ${route} returned status ${response.status}`);
      }

      const html = await response.text();

      let targetFile;
      if (route === "/") {
        targetFile = path.join(clientDir, "index.html");
      } else {
        const routeDir = path.join(clientDir, route.replace(/^\//, ""));
        fs.mkdirSync(routeDir, { recursive: true });
        targetFile = path.join(routeDir, "index.html");
      }

      fs.writeFileSync(targetFile, html, "utf-8");
      console.log(`✅ Generated: ${route} → ${path.relative(clientDir, targetFile)} (${(html.length / 1024).toFixed(1)} KB)`);
    } catch (err) {
      console.error(`❌ Failed to render route ${route}:`, err);
    }
  }

  console.log("🎉 Static HTML generation complete!");
}

generateHtml().catch((err) => {
  console.error("Fatal error during fallback HTML generation:", err);
  process.exit(1);
});

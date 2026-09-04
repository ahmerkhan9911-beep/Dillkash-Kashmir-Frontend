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
  console.log("✓ Fully static SPA export ready in dist/ (index.html at root)");
}

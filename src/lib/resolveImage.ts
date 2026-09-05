import heroKashmir from "@/assets/hero-kashmir.jpg";
import videoThumb from "@/assets/video-thumb.jpg";
import arangKel from "@/assets/dest-arang-kel.jpg";
import neelumRiver from "@/assets/dest-neelum-river.jpg";
import sharda from "@/assets/dest-sharda.jpg";
import rattiGali from "@/assets/dest-ratti-gali.jpg";
import taobat from "@/assets/dest-taobat.jpg";
import pirChinasi from "@/assets/dest-pir-chinasi.jpg";
import kutton from "@/assets/dest-kutton.jpg";
import dhani from "@/assets/dest-dhani.jpg";
import keran from "@/assets/dest-keran.jpg";
import muzaffarabad from "@/assets/dest-muzaffarabad.jpg";
import guideAliRaza from "@/assets/guide-ali-raza.jpg";
import guideFatimaNoor from "@/assets/guide-fatima-noor.jpg";
import guideHassanMalik from "@/assets/guide-hassan-malik.jpg";

/**
 * Direct mapping for static assets bundled with the frontend Vite app.
 */
const staticAssetMap: Record<string, string> = {
  "/assets/hero-kashmir.jpg": heroKashmir,
  "/assets/video-thumb.jpg": videoThumb,
  "/assets/dest-arang-kel.jpg": arangKel,
  "/assets/dest-neelum-river.jpg": neelumRiver,
  "/assets/dest-sharda.jpg": sharda,
  "/assets/dest-ratti-gali.jpg": rattiGali,
  "/assets/dest-taobat.jpg": taobat,
  "/assets/dest-pir-chinasi.jpg": pirChinasi,
  "/assets/dest-kutton.jpg": kutton,
  "/assets/dest-dhani.jpg": dhani,
  "/assets/dest-keran.jpg": keran,
  "/assets/dest-muzaffarabad.jpg": muzaffarabad,
  "/assets/guide-ali-raza.jpg": guideAliRaza,
  "/assets/guide-fatima-noor.jpg": guideFatimaNoor,
  "/assets/guide-hassan-malik.jpg": guideHassanMalik,
};

/**
 * Universal image URL resolver.
 * Handles:
 * 1. Blob URLs & Data URIs (live preview)
 * 2. Absolute HTTP/HTTPS URLs
 * 3. Express backend uploads (/uploads/...) -> prepends backend host
 * 4. Bundled local static assets (/assets/...) -> resolves to Vite asset URL
 */
export function resolveImageUrl(url: string | null | undefined): string {
  if (!url) return "";

  const trimmed = String(url).trim();
  if (!trimmed) return "";

  // Blob URLs (local preview) and data URLs
  if (trimmed.startsWith("blob:") || trimmed.startsWith("data:")) {
    return trimmed;
  }

  // Already fully qualified HTTP / HTTPS
  if (trimmed.startsWith("http://") || trimmed.startsWith("https://")) {
    return trimmed;
  }

  // Bundled local static assets (/assets/...)
  if (staticAssetMap[trimmed]) {
    return staticAssetMap[trimmed];
  }

  const rawUrl = (typeof import.meta !== "undefined" && import.meta.env && import.meta.env["VITE_API_URL"])
    ? String(import.meta.env["VITE_API_URL"]).trim().replace(/\/+$/, "")
    : "https://api.dillkashkashmir.com";
  const base = rawUrl.replace(/\/api$/, "");

  // Uploaded files hosted by Express API server
  if (trimmed.startsWith("/uploads/")) {
    return `${base}${trimmed}`;
  }

  if (trimmed.startsWith("uploads/")) {
    return `${base}/${trimmed}`;
  }

  if (trimmed.startsWith("/")) {
    return `${base}${trimmed}`;
  }

  // Plain filename without leading slash (e.g. "imageName.jpg")
  return `${base}/uploads/${trimmed}`;
}


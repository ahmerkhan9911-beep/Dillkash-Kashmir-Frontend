/**
 * Centralized API client for DillKash Kashmir backend.
 * All API calls go through this module so auth headers are attached automatically.
 *
 * In development: Vite proxies `/api/*` → `http://localhost:5000/api/*` (see vite.config.ts).
 * In production:  VITE_API_URL must be set to the production API origin (e.g. https://api.dillkashkashmir.com/api).
 */

// In dev (Vite dev server), use a relative path so the proxy kicks in.
// In production, use the env variable which resolves to the absolute production URL.
const isDev =
  typeof import.meta !== "undefined" &&
  import.meta.env &&
  import.meta.env["DEV"] === true;

const RAW_API_URL = isDev
  ? "" // relative — Vite proxy handles /api/* → localhost:5000
  : (typeof import.meta !== "undefined" && import.meta.env && import.meta.env["VITE_API_URL"])
    ? String(import.meta.env["VITE_API_URL"]).trim().replace(/\/+$/, "")
    : "https://api.dillkashkashmir.com/api";

const API_BASE = isDev
  ? "/api"
  : RAW_API_URL.endsWith("/api")
    ? RAW_API_URL
    : `${RAW_API_URL}/api`;

function getToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("dillkash_token");
}

export function setToken(token: string): void {
  localStorage.setItem("dillkash_token", token);
}

export function removeToken(): void {
  localStorage.removeItem("dillkash_token");
}

interface ApiOptions {
  method?: string | undefined;
  body?: unknown;
  headers?: Record<string, string> | undefined;
}

export interface ApiError {
  error?: string | undefined;
  errors?: { msg: string; path?: string }[] | undefined;
}

export async function api<T = unknown>(
  endpoint: string,
  options: ApiOptions = {}
): Promise<T> {
  const { method = "GET", body, headers = {} } = options;

  const isFormData = typeof FormData !== "undefined" && body instanceof FormData;
  const fetchHeaders: Record<string, string> = {
    ...headers,
  };

  if (!isFormData && !fetchHeaders["Content-Type"]) {
    fetchHeaders["Content-Type"] = "application/json";
  }

  const token = getToken();
  if (token) {
    fetchHeaders["Authorization"] = `Bearer ${token}`;
  }

  const reqInit: RequestInit = {
    method,
    headers: fetchHeaders,
  };

  if (isFormData) {
    reqInit.body = body as BodyInit;
  } else if (body !== undefined) {
    reqInit.body = JSON.stringify(body);
  }

  const url = `${API_BASE}${endpoint}`;
  let res: Response;

  try {
    res = await fetch(url, reqInit);
  } catch (networkErr) {
    // fetch() itself threw — network down, DNS failure, CORS preflight blocked, etc.
    const msg = networkErr instanceof Error ? networkErr.message : String(networkErr);
    console.error(`[API] Network error → ${method} ${url}`, networkErr);
    throw new Error(`Network error: ${msg}. Check your internet connection or CORS configuration.`);
  }

  // Safely parse response — server might return HTML (e.g. a 404/500 page) instead of JSON
  let data: unknown;
  const contentType = res.headers.get("content-type") ?? "";
  if (contentType.includes("application/json")) {
    data = await res.json();
  } else {
    const text = await res.text();
    console.warn(`[API] Non-JSON response (${res.status} ${res.statusText}) → ${method} ${url}\n`, text.slice(0, 400));
    // Surface a useful error so the UI can display it
    data = {
      error: `Server returned ${res.status} ${res.statusText}. Expected JSON but got: ${contentType || "unknown content-type"}. The route may not exist on the production server yet.`,
    };
  }

  if (!res.ok) {
    const d = data as { error?: string; errors?: { msg: string }[] };
    const errorMessage =
      d.error ||
      d.errors?.map((e) => e.msg).join(", ") ||
      `HTTP ${res.status} ${res.statusText}`;
    console.error(`[API] ${res.status} ${res.statusText} → ${method} ${url}`, data);
    throw new Error(errorMessage);
  }

  return data as T;
}


/**
 * Upload a single image file to the server.
 * Uses raw fetch with FormData (not JSON) so multer can parse the multipart body.
 * Returns the public URL string on success, e.g. "/uploads/<uuid>.jpg"
 */
export async function uploadImage(file: File): Promise<string> {
  const token = getToken();
  const formData = new FormData();
  formData.append("image", file);

  const res = await fetch(`${API_BASE}/upload`, {
    method: "POST",
    headers: token ? { Authorization: `Bearer ${token}` } : {},
    body: formData,
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error || "Upload failed");
  }

  return (data as { url: string }).url;
}

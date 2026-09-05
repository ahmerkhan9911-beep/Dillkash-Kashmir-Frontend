/**
 * Centralized API client for DillKash Kashmir backend.
 * All API calls go through this module so auth headers are attached automatically.
 */

const RAW_API_URL = (typeof import.meta !== "undefined" && import.meta.env && import.meta.env["VITE_API_URL"])
  ? String(import.meta.env["VITE_API_URL"]).trim().replace(/\/+$/, "")
  : "https://api.dillkashkashmir.com/api";

const API_BASE = RAW_API_URL.endsWith("/api") ? RAW_API_URL : `${RAW_API_URL}/api`;

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

  const res = await fetch(`${API_BASE}${endpoint}`, reqInit);

  const data = await res.json();

  if (!res.ok) {
    const errorMessage =
      data.error ||
      data.errors?.map((e: { msg: string }) => e.msg).join(", ") ||
      "Something went wrong";
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

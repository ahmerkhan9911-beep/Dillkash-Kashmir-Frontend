/**
 * Centralized API client for DillKash Kashmir backend.
 * All API calls go through this module so auth headers are attached automatically.
 */

const API_BASE = (typeof import.meta !== "undefined" && import.meta.env && import.meta.env["VITE_API_URL"])
  ? String(import.meta.env["VITE_API_URL"])
  : "http://localhost:5000/api";

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

  const token = getToken();
  const fetchHeaders: Record<string, string> = {
    "Content-Type": "application/json",
    ...headers,
  };

  if (token) {
    fetchHeaders["Authorization"] = `Bearer ${token}`;
  }

  const reqInit: RequestInit = {
    method,
    headers: fetchHeaders,
  };
  if (body !== undefined) {
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


/**
 * Tour Guides service layer for DillKash Kashmir.
 *
 * Backed by the real backend API at /api/guides.
 * Uses the centralized api() client from @/services/api.
 */

import { api } from "./api";
import { resolveImageUrl } from "@/lib/resolveImage";
import type { Guide } from "@/data/guides";

/* ─── Helpers ─── */

function cleanImageUrl(url: string): string {
  if (!url) return "";
  const match = url.match(/\/uploads\/[^\s?#]+/);
  if (match) return match[0];
  return url;
}

/* ─── Response types ─── */

interface GuideFromAPI {
  id: number;
  name: string;
  role: string;
  experience: number;
  bio: string;
  image_url: string;
  is_active: number | boolean;
  created_at?: string;
  updated_at?: string;
}

/** Normalize API response to the Guide interface used by components. */
function toGuide(g: GuideFromAPI): Guide {
  return {
    id: g.id,
    name: g.name,
    role: g.role,
    experience: g.experience,
    bio: g.bio || "",
    imageUrl: resolveImageUrl(g.image_url) || "",
    is_active: !!g.is_active,
  };
}

/* ─── Public API ─── */

/** Fetch all active guides (public-facing). */
export async function getGuides(): Promise<Guide[]> {
  const data = await api<{ guides: GuideFromAPI[] }>("/guides");
  return data.guides.map(toGuide);
}

/** Fetch a single guide by ID. */
export async function getGuideById(id: number): Promise<Guide | null> {
  try {
    const data = await api<{ guide: GuideFromAPI }>(`/guides/${id}`);
    return toGuide(data.guide);
  } catch {
    return null;
  }
}

/* ─── Admin API ─── */

/** Fetch all guides including inactive (admin). */
export async function getAllGuidesAdmin(): Promise<Guide[]> {
  const data = await api<{ guides: GuideFromAPI[] }>("/guides?all=true");
  return data.guides.map(toGuide);
}

/** Create a new guide. */
export async function createGuide(
  data: Omit<Guide, "id">
): Promise<Guide> {
  const payload = {
    name: data.name,
    role: data.role,
    experience: data.experience,
    bio: data.bio,
    image_url: cleanImageUrl(data.imageUrl || ""),
    is_active: data.is_active,
  };
  const res = await api<{ guide: GuideFromAPI }>("/guides", {
    method: "POST",
    body: payload,
  });
  return toGuide(res.guide);
}

/** Update an existing guide. */
export async function updateGuide(
  id: number,
  data: Partial<Guide>
): Promise<Guide> {
  const payload: Record<string, unknown> = {};
  if (data.name !== undefined) payload.name = data.name;
  if (data.role !== undefined) payload.role = data.role;
  if (data.experience !== undefined) payload.experience = data.experience;
  if (data.bio !== undefined) payload.bio = data.bio;
  if (data.imageUrl !== undefined) payload.image_url = cleanImageUrl(data.imageUrl || "");
  if (data.is_active !== undefined) payload.is_active = data.is_active;

  const res = await api<{ guide: GuideFromAPI }>(`/guides/${id}`, {
    method: "PUT",
    body: payload,
  });
  return toGuide(res.guide);
}

/** Delete a guide. */
export async function deleteGuide(id: number): Promise<void> {
  await api<{ message: string }>(`/guides/${id}`, { method: "DELETE" });
}

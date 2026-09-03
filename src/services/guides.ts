/**
 * Tour Guides service layer for DillKash Kashmir.
 *
 * Currently backed by mock data from @/data/guides.
 * Structured identically to hotels.ts so switching to real
 * API calls (`api("/guides")`) requires only swapping the data source.
 */

import { mockGuides, type Guide } from "@/data/guides";

/* ─── In-memory store (simulates backend) ─── */

let guides = [...mockGuides];
let nextId = Math.max(...guides.map((g) => g.id)) + 1;

/* ─── Public API ─── */

/** Fetch all active guides (public-facing). */
export async function getGuides(): Promise<Guide[]> {
  await delay(300);
  return guides.filter((g) => g.is_active);
}

/** Fetch a single guide by ID. */
export async function getGuideById(id: number): Promise<Guide | null> {
  await delay(200);
  return guides.find((g) => g.id === id) ?? null;
}

/* ─── Admin API ─── */

/** Fetch all guides including inactive (admin). */
export async function getAllGuidesAdmin(): Promise<Guide[]> {
  await delay(300);
  return [...guides];
}

/** Create a new guide. */
export async function createGuide(
  data: Omit<Guide, "id">
): Promise<Guide> {
  await delay(400);
  const guide: Guide = {
    ...data,
    id: nextId++,
  };
  guides = [guide, ...guides];
  return guide;
}

/** Update an existing guide. */
export async function updateGuide(
  id: number,
  data: Partial<Guide>
): Promise<Guide> {
  await delay(400);
  const idx = guides.findIndex((g) => g.id === id);
  if (idx === -1) throw new Error("Guide not found");
  guides[idx] = { ...guides[idx], ...data, id };
  return guides[idx];
}

/** Delete a guide. */
export async function deleteGuide(id: number): Promise<void> {
  await delay(300);
  guides = guides.filter((g) => g.id !== id);
}

/* ─── Helpers ─── */

function delay(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

/**
 * Hotels service layer for DillKash Kashmir.
 *
 * Currently backed by mock data from @/data/hotels.
 * Structured identically to packages.ts so switching to real
 * API calls (`api("/hotels")`) requires only swapping the data source.
 */

import { mockHotels, type Hotel } from "@/data/hotels";

/* ─── In-memory store (simulates backend) ─── */

let hotels = [...mockHotels];
let nextId = Math.max(...hotels.map((h) => h.id)) + 1;

/* ─── Public API ─── */

/** Fetch all active hotels (public-facing). */
export async function getHotels(): Promise<Hotel[]> {
  // Simulate network delay
  await delay(300);
  return hotels.filter((h) => h.is_active);
}

/** Fetch a single hotel by slug. */
export async function getHotelBySlug(slug: string): Promise<Hotel | null> {
  await delay(200);
  return hotels.find((h) => h.slug === slug && h.is_active) ?? null;
}

/* ─── Admin API ─── */

/** Fetch all hotels including inactive (admin). */
export async function getAllHotelsAdmin(): Promise<Hotel[]> {
  await delay(300);
  return [...hotels];
}

/** Fetch a single hotel by ID (admin edit). */
export async function getHotelById(id: number): Promise<Hotel | null> {
  await delay(200);
  return hotels.find((h) => h.id === id) ?? null;
}

/** Create a new hotel. */
export async function createHotel(
  data: Omit<Hotel, "id" | "slug">
): Promise<Hotel> {
  await delay(400);
  const hotel: Hotel = {
    ...data,
    id: nextId++,
    slug: slugify(data.name),
  };
  hotels = [hotel, ...hotels];
  return hotel;
}

/** Update an existing hotel. */
export async function updateHotel(
  id: number,
  data: Partial<Hotel>
): Promise<Hotel> {
  await delay(400);
  const idx = hotels.findIndex((h) => h.id === id);
  if (idx === -1) throw new Error("Hotel not found");
  hotels[idx] = { ...hotels[idx], ...data, id };
  return hotels[idx];
}

/** Delete a hotel. */
export async function deleteHotel(id: number): Promise<void> {
  await delay(300);
  hotels = hotels.filter((h) => h.id !== id);
}

/** Toggle active/inactive status. */
export async function toggleHotelStatus(id: number): Promise<Hotel> {
  await delay(200);
  const idx = hotels.findIndex((h) => h.id === id);
  if (idx === -1) throw new Error("Hotel not found");
  hotels[idx] = { ...hotels[idx], is_active: !hotels[idx].is_active };
  return hotels[idx];
}

/* ─── Helpers ─── */

function delay(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

function slugify(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

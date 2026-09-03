import { api } from "./api";
import { resolveImageUrl } from "@/lib/resolveImage";

export interface DestinationItem {
  id: number;
  name: string;
  slug: string;
  description: string;
  cover_image: string;
  is_active: boolean | number;
  sort_order: number;
  gallery: string[];
  created_at?: string;
  updated_at?: string;
}

/** Convert raw destination from API to resolved images */
function toResolvedDestination(dest: DestinationItem): DestinationItem {
  const cover_image = resolveImageUrl(dest.cover_image);
  const gallery = dest.gallery && dest.gallery.length > 0
    ? dest.gallery.map((img) => resolveImageUrl(img))
    : [cover_image];

  return {
    ...dest,
    cover_image,
    gallery,
    is_active: !!dest.is_active,
  };
}

/* ---------- Public & Admin API Calls ---------- */

export async function getDestinations(): Promise<DestinationItem[]> {
  const data = await api<{ destinations: DestinationItem[] }>("/destinations");
  return Promise.all(data.destinations.map(toResolvedDestination));
}

export async function getAllDestinationsAdmin(): Promise<DestinationItem[]> {
  const data = await api<{ destinations: DestinationItem[] }>("/destinations?all=true");
  return Promise.all(data.destinations.map(toResolvedDestination));
}

export async function getDestinationBySlug(slug: string): Promise<DestinationItem> {
  const data = await api<{ destination: DestinationItem }>(`/destinations/${slug}`);
  return toResolvedDestination(data.destination);
}

export async function getDestinationForEdit(id: number): Promise<DestinationItem> {
  const data = await api<{ destination: DestinationItem }>(`/destinations/${id}`);
  return data.destination;
}

export async function createDestination(data: Partial<DestinationItem>) {
  return api<{ message: string; destination: DestinationItem }>("/destinations", {
    method: "POST",
    body: data,
  });
}

export async function updateDestination(id: number, data: Partial<DestinationItem>) {
  return api<{ message: string; destination: DestinationItem }>(`/destinations/${id}`, {
    method: "PUT",
    body: data,
  });
}

export async function deleteDestination(id: number) {
  return api<{ message: string }>(`/destinations/${id}`, { method: "DELETE" });
}

export async function toggleDestinationStatus(id: number) {
  return api<{ message: string; destination: DestinationItem }>(`/destinations/${id}/status`, {
    method: "PATCH",
  });
}

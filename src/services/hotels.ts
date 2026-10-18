import { api } from "./api";
import { resolveImageUrl } from "@/lib/resolveImage";
import type { Hotel } from "@/data/hotels";

/* ─── Helpers ─── */

/** Helper to strip host origin if present so relative "/uploads/..." path is stored in DB */
function cleanImageUrl(url: string): string {
  if (!url) return "";
  const match = url.match(/\/uploads\/[^\s?#]+/);
  if (match) return match[0];
  return url;
}

/* ─── Response types ─── */

interface HotelFromAPI {
  id: number;
  slug: string;
  name: string;
  location: string;
  star_rating: number;
  starRating?: number;
  price_per_night: number;
  pricePerNight?: number;
  description: string;
  images: string[];
  amenities: string[];
  featured: number | boolean;
  is_active: number | boolean;
  created_at?: string;
  updated_at?: string;
}

/** Normalize API response to the Hotel interface used by components. */
function toHotel(h: HotelFromAPI): Hotel {
  return {
    id: h.id,
    slug: h.slug,
    name: h.name,
    location: h.location,
    starRating: (h.starRating || h.star_rating || 3) as Hotel["starRating"],
    pricePerNight: Number(h.pricePerNight ?? h.price_per_night ?? 0),
    description: h.description || "",
    images: Array.isArray(h.images)
      ? h.images.map((img) => resolveImageUrl(img))
      : [],
    amenities: Array.isArray(h.amenities) ? h.amenities : [],
    featured: !!h.featured,
    is_active: !!h.is_active,
  };
}

/* ─── Public API ─── */

/** Fetch all active hotels (public-facing). */
export async function getHotels(): Promise<Hotel[]> {
  const data = await api<{ hotels: HotelFromAPI[] }>("/hotels");
  return data.hotels.map(toHotel);
}

/** Fetch a single hotel by slug. */
export async function getHotelBySlug(slug: string): Promise<Hotel | null> {
  try {
    const data = await api<{ hotel: HotelFromAPI }>(`/hotels/${slug}`);
    return toHotel(data.hotel);
  } catch {
    return null;
  }
}

/* ─── Admin API ─── */

/** Fetch all hotels including inactive (admin). */
export async function getAllHotelsAdmin(): Promise<Hotel[]> {
  const data = await api<{ hotels: HotelFromAPI[] }>("/hotels?all=true");
  return data.hotels.map(toHotel);
}

/** Fetch a single hotel by ID (admin edit). */
export async function getHotelById(id: number): Promise<Hotel | null> {
  try {
    const data = await api<{ hotel: HotelFromAPI }>(`/hotels/${id}`);
    return toHotel(data.hotel);
  } catch {
    return null;
  }
}

/** Create a new hotel (lead generation model). */
export async function createHotel(
  data: Omit<Hotel, "id" | "slug">
): Promise<Hotel> {
  const payload = {
    name: data.name,
    location: data.location,
    star_rating: data.starRating,
    price_per_night: data.pricePerNight,
    description: data.description,
    images: Array.isArray(data.images) ? data.images.map(cleanImageUrl) : [],
    amenities: data.amenities,
    featured: data.featured,
    is_active: data.is_active,
  };
  const res = await api<{ hotel: HotelFromAPI }>("/hotels", {
    method: "POST",
    body: payload,
  });
  return toHotel(res.hotel);
}

/** Update an existing hotel. */
export async function updateHotel(
  id: number,
  data: Partial<Hotel>
): Promise<Hotel> {
  const payload: Record<string, unknown> = {};
  if (data.name !== undefined) payload["name"] = data.name;
  if (data.location !== undefined) payload["location"] = data.location;
  if (data.starRating !== undefined) payload["star_rating"] = data.starRating;
  if (data.pricePerNight !== undefined) payload["price_per_night"] = data.pricePerNight;
  if (data.description !== undefined) payload["description"] = data.description;
  if (data.images !== undefined) {
    payload["images"] = Array.isArray(data.images) ? data.images.map(cleanImageUrl) : [];
  }
  if (data.amenities !== undefined) payload["amenities"] = data.amenities;
  if (data.featured !== undefined) payload["featured"] = data.featured;
  if (data.is_active !== undefined) payload["is_active"] = data.is_active;

  const res = await api<{ hotel: HotelFromAPI }>(`/hotels/${id}`, {
    method: "PUT",
    body: payload,
  });
  return toHotel(res.hotel);
}

/** Delete a hotel. */
export async function deleteHotel(id: number): Promise<void> {
  await api<{ message: string }>(`/hotels/${id}`, { method: "DELETE" });
}

/** Toggle active/inactive status. */
export async function toggleHotelStatus(id: number): Promise<Hotel> {
  const res = await api<{ hotel: HotelFromAPI }>(`/hotels/${id}/status`, {
    method: "PATCH",
  });
  return toHotel(res.hotel);
}

/* ─── Hotel Booking / Lead Generation API ─── */

export interface HotelBooking {
  id: number;
  hotel_id: number;
  user_id: number | null;
  guest_name: string;
  guest_phone: string;
  guest_email: string;
  check_in_date: string;
  check_out_date: string;
  guests_count: number;
  rooms_count: number;
  room_type?: string;
  total_price?: number;
  status: "Pending" | "Confirmed" | "Cancelled";
  created_at: string;
  hotel_name?: string;
  hotel_location?: string;
  hotel_images?: string[];
}

export interface HotelBookingPayload {
  hotelId: number;
  guestName: string;
  guestPhone: string;
  guestEmail?: string;
  checkInDate: string;
  checkOutDate: string;
  guestsCount?: number;
  roomsCount?: number;
}

/** Submit a hotel room availability inquiry. */
export async function submitHotelBooking(
  payload: HotelBookingPayload
): Promise<{ message: string; booking: HotelBooking }> {
  return api("/hotel-bookings", { method: "POST", body: payload });
}

/** Get logged-in user's hotel bookings. */
export async function getMyHotelBookings(): Promise<HotelBooking[]> {
  const data = await api<{ bookings: HotelBooking[] }>("/hotel-bookings/my");
  return data.bookings;
}

/** Get all hotel booking inquiries (admin). */
export async function getAllHotelBookings(
  status?: string
): Promise<HotelBooking[]> {
  const endpoint = status
    ? `/hotel-bookings?status=${encodeURIComponent(status)}`
    : "/hotel-bookings";
  const data = await api<{ bookings: HotelBooking[] }>(endpoint);
  return data.bookings;
}

/** Update hotel booking status (admin). */
export async function updateHotelBookingStatus(
  id: number,
  status: "Pending" | "Confirmed" | "Cancelled"
): Promise<HotelBooking> {
  const data = await api<{ booking: HotelBooking }>(`/hotel-bookings/${id}/status`, {
    method: "PATCH",
    body: { status },
  });
  return data.booking;
}

/** Delete a hotel booking inquiry (admin). */
export async function deleteHotelBooking(id: number): Promise<void> {
  await api(`/hotel-bookings/${id}`, { method: "DELETE" });
}

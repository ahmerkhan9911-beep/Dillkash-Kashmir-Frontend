/**
 * Booking API service for DillKash Kashmir frontend.
 */
import { api } from "./api";

export interface BookingPayload {
  fullName: string;
  phoneNumber: string;
  selectedTour?: string;
  travelDate?: string;
  adults?: number;
  kids?: number;
  room?: string;
}

export interface Booking {
  id: number;
  full_name: string;
  phone_number: string;
  selected_tour: string;
  travel_date: string | null;
  adults: number;
  kids: number;
  room_type: string;
  status: "Pending" | "Confirmed" | "Cancelled";
  created_at: string;
}

/** Submit a new booking (public) */
export async function submitBooking(payload: BookingPayload): Promise<{ message: string; booking: Booking }> {
  return api<{ message: string; booking: Booking }>("/bookings", {
    method: "POST",
    body: payload,
  });
}

/** Get all bookings (admin) */
export async function getAllBookings(status?: string): Promise<Booking[]> {
  const endpoint = status ? `/bookings?status=${encodeURIComponent(status)}` : "/bookings";
  const data = await api<{ bookings: Booking[] }>(endpoint);
  return data.bookings;
}

/** Update booking status (admin) */
export async function updateBookingStatus(
  id: number,
  status: "Pending" | "Confirmed" | "Cancelled"
): Promise<Booking> {
  const data = await api<{ booking: Booking }>(`/bookings/${id}/status`, {
    method: "PATCH",
    body: { status },
  });
  return data.booking;
}

/** Delete a booking (admin) */
export async function deleteBooking(id: number): Promise<void> {
  await api(`/bookings/${id}`, { method: "DELETE" });
}

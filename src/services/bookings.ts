/**
 * Booking API service for DillKash Kashmir frontend.
 */
import { api } from "./api";

export interface BookingPayload {
  fullName: string;
  phoneNumber: string;
  selectedTour?: string | undefined;
  travelDate?: string | undefined;
  persons?: number | undefined;
  room?: string | undefined;
  /** Optional promo code — the server re-validates it and recalculates the price. */
  promoCode?: string | undefined;
}

export interface Booking {
  id: number;
  user_id: number | null;
  full_name: string;
  phone_number: string;
  email: string;
  selected_tour: string;
  travel_date: string | null;
  persons: number;
  room_type: string;
  status: "Pending" | "Confirmed" | "Cancelled";
  total_price: number | null;
  applied_promo: string | null;
  discount_amount: number | null;
  created_at: string;
}

/** Server-computed pricing returned with a new booking. */
export interface BookingPricing {
  originalPrice: number | null;
  discountAmount: number;
  totalPrice: number | null;
  appliedPromo: string | null;
}

export interface SubmitBookingResponse {
  message: string;
  booking: Booking;
  pricing: BookingPricing;
}

/** Submit a new booking (authenticated) */
export async function submitBooking(payload: BookingPayload): Promise<SubmitBookingResponse> {
  return api<SubmitBookingResponse>("/bookings", {
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

/** Get the logged-in user's own bookings */
export async function getMyBookings(): Promise<Booking[]> {
  const data = await api<{ bookings: Booking[] }>("/bookings/my");
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

import { api } from "./api";

export interface CustomTourRequest {
  id: number;
  user_id: number | null;
  name: string;
  phone_number: string;
  email: string;
  preferred_date: string | null;
  adults: number;
  kids: number;
  hotel_preference: string;
  transport_preference: string;
  preferred_destinations: string[];
  message: string;
  status: "Pending" | "Approved" | "Rejected";
  created_at: string;
}

export async function submitCustomTour(data: {
  name: string;
  phoneNumber: string;
  preferredDate?: string;
  adults?: number;
  kids?: number;
  hotelPreference?: string;
  transportPreference?: string;
  preferredDestinations?: string[];
  message?: string;
}) {
  return api<{ message: string; request: CustomTourRequest }>("/custom-tours", {
    method: "POST",
    body: data,
  });
}

/** Get the logged-in user's own custom tour requests */
export async function getMyCustomTours(): Promise<CustomTourRequest[]> {
  const data = await api<{ requests: CustomTourRequest[] }>("/custom-tours/my");
  return data.requests;
}

export async function getAdminCustomTours(status?: string) {
  const query = status ? `?status=${status}` : "";
  return api<{ requests: CustomTourRequest[] }>(`/custom-tours${query}`);
}

export async function updateCustomTourStatus(id: number, status: "Pending" | "Approved" | "Rejected") {
  return api<{ message: string; request: CustomTourRequest }>(`/custom-tours/${id}/status`, {
    method: "PATCH",
    body: { status },
  });
}

export async function deleteCustomTour(id: number) {
  return api<{ message: string }>(`/custom-tours/${id}`, {
    method: "DELETE",
  });
}

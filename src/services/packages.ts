import { api } from "./api";
import { resolveImageUrl } from "@/lib/resolveImage";
import type { Tour, ItineraryDay } from "@/data/site";

/* ---------- API Response Types ---------- */

interface PackageFromAPI {
  id: number;
  slug: string;
  title: string;
  short_description: string;
  full_description: string;
  duration_days: number;
  package_type: string;
  price: number;
  rating: number;
  reviews_count: number;
  image_url: string;
  departure_city: string;
  departure_day: string;
  transport: string;
  accommodation: string;
  meals: string;
  featured: number | boolean;
  is_active: number | boolean;
  next_departure: string;
  destinations: string[];
  itinerary?: ItineraryDay[];
  included?: string[];
  notIncluded?: string[];
  gallery?: string[];
  created_at?: string;
  updated_at?: string;
}

/* ---------- Helpers ---------- */

/** Convert API package to the Tour interface used by existing components. */
function toTour(pkg: PackageFromAPI): Tour {
  const image = resolveImageUrl(pkg.image_url);
  const galleryResolved = pkg.gallery
    ? pkg.gallery.map((img) => resolveImageUrl(img))
    : [image];

  const typeArr = (pkg.package_type || "")
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean) as Tour["type"];

  return {
    slug: pkg.slug,
    title: pkg.title,
    short: pkg.short_description,
    durationDays: pkg.duration_days,
    type: typeArr,
    price: Number(pkg.price),
    rating: Number(pkg.rating),
    reviews: pkg.reviews_count,
    image,
    destinations: pkg.destinations || [],
    featured: !!pkg.featured,
    nextDeparture: pkg.next_departure || "",
    transport: pkg.transport || "",
    accommodation: pkg.accommodation || "",
    meals: pkg.meals || "",
    included: pkg.included || [],
    notIncluded: pkg.notIncluded || [],
    itinerary: pkg.itinerary || [],
    gallery: galleryResolved,
  };
}

/* ---------- Public API ---------- */

export async function getPackages(): Promise<Tour[]> {
  const data = await api<{ packages: PackageFromAPI[] }>("/packages");
  return Promise.all(data.packages.map(toTour));
}

export async function getPackageBySlug(slug: string): Promise<Tour & { id: number }> {
  const data = await api<{ package: PackageFromAPI }>(`/packages/${slug}`);
  const tour = await toTour(data.package);
  return { ...tour, id: data.package.id };
}

export async function getAllPackagesAdmin(): Promise<(Tour & { id: number; is_active: boolean; created_at: string })[]> {
  const data = await api<{ packages: PackageFromAPI[] }>("/packages?all=true");
  const tours = await Promise.all(data.packages.map(async (pkg) => {
    const tour = await toTour(pkg);
    return {
      ...tour,
      id: pkg.id,
      is_active: !!pkg.is_active,
      created_at: pkg.created_at || "",
    };
  }));
  return tours;
}

export async function getPackageForEdit(id: number): Promise<PackageFromAPI> {
  const data = await api<{ package: PackageFromAPI }>(`/packages/${id}`);
  return data.package;
}

export async function createPackage(data: Partial<PackageFromAPI>) {
  return api<{ message: string; package: PackageFromAPI }>("/packages", {
    method: "POST",
    body: data,
  });
}

export async function updatePackage(id: number, data: Partial<PackageFromAPI>) {
  return api<{ message: string; package: PackageFromAPI }>(`/packages/${id}`, {
    method: "PUT",
    body: data,
  });
}

export async function deletePackage(id: number) {
  return api<{ message: string }>(`/packages/${id}`, { method: "DELETE" });
}

export async function togglePackageStatus(id: number) {
  return api<{ message: string }>(`/packages/${id}/status`, { method: "PATCH" });
}

export async function getAdminStats() {
  return api<{
    totalPackages: number;
    activePackages: number;
    featuredPackages: number;
    totalUsers: number;
  }>("/packages/admin/stats");
}

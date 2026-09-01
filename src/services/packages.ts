import { api } from "./api";
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

/** Map image_url paths like "/assets/dest-keran.jpg" to static imports. */
const assetMap: Record<string, () => Promise<{ default: string }>> = {
  "/assets/dest-keran.jpg": () => import("@/assets/dest-keran.jpg"),
  "/assets/dest-neelum-river.jpg": () => import("@/assets/dest-neelum-river.jpg"),
  "/assets/dest-arang-kel.jpg": () => import("@/assets/dest-arang-kel.jpg"),
  "/assets/dest-sharda.jpg": () => import("@/assets/dest-sharda.jpg"),
  "/assets/dest-ratti-gali.jpg": () => import("@/assets/dest-ratti-gali.jpg"),
  "/assets/dest-taobat.jpg": () => import("@/assets/dest-taobat.jpg"),
  "/assets/dest-pir-chinasi.jpg": () => import("@/assets/dest-pir-chinasi.jpg"),
  "/assets/dest-kutton.jpg": () => import("@/assets/dest-kutton.jpg"),
  "/assets/dest-dhani.jpg": () => import("@/assets/dest-dhani.jpg"),
  "/assets/dest-muzaffarabad.jpg": () => import("@/assets/dest-muzaffarabad.jpg"),
  "/assets/hero-kashmir.jpg": () => import("@/assets/hero-kashmir.jpg"),
  "/assets/video-thumb.jpg": () => import("@/assets/video-thumb.jpg"),
};

const resolvedAssetCache = new Map<string, string>();

async function resolveImageUrl(url: string): Promise<string> {
  if (!url || url.startsWith("http")) return url;
  if (resolvedAssetCache.has(url)) return resolvedAssetCache.get(url)!;
  const loader = assetMap[url];
  if (loader) {
    try {
      const mod = await loader();
      resolvedAssetCache.set(url, mod.default);
      return mod.default;
    } catch {
      return url;
    }
  }
  return url;
}

/** Convert API package to the Tour interface used by existing components. */
async function toTour(pkg: PackageFromAPI): Promise<Tour> {
  const image = await resolveImageUrl(pkg.image_url);
  const galleryResolved = pkg.gallery
    ? await Promise.all(pkg.gallery.map(resolveImageUrl))
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

import { t as resolveImageUrl } from "./resolveImage-BSOQr9n2.mjs";
import { t as api } from "./api-CJHRqUur.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/packages-BApqLpSW.js
/** Convert API package to the Tour interface used by existing components. */
function toTour(pkg) {
	const image = resolveImageUrl(pkg.image_url);
	const galleryResolved = pkg.gallery ? pkg.gallery.map((img) => resolveImageUrl(img)) : [image];
	const typeArr = (pkg.package_type || "").split(",").map((t) => t.trim()).filter(Boolean);
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
		gallery: galleryResolved
	};
}
async function getPackages() {
	const data = await api("/packages");
	return Promise.all(data.packages.map(toTour));
}
async function getPackageBySlug(slug) {
	const data = await api(`/packages/${slug}`);
	return {
		...await toTour(data.package),
		id: data.package.id
	};
}
async function getAllPackagesAdmin() {
	const data = await api("/packages?all=true");
	return await Promise.all(data.packages.map(async (pkg) => {
		return {
			...await toTour(pkg),
			id: pkg.id,
			is_active: !!pkg.is_active,
			created_at: pkg.created_at || ""
		};
	}));
}
async function getPackageForEdit(id) {
	return (await api(`/packages/${id}`)).package;
}
async function createPackage(data) {
	return api("/packages", {
		method: "POST",
		body: data
	});
}
async function updatePackage(id, data) {
	return api(`/packages/${id}`, {
		method: "PUT",
		body: data
	});
}
async function deletePackage(id) {
	return api(`/packages/${id}`, { method: "DELETE" });
}
async function togglePackageStatus(id) {
	return api(`/packages/${id}/status`, { method: "PATCH" });
}
async function getAdminStats() {
	return api("/packages/admin/stats");
}
//#endregion
export { createPackage, deletePackage, getAdminStats, getAllPackagesAdmin, getPackageBySlug, getPackageForEdit, getPackages, togglePackageStatus, updatePackage };

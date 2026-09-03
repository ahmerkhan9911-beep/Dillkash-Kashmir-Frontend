import { t as api } from "./api-CJHRqUur.mjs";
import { t as resolveImageUrl } from "./resolveImage-CClln7-6.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/destinations-DNMyGc7-.js
/** Convert raw destination from API to resolved images */
function toResolvedDestination(dest) {
	const cover_image = resolveImageUrl(dest.cover_image);
	const gallery = dest.gallery && dest.gallery.length > 0 ? dest.gallery.map((img) => resolveImageUrl(img)) : [cover_image];
	return {
		...dest,
		cover_image,
		gallery,
		is_active: !!dest.is_active
	};
}
async function getDestinations() {
	const data = await api("/destinations");
	return Promise.all(data.destinations.map(toResolvedDestination));
}
async function getAllDestinationsAdmin() {
	const data = await api("/destinations?all=true");
	return Promise.all(data.destinations.map(toResolvedDestination));
}
async function getDestinationForEdit(id) {
	return (await api(`/destinations/${id}`)).destination;
}
async function createDestination(data) {
	return api("/destinations", {
		method: "POST",
		body: data
	});
}
async function updateDestination(id, data) {
	return api(`/destinations/${id}`, {
		method: "PUT",
		body: data
	});
}
async function deleteDestination(id) {
	return api(`/destinations/${id}`, { method: "DELETE" });
}
async function toggleDestinationStatus(id) {
	return api(`/destinations/${id}/status`, { method: "PATCH" });
}
//#endregion
export { getDestinations as a, getDestinationForEdit as i, deleteDestination as n, toggleDestinationStatus as o, getAllDestinationsAdmin as r, updateDestination as s, createDestination as t };

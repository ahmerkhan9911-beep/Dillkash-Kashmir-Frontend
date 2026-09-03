//#region node_modules/.nitro/vite/services/ssr/assets/api-CJHRqUur.js
/**
* Centralized API client for DillKash Kashmir backend.
* All API calls go through this module so auth headers are attached automatically.
*/
var API_BASE = typeof import.meta !== "undefined" && {
	"BASE_URL": "/",
	"DEV": false,
	"MODE": "production",
	"PROD": true,
	"SSR": true,
	"TSS_DEV_SERVER": "false",
	"TSS_DEV_SSR_STYLES_BASEPATH": "/",
	"TSS_DEV_SSR_STYLES_ENABLED": "true",
	"TSS_DISABLE_CSRF_MIDDLEWARE_WARNING": "false",
	"TSS_INLINE_CSS_ENABLED": "false",
	"TSS_ROUTER_BASEPATH": "",
	"TSS_SERVER_FN_BASE": "/_serverFn/",
	"VITE_API_URL": "http://localhost:5000/api"
}["VITE_API_URL"] ? String({
	"BASE_URL": "/",
	"DEV": false,
	"MODE": "production",
	"PROD": true,
	"SSR": true,
	"TSS_DEV_SERVER": "false",
	"TSS_DEV_SSR_STYLES_BASEPATH": "/",
	"TSS_DEV_SSR_STYLES_ENABLED": "true",
	"TSS_DISABLE_CSRF_MIDDLEWARE_WARNING": "false",
	"TSS_INLINE_CSS_ENABLED": "false",
	"TSS_ROUTER_BASEPATH": "",
	"TSS_SERVER_FN_BASE": "/_serverFn/",
	"VITE_API_URL": "http://localhost:5000/api"
}["VITE_API_URL"]) : "http://localhost:5000/api";
function getToken() {
	if (typeof window === "undefined") return null;
	return localStorage.getItem("dillkash_token");
}
function setToken(token) {
	localStorage.setItem("dillkash_token", token);
}
function removeToken() {
	localStorage.removeItem("dillkash_token");
}
async function api(endpoint, options = {}) {
	const { method = "GET", body, headers = {} } = options;
	const token = getToken();
	const fetchHeaders = {
		"Content-Type": "application/json",
		...headers
	};
	if (token) fetchHeaders["Authorization"] = `Bearer ${token}`;
	const reqInit = {
		method,
		headers: fetchHeaders
	};
	if (body !== void 0) reqInit.body = JSON.stringify(body);
	const res = await fetch(`${API_BASE}${endpoint}`, reqInit);
	const data = await res.json();
	if (!res.ok) {
		const errorMessage = data.error || data.errors?.map((e) => e.msg).join(", ") || "Something went wrong";
		throw new Error(errorMessage);
	}
	return data;
}
/**
* Upload a single image file to the server.
* Uses raw fetch with FormData (not JSON) so multer can parse the multipart body.
* Returns the public URL string on success, e.g. "/uploads/<uuid>.jpg"
*/
async function uploadImage(file) {
	const token = getToken();
	const formData = new FormData();
	formData.append("image", file);
	const res = await fetch(`${API_BASE}/upload`, {
		method: "POST",
		headers: token ? { Authorization: `Bearer ${token}` } : {},
		body: formData
	});
	const data = await res.json();
	if (!res.ok) throw new Error(data.error || "Upload failed");
	return data.url;
}
//#endregion
export { uploadImage as i, removeToken as n, setToken as r, api as t };

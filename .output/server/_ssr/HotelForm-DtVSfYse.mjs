import { n as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { P as LoaderCircle, d as Star, t as X, y as Save } from "../_libs/lucide-react.mjs";
import { t as GalleryUploader } from "./GalleryUploader-TO0YaacD.mjs";
import { n as HOTEL_LOCATIONS, t as HOTEL_AMENITIES } from "./hotels-BRLCSHY7.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/HotelForm-DtVSfYse.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var emptyForm = {
	name: "",
	location: "",
	starRating: 3,
	pricePerNight: 0,
	description: "",
	images: [],
	amenities: [],
	is_active: true,
	featured: false
};
function HotelForm({ initial, onSubmit, onCancel, submitLabel = "Save Hotel" }) {
	const [form, setForm] = (0, import_react.useState)({
		...emptyForm,
		...initial
	});
	const [loading, setLoading] = (0, import_react.useState)(false);
	const [error, setError] = (0, import_react.useState)("");
	const [uploadingCount, setUploadingCount] = (0, import_react.useState)(0);
	const handleUploadingChange = (0, import_react.useCallback)((uploading) => {
		setUploadingCount((c) => Math.max(0, c + (uploading ? 1 : -1)));
	}, []);
	const set = (key, value) => setForm((f) => ({
		...f,
		[key]: value
	}));
	const toggleAmenity = (amenity) => {
		setForm((f) => ({
			...f,
			amenities: f.amenities.includes(amenity) ? f.amenities.filter((a) => a !== amenity) : [...f.amenities, amenity]
		}));
	};
	const handleSubmit = async (e) => {
		e.preventDefault();
		setError("");
		if (!form.name.trim()) return setError("Hotel name is required");
		if (!form.location) return setError("Please select a location");
		if (form.pricePerNight <= 0) return setError("Price must be greater than 0");
		if (!form.description.trim()) return setError("Description is required");
		setLoading(true);
		try {
			await onSubmit(form);
		} catch (err) {
			setError(err instanceof Error ? err.message : "Something went wrong");
		} finally {
			setLoading(false);
		}
	};
	const inputCls = "w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20";
	const labelCls = "mb-1.5 block text-sm font-semibold text-foreground";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
		onSubmit: handleSubmit,
		className: "grid gap-6",
		children: [
			error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "rounded-xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm font-medium text-destructive",
				children: error
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-6 sm:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
					htmlFor: "hotel-name",
					className: labelCls,
					children: "Hotel Name"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					id: "hotel-name",
					type: "text",
					value: form.name,
					onChange: (e) => set("name", e.target.value),
					placeholder: "e.g. Pearl Continental Muzaffarabad",
					className: inputCls
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
					htmlFor: "hotel-location",
					className: labelCls,
					children: "Location / City"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
					id: "hotel-location",
					value: form.location,
					onChange: (e) => set("location", e.target.value),
					className: inputCls,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
						value: "",
						children: "Select location..."
					}), HOTEL_LOCATIONS.map((loc) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
						value: loc,
						children: loc
					}, loc))]
				})] })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-6 sm:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
					htmlFor: "hotel-stars",
					className: labelCls,
					children: "Star Rating"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
						id: "hotel-stars",
						value: form.starRating,
						onChange: (e) => set("starRating", Number(e.target.value)),
						className: "w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20 max-w-[140px]",
						children: [
							5,
							4,
							3,
							2,
							1
						].map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
							value: n,
							children: [
								n,
								" Star",
								n > 1 ? "s" : ""
							]
						}, n))
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "flex items-center gap-0.5",
						children: [
							1,
							2,
							3,
							4,
							5
						].map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, {
							size: 18,
							className: i <= form.starRating ? "fill-amber-400 text-amber-400" : "fill-muted text-muted"
						}, i))
					})]
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
					htmlFor: "hotel-price",
					className: labelCls,
					children: "Price Per Night (PKR)"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					id: "hotel-price",
					type: "number",
					min: 0,
					value: form.pricePerNight || "",
					onChange: (e) => set("pricePerNight", Number(e.target.value)),
					placeholder: "e.g. 15000",
					className: inputCls
				})] })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
				htmlFor: "hotel-desc",
				className: labelCls,
				children: "Description"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
				id: "hotel-desc",
				rows: 3,
				value: form.description,
				onChange: (e) => set("description", e.target.value),
				placeholder: "Describe the hotel, its unique features, location highlights...",
				className: "w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20 resize-y"
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
				className: labelCls,
				children: "Hotel Images"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GalleryUploader, {
				value: form.images,
				onChange: (imgs) => set("images", imgs),
				onUploadingChange: handleUploadingChange
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
				className: labelCls,
				children: "Amenities"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex flex-wrap gap-2",
				children: HOTEL_AMENITIES.map((amenity) => {
					const checked = form.amenities.includes(amenity);
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => toggleAmenity(amenity),
						className: `inline-flex items-center gap-1.5 rounded-full border px-3.5 py-2 text-xs font-semibold transition-colors ${checked ? "border-primary bg-primary/10 text-primary" : "border-border bg-background text-muted-foreground hover:border-primary/40 hover:text-foreground"}`,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: `grid h-4 w-4 place-items-center rounded border text-[10px] ${checked ? "border-primary bg-primary text-white" : "border-border bg-background"}`,
							children: checked && "✓"
						}), amenity]
					}, amenity);
				})
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap gap-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "flex cursor-pointer items-center gap-2.5 text-sm font-semibold text-foreground",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						type: "checkbox",
						checked: form.is_active,
						onChange: (e) => set("is_active", e.target.checked),
						className: "h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
					}), "Active (visible on website)"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "flex cursor-pointer items-center gap-2.5 text-sm font-semibold text-foreground",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						type: "checkbox",
						checked: form.featured,
						onChange: (e) => set("featured", e.target.checked),
						className: "h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
					}), "Featured Hotel"]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-center gap-3 border-t border-border pt-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "submit",
						disabled: loading || uploadingCount > 0,
						className: "inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-6 py-3 text-sm font-bold text-white shadow-cta transition-transform hover:scale-[1.02] disabled:opacity-60",
						children: [loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, {
							size: 18,
							className: "animate-spin"
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Save, { size: 18 }), loading ? "Saving..." : submitLabel]
					}),
					onCancel && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: onCancel,
						className: "inline-flex items-center gap-2 rounded-xl border border-border px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-secondary",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { size: 18 }), "Cancel"]
					}),
					uploadingCount > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "text-xs text-muted-foreground",
						children: [
							"Uploading ",
							uploadingCount,
							" image",
							uploadingCount > 1 ? "s" : "",
							"…"
						]
					})
				]
			})
		]
	});
}
//#endregion
export { HotelForm as t };

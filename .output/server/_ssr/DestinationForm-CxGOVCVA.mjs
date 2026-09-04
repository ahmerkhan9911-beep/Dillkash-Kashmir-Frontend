import { n as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { P as LoaderCircle, c as Upload, y as Save } from "../_libs/lucide-react.mjs";
import { t as ImageUploader } from "./ImageUploader-yMOL_vjW.mjs";
import { t as GalleryUploader } from "./GalleryUploader-TO0YaacD.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/DestinationForm-CxGOVCVA.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var emptyForm = {
	name: "",
	slug: "",
	description: "",
	cover_image: "",
	gallery: [],
	sort_order: 0,
	is_active: true
};
function DestinationForm({ initial, onSubmit, submitLabel = "Save Destination" }) {
	const [form, setForm] = (0, import_react.useState)({
		...emptyForm,
		...initial
	});
	const [loading, setLoading] = (0, import_react.useState)(false);
	const [error, setError] = (0, import_react.useState)("");
	const [uploadingCount, setUploadingCount] = (0, import_react.useState)(0);
	/** Increment or decrement the in-progress upload counter */
	const handleUploadingChange = (0, import_react.useCallback)((uploading) => {
		setUploadingCount((c) => Math.max(0, c + (uploading ? 1 : -1)));
	}, []);
	const set = (key, value) => setForm((f) => ({
		...f,
		[key]: value
	}));
	const handleSubmit = async (e) => {
		e.preventDefault();
		setError("");
		if (!form.name.trim()) {
			setError("Destination name is required");
			return;
		}
		if (!form.cover_image.trim()) {
			setError("Cover image is required");
			return;
		}
		const cleaned = {
			...form,
			name: form.name.trim(),
			slug: form.slug.trim() || form.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""),
			description: form.description.trim(),
			cover_image: form.cover_image.trim(),
			gallery: form.gallery.filter((g) => g && g.trim()),
			sort_order: Number(form.sort_order) || 0
		};
		setLoading(true);
		try {
			await onSubmit(cleaned);
		} catch (err) {
			setError(err instanceof Error ? err.message : "Failed to save destination");
		} finally {
			setLoading(false);
		}
	};
	const inputCls = "w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm outline-none transition-colors focus:ring-2 focus:ring-ring";
	const labelCls = "mb-1.5 block text-sm font-semibold text-foreground";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
		onSubmit: handleSubmit,
		className: "grid gap-8",
		children: [
			error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "rounded-xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm font-medium text-destructive",
				children: error
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("fieldset", {
				className: "rounded-3xl border border-border bg-card p-6 shadow-soft",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("legend", {
					className: "px-2 font-heading text-base font-bold text-foreground",
					children: "Basic Details"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-2 grid gap-4 sm:grid-cols-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: labelCls,
							children: "Destination Name *"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							value: form.name,
							onChange: (e) => set("name", e.target.value),
							className: inputCls,
							placeholder: "e.g. Arang Kel"
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: labelCls,
							children: "URL Slug"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							value: form.slug,
							onChange: (e) => set("slug", e.target.value),
							className: inputCls,
							placeholder: "auto-generated from name (e.g. arang-kel)"
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "sm:col-span-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: labelCls,
								children: "Short Description"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
								value: form.description,
								onChange: (e) => set("description", e.target.value),
								rows: 3,
								className: inputCls,
								placeholder: "Brief description of this destination"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: labelCls,
							children: "Display Order"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "number",
							min: 0,
							value: form.sort_order,
							onChange: (e) => set("sort_order", Number(e.target.value)),
							className: inputCls,
							placeholder: "0 (Lower numbers appear first)"
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex items-center gap-6 pt-6",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "flex items-center gap-2 text-sm font-semibold text-foreground",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "checkbox",
									checked: form.is_active,
									onChange: (e) => set("is_active", e.target.checked),
									className: "h-4 w-4 rounded accent-primary"
								}), "Active on Website"]
							})
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("fieldset", {
				className: "rounded-3xl border border-border bg-card p-6 shadow-soft",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("legend", {
						className: "px-2 font-heading text-base font-bold text-foreground",
						children: "Card Cover Image *"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mb-4 text-xs text-muted-foreground",
						children: "The main photo shown on the homepage destination card."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ImageUploader, {
						label: "Destination Cover Photo",
						value: form.cover_image,
						onChange: (url) => set("cover_image", url),
						onUploadingChange: handleUploadingChange
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("fieldset", {
				className: "rounded-3xl border border-border bg-card p-6 shadow-soft",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("legend", {
						className: "px-2 font-heading text-base font-bold text-foreground",
						children: "Destination Gallery"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mb-4 text-xs text-muted-foreground",
						children: "Photos displayed in the interactive lightbox when visitors click this destination card."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GalleryUploader, {
						value: form.gallery,
						onChange: (urls) => set("gallery", urls),
						onUploadingChange: handleUploadingChange
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex justify-end",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "submit",
					disabled: loading || uploadingCount > 0,
					className: "inline-flex items-center gap-2 rounded-xl bg-primary px-8 py-3 text-sm font-bold text-primary-foreground shadow-cta transition-transform hover:scale-[1.02] disabled:opacity-60",
					children: [loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, {
						size: 18,
						className: "animate-spin"
					}) : uploadingCount > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Upload, {
						size: 18,
						className: "animate-bounce"
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Save, { size: 18 }), loading ? "Saving..." : uploadingCount > 0 ? `Uploading (${uploadingCount})…` : submitLabel]
				})
			})
		]
	});
}
//#endregion
export { DestinationForm as t };

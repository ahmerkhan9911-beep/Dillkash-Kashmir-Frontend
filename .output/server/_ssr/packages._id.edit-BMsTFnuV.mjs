import { n as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { _ as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { k as LoaderCircle } from "../_libs/lucide-react.mjs";
import { getPackageForEdit, updatePackage } from "./packages-BxcyjwUZ.mjs";
import { t as Route } from "./packages._id.edit-C_F5UvCy.mjs";
import { t as PackageForm } from "./PackageForm-DZ6GgNgZ.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/packages._id.edit-BMsTFnuV.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function EditPackagePage() {
	const { id } = Route.useParams();
	const navigate = useNavigate();
	const [initial, setInitial] = (0, import_react.useState)(null);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [error, setError] = (0, import_react.useState)("");
	(0, import_react.useEffect)(() => {
		const pkgId = parseInt(id, 10);
		if (isNaN(pkgId)) {
			setError("Invalid package ID");
			setLoading(false);
			return;
		}
		getPackageForEdit(pkgId).then((pkg) => {
			setInitial({
				title: pkg.title,
				slug: pkg.slug,
				short_description: pkg.short_description || "",
				full_description: pkg.full_description || "",
				duration_days: pkg.duration_days,
				package_type: pkg.package_type || "",
				price: Number(pkg.price),
				rating: Number(pkg.rating),
				reviews_count: pkg.reviews_count,
				image_url: pkg.image_url || "",
				departure_city: pkg.departure_city || "Lahore",
				departure_day: pkg.departure_day || "",
				transport: pkg.transport || "",
				accommodation: pkg.accommodation || "",
				meals: pkg.meals || "",
				featured: !!pkg.featured,
				is_active: pkg.is_active !== void 0 ? !!pkg.is_active : true,
				next_departure: pkg.next_departure || "",
				destinations: pkg.destinations?.length ? pkg.destinations : [""],
				itinerary: pkg.itinerary?.length ? pkg.itinerary.map((d) => ({
					day: d.day,
					title: d.title,
					details: d.details?.length ? d.details : [""]
				})) : [{
					day: 1,
					title: "",
					details: [""]
				}],
				included: pkg.included?.length ? pkg.included : [""],
				notIncluded: pkg.notIncluded?.length ? pkg.notIncluded : [""],
				gallery: pkg.gallery?.length ? pkg.gallery : [""]
			});
		}).catch((err) => setError(err instanceof Error ? err.message : "Failed to load")).finally(() => setLoading(false));
	}, [id]);
	const handleSubmit = async (data) => {
		await updatePackage(parseInt(id, 10), data);
		navigate({ to: "/admin/packages" });
	};
	if (loading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex items-center justify-center py-20",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, {
			size: 32,
			className: "animate-spin text-primary"
		})
	});
	if (error) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "rounded-3xl border border-destructive/30 bg-destructive/10 p-8 text-center",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-sm font-medium text-destructive",
			children: error
		})
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mb-8",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "font-heading text-2xl font-extrabold text-foreground sm:text-3xl",
			children: "Edit Package"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-1 text-sm text-muted-foreground",
			children: "Update tour package details."
		})]
	}), initial && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PackageForm, {
		initial,
		onSubmit: handleSubmit,
		submitLabel: "Update Package"
	})] });
}
//#endregion
export { EditPackagePage as component };

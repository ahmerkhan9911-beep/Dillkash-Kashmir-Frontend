import { n as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { _ as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { P as LoaderCircle } from "../_libs/lucide-react.mjs";
import { t as Route } from "./destinations._id.edit-BDOFnhO7.mjs";
import { t as DestinationForm } from "./DestinationForm-CxGOVCVA.mjs";
import { i as getDestinationForEdit, s as updateDestination } from "./destinations-DX0_kpyq.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/destinations._id.edit-ZKZP9Vwy.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function EditDestinationPage() {
	const { id } = Route.useParams();
	const navigate = useNavigate();
	const [initial, setInitial] = (0, import_react.useState)(null);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [error, setError] = (0, import_react.useState)("");
	(0, import_react.useEffect)(() => {
		const destId = parseInt(id, 10);
		if (isNaN(destId)) {
			setError("Invalid destination ID");
			setLoading(false);
			return;
		}
		getDestinationForEdit(destId).then((dest) => {
			setInitial({
				name: dest.name,
				slug: dest.slug,
				description: dest.description || "",
				cover_image: dest.cover_image || "",
				gallery: dest.gallery?.length ? dest.gallery : [],
				sort_order: dest.sort_order || 0,
				is_active: dest.is_active !== void 0 ? !!dest.is_active : true
			});
		}).catch((err) => setError(err instanceof Error ? err.message : "Failed to load destination")).finally(() => setLoading(false));
	}, [id]);
	const handleSubmit = async (data) => {
		await updateDestination(parseInt(id, 10), data);
		navigate({ to: "/admin/destinations" });
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
			children: "Edit Destination"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-1 text-sm text-muted-foreground",
			children: "Update destination card and photo gallery."
		})]
	}), initial && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DestinationForm, {
		initial,
		onSubmit: handleSubmit,
		submitLabel: "Update Destination"
	})] });
}
//#endregion
export { EditDestinationPage as component };

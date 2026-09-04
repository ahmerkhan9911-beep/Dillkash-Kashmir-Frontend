import { n as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { _ as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { P as LoaderCircle } from "../_libs/lucide-react.mjs";
import { i as getHotelById, s as updateHotel } from "./hotels-DBWefKbg.mjs";
import { t as Route } from "./hotels._id.edit-BUTCSOlB.mjs";
import { t as HotelForm } from "./HotelForm-DtVSfYse.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/hotels._id.edit-CrdSOTpm.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function EditHotelPage() {
	const { id } = Route.useParams();
	const navigate = useNavigate();
	const [hotel, setHotel] = (0, import_react.useState)(null);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [error, setError] = (0, import_react.useState)("");
	(0, import_react.useEffect)(() => {
		setLoading(true);
		getHotelById(Number(id)).then((h) => {
			if (!h) setError("Hotel not found");
			else setHotel(h);
		}).catch(() => setError("Failed to load hotel")).finally(() => setLoading(false));
	}, [id]);
	const handleSubmit = async (data) => {
		await updateHotel(Number(id), data);
		navigate({ to: "/admin/hotels" });
	};
	if (loading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex items-center justify-center py-20",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, {
			size: 32,
			className: "animate-spin text-primary"
		})
	});
	if (error || !hotel) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-3xl border border-dashed border-border bg-card p-12 text-center text-muted-foreground",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: error || "Hotel not found" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			onClick: () => navigate({ to: "/admin/hotels" }),
			className: "mt-4 rounded-xl bg-primary px-5 py-2.5 text-sm font-bold text-primary-foreground",
			children: "Back to Hotels"
		})]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mb-8",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "font-heading text-2xl font-extrabold text-foreground sm:text-3xl",
			children: "Edit Hotel"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "mt-1 text-sm text-muted-foreground",
			children: ["Editing: ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: hotel.name })]
		})]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HotelForm, {
		initial: {
			name: hotel.name,
			location: hotel.location,
			starRating: hotel.starRating,
			pricePerNight: hotel.pricePerNight,
			description: hotel.description,
			images: hotel.images,
			amenities: hotel.amenities,
			is_active: hotel.is_active,
			featured: hotel.featured
		},
		onSubmit: handleSubmit,
		onCancel: () => navigate({ to: "/admin/hotels" }),
		submitLabel: "Update Hotel"
	})] });
}
//#endregion
export { EditHotelPage as component };

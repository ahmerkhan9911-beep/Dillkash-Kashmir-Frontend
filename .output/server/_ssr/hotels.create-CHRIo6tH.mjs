import { n as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { _ as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as createHotel } from "./hotels-DBWefKbg.mjs";
import { t as HotelForm } from "./HotelForm-DtVSfYse.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/hotels.create-CHRIo6tH.js
var import_jsx_runtime = require_jsx_runtime();
function CreateHotelPage() {
	const navigate = useNavigate();
	const handleSubmit = async (data) => {
		await createHotel(data);
		navigate({ to: "/admin/hotels" });
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mb-8",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "font-heading text-2xl font-extrabold text-foreground sm:text-3xl",
			children: "Add New Hotel"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-1 text-sm text-muted-foreground",
			children: "Add a new hotel to DillKash Kashmir."
		})]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HotelForm, {
		onSubmit: handleSubmit,
		onCancel: () => navigate({ to: "/admin/hotels" }),
		submitLabel: "Create Hotel"
	})] });
}
//#endregion
export { CreateHotelPage as component };

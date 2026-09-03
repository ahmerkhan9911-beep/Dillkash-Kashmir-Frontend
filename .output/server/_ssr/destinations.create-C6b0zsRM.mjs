import { n as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { _ as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as DestinationForm } from "./DestinationForm-CJJ6cody.mjs";
import { t as createDestination } from "./destinations-DNMyGc7-.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/destinations.create-C6b0zsRM.js
var import_jsx_runtime = require_jsx_runtime();
function CreateDestinationPage() {
	const navigate = useNavigate();
	const handleSubmit = async (data) => {
		await createDestination(data);
		navigate({ to: "/admin/destinations" });
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mb-8",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "font-heading text-2xl font-extrabold text-foreground sm:text-3xl",
			children: "Create Destination"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-1 text-sm text-muted-foreground",
			children: "Add a new destination card and its photo gallery to DillKash Kashmir."
		})]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DestinationForm, {
		onSubmit: handleSubmit,
		submitLabel: "Create Destination"
	})] });
}
//#endregion
export { CreateDestinationPage as component };

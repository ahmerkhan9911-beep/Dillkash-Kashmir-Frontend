import { n as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { _ as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { createPackage } from "./packages-BxcyjwUZ.mjs";
import { t as PackageForm } from "./PackageForm-DZ6GgNgZ.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/packages.create-C5ApwpRz.js
var import_jsx_runtime = require_jsx_runtime();
function CreatePackagePage() {
	const navigate = useNavigate();
	const handleSubmit = async (data) => {
		await createPackage(data);
		navigate({ to: "/admin/packages" });
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mb-8",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "font-heading text-2xl font-extrabold text-foreground sm:text-3xl",
			children: "Create Package"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-1 text-sm text-muted-foreground",
			children: "Add a new tour package to DillKash Kashmir."
		})]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PackageForm, {
		onSubmit: handleSubmit,
		submitLabel: "Create Package"
	})] });
}
//#endregion
export { CreatePackagePage as component };

import { t as cn } from "./utils-C_uf36nf.mjs";
import { n as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/SectionHeader-C9AT2Ppx.js
var import_jsx_runtime = require_jsx_runtime();
function SectionHeader({ eyebrow, title, subtitle, align = "center", dark = false }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("max-w-2xl", align === "center" ? "mx-auto text-center" : "text-left"),
		children: [
			eyebrow && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "mb-3 inline-block rounded-full bg-secondary px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-secondary-foreground",
				children: eyebrow
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: cn("text-3xl font-extrabold tracking-tight text-balance sm:text-4xl", dark ? "text-primary-foreground" : "text-foreground"),
				children: title
			}),
			subtitle && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: cn("mt-4 text-base leading-relaxed sm:text-lg", dark ? "text-primary-foreground/75" : "text-muted-foreground"),
				children: subtitle
			})
		]
	});
}
//#endregion
export { SectionHeader as t };

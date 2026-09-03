import { n as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { c as Star, et as Activity, r as Users, x as Package } from "../_libs/lucide-react.mjs";
import { getAdminStats } from "./packages-BxcyjwUZ.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin-D1Du-slV.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function AdminDashboard() {
	const [stats, setStats] = (0, import_react.useState)({
		totalPackages: 0,
		activePackages: 0,
		featuredPackages: 0,
		totalUsers: 0
	});
	const [loading, setLoading] = (0, import_react.useState)(true);
	(0, import_react.useEffect)(() => {
		getAdminStats().then(setStats).catch(console.error).finally(() => setLoading(false));
	}, []);
	const cards = [
		{
			label: "Total Packages",
			value: stats.totalPackages,
			icon: Package,
			color: "bg-primary/10 text-primary"
		},
		{
			label: "Active Packages",
			value: stats.activePackages,
			icon: Activity,
			color: "bg-emerald-100 text-emerald-700"
		},
		{
			label: "Featured Packages",
			value: stats.featuredPackages,
			icon: Star,
			color: "bg-amber-100 text-amber-700"
		},
		{
			label: "Registered Users",
			value: stats.totalUsers,
			icon: Users,
			color: "bg-sky-100 text-sky-700"
		}
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mb-8",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "font-heading text-2xl font-extrabold text-foreground sm:text-3xl",
			children: "Admin Dashboard"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-1 text-sm text-muted-foreground",
			children: "Manage your DillKash Kashmir tour packages and users."
		})]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "grid gap-5 sm:grid-cols-2 lg:grid-cols-4",
		children: cards.map((card) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "rounded-3xl border border-border bg-card p-6 shadow-soft",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: `grid h-12 w-12 place-items-center rounded-2xl ${card.color}`,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(card.icon, { size: 24 })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-[11px] font-bold uppercase tracking-widest text-muted-foreground",
					children: card.label
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-heading text-2xl font-extrabold text-foreground",
					children: loading ? "—" : card.value
				})] })]
			})
		}, card.label))
	})] });
}
//#endregion
export { AdminDashboard as component };

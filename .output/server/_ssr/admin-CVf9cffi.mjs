import { n as __toESM } from "../_runtime.mjs";
import { t as cn } from "./utils-C_uf36nf.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { _ as useNavigate, f as Outlet, g as Link, v as useRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { I as LayoutDashboard, O as Menu, P as LoaderCircle, T as Package, V as Hotel, et as ChevronLeft, g as ShieldAlert, j as LogOut, k as MapPin, s as UserCheck } from "../_libs/lucide-react.mjs";
import { n as useAuth } from "./AuthContext-BQtB4ALz.mjs";
import { t as dillkash_logo_horizontal_default } from "./dillkash-logo-horizontal-gZmcQUGi.mjs";
import { t as dillkash_logo_icon_default } from "./dillkash-logo-icon-BziMy2o3.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin-CVf9cffi.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var links = [
	{
		to: "/admin",
		label: "Dashboard",
		icon: LayoutDashboard,
		exact: true
	},
	{
		to: "/admin/packages",
		label: "Packages",
		icon: Package,
		exact: false
	},
	{
		to: "/admin/hotels",
		label: "Hotels",
		icon: Hotel,
		exact: false
	},
	{
		to: "/admin/destinations",
		label: "Destinations",
		icon: MapPin,
		exact: false
	},
	{
		to: "/admin/guides",
		label: "Tour Guides",
		icon: UserCheck,
		exact: false
	}
];
function AdminSidebar() {
	const { logout, user } = useAuth();
	const router = useRouter();
	const [collapsed, setCollapsed] = (0, import_react.useState)(false);
	const [mobileOpen, setMobileOpen] = (0, import_react.useState)(false);
	const handleLogout = () => {
		logout();
		router.navigate({ to: "/" });
	};
	const currentPath = router.state.location.pathname;
	const sidebarContent = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center gap-3 border-b border-border px-4 py-5",
			children: [collapsed ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: dillkash_logo_icon_default,
				alt: "DillKash",
				className: "h-9 w-auto"
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex items-center rounded-xl bg-white/90 px-3 py-1.5 shadow-sm",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: dillkash_logo_horizontal_default,
					alt: "DillKash Kashmir",
					className: "h-9 w-auto object-contain"
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				onClick: () => setCollapsed(!collapsed),
				className: "ml-auto hidden rounded-lg p-1.5 text-muted-foreground hover:bg-secondary lg:block",
				"aria-label": collapsed ? "Expand sidebar" : "Collapse sidebar",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, {
					size: 18,
					className: cn("transition-transform", collapsed && "rotate-180")
				})
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
			className: "flex-1 space-y-1 px-3 py-4",
			"aria-label": "Admin",
			children: links.map((l) => {
				const isActive = l.exact ? currentPath === l.to : currentPath.startsWith(l.to);
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: l.to,
					onClick: () => setMobileOpen(false),
					className: cn("flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition-colors", isActive ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-secondary hover:text-foreground"),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(l.icon, { size: 20 }), !collapsed && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: l.label })]
				}, l.to);
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "border-t border-border px-3 py-4",
			children: [
				!collapsed && user && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-3 px-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "truncate text-sm font-semibold text-foreground",
						children: user.full_name
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "truncate text-xs text-muted-foreground",
						children: user.email
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					onClick: handleLogout,
					className: "flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-destructive transition-colors hover:bg-destructive/10",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogOut, { size: 20 }), !collapsed && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Logout" })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/",
					className: "mt-1 flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-muted-foreground transition-colors hover:bg-secondary",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { size: 20 }), !collapsed && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Back to Website" })]
				})
			]
		})
	] });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			onClick: () => setMobileOpen(!mobileOpen),
			className: "fixed left-4 top-4 z-50 grid h-10 w-10 place-items-center rounded-xl bg-card text-foreground shadow-soft lg:hidden",
			"aria-label": "Toggle admin menu",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, { size: 20 })
		}),
		mobileOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "fixed inset-0 z-40 bg-black/50 lg:hidden",
			onClick: () => setMobileOpen(false)
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("aside", {
			className: cn("fixed inset-y-0 left-0 z-40 flex flex-col border-r border-border bg-card transition-all duration-300", collapsed ? "w-20" : "w-64", mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"),
			children: sidebarContent
		})
	] });
}
function AdminLayout() {
	const { isAuthenticated, isAdmin, isLoading } = useAuth();
	const navigate = useNavigate();
	if (isLoading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, {
			size: 32,
			className: "animate-spin text-primary"
		})
	});
	if (!isAuthenticated) {
		navigate({ to: "/login" });
		return null;
	}
	if (!isAdmin) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mx-auto mb-4 grid h-16 w-16 place-items-center rounded-full bg-destructive/10 text-destructive",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldAlert, { size: 32 })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-heading text-2xl font-extrabold text-foreground",
					children: "Access Denied"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "You don't have permission to access the admin area."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: () => navigate({ to: "/" }),
					className: "mt-6 rounded-xl bg-primary px-6 py-2.5 text-sm font-bold text-primary-foreground",
					children: "Go to Homepage"
				})
			]
		})
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-background",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminSidebar, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "lg:pl-64",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mx-auto max-w-7xl px-4 py-8 pt-16 sm:px-6 lg:pt-8",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {})
			})
		})]
	});
}
//#endregion
export { AdminLayout as component };

import { n as __toESM } from "../_runtime.mjs";
import { n as formatPKR } from "./site-Bb-6ZWDl.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { L as Eye, R as EyeOff, _ as Plus, b as Pen, c as Star, k as LoaderCircle, s as Trash2 } from "../_libs/lucide-react.mjs";
import { deletePackage, getAllPackagesAdmin, togglePackageStatus } from "./packages-BxcyjwUZ.mjs";
import { t as DeleteConfirmDialog } from "./DeleteConfirmDialog-lvVQa56q.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/packages.index-ocxUNbJq.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function AdminPackages() {
	const [packages, setPackages] = (0, import_react.useState)([]);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [deleteTarget, setDeleteTarget] = (0, import_react.useState)(null);
	const [deleteLoading, setDeleteLoading] = (0, import_react.useState)(false);
	const [message, setMessage] = (0, import_react.useState)("");
	const load = () => {
		setLoading(true);
		getAllPackagesAdmin().then(setPackages).catch(console.error).finally(() => setLoading(false));
	};
	(0, import_react.useEffect)(() => {
		load();
	}, []);
	const handleDelete = async () => {
		if (!deleteTarget) return;
		setDeleteLoading(true);
		try {
			await deletePackage(deleteTarget.id);
			setMessage(`"${deleteTarget.title}" deleted successfully`);
			setDeleteTarget(null);
			load();
			setTimeout(() => setMessage(""), 3e3);
		} catch (err) {
			setMessage(err instanceof Error ? err.message : "Delete failed");
		} finally {
			setDeleteLoading(false);
		}
	};
	const handleToggle = async (pkg) => {
		try {
			await togglePackageStatus(pkg.id);
			load();
		} catch (err) {
			console.error(err);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-8 flex flex-wrap items-center justify-between gap-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-heading text-2xl font-extrabold text-foreground sm:text-3xl",
				children: "Tour Packages"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-sm text-muted-foreground",
				children: "Manage all DillKash Kashmir tour packages."
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/admin/packages/create",
				className: "inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-bold text-primary-foreground shadow-cta transition-transform hover:scale-[1.02]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { size: 18 }), " Create Package"]
			})]
		}),
		message && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mb-5 rounded-xl border border-primary/30 bg-primary/10 px-4 py-3 text-sm font-medium text-primary",
			children: message
		}),
		loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex items-center justify-center py-20",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, {
				size: 32,
				className: "animate-spin text-primary"
			})
		}) : packages.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "rounded-3xl border border-dashed border-border bg-card p-12 text-center text-muted-foreground",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "No packages yet. Create your first tour package!" })
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid gap-4",
			children: packages.map((pkg) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col gap-4 rounded-2xl border border-border bg-card p-4 shadow-soft sm:flex-row sm:items-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "h-20 w-28 shrink-0 overflow-hidden rounded-xl bg-muted",
						children: pkg.image && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: pkg.image,
							alt: pkg.title,
							className: "h-full w-full object-cover"
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0 flex-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-wrap items-center gap-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "truncate font-heading text-base font-bold text-foreground",
									children: pkg.title
								}),
								pkg.featured && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "inline-flex items-center gap-1 rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-bold text-amber-700",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { size: 10 }), " Featured"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: `rounded-full px-2 py-0.5 text-[10px] font-bold ${pkg.is_active ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-700"}`,
									children: pkg.is_active ? "Active" : "Inactive"
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-1 flex flex-wrap gap-3 text-xs text-muted-foreground",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [pkg.durationDays, " Days"] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: formatPKR(pkg.price) }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["★ ", pkg.rating] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: pkg.type?.join(", ") })
							]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex shrink-0 items-center gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => handleToggle(pkg),
								title: pkg.is_active ? "Deactivate" : "Activate",
								className: "grid h-9 w-9 place-items-center rounded-xl border border-border text-muted-foreground transition-colors hover:bg-secondary",
								children: pkg.is_active ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EyeOff, { size: 16 }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, { size: 16 })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/admin/packages/$id/edit",
								params: { id: String(pkg.id) },
								className: "grid h-9 w-9 place-items-center rounded-xl border border-border text-muted-foreground transition-colors hover:bg-secondary",
								title: "Edit",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pen, { size: 16 })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => setDeleteTarget(pkg),
								title: "Delete",
								className: "grid h-9 w-9 place-items-center rounded-xl border border-destructive/30 text-destructive transition-colors hover:bg-destructive/10",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { size: 16 })
							})
						]
					})
				]
			}, pkg.id))
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DeleteConfirmDialog, {
			open: !!deleteTarget,
			title: deleteTarget?.title || "",
			onConfirm: handleDelete,
			onCancel: () => setDeleteTarget(null),
			loading: deleteLoading
		})
	] });
}
//#endregion
export { AdminPackages as component };

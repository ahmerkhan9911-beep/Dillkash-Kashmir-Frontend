import { n as __toESM } from "../_runtime.mjs";
import { n as formatPKR } from "./site-Dg0SHnY9.mjs";
import { t as resolveImageUrl } from "./resolveImage-BSOQr9n2.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { J as EyeOff, P as LoaderCircle, V as Hotel, d as Star, k as MapPin, q as Eye, u as Trash2, w as Pen, x as Plus } from "../_libs/lucide-react.mjs";
import { t as DeleteConfirmDialog } from "./DeleteConfirmDialog-lvVQa56q.mjs";
import { n as deleteHotel, o as toggleHotelStatus, r as getAllHotelsAdmin } from "./hotels-DBWefKbg.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/hotels.index-BcEhBPNF.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function AdminHotels() {
	const [hotels, setHotels] = (0, import_react.useState)([]);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [deleteTarget, setDeleteTarget] = (0, import_react.useState)(null);
	const [deleteLoading, setDeleteLoading] = (0, import_react.useState)(false);
	const [message, setMessage] = (0, import_react.useState)("");
	const [messageType, setMessageType] = (0, import_react.useState)("success");
	const load = () => {
		setLoading(true);
		getAllHotelsAdmin().then(setHotels).catch(console.error).finally(() => setLoading(false));
	};
	(0, import_react.useEffect)(() => {
		load();
	}, []);
	const handleDelete = async () => {
		if (!deleteTarget) return;
		setDeleteLoading(true);
		try {
			await deleteHotel(deleteTarget.id);
			setMessageType("success");
			setMessage(`"${deleteTarget.name}" deleted successfully`);
			setDeleteTarget(null);
			load();
			setTimeout(() => setMessage(""), 3e3);
		} catch (err) {
			setMessageType("error");
			setMessage(err instanceof Error ? err.message : "Delete failed. Please try again.");
			setTimeout(() => setMessage(""), 4e3);
		} finally {
			setDeleteLoading(false);
		}
	};
	const handleToggle = async (hotel) => {
		try {
			await toggleHotelStatus(hotel.id);
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
				children: "Hotels"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-sm text-muted-foreground",
				children: "Manage standalone hotel listings for DillKash Kashmir."
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/admin/hotels/create",
				className: "inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-2.5 text-sm font-bold text-white shadow-cta transition-transform hover:scale-[1.02]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { size: 18 }), " Add New Hotel"]
			})]
		}),
		message && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: `mb-5 rounded-xl border px-4 py-3 text-sm font-medium ${messageType === "error" ? "border-destructive/30 bg-destructive/10 text-destructive" : "border-emerald-500/30 bg-emerald-500/10 text-emerald-700"}`,
			children: message
		}),
		loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex items-center justify-center py-20",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, {
				size: 32,
				className: "animate-spin text-primary"
			})
		}) : hotels.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "rounded-3xl border border-dashed border-border bg-card p-12 text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mx-auto mb-4 grid h-14 w-14 place-items-center rounded-2xl bg-muted",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Hotel, {
						size: 24,
						className: "text-muted-foreground"
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-heading text-base font-bold text-foreground",
					children: "No hotels yet"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-sm text-muted-foreground",
					children: "Add your first hotel to get started."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/admin/hotels/create",
					className: "mt-4 inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-2.5 text-sm font-bold text-white",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { size: 16 }), " Add Hotel"]
				})
			]
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "hidden rounded-xl bg-muted/50 px-4 py-2.5 md:grid md:grid-cols-[80px_1fr_120px_100px_100px_100px_120px] md:items-center md:gap-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-[11px] font-bold uppercase tracking-wider text-muted-foreground",
						children: "Image"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-[11px] font-bold uppercase tracking-wider text-muted-foreground",
						children: "Hotel"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-[11px] font-bold uppercase tracking-wider text-muted-foreground",
						children: "Location"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-[11px] font-bold uppercase tracking-wider text-muted-foreground",
						children: "Rating"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-[11px] font-bold uppercase tracking-wider text-muted-foreground",
						children: "Price/Night"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-[11px] font-bold uppercase tracking-wider text-muted-foreground",
						children: "Status"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-[11px] font-bold uppercase tracking-wider text-muted-foreground text-right",
						children: "Actions"
					})
				]
			}), hotels.map((hotel) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col gap-4 rounded-2xl border border-border bg-card p-4 shadow-soft sm:flex-row sm:items-center md:grid md:grid-cols-[80px_1fr_120px_100px_100px_100px_120px] md:gap-4 md:p-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex h-16 w-20 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-muted",
						children: hotel.images && hotel.images[0] ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: resolveImageUrl(hotel.images[0]),
							alt: hotel.name,
							className: "h-full w-full object-cover",
							onError: (e) => {
								e.currentTarget.style.display = "none";
							}
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Hotel, {
							size: 24,
							className: "text-muted-foreground/40"
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0 flex-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "truncate font-heading text-sm font-bold text-foreground",
							children: hotel.name
						}), hotel.featured && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "mt-0.5 inline-flex items-center gap-1 rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-bold text-amber-700",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, {
								size: 10,
								className: "fill-amber-500"
							}), " Featured"]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-1 text-xs text-muted-foreground md:text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, {
							size: 13,
							className: "shrink-0 text-primary sm:hidden md:block"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "truncate",
							children: hotel.location
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex items-center gap-0.5",
						children: Array.from({ length: hotel.starRating }, (_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, {
							size: 14,
							className: "fill-amber-400 text-amber-400"
						}, i))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-sm font-semibold text-foreground",
						children: formatPKR(hotel.pricePerNight)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: `rounded-full px-2.5 py-1 text-[10px] font-bold ${hotel.is_active ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-700"}`,
						children: hotel.is_active ? "Active" : "Inactive"
					}) }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex shrink-0 items-center justify-end gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => handleToggle(hotel),
								title: hotel.is_active ? "Deactivate" : "Activate",
								className: "grid h-9 w-9 place-items-center rounded-xl border border-border text-muted-foreground transition-colors hover:bg-secondary",
								children: hotel.is_active ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EyeOff, { size: 16 }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, { size: 16 })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/admin/hotels/$id/edit",
								params: { id: String(hotel.id) },
								className: "grid h-9 w-9 place-items-center rounded-xl border border-border text-muted-foreground transition-colors hover:bg-secondary",
								title: "Edit",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pen, { size: 16 })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => setDeleteTarget(hotel),
								title: "Delete",
								className: "grid h-9 w-9 place-items-center rounded-xl border border-destructive/30 text-destructive transition-colors hover:bg-destructive/10",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { size: 16 })
							})
						]
					})
				]
			}, hotel.id))]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DeleteConfirmDialog, {
			open: !!deleteTarget,
			title: deleteTarget?.name || "",
			onConfirm: handleDelete,
			onCancel: () => setDeleteTarget(null),
			loading: deleteLoading
		})
	] });
}
//#endregion
export { AdminHotels as component };

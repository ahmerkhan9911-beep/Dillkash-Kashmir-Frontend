import { n as __toESM } from "../_runtime.mjs";
import { r as images, s as tours } from "./site-Bb-6ZWDl.mjs";
import { t as cn } from "./utils-C_uf36nf.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { t as Reveal } from "./Reveal-CRQyoRRE.mjs";
import { Q as ArrowUpDown, l as SlidersHorizontal } from "../_libs/lucide-react.mjs";
import { getPackages } from "./packages-BxcyjwUZ.mjs";
import { t as BookingModal } from "./BookingModal-Bahz8rgF.mjs";
import { t as Route } from "./packages.index-ChaqmyWm.mjs";
import { t as TourCard } from "./TourCard-D7gUSNII.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/packages.index-DTjgnD0W.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var durations = [
	"All",
	"3",
	"5",
	"7"
];
var types = [
	"All",
	"Family",
	"Couples",
	"Honeymoon",
	"Corporate",
	"Budget"
];
var budgets = [
	"All",
	"Under 20k",
	"20k – 30k",
	"Above 30k"
];
var sorts = [
	"Popular",
	"Price: Low to High",
	"Price: High to Low"
];
function PackagesPage() {
	const search = Route.useSearch();
	const [tours$1, setTours] = (0, import_react.useState)(tours);
	const [apiLoading, setApiLoading] = (0, import_react.useState)(true);
	(0, import_react.useEffect)(() => {
		getPackages().then((pkgs) => {
			if (pkgs.length > 0) setTours(pkgs);
		}).catch(() => {}).finally(() => setApiLoading(false));
	}, []);
	const [duration, setDuration] = (0, import_react.useState)(search.duration && [
		"3",
		"5",
		"7"
	].includes(search.duration) ? search.duration : "All");
	const [type, setType] = (0, import_react.useState)(search.type && types.includes(search.type) ? search.type : "All");
	const [budget, setBudget] = (0, import_react.useState)("All");
	const [sort, setSort] = (0, import_react.useState)("Popular");
	const [bookingTour, setBookingTour] = (0, import_react.useState)();
	const [modalOpen, setModalOpen] = (0, import_react.useState)(false);
	const filtered = (0, import_react.useMemo)(() => {
		let list = tours$1.slice();
		if (duration !== "All") list = list.filter((t) => t.durationDays === Number(duration));
		if (type !== "All") list = list.filter((t) => t.type.includes(type));
		if (budget === "Under 20k") list = list.filter((t) => t.price < 2e4);
		if (budget === "20k – 30k") list = list.filter((t) => t.price >= 2e4 && t.price <= 3e4);
		if (budget === "Above 30k") list = list.filter((t) => t.price > 3e4);
		if (sort === "Price: Low to High") list.sort((a, b) => a.price - b.price);
		if (sort === "Price: High to Low") list.sort((a, b) => b.price - a.price);
		if (sort === "Popular") list.sort((a, b) => b.reviews - a.reviews);
		return list;
	}, [
		duration,
		type,
		budget,
		sort,
		tours$1
	]);
	const chip = (active) => cn("rounded-full border px-4 py-2 text-sm font-semibold transition-colors", active ? "border-primary bg-primary text-primary-foreground" : "border-border bg-card text-foreground hover:bg-secondary");
	const filterGroup = (label, options, value, onChange, suffix) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "mb-2 text-xs font-bold uppercase tracking-widest text-muted-foreground",
		children: label
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex flex-wrap gap-2",
		children: options.map((o) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
			type: "button",
			onClick: () => onChange(o),
			className: chip(value === o),
			children: [o, suffix && o !== "All" ? suffix : ""]
		}, o))
	})] });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "relative overflow-hidden",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: images.rattiGali,
					alt: "Ratti Gali Lake, Azad Kashmir",
					width: 1280,
					height: 720,
					className: "absolute inset-0 h-full w-full object-cover"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-b from-black/60 to-black/70" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative mx-auto max-w-7xl px-4 pb-16 pt-36 text-center sm:px-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "font-heading text-4xl font-extrabold text-white text-balance sm:text-5xl",
						children: "Kashmir Tour Packages"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mx-auto mt-4 max-w-xl text-base text-white/85",
						children: "Every package departs from Lahore with all-inclusive pricing. Filter by duration, type and budget to find your perfect trip."
					})]
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mx-auto max-w-7xl px-4 py-10 sm:px-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-3xl border border-border bg-card p-6 shadow-soft",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mb-4 flex items-center gap-2 font-heading text-sm font-bold text-foreground",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SlidersHorizontal, {
							size: 16,
							className: "text-primary"
						}), "Filter Packages"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-5",
						children: [
							filterGroup("Duration", durations, duration, setDuration, " Days"),
							filterGroup("Package Type", types, type, setType),
							filterGroup("Budget", budgets, budget, setBudget)
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-border pt-5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-sm font-semibold text-muted-foreground",
							children: [
								filtered.length,
								" package",
								filtered.length === 1 ? "" : "s",
								" found"
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "flex items-center gap-2 text-sm font-semibold text-foreground",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpDown, {
								size: 15,
								className: "text-primary"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
								value: sort,
								onChange: (e) => setSort(e.target.value),
								"aria-label": "Sort packages",
								className: "rounded-xl border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring",
								children: sorts.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: s }, s))
							})]
						})]
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-10 grid gap-6 pb-20 md:grid-cols-2 lg:grid-cols-3",
				children: [filtered.map((t, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
					delay: i % 3 * 70,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TourCard, {
						tour: t,
						onBook: (tour) => {
							setBookingTour(tour);
							setModalOpen(true);
						}
					})
				}, t.slug)), filtered.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "col-span-full rounded-3xl border border-dashed border-border bg-card p-12 text-center text-muted-foreground",
					children: "No packages match these filters — try widening your search or request a custom tour."
				})]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookingModal, {
			open: modalOpen,
			onClose: () => setModalOpen(false),
			preselectedTour: bookingTour
		})
	] });
}
//#endregion
export { PackagesPage as component };

import { n as __toESM } from "../_runtime.mjs";
import { c as whatsappLink, s as tours } from "./site-Bb-6ZWDl.mjs";
import { t as cn } from "./utils-C_uf36nf.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { c as Star, t as X } from "../_libs/lucide-react.mjs";
import { n as WhatsAppIcon } from "./Navbar-CwNINFgT.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/BookingModal-Bahz8rgF.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function StarRating({ rating, className, size = 16 }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: cn("inline-flex items-center gap-0.5", className),
		children: [
			1,
			2,
			3,
			4,
			5
		].map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, {
			size,
			className: i <= Math.round(rating) ? "fill-amber-400 text-amber-400" : "fill-muted text-muted",
			"aria-hidden": true
		}, i))
	});
}
var initial = {
	name: "",
	phone: "",
	tour: "",
	date: "",
	adults: 2,
	kids: 0,
	room: "Standard Double"
};
function BookingModal({ open, onClose, preselectedTour }) {
	const [form, setForm] = (0, import_react.useState)(initial);
	const [errors, setErrors] = (0, import_react.useState)({});
	const [submitted, setSubmitted] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		if (open) {
			setForm((f) => ({
				...f,
				tour: preselectedTour?.title ?? f.tour
			}));
			setSubmitted(false);
			setErrors({});
			document.body.style.overflow = "hidden";
		} else document.body.style.overflow = "";
		return () => {
			document.body.style.overflow = "";
		};
	}, [open, preselectedTour]);
	if (!open) return null;
	const set = (key, value) => setForm((f) => ({
		...f,
		[key]: value
	}));
	const validate = () => {
		const e = {};
		if (form.name.trim().length < 3) e.name = "Please enter your full name";
		if (!/^(\+?92|0)?\d{10}$/.test(form.phone.replace(/[\s-]/g, ""))) e.phone = "Enter a valid phone number (e.g. 03001234567)";
		if (!form.tour) e.tour = "Please select a tour";
		if (!form.date) e.date = "Please pick a travel date";
		if (form.adults < 1) e.adults = "At least 1 adult required";
		setErrors(e);
		return Object.keys(e).length === 0;
	};
	const handleSubmit = (ev) => {
		ev.preventDefault();
		if (!validate()) return;
		setSubmitted(true);
	};
	const whatsappBooking = () => {
		const msg = `Hi Al Kareem Travel! I want to book: ${form.tour || "a Kashmir tour"}\nName: ${form.name}\nDate: ${form.date || "Flexible"}\nTravelers: ${form.adults} adults, ${form.kids} kids\nRoom: ${form.room}`;
		window.open(whatsappLink(msg), "_blank", "noopener");
	};
	const inputCls = (hasError) => `w-full rounded-xl border bg-background px-4 py-2.5 text-sm outline-none transition-colors focus:ring-2 focus:ring-ring ${hasError ? "border-destructive" : "border-input"}`;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "fixed inset-0 z-[60] flex items-end justify-center bg-black/60 p-0 backdrop-blur-sm sm:items-center sm:p-4",
		role: "dialog",
		"aria-modal": "true",
		"aria-label": "Booking form",
		onClick: onClose,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-h-[92vh] w-full max-w-lg overflow-y-auto rounded-t-3xl bg-card p-6 shadow-lift sm:rounded-3xl",
			onClick: (e) => e.stopPropagation(),
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-5 flex items-start justify-between gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "font-heading text-xl font-extrabold text-foreground",
					children: "Book Your Kashmir Tour"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-sm text-muted-foreground",
					children: "Fill in the details — our team will confirm within 30 minutes."
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: onClose,
					"aria-label": "Close booking form",
					className: "grid h-9 w-9 shrink-0 place-items-center rounded-full bg-muted text-muted-foreground transition-colors hover:bg-secondary",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { size: 18 })
				})]
			}), submitted ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-2xl bg-secondary p-6 text-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mx-auto mb-3 grid h-14 w-14 place-items-center rounded-full bg-primary text-primary-foreground",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
							width: "28",
							height: "28",
							viewBox: "0 0 24 24",
							fill: "none",
							stroke: "currentColor",
							strokeWidth: "3",
							strokeLinecap: "round",
							strokeLinejoin: "round",
							"aria-hidden": true,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M20 6 9 17l-5-5" })
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
						className: "font-heading text-lg font-bold text-foreground",
						children: "Booking Request Received!"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-2 text-sm text-muted-foreground",
						children: [
							"Thank you, ",
							form.name.split(" ")[0],
							"! Our team will call you at",
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
								className: "text-foreground",
								children: form.phone
							}),
							" shortly to confirm your seats."
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: onClose,
						className: "mt-5 rounded-xl bg-primary px-6 py-2.5 text-sm font-bold text-primary-foreground",
						children: "Done"
					})
				]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				onSubmit: handleSubmit,
				noValidate: true,
				className: "grid gap-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							htmlFor: "bk-name",
							className: "mb-1.5 block text-sm font-semibold text-foreground",
							children: "Full Name"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							id: "bk-name",
							type: "text",
							value: form.name,
							onChange: (e) => set("name", e.target.value),
							placeholder: "Muhammad Ahmad",
							className: inputCls(errors.name)
						}),
						errors.name && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-xs font-medium text-destructive",
							children: errors.name
						})
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							htmlFor: "bk-phone",
							className: "mb-1.5 block text-sm font-semibold text-foreground",
							children: "Phone Number"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							id: "bk-phone",
							type: "tel",
							value: form.phone,
							onChange: (e) => set("phone", e.target.value),
							placeholder: "0300 1234567",
							className: inputCls(errors.phone)
						}),
						errors.phone && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-xs font-medium text-destructive",
							children: errors.phone
						})
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-4 sm:grid-cols-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								htmlFor: "bk-tour",
								className: "mb-1.5 block text-sm font-semibold text-foreground",
								children: "Selected Tour"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
								id: "bk-tour",
								value: form.tour,
								onChange: (e) => set("tour", e.target.value),
								className: inputCls(errors.tour),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "",
									children: "Choose a package…"
								}), tours.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: t.title,
									children: t.title
								}, t.slug))]
							}),
							errors.tour && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-xs font-medium text-destructive",
								children: errors.tour
							})
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								htmlFor: "bk-date",
								className: "mb-1.5 block text-sm font-semibold text-foreground",
								children: "Travel Date"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								id: "bk-date",
								type: "date",
								value: form.date,
								onChange: (e) => set("date", e.target.value),
								className: inputCls(errors.date)
							}),
							errors.date && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-xs font-medium text-destructive",
								children: errors.date
							})
						] })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-3 gap-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								htmlFor: "bk-adults",
								className: "mb-1.5 block text-sm font-semibold text-foreground",
								children: "Adults"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								id: "bk-adults",
								type: "number",
								min: 1,
								max: 30,
								value: form.adults,
								onChange: (e) => set("adults", Number(e.target.value)),
								className: inputCls(errors.adults)
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								htmlFor: "bk-kids",
								className: "mb-1.5 block text-sm font-semibold text-foreground",
								children: "Kids"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								id: "bk-kids",
								type: "number",
								min: 0,
								max: 20,
								value: form.kids,
								onChange: (e) => set("kids", Number(e.target.value)),
								className: inputCls()
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								htmlFor: "bk-room",
								className: "mb-1.5 block text-sm font-semibold text-foreground",
								children: "Room"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
								id: "bk-room",
								value: form.room,
								onChange: (e) => set("room", e.target.value),
								className: inputCls(),
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Standard Double" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Family Room" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Deluxe Double" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Shared (Budget)" })
								]
							})] })
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-1 grid gap-3 sm:grid-cols-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "submit",
							className: "rounded-xl bg-primary py-3 text-sm font-bold text-primary-foreground shadow-cta transition-transform hover:scale-[1.02]",
							children: "Submit Booking"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: whatsappBooking,
							className: "inline-flex items-center justify-center gap-2 rounded-xl bg-whatsapp py-3 text-sm font-bold text-whatsapp-foreground transition-transform hover:scale-[1.02]",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WhatsAppIcon, { size: 18 }), "Book via WhatsApp"]
						})]
					})
				]
			})]
		})
	});
}
//#endregion
export { StarRating as n, BookingModal as t };

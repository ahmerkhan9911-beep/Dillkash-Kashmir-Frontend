import { n as __toESM } from "../_runtime.mjs";
import { c as whatsappLink, r as images, t as destinations } from "./site-Dg0SHnY9.mjs";
import { t as cn } from "./utils-C_uf36nf.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { t as Reveal } from "./Reveal-CRQyoRRE.mjs";
import { t as SectionHeader } from "./SectionHeader-C9AT2Ppx.mjs";
import { _ as Send, l as Truck, nt as Check, ot as Bus, rt as Car } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/custom-tour-Cri-aO2g.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var initial = {
	name: "",
	phone: "",
	date: "",
	adults: 2,
	kids: 0,
	hotel: "3 Star",
	transportPreference: "Standard Car",
	destinations: [],
	message: ""
};
var TRANSPORT_OPTIONS = [
	{
		value: "Standard Car",
		subtitle: "Up to 3 persons",
		icon: Car
	},
	{
		value: "SUV / Prado",
		subtitle: "Best for off-roading",
		icon: Truck
	},
	{
		value: "Grand Cabin / Hiace",
		subtitle: "For families/groups",
		icon: Bus
	}
];
function CustomTourPage() {
	const [form, setForm] = (0, import_react.useState)(initial);
	const [errors, setErrors] = (0, import_react.useState)({});
	const [sent, setSent] = (0, import_react.useState)(false);
	const toggleDestination = (name) => setForm((f) => ({
		...f,
		destinations: f.destinations.includes(name) ? f.destinations.filter((d) => d !== name) : [...f.destinations, name]
	}));
	const submit = (e) => {
		e.preventDefault();
		const err = {};
		if (form.name.trim().length < 3) err.name = "Please enter your full name";
		if (!/^(\+?92|0)?\d{10}$/.test(form.phone.replace(/[\s-]/g, ""))) err.phone = "Enter a valid phone number";
		if (!form.date) err.date = "Please choose a preferred date";
		if (form.destinations.length === 0) err.destinations = "Pick at least one destination";
		setErrors(err);
		if (Object.keys(err).length === 0) setSent(true);
	};
	const inputCls = (hasError) => `w-full rounded-xl border bg-background px-4 py-3 text-sm outline-none transition-colors focus:ring-2 focus:ring-ring ${hasError ? "border-destructive" : "border-input"}`;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "relative overflow-hidden",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: images.videoThumb,
				alt: "4x4 jeeps heading into the Kashmir mountains",
				width: 1920,
				height: 1080,
				className: "absolute inset-0 h-full w-full object-cover"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-b from-black/60 to-black/70" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative mx-auto max-w-7xl px-4 pb-16 pt-36 text-center sm:px-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-heading text-4xl font-extrabold text-white text-balance sm:text-5xl",
					children: "Plan Your Own Kashmir Tour"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mx-auto mt-4 max-w-xl text-base text-white/85",
					children: "Perfect for families, private groups and corporate trips — your dates, your destinations, your pace."
				})]
			})
		]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "mx-auto max-w-3xl px-4 py-16 sm:px-6",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "rounded-3xl border border-border bg-card p-6 shadow-lift sm:p-10",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeader, {
				align: "left",
				eyebrow: "Custom Tour Request",
				title: "Tell Us About Your Trip",
				subtitle: "Fill this in and our tour planners will call you with a tailored itinerary and quote."
			}), sent ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-8 rounded-2xl bg-secondary p-8 text-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mx-auto mb-3 grid h-14 w-14 place-items-center rounded-full bg-primary text-primary-foreground",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { size: 28 })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-heading text-lg font-bold text-foreground",
						children: "Request Received!"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mx-auto mt-2 max-w-sm text-sm text-muted-foreground",
						children: [
							"Thanks ",
							form.name.split(" ")[0],
							" — a tour planner will call",
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
								className: "text-foreground",
								children: form.phone
							}),
							" within a few hours with your custom itinerary."
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: whatsappLink(`Hi! I just submitted a custom tour request for ${form.destinations.join(", ")}.`),
						target: "_blank",
						rel: "noopener noreferrer",
						className: "mt-5 inline-block rounded-xl bg-whatsapp px-6 py-3 text-sm font-bold text-whatsapp-foreground",
						children: "Continue on WhatsApp"
					})
				]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				onSubmit: submit,
				noValidate: true,
				className: "mt-8 grid gap-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-5 sm:grid-cols-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								htmlFor: "c-name",
								className: "mb-1.5 block text-sm font-semibold text-foreground",
								children: "Name"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								id: "c-name",
								type: "text",
								value: form.name,
								onChange: (e) => setForm({
									...form,
									name: e.target.value
								}),
								placeholder: "Your full name",
								className: inputCls(errors.name)
							}),
							errors.name && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-xs font-medium text-destructive",
								children: errors.name
							})
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								htmlFor: "c-phone",
								className: "mb-1.5 block text-sm font-semibold text-foreground",
								children: "Phone Number"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								id: "c-phone",
								type: "tel",
								value: form.phone,
								onChange: (e) => setForm({
									...form,
									phone: e.target.value
								}),
								placeholder: "0300 1234567",
								className: inputCls(errors.phone)
							}),
							errors.phone && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-xs font-medium text-destructive",
								children: errors.phone
							})
						] })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-5 sm:grid-cols-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									htmlFor: "c-date",
									className: "mb-1.5 block text-sm font-semibold text-foreground",
									children: "Preferred Date"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									id: "c-date",
									type: "date",
									value: form.date,
									onChange: (e) => setForm({
										...form,
										date: e.target.value
									}),
									className: inputCls(errors.date)
								}),
								errors.date && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 text-xs font-medium text-destructive",
									children: errors.date
								})
							] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								htmlFor: "c-adults",
								className: "mb-1.5 block text-sm font-semibold text-foreground",
								children: "Adults"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								id: "c-adults",
								type: "number",
								min: 1,
								max: 50,
								value: form.adults,
								onChange: (e) => setForm({
									...form,
									adults: Number(e.target.value)
								}),
								className: inputCls()
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								htmlFor: "c-kids",
								className: "mb-1.5 block text-sm font-semibold text-foreground",
								children: "Kids"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								id: "c-kids",
								type: "number",
								min: 0,
								max: 30,
								value: form.kids,
								onChange: (e) => setForm({
									...form,
									kids: Number(e.target.value)
								}),
								className: inputCls()
							})] })
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "mb-1.5 block text-sm font-semibold text-foreground",
						children: "Hotel Preference"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex gap-2",
						children: ["3 Star", "5 Star"].map((h) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => setForm({
								...form,
								hotel: h
							}),
							className: cn("flex-1 rounded-xl border px-4 py-3 text-sm font-bold transition-colors", form.hotel === h ? "border-primary bg-primary text-primary-foreground" : "border-border bg-background text-foreground hover:bg-secondary"),
							"aria-pressed": form.hotel === h,
							children: h
						}, h))
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "mb-1.5 block text-sm font-semibold text-foreground",
						children: "Transport Preference"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid gap-2 sm:grid-cols-3",
						children: TRANSPORT_OPTIONS.map((opt) => {
							const active = form.transportPreference === opt.value;
							const Icon = opt.icon;
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: () => setForm({
									...form,
									transportPreference: opt.value
								}),
								"aria-pressed": active,
								className: cn("relative flex flex-col items-center gap-1.5 rounded-xl border px-4 py-4 text-sm font-bold transition-all", active ? "border-[#059669] bg-[#059669] text-white shadow-md" : "border-border bg-background text-foreground hover:bg-secondary hover:border-[#059669]/40"),
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
										size: 22,
										className: active ? "text-white" : "text-muted-foreground"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: opt.value }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: cn("text-xs font-normal", active ? "text-white/80" : "text-muted-foreground"),
										children: opt.subtitle
									})
								]
							}, opt.value);
						})
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "mb-1.5 block text-sm font-semibold text-foreground",
							children: "Preferred Destinations"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex flex-wrap gap-2",
							children: destinations.map((d) => {
								const active = form.destinations.includes(d.name);
								return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => toggleDestination(d.name),
									"aria-pressed": active,
									className: cn("rounded-full border px-4 py-2 text-sm font-semibold transition-colors", active ? "border-primary bg-primary text-primary-foreground" : "border-border bg-background text-foreground hover:bg-secondary"),
									children: d.name
								}, d.name);
							})
						}),
						errors.destinations && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-xs font-medium text-destructive",
							children: errors.destinations
						})
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						htmlFor: "c-msg",
						className: "mb-1.5 block text-sm font-semibold text-foreground",
						children: "Message"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
						id: "c-msg",
						rows: 4,
						value: form.message,
						onChange: (e) => setForm({
							...form,
							message: e.target.value
						}),
						placeholder: "Anything special — anniversary, wheelchair access, corporate branding, specific hotels…",
						className: inputCls()
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "submit",
						className: "inline-flex items-center justify-center gap-2 rounded-xl bg-primary py-4 text-sm font-bold text-primary-foreground shadow-cta transition-transform hover:scale-[1.02]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Send, { size: 16 }), "Submit Request"]
					})
				]
			})]
		}) })
	})] });
}
//#endregion
export { CustomTourPage as component };

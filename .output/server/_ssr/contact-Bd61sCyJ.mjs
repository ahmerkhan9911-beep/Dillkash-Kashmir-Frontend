import { n as __toESM } from "../_runtime.mjs";
import { c as whatsappLink, o as site } from "./site-Dg0SHnY9.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { t as Reveal } from "./Reveal-CRQyoRRE.mjs";
import { t as SectionHeader } from "./SectionHeader-C9AT2Ppx.mjs";
import { A as Mail, C as Phone, X as Clock, _ as Send, k as MapPin } from "../_libs/lucide-react.mjs";
import { n as WhatsAppIcon } from "./Navbar-P14Io8Rd.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/contact-Bd61sCyJ.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ContactPage() {
	const [form, setForm] = (0, import_react.useState)({
		name: "",
		phone: "",
		message: ""
	});
	const [sent, setSent] = (0, import_react.useState)(false);
	const [errors, setErrors] = (0, import_react.useState)({});
	const submit = (e) => {
		e.preventDefault();
		const err = {};
		if (form.name.trim().length < 3) err.name = "Please enter your name";
		if (form.phone.trim().length < 10) err.phone = "Please enter a valid phone number";
		if (form.message.trim().length < 10) err.message = "Tell us a little about your trip";
		setErrors(err);
		if (Object.keys(err).length === 0) setSent(true);
	};
	const inputCls = (hasError) => `w-full rounded-xl border bg-background px-4 py-3 text-sm outline-none transition-colors focus:ring-2 focus:ring-ring ${hasError ? "border-destructive" : "border-input"}`;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "bg-secondary/90 pb-16 pt-36",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto max-w-7xl px-4 text-center sm:px-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-heading text-4xl font-extrabold text-foreground text-balance sm:text-5xl",
					children: "Let's Plan Your Kashmir Trip"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mx-auto mt-4 max-w-xl text-base text-muted-foreground",
					children: "Call, WhatsApp or drop by our Lahore office — we reply within minutes, seven days a week."
				})]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "mx-auto max-w-7xl px-4 py-16 sm:px-6",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-10 lg:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-4",
					children: [[
						{
							icon: Phone,
							label: "Phone",
							value: site.phone,
							href: site.phoneHref
						},
						{
							icon: null,
							label: "WhatsApp",
							value: site.phone,
							href: whatsappLink(),
							isWa: true
						},
						{
							icon: Mail,
							label: "Email",
							value: site.email,
							href: `mailto:${site.email}`
						},
						{
							icon: MapPin,
							label: "Lahore Office",
							value: site.address
						},
						{
							icon: Clock,
							label: "Office Hours",
							value: site.hours
						}
					].map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-4 rounded-2xl border border-border bg-card p-5 shadow-soft",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-secondary text-primary",
							children: c.isWa ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WhatsAppIcon, { size: 22 }) : c.icon ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(c.icon, { size: 22 }) : null
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs font-bold uppercase tracking-widest text-muted-foreground",
								children: c.label
							}), c.href ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: c.href,
								target: c.isWa ? "_blank" : void 0,
								rel: c.isWa ? "noopener noreferrer" : void 0,
								className: "mt-0.5 block truncate font-heading text-base font-bold text-foreground hover:text-primary",
								children: c.value
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-0.5 font-heading text-base font-bold text-foreground",
								children: c.value
							})]
						})]
					}, c.label)), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "relative overflow-hidden rounded-2xl border border-border bg-muted shadow-soft",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "grid h-56 place-items-center bg-[radial-gradient(circle_at_30%_30%,var(--color-secondary),var(--color-muted))]",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "text-center",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "mx-auto grid h-14 w-14 place-items-center rounded-full bg-primary text-primary-foreground shadow-cta",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { size: 26 })
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-3 font-heading text-sm font-bold text-foreground",
										children: "Johar Town, Lahore"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
										href: "https://maps.google.com/?q=Johar+Town+Lahore",
										target: "_blank",
										rel: "noopener noreferrer",
										className: "mt-1 inline-block text-xs font-bold text-primary hover:underline",
										children: "Open in Google Maps →"
									})
								]
							})
						})
					})]
				}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
					delay: 120,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-3xl border border-border bg-card p-6 shadow-soft sm:p-8",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeader, {
							align: "left",
							title: "Send Us a Message",
							subtitle: "Tell us your travel dates and group size — we'll reply with the best options."
						}), sent ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-6 rounded-2xl bg-secondary p-6 text-center",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-heading text-lg font-bold text-foreground",
								children: "Message Sent!"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-2 text-sm text-muted-foreground",
								children: [
									"Thanks ",
									form.name.split(" ")[0],
									" — our team will get back to you shortly."
								]
							})]
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
							onSubmit: submit,
							noValidate: true,
							className: "mt-6 grid gap-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										htmlFor: "ct-name",
										className: "mb-1.5 block text-sm font-semibold text-foreground",
										children: "Name"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										id: "ct-name",
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
								] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										htmlFor: "ct-phone",
										className: "mb-1.5 block text-sm font-semibold text-foreground",
										children: "Phone / WhatsApp"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										id: "ct-phone",
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
								] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										htmlFor: "ct-msg",
										className: "mb-1.5 block text-sm font-semibold text-foreground",
										children: "Message"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
										id: "ct-msg",
										rows: 4,
										value: form.message,
										onChange: (e) => setForm({
											...form,
											message: e.target.value
										}),
										placeholder: "I want to plan a 5-day Kashmir trip for my family in October…",
										className: inputCls(errors.message)
									}),
									errors.message && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-1 text-xs font-medium text-destructive",
										children: errors.message
									})
								] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "submit",
									className: "inline-flex items-center justify-center gap-2 rounded-xl bg-primary py-3.5 text-sm font-bold text-primary-foreground shadow-cta transition-transform hover:scale-[1.02]",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Send, { size: 16 }), "Send Message"]
								})
							]
						})]
					})
				})]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "mx-auto max-w-7xl px-4 pb-20 sm:px-6",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-[2.5rem] bg-primary px-6 py-14 text-center shadow-lift sm:px-12",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-heading text-3xl font-extrabold text-primary-foreground text-balance sm:text-4xl",
						children: "Ready to Explore Kashmir?"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mx-auto mt-3 max-w-md text-base text-primary-foreground/85",
						children: "The mountains are calling — our next coaster leaves Lahore this week."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-8 flex flex-wrap justify-center gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
							href: whatsappLink(),
							target: "_blank",
							rel: "noopener noreferrer",
							className: "inline-flex items-center gap-2 rounded-full bg-whatsapp px-8 py-4 text-sm font-bold text-whatsapp-foreground shadow-lift transition-transform hover:scale-105",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WhatsAppIcon, { size: 18 }), "WhatsApp Us"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
							href: site.phoneHref,
							className: "inline-flex items-center gap-2 rounded-full bg-background px-8 py-4 text-sm font-bold text-foreground transition-transform hover:scale-105",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Phone, { size: 16 }), "Call Now"]
						})]
					})
				]
			}) })
		})
	] });
}
//#endregion
export { ContactPage as component };
